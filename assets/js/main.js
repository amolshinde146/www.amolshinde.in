/* Amol Shinde — Portfolio · main.js (no dependencies) */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;

  /* ---------- Theme ---------- */
  var toggle = doc.querySelector(".theme-toggle");
  var THEME_KEY = "asi-theme";
  var stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch (e) { /* private mode */ }
  var initial = stored || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    if (toggle) toggle.setAttribute("aria-pressed", String(mode === "light"));
  }
  setTheme(initial);

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      setTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* noop */ }
    });
  }

  /* ---------- Header border on scroll ---------- */
  var header = doc.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var navToggle = doc.querySelector(".nav-toggle");
  var menu = doc.querySelector(".mobile-menu");

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  // If focus was inside the menu when it closed (e.g. Escape), hand focus back to the toggle
  function closeMenuAndRestoreFocus() {
    var hadFocus = menu && menu.contains(doc.activeElement);
    closeMenu();
    if (hadFocus && navToggle) navToggle.focus();
  }

  if (navToggle && menu) {
    navToggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    doc.querySelectorAll(".mobile-menu a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenuAndRestoreFocus();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = [].slice.call(doc.querySelectorAll(".reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    var fmt = function (n) { return n.toLocaleString("en-IN"); };
    if (reduceMotion) { el.textContent = fmt(target); return; }
    var dur = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counters = [].slice.call(doc.querySelectorAll("[data-count]"));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    counters.forEach(animateCount);
  } else {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Footer year ---------- */
  doc.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
