window.addEventListener("load", () => {
  const sidebarGraphicEl = document.getElementById("sidebar-graphic")

  console.log(sidebarGraphicEl.offsetWidth, sidebarGraphicEl.offsetHeight)

  sidebarGraphicEl.addEventListener("mousemove", (e) => {
    let deltaX = (e.offsetX / sidebarGraphicEl.offsetWidth) * 30 - 15
    let deltaY = (e.offsetY / sidebarGraphicEl.offsetHeight) * 30 - 15
    sidebarGraphicEl.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`
  })
  sidebarGraphicEl.addEventListener("mouseleave", () => {
    sidebarGraphicEl.style.transform = ""
  })
})
