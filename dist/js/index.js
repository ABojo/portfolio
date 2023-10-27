const navigation = document.querySelector(".header__nav");
const navToggle = document.querySelector(".header__nav-toggle");
const navLinks = document.querySelectorAll(".header__link");
const sections = document.querySelectorAll("section");

navToggle.addEventListener("click", () => {
  navigation.classList.toggle("header__nav--open");
  navToggle.setAttribute("aria-expanded", navToggle.getAttribute("aria-expanded") === "true" ? false : true);
});

function getCurrentSectionId() {
  let lastSectionId = null;

  for (let i = 0; i < sections.length; i++) {
    if (window.scrollY >= sections[i].offsetTop - 1) {
      lastSectionId = sections[i].id;
    }
  }

  return lastSectionId;
}

function syncNavStyling(activeId) {
  navLinks.forEach((navLink) => {
    if (navLink.href.includes(activeId)) {
      navLink.classList.add("header__link--active");
    } else {
      navLink.classList.remove("header__link--active");
    }
  });
}

window.addEventListener("scroll", () => {
  syncNavStyling(getCurrentSectionId());
});
