(function () {
  "use strict";

  const OPEN_CLASS = "jsopen";
  const ICON_OPEN_CLASS = "isopen";

  function init() {
    const control = document.querySelector(".nav_close");
    const drawer = document.getElementById("nav_menu");
    if (!control || !drawer) return;

    const firstSvg = control.querySelector("svg");
    if (!firstSvg) return;

    function closeMenu() {
      document.body.classList.remove(OPEN_CLASS);
      firstSvg.classList.remove(ICON_OPEN_CLASS);
      control.setAttribute("aria-expanded", "false");
      control.setAttribute("aria-label", "Open menu");
    }

    function openMenu() {
      document.body.classList.add(OPEN_CLASS);
      firstSvg.classList.add(ICON_OPEN_CLASS);
      control.setAttribute("aria-expanded", "true");
      control.setAttribute("aria-label", "Close menu");
    }

    function isOpen() {
      return document.body.classList.contains(OPEN_CLASS);
    }

    function toggleMenu() {
      if (isOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    control.addEventListener("click", function (e) {
      e.preventDefault();
      toggleMenu();
    });

    document.body.addEventListener("click", function (e) {
      if (!isOpen()) return;
      const target = e.target;
      if (!drawer.contains(target) && !control.contains(target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) {
        closeMenu();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
