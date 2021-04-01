/*
 * This file deals with all things relating to the progress indicators in the sidebar.
 */

import { auth } from "./firebase/auth";
import { db } from "./firebase/database";

// Initialize database if logged in and update sidebar
auth.onAuthStateChanged((user) => {
  if (user) {
    db.initialize(user.uid);
    db.updateSidebar();
  } else {
    db.uninitialize();
  }
});

// When the DOM loads...
window.addEventListener("load", () => {
  const progressSelectEl = document.getElementById("progress_select");

  // Update database when progress changes
  progressSelectEl.addEventListener("change", async (e) => {
    if (!auth.currentUser) await auth.signInAnonymously();
    db.updateProgress(e.target.name, e.target.value);
  });
});
