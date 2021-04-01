window.addEventListener("load", () => {
  const menuBtn = document.getElementById("home-menu-button");

  // Open hamburger menu on click
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    menuBtn.parentNode.classList.toggle("open");
  });
});
