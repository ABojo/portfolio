const navigation = document.querySelector(".header__nav");
const navToggle = document.querySelector(".header__nav-toggle");
const navLinks = document.querySelectorAll(".header__link");

const sections = document.querySelectorAll("section");

const formElement = document.querySelector(".form");
const formSubmit = document.querySelector(".form__submit");

function toggleMobileNav() {
  navigation.classList.toggle("header__nav--open");
  navToggle.setAttribute("aria-expanded", navToggle.getAttribute("aria-expanded") === "true" ? false : true);
}

function mobileNavIsOpen() {
  return navigation.classList.contains("header__nav--open");
}

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

async function submitContactData(formData) {
  const response = await fetch("https://formspree.io/f/xjvqlllw", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  return response;
}

const formController = {
  toggleLoading: function () {
    formElement.classList.toggle("form--loading");
    formSubmit.disabled = !formSubmit.disabled;
  },
  markAsSubmitted: function () {
    formElement.classList.add("form--submitted");
    formSubmit.disabled = true;
  },
  showError: function () {
    formElement.classList.add("form--error");
  },
};

navToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMobileNav();
});

document.body.addEventListener("click", (e) => {
  if (mobileNavIsOpen()) {
    toggleMobileNav();
  }
});

window.addEventListener("scroll", () => {
  syncNavStyling(getCurrentSectionId());
});

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  formController.toggleLoading();

  const response = await submitContactData(formData);

  formController.toggleLoading();

  if (response.ok) {
    formController.markAsSubmitted();
  } else {
    formController.showError();
  }
});
