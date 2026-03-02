//site loader start
window.addEventListener("load", function () {
  document.getElementById("loader").classList.add("fade");
});
//site loader end








document.addEventListener("DOMContentLoaded", function () {
  var heroVideo = document.getElementById("hero-video");
  if (heroVideo) {
    heroVideo.playbackRate = 0.5;
    heroVideo.play().catch(function () {});
  }

  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  var hamburger = document.querySelector(".hamburger");

  function isMobile() {
    return window.matchMedia("(max-width: 1024px)").matches;
  }

  function updateBodyScroll() {
    if (isMobile() && navToggle && navToggle.checked) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }

  if (navLinks) {
    var navAnchors = navLinks.querySelectorAll("a");
    for (var i = 0; i < navAnchors.length; i++) {
      navAnchors[i].addEventListener("click", function () {
        if (navToggle && isMobile()) {
          navToggle.checked = false;
          updateBodyScroll();
        }
      });
    }
  }

  document.addEventListener("click", function (e) {
    if (!navToggle || !isMobile()) return;
    if (!navToggle.checked) return;
    if (navLinks && navLinks.contains(e.target)) return;
    if (hamburger && hamburger.contains(e.target)) return;
    if (e.target === navToggle) return;
    navToggle.checked = false;
    updateBodyScroll();
  });

  if (navToggle) {
    navToggle.addEventListener("change", function () {
      navToggle.setAttribute("aria-expanded", navToggle.checked ? "true" : "false");
      updateBodyScroll();
    });
    navToggle.setAttribute("aria-expanded", "false");
  }

  window.addEventListener("resize", function () {
    if (!isMobile() && navToggle) {
      navToggle.checked = false;
      updateBodyScroll();
    }
  });
});



