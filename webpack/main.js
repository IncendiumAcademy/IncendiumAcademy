import "./event-handlers";
import "./tabs";
import Modal from "./modal";
import { auth } from "./auth";
import { db } from "./database";

function showLogoutBtn() {
  document.querySelector('.aux-nav-list').innerHTML = `
      <li class="aux-nav-list-item">
        <a href="#" class="site-button" id="logoutBtn">Logout</a>
      </li>
      `;

  document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log('logout');
    auth.signOut().then(() => {
      window.location.reload();
    });
  });
}

window.addEventListener("load", () => {
  const authModal = new Modal("authModal");

  // Submit login form
  authModal.modal
    .querySelector("#loginForm")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      let email = e.target.email.value;
      let password = e.target.password.value;
      authModal.modal
        .querySelectorAll(".errormsg")
        .forEach((el) => el.remove());

      // Validate
      if (email == "") {
        e.target.email.insertAdjacentHTML(
          "afterend",
          `<sub class="errormsg">An email is required to login.</sub>`
        );
      } else if (password == "") {
        e.target.password.insertAdjacentHTML(
          "afterend",
          `<sub class="errormsg">Password cannot be blank.</sub>`
        );
      } else {
        auth.signInWithEmailAndPassword(email, password).catch((error) => {
          e.target.insertAdjacentHTML(
            "afterend",
            `<sub class="errormsg">Incorrect email or password.</sub>`
          );
        });
      }
    });
  // Submit signup form
  authModal.modal
    .querySelector("#signupForm")
    .addEventListener("submit", (e) => {
      // console.log("sign up");
      e.preventDefault();
      let name = e.target.name.value;
      let email = e.target.email.value;
      let password = e.target.password.value;
      authModal.modal
        .querySelectorAll(".errormsg")
        .forEach((el) => el.remove());

      // Validate
      if (email == "" || !auth.validateEmail(email)) {
        e.target.email.insertAdjacentHTML(
          "afterend",
          `<sub class="errormsg">Please enter a valid email address.</sub>`
        );
      } else if (password == "" || !auth.validatePassword(password)) {
        e.target.password.insertAdjacentHTML(
          "afterend",
          `<sub class="errormsg">Password must contain at least one uppercase letter, one lowercase letter, one number, and one speecial symbol (@,$,!,%,*,?,&,#).</sub>`
        );
      } else {
        auth.createUserWithEmailAndPassword(email, password, name);
      }
    });
  // Sign in with Google
  document.getElementById("googleLoginBtn")?.addEventListener("click", () => {
    auth.signInWithGoogle();
  });

  auth.onAuthStateChanged((user) => {
    // console.log("auth changed");
    if (user) {
      // console.log("user");
      authModal.hide();
      if(!user.isAnonymous) showLogoutBtn();
      // document.getElementById("status").innerHTML = `
      //     ID: ${user.uid}<br>
      //     Anonymous: ${user.isAnonymous}<br>
      //     Name: ${user.displayName || user.providerData[0]?.displayName}<br>
      //     Email: ${user.email}<br>
      //     Email Verified: ${user.emailVerified}
      //   `;
      db.initialize(user.uid);
      db.updateDOM();
    } else {
      // console.log('no user')
      // document.getElementById("status").innerText = "Not logged in.";
      db.uninitialize();
      // auth.signInAnonymously();
      // return;
    }
    auth.getRedirectResult();
  });

  document.getElementById("progress_select")?.addEventListener("change", async (e) => {
    // console.log(auth.currentUser);
    if(!auth.currentUser) await auth.signInAnonymously();
    db.updateProgress( e.target.name, e.target.value );
  });
});
