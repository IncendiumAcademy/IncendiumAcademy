/*
 * This file registers all necessary event handlers for the dropdown, hamburger menu,
 * and authentication forms.
 */

import { auth } from "../firebase/auth";
import Modal from "./modal";

auth.onAuthStateChanged((user) => {
  if (user && !user.isAnonymous) document.body.classList.add("logged-in");
  auth.getRedirectResult();
});

window.addEventListener("load", () => {
  const dropdownEl = document.getElementById("dropdown");
  const authModal = new Modal("authModal");
  const loginForm = authModal.modal.querySelector("#loginForm");
  const signupForm = authModal.modal.querySelector("#signupForm");
  const googleBtn = document.getElementById("googleLoginBtn");

  // Open dropdown on close...
  dropdownEl.addEventListener("click", (e) => {
    dropdownEl.classList.toggle("active");
  });
  // ...And close it when you click away
  window.addEventListener("click", (e) => {
    if (e.target.closest("#dropdown") == null)
      dropdownEl.classList.remove("active");
  });

  // Login submit event
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    authModal.modal.querySelectorAll(".errormsg").forEach((el) => el.remove());

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

  // Signup submit event
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    authModal.modal.querySelectorAll(".errormsg").forEach((el) => el.remove());

    // Validate
    if (email === "" || !auth.validateEmail(email)) {
      e.target.email.insertAdjacentHTML(
        "afterend",
        `<sub class="errormsg">Please enter a valid email address.</sub>`
      );
    } else if (password === "" || !auth.validatePassword(password)) {
      e.target.password.insertAdjacentHTML(
        "afterend",
        `<sub class="errormsg">Password must contain at least one uppercase letter, one lowercase letter, one number, and one speecial symbol (@,$,!,%,*,?,&,#).</sub>`
      );
    } else {
      auth.createUserWithEmailAndPassword(email, password, name);
    }
  })

  // Sign in with Google
  googleBtn.addEventListener("click", () => auth.signInWithGoogle());

  // Logout on click
  document.querySelectorAll("#logoutBtn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      auth.signOut().then(() => {
        window.location.reload();
      })
    })
  );
});