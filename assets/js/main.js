(function () {
"use strict";

/* Sticky header shadow on scroll */
var header = document.querySelector(".site-header");

if (header) {
var onScroll = function () {
header.classList.toggle("is-scrolled", window.scrollY > 8);
};

```
onScroll();

window.addEventListener("scroll", onScroll, {
  passive: true
});
```

}

/* Mobile nav toggle */
var toggle = document.querySelector(".nav-toggle");
var mobileNav = document.querySelector(".mobile-nav");

if (toggle && mobileNav) {
var closeIcon =
'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
'<line x1="5" y1="5" x2="19" y2="19"/>' +
'<line x1="19" y1="5" x2="5" y2="19"/>' +
"</svg>";

```
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
  if (e.key === "Escape") {
    setOpen(false);
  }
});
```

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
{
threshold: 0.15,
rootMargin: "0px 0px -40px 0px"
}
);

```
revealEls.forEach(function (el, i) {
  el.style.setProperty("--i", i % 6);
  io.observe(el);
});
```

} else {
revealEls.forEach(function (el) {
el.classList.add("is-visible");
});
}

/* Contact form -> mailto */
var form = document.querySelector("[data-contact-form]");

if (form) {
var statusEl = form.querySelector(".form-status");

```
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
      statusEl.textContent =
        "Bitte fülle mindestens Name, E-Mail und Nachricht aus.";

      statusEl.className =
        "form-status is-visible form-status--error";
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
    message
  ].filter(function (line) {
    return line !== null;
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

    statusEl.className =
      "form-status is-visible form-status--ok";
  }

  window.location.href = mailto;
});
```

}

/* Google Maps -> erst nach Klick laden */
var mapConsent = document.querySelector("[data-map-consent]");

if (mapConsent) {
var loadMapBtn = mapConsent.querySelector("[data-load-map]");

```
if (loadMapBtn) {
  loadMapBtn.addEventListener("click", function () {

    /* Google Maps iframe erstellen */
    var iframe = document.createElement("iframe");

    iframe.src =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25142.39322786305!2d6.365775868192126!3d51.25811965806232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8a97d88344d01%3A0xa584ad3fc61050b5!2sViersen!5e1!3m2!1sde!2sde!4v1787242374630!5m2!1sde!2sde";

    iframe.loading = "lazy";

    iframe.referrerPolicy =
      "strict-origin-when-cross-origin";

    iframe.title =
      "Standort von Top-Noten Nachhilfe in Viersen";

    iframe.setAttribute(
      "aria-label",
      "Kartenausschnitt Standort Viersen"
    );

    /* Größe des iframe */
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.style.display = "block";

    /* Container für das iframe */
    var wrapper = document.createElement("div");

    wrapper.className =
      "map-frame reveal is-visible";

    wrapper.appendChild(iframe);

    /* Platzhalter durch Karte ersetzen */
    mapConsent.replaceWith(wrapper);
  });
}
```

}

/* Current year in footer */
var yearEl = document.querySelector("[data-year]");

if (yearEl) {
yearEl.textContent = new Date().getFullYear();
}

})();
