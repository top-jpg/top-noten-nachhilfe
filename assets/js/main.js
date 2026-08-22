(function () {
  "use strict";

  /* Sticky header shadow on scroll */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  if (toggle && mobileNav) {
    var closeIcon =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';
    var openIcon = toggle.innerHTML;

    var setOpen = function (open) {
      mobileNav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.innerHTML = open ? closeIcon : openIcon;
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", function () {
      setOpen(!mobileNav.classList.contains("is-open"));
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setOpen(false);
      });
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el, i) {
      el.style.setProperty("--i", i % 6);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Contact form -> mailto (no backend required) */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var statusEl = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var grade = (data.get("grade") || "").toString().trim();
      var subject = (data.get("subject") || "").toString().trim();
      var mode = (data.get("mode") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        if (statusEl) {
          statusEl.textContent = "Bitte fülle mindestens Name, E-Mail und Nachricht aus.";
          statusEl.className = "form-status is-visible form-status--error";
        }
        return;
      }

      var bodyLines = [
        "Name: " + name,
        "E-Mail: " + email,
        phone ? "Telefon: " + phone : null,
        grade ? "Klasse: " + grade : null,
        subject ? "Gewünschtes Fach: " + subject : null,
        mode ? "Gewünschte Unterrichtsform: " + mode : null,
        "",
        "Nachricht:",
        message,
      ].filter(function (l) {
        return l !== null;
      });

      var mailto =
        "mailto:info@top-noten-nachhilfe.de" +
        "?subject=" +
        encodeURIComponent("Nachhilfe-Anfrage von " + name) +
        "&body=" +
        encodeURIComponent(bodyLines.join("\n"));

      if (statusEl) {
        statusEl.textContent =
          "Dein E-Mail-Programm öffnet sich mit der ausgefüllten Anfrage. Bitte sende die E-Mail dort ab, damit sie bei uns ankommt.";
        statusEl.className = "form-status is-visible form-status--ok";
      }

      window.location.href = mailto;
    });
  }

  /* Current year in footer */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
