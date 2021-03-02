window.addEventListener("load", () => {
  document.querySelectorAll(".team-list article .image-container").forEach((member) => {
    member.addEventListener("click", () => {
      member.classList.toggle("active")
    })
  })
})
