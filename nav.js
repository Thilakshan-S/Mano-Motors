// nav.js — handles hamburger toggle and outside-click closing
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("navToggle");
  var panel = document.getElementById("primaryMenu");
  var overlay = document.getElementById("navOverlay");

  if (!btn || !panel || !overlay) return;

  function openMenu() {
    panel.classList.add("is-open");
    overlay.classList.add("is-visible");
    btn.setAttribute("aria-expanded", "true");
    panel.focus();
    document.documentElement.style.overflow = "hidden";
  }

  function closeMenu() {
    panel.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    btn.setAttribute("aria-expanded", "false");
    btn.focus();
    document.documentElement.style.overflow = "";
  }

  btn.addEventListener("click", function (evt) {
    evt.stopPropagation();
    var willOpen = !panel.classList.contains("is-open");
    panel.classList.toggle("is-open", willOpen);
    overlay.classList.toggle("is-visible", willOpen);
    btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    if (willOpen) {
      panel.focus();
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  });

  // Prevent clicks inside the panel from closing
  panel.addEventListener("click", function (evt) {
    evt.stopPropagation();
  });

  // Click overlay closes
  overlay.addEventListener("click", function (evt) {
    evt.stopPropagation();
    closeMenu();
  });
  overlay.addEventListener(
    "touchstart",
    function (evt) {
      evt.stopPropagation();
      closeMenu();
    },
    { passive: true },
  );

  // Click anywhere else closes
  document.addEventListener("click", function (e) {
    if (panel.classList.contains("is-open")) closeMenu();
  });

  // touchstart for mobile outside clicks
  document.addEventListener(
    "touchstart",
    function (e) {
      if (!panel.classList.contains("is-open")) return;
      var t = e.target;
      if (panel.contains(t) || btn.contains(t) || overlay.contains(t)) return;
      closeMenu();
    },
    { passive: true },
  );

  // Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("is-open")) closeMenu();
  });

  // Reset on resize to desktop
  window.addEventListener("resize", function () {
    if (
      window.matchMedia("(min-width:769px)").matches &&
      panel.classList.contains("is-open")
    ) {
      panel.classList.remove("is-open");
      overlay.classList.remove("is-visible");
      btn.setAttribute("aria-expanded", "false");
      document.documentElement.style.overflow = "";
    }
  });
});
