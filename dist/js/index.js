const navigation = document.querySelector(".header__nav");
const navToggle = document.querySelector(".header__nav-toggle");

navToggle.addEventListener("click", () => {
  navigation.classList.toggle("header__nav--open");
  navToggle.setAttribute("aria-expanded", navToggle.getAttribute("aria-expanded") === "true" ? false : true);
});
