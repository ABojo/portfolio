//setup theme toggle
(function () {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeToggleButton = document.querySelector(".theme-toggle__button");
  const storageKey = "saved-theme";

  function toggleDarkMode() {
    document.documentElement.classList.toggle("dark");
    themeToggle.classList.toggle("theme-toggle--enabled");
    themeToggle.setAttribute("aria-checked", themeToggle.getAttribute("aria-checked") === "true" ? "false" : "true");
  }

  function saveTheme(newTheme) {
    localStorage.setItem(storageKey, newTheme);
  }

  function toggleSavedTheme() {
    localStorage.getItem(storageKey) === "light" ? saveTheme("dark") : saveTheme("light");
  }

  themeToggleButton.addEventListener("click", () => {
    toggleDarkMode();
    toggleSavedTheme();
  });
})();

//setup navigation
(function () {
  const navigation = document.querySelector(".header__nav");
  const navToggle = document.querySelector(".header__nav-toggle");
  const navLinks = document.querySelectorAll(".header__link");
  const sections = document.querySelectorAll("section");

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
})();

//setup contact form
(function () {
  const formElement = document.querySelector(".form");
  const formSubmit = document.querySelector(".form__submit");

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

  function toggleLoading() {
    formElement.classList.toggle("form--loading");
    formSubmit.disabled = !formSubmit.disabled;
  }

  function markAsSubmitted() {
    formElement.classList.add("form--submitted");
    formSubmit.disabled = true;
  }

  function showError() {
    formElement.classList.add("form--error");
  }

  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    toggleLoading();

    const response = await submitContactData(formData);

    toggleLoading();

    if (response.ok) {
      markAsSubmitted();
    } else {
      showError();
    }
  });
})();
