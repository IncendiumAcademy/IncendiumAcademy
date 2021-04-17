/** Class repsenting a modal. */
export default class Modal {
  /**
   * Create a modal.
   * @param {String} id The id of the modal element.
   */
  constructor(id) {
    this.modal = document.getElementById(id);

    this.modal.querySelector(".close").onclick = () => {
      this.hide();
    };
    window.addEventListener("click", (e) => {
      if (e.target === this.modal) this.hide();
    });

    document.querySelectorAll(`*[href='#${id}']`).forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        this.show(e.target.dataset.tab);
      });
    });
  }

  /**
   * Show the modal and open the tagb with id tabID.
   * @param {String} tabID The id of the tab to show in the modal.
   */
  show(tabID) {
    this.modal.classList.add('visible');
    this.modal.querySelector(`.tab-content > #${tabID}`).style.display =
      "block";
    this.modal.querySelector(`.tab-content > :not(#${tabID})`).style.display =
      "none";
    this.modal
      .querySelector(`.tabs a[data-tab='${tabID}']`)
      .classList.add("active");
    this.modal
      .querySelector(`.tabs a:not([data-tab='${tabID}'])`)
      .classList.remove("active");
  }

  /**
   * Hide the modal.
   */
  hide() {
    this.modal.classList.remove('visible');
    this.modal.querySelectorAll("input").forEach((input) => (input.value = ""));
    this.modal.querySelectorAll(".errormsg").forEach((el) => el.remove());
  }
}
