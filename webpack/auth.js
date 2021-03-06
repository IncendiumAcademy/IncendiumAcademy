import firebase from "firebase/app";
import "firebase/auth";
import { db } from "./database";

/* Firebase API Key*/
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB75zRrXt9rHoi9mObhTnRfenK6g5bnHTk",
  authDomain: "incendium-academy.firebaseapp.com",
  databaseURL: "https://incendium-academy.firebaseio.com",
  projectId: "incendium-academy",
  storageBucket: "incendium-academy.appspot.com",
  messagingSenderId: "941896137375",
  appId: "1:941896137375:web:75ea163837beb0a42800aa",
};

class _Auth {
  /**
   * Auth class for authenticating users using Firebase
   */
  constructor() {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  /**
   * Validates user's email and ensures that it follows correct conventions (name@email.com)
   *
   * @param {string} email  User's email address
   * @returns {boolean}     Whether email is valid or not
   */
  validateEmail(email) {
    const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi;
    return EMAIL_REGEX.test(email);
  }

  /**
   * Validates password and ensures that it has at least 8 characters, 1 uppercase character, 1 lowercase character, and
   * 1 symbol
   *
   * @param {string} password User's password
   * @returns {boolean}       Whether password is valid or not
   */
  validatePassword(password) {
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/g;
    return PASSWORD_REGEX.test(password);
  }

  /**
   * Creates user's account in the Firebase DB
   *
   * @param {string} email    User's email
   * @param {string} password User's password
   * @param {string} name     User's name
   */
  createUserWithEmailAndPassword(email, password, name) {
    let credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    firebase
      .auth()
      .currentUser.linkWithCredential(credential)
      .then((user) => {
        user.user.updateProfile({ displayName: name }).then(() => {
          window.location.reload();
        });
        user.user.sendEmailVerification();
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  }

  /**
   * Signs user in
   *
   * @param {string} email    User's email
   * @param {string} password User's password
   * @returns {Promise<firebase.auth.UserCredential>} Sign in confirmation
   */
  signInWithEmailAndPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * Allows user to sign in directly using their Google account
   */
  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();

    firebase
      .auth()
      .currentUser.linkWithRedirect(provider)
      .catch(function (error) {
        console.error(error.code, error.message);
      });
  }

  /**
   * Allows user to sign in anonymously and save progress
   *
   * @returns {Promise<firebase.auth.UserCredential | void>}
   */
  signInAnonymously() {
    return firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        console.error(error.code, error.message);
      });
  }

  /**
   * Signs user out
   *
   * @returns {Promise<void>}
   */
  signOut() {
    return firebase.auth().signOut();
  }

  /**
   * Observer for changes to user's sign-in state
   *
   * @param callback
   */
  onAuthStateChanged(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }

  getRedirectResult() {
    firebase
      .auth()
      .getRedirectResult()
      .catch(async (error) => {
        // Manually merge data if already linked
        if (error.code == "auth/credential-already-in-use") {
          let anonUser = firebase.auth().currentUser;
          let anonData = await db.get();
          db.delete();

          firebase
            .auth()
            .signInWithCredential(error.credential)
            .then((res) => {
              Object.keys(anonData).forEach((key) => {
                if (!anonData[key]) delete anonData[key];
              });

              db.initialize(res.user.uid);
              db.updateProgress(anonData);

              anonUser.delete().catch((error) => {
                console.error(error);
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
  }

  get currentUser() {
    return firebase.auth().currentUser;
  };
}

export const auth = new _Auth();

// window.currentUser = auth.currentUser;