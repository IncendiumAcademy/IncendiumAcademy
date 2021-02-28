import firebase from "firebase/app";
import "firebase/firestore";

/**
 * Database class, handles db-related functions and updates progress tracking
 */
class _Database {

  /**
   * Initializes DB
   *
   * @param uid User ID
   */
  initialize(uid) {
    this.db = firebase.firestore().collection("users").doc(uid);
    console.log("db initialized"); //TODO: Remove this later
  }

  /**
   * Uninitializes DB
   */
  uninitialize() {
    this.db = null;
    console.log("db uninitialized"); //TODO: Remove this later
  }

  /**
   * Checks whether DB is initialized
   * @returns {boolean} Whether DB is initialized or not
   */
  get isReady() {
    return this.db != null;
  }

  /**
   * Get method - returns DB data
   * @returns {Promise<T>} Data
   */
  async get() {
    return (await this.db.get()).data();
  }

  /**
   * Set the dropdown value to the correct value
   * Add complete, in-progress, to the circles
   */

  updateDOM() {
    console.log("DOM updated");

    let path = window.location.pathname.split('/');
    path = path.slice(2,path.length-1);

    this.db
      .collection(path[0])
      .doc(path.slice(1).join('/'))
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          let progress = docSnapshot.data();
          console.log(`Snapshot exists`, progress)
          Object.keys(progress).forEach((key) => {
            console.log("Current progress: ", progress[key])
            document.getElementById('site-nav').getElementsByClassName('progress')[0]
              .className += ` ${progress[key]}`
            let options = document.getElementById('progress_select').getElementsByTagName("option")
            for(let x = 0; x < options.length; x++){
              let option = options[x]
              console.log(option.value)
              if(option.value === progress[key]){
                 option.setAttribute("selected", "selected")
               }
            }


            // document.querySelector(`input[name='${key}']`).checked =
          });
        } else {
          console.log(`Snapshot does not exist.`)
          document
            .querySelectorAll("input[type=checkbox]")
            .forEach((checkbox) => (checkbox.checked = false));
        }
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  }

  updateProgress(name, progress) {
    let path = name.split('/');
    path = path.slice(2,path.length-1);
    this.db.collection(path[0]).doc(path.slice(1).join('/')).set({ progress: progress }, { merge: true });
  }

  delete() {
    this.db.delete();
  }
}

export const db = new _Database();
