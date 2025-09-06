const main = document.querySelector("main.main");
const footer = document.getElementById("footer");

function setupNavToggle() {
  const navigation = document.getElementById("navigation");
  const navigationToggleBtn = document.querySelector(".navigation-toggle");

  if (!navigation || !navigationToggleBtn) return;

  navigationToggleBtn.addEventListener("click", function () {
    togglenavigation();

    if (navigation.classList.contains("navigation-show")) {
      navigationToggleBtn.classList.remove("bi-list");
      navigationToggleBtn.classList.add("bi-x");
    } else {
      navigationToggleBtn.classList.add("bi-list");
      navigationToggleBtn.classList.remove("bi-x");
    }
  });

  handleResponsiveNavigation();

  window.addEventListener("resize", handleResponsiveNavigation);
}

function handleResponsiveNavigation() {
  const navigation = document.getElementById("navigation");
  if (!navigation) return;

  if (window.innerWidth >= 800) {
    navigation.classList.add("navigation-show");
    navigation.style.left = "0";
    if (main) main.style.marginLeft = "300px";
    if (footer) footer.style.marginLeft = "300px";
  } else {
    navigation.classList.remove("navigation-show");
    navigation.style.left = "-300px";
    if (main) main.style.marginLeft = "0px";
    if (footer) footer.style.marginLeft = "0px";
  }
}

function togglenavigation() {
  const navigation = document.getElementById("navigation");
  if (!navigation) return;

  const isShown = navigation.classList.contains("navigation-show");

  if (isShown) {
    navigation.classList.remove("navigation-show");
    navigation.style.left = "-300px";
    if (main)  main.style.marginLeft  = "0";
    if (footer) footer.style.marginLeft = "0";
  } else {
    navigation.classList.add("navigation-show");
    navigation.style.left = "0";
    if (main)  main.style.marginLeft  = "300px";
    if (footer) footer.style.marginLeft = "300px";
  }
}


// Load navigation.html into the #navigation-include div
// and initialize toggle after it's loaded

document.addEventListener("DOMContentLoaded", function () {
  const navInclude = document.getElementById("navigation-include");
  if (navInclude) {
    fetch("navigation.html")
      .then((response) => response.text())
      .then((html) => {
        navInclude.innerHTML = html;
        if (typeof applyConfig === "function") {
          applyConfig();
        } else if (typeof applySiteConfig === "function") {
          applySiteConfig();
        }
        setupNavToggle();
        document.dispatchEvent(new Event("navigationLoaded"));
      });
  }
  const footerInclude = document.getElementById("footer-include");
  if (footerInclude) {
    fetch("footer.html")
      .then((response) => response.text())
      .then((html) => {
        footerInclude.innerHTML = html;
        if (typeof applyConfig === "function") {
          applyConfig();
        } else if (typeof applySiteConfig === "function") {
          applySiteConfig();
        }
        // Remove preloader after footer is injected (if present)
        const preloader = document.getElementById("preloader");
        if (preloader) preloader.remove();
        document.dispatchEvent(new Event("footerLoaded"));
      });
  }

  // Scroll-to-top button logic (use .active class for visibility)
  let scrollBtn = document.getElementById("scroll-top");
  if (!scrollBtn) {
    scrollBtn = document.createElement("a");
    scrollBtn.href = "#";
    scrollBtn.id = "scroll-top";
    scrollBtn.className =
      "scroll-top d-flex align-items-center justify-content-center";
    scrollBtn.innerHTML = '<i class="bi bi-arrow-up-short"></i>';
    document.body.appendChild(scrollBtn);
  }

  // Show/hide button using .active class
  function toggleScrollTop() {
    if (window.scrollY > 100) {
      scrollBtn.classList.add("active");
    } else {
      scrollBtn.classList.remove("active");
    }
  }
  window.addEventListener("scroll", toggleScrollTop);
  window.addEventListener("load", toggleScrollTop);

  // Scroll to top on click
  scrollBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Scrollspy for nav links
(function () {
  function navmenuScrollspy() {
    const navmenulinks = document.querySelectorAll(".navmenu a");
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();
