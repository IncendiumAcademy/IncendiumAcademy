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

  async updateDOM() {
    console.log("DOM updated");

    let progress = (await this.db.collection("lessons").get()).docs.reduce(
      (docs, doc) => {
        docs[doc.id] = doc.data().progress
        return docs
      },
      {}
    );
    // console.log(progress);
    Object.entries(progress).forEach(([lessonID, progress]) => {
      // Sets sidebar progress
      document.querySelector(
        `#site-nav .progress[name="${this._convertID(lessonID)}"]`
      ).className = `progress ${progress}`;

      if (lessonID == this._convertPath(window.location.pathname)) {
        // Sets dropdown progress
        let options = document
          .getElementById("progress_select")
          .getElementsByTagName("option");
        for (let x = 0; x < options.length; x++) {
          let option = options[x];
          // console.log(option.value)
          if (option.value === progress) {
            option.setAttribute("selected", "selected");
          }
        }
      }
    })

    // this.db
    //   .collection("lessons")
    //   .get()
    //   .then((querySnapshot) =>
    //     querySnapshot.forEach((docSnapshot) => {
    //       if (docSnapshot.exists) {
    //         let progress = docSnapshot.data()
    //         console.log(`Snapshot exists`, progress)
    //         console.log("Current progress: ", progress.progress)
    //         document.querySelector(
    //           `#site-nav .progress[name="${this._convertID(docSnapshot.id)}"]`
    //         ).className = `progress ${progress.progress}`
    //         let options = document
    //           .getElementById("progress_select")
    //           .getElementsByTagName("option")
    //         for (let x = 0; x < options.length; x++) {
    //           let option = options[x]
    //           console.log(option.value)
    //           if (option.value === progress.progress) {
    //             option.setAttribute("selected", "selected")
    //           }
    //         }
    //       } else {
    //         console.log(`Snapshot does not exist.`)
    //         document
    //           .querySelectorAll("input[type=checkbox]")
    //           .forEach((checkbox) => (checkbox.checked = false))
    //       }
    //     })
    //   )
    //   .catch((error) => {
    //     console.error(error.code, error.message)
    //   })
  }

  updateProgress(name, progress) {
    this.db
      .collection("lessons")
      .doc(this._convertPath(name))
      .set({ progress: progress }, { merge: true })
      .then(() => this.updateDOM());
  }

  delete() {
    this.db.delete();
  }

  _convertPath(path) {
    let new_path = path.split("/");
    return new_path.slice(2, new_path.length - 1).join("\\");
  }

  _convertID(id) {
    return "/content/" + id.replace(/\\/g, "/") + "/";
  }
}

export const db = new _Database();
