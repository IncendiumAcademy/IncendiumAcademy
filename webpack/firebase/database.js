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
  }

  /**
   * Uninitializes DB
   */
  uninitialize() {
    this.db = null;
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

  async updateSidebar() {
    let subject = window.location.pathname.split("/")[2];

    let progress = (
      await this.db
        .collection("lessons")
        .where("__name__", ">=", subject)
        .where(
          "__name__",
          "<",
          subject.slice(0, -1) +
            String.fromCharCode(subject.charCodeAt(subject.length - 1) + 1)
        )
        .get()
    ).docs.reduce((docs, doc) => {
      docs[doc.id] = doc.data().progress
      return docs
    }, {})

    // object to store the completion %s
    let completion_percentages = {}

    // calculates how much each is worth when calculating percentages
    let formula = {
      "not-started": 0,
      "in-progress": 0,
      "complete": 1
    }

    Object.entries(progress).forEach(([lessonID, progress]) => {

      let lesson_categories = this._convertID(lessonID).split('/').slice(0, -2).join('/') + "/"

      // Calculates a completion score for lesson
      if (typeof completion_percentages[lesson_categories] === "undefined"){
        completion_percentages[lesson_categories] = {
          sum: formula[progress],
        }
      } else {
        completion_percentages[lesson_categories]["sum"] += formula[progress]
      }

      // Sets sidebar progress
      document.querySelector(
        `#site-nav .progress[name="${this._convertID(lessonID)}"]`
      )?.classList.add(progress);

      // If on the lesson page
      if (lessonID === this._convertPath(window.location.pathname)) {

        // Sets dropdown progress
        let options = document
          .getElementById("progress_select")
          .getElementsByTagName("option");

        for (let x = 0; x < options.length; x++) {
          let option = options[x];
          if (option.value === progress) {
            option.setAttribute("selected", "selected");
          }
        }
      }
    })

    // Set totals for each category
    Object.entries(completion_percentages).forEach(
      ([key, value]) =>
        (value.total = document.querySelectorAll(
          `#site-nav #nav-list-head .nav-list-item a[href="${key}"] + .nav-list .nav-list-item`
        ).length)
    );


    // Updates the progress % circles to reflect the progress completed for each category
    for(let key in completion_percentages){
      let circle = document.querySelector(`#site-nav #nav-list-head .nav-list-item .progress-ring__circle[name="${key}"]`)
      if(circle == null) continue

      let slice = completion_percentages[key]
      let percent = (slice['sum'] / slice['total']) * 100

      if(percent === 100){
        circle.classList.add("complete")
      }else{
        circle.style.setProperty("--percent", `${percent}`)
      }

    }
  }

  updateProgress(name, progress) {
    this.db
      .collection("lessons")
      .doc(this._convertPath(name))
      .set({ progress: progress }, { merge: true })
      .then(() => this.updateSidebar());
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
