/* Header, footer and tab-bar behaviour, ported from the store chrome (no framework, no deps). */
(function () {
  var root = document.documentElement;
  var header = document.getElementById("siteHeader");

  /* header: pill state after scrolling */
  if (header) {
    var on = false;
    var onScroll = function () {
      var y = window.scrollY;
      if (!on && y > 40) on = true;
      else if (on && y < 8) on = false;
      header.classList.toggle("scrolled", on);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* search: hide the rolling hint while typing */
  var input = document.getElementById("searchInput");
  var hint = document.getElementById("searchScrollText");
  if (input && hint) {
    var upd = function () { hint.style.opacity = document.activeElement === input || input.value ? "0" : "1"; };
    ["focus", "blur", "input"].forEach(function (ev) { input.addEventListener(ev, upd); });
  }

  /* voice search where the browser supports it */
  var mic = document.querySelector(".mic-btn");
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (mic && SR && input) {
    mic.hidden = false;
    mic.addEventListener("click", function () {
      var r = new SR();
      r.lang = root.lang || "hi-IN";
      r.onresult = function (e) { input.value = e.results[0][0].transcript; input.form && input.form.submit(); };
      r.start();
    });
  }

  /* compact search on small headers */
  var search = document.querySelector(".site-header .header-search");
  if (search && header) {
    search.addEventListener("click", function (e) {
      if (window.innerWidth > 720 || search.classList.contains("open")) return;
      e.preventDefault();
      search.classList.add("open");
      header.classList.add("search-open");
      input && input.focus();
    });
    var close = search.querySelector(".search-close");
    close && close.addEventListener("click", function (e) {
      e.stopPropagation();
      search.classList.remove("open");
      header.classList.remove("search-open");
    });
  }

  /* theme toggle (same storage key as the store) */
  var tbtn = document.getElementById("themeToggle");
  var syncTheme = function () {
    var dark = root.getAttribute("data-theme") !== "light";
    document.querySelectorAll(".logo img[data-light]").forEach(function (img) {
      img.src = dark ? img.getAttribute("data-dark") : img.getAttribute("data-light");
    });
    if (tbtn) {
      var label = dark ? tbtn.getAttribute("data-label-light") : tbtn.getAttribute("data-label-dark");
      tbtn.setAttribute("aria-label", label);
      tbtn.title = label;
    }
  };
  tbtn && tbtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("rk-theme", next); } catch (e) {}
    syncTheme();
  });
  syncTheme();

  /* burger menu */
  var burger = document.querySelector(".pill-btn--burger");
  var menu = document.getElementById("mobileMenu");
  if (burger && menu && header) {
    burger.addEventListener("click", function () {
      var open = menu.hidden;
      menu.hidden = !open;
      burger.setAttribute("aria-expanded", String(open));
      header.classList.toggle("menu-open", open);
    });
  }

  /* footer: "show more" on phones */
  var more = document.querySelector(".footer-more");
  var footer = document.querySelector(".site-footer");
  more && footer && more.addEventListener("click", function () {
    var open = footer.classList.toggle("is-more");
    more.setAttribute("aria-expanded", String(open));
  });

  /* scroll-to-top */
  var top = document.querySelector(".scroll-top");
  if (top) {
    var phone = window.matchMedia("(max-width: 720px)");
    var tTop = function () {
      var atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 24;
      top.classList.toggle("visible", phone.matches ? atEnd : window.scrollY > 30);
    };
    tTop();
    window.addEventListener("scroll", tTop, { passive: true });
    window.addEventListener("resize", tTop);
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* tab bar: slide in after the first scroll on tablets (always on for phones via CSS) */
  var bar = document.querySelector(".mobile-tabbar");
  if (bar) {
    var tBar = function () { bar.classList.toggle("is-visible", window.scrollY > 60); };
    tBar();
    window.addEventListener("scroll", tBar, { passive: true });
  }

  /* newsletter: posts to data-endpoint when configured, otherwise opens a pre-filled email */
  document.querySelectorAll("form[data-newsletter]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = f.querySelector("input[type=email]").value;
      var note = f.parentNode.querySelector(".newsletter-note");
      var endpoint = f.getAttribute("data-endpoint");
      var done = function () { if (note) note.textContent = f.getAttribute("data-thanks"); f.reset(); };
      if (endpoint) {
        fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email, source: "kitab-utsav" }) }).then(done, done);
      } else {
        window.location.href = "mailto:" + f.getAttribute("data-email") + "?subject=" + encodeURIComponent("Kitab Utsav newsletter") + "&body=" + encodeURIComponent("Please add " + email + " to the Kitab Utsav newsletter.");
      }
    });
  });

  /* countdowns */
  document.querySelectorAll("[data-countdown]").forEach(function (el) {
    var start = new Date(el.getAttribute("data-start")).getTime();
    var end = new Date(el.getAttribute("data-end")).getTime();
    var cells = el.querySelectorAll("[data-unit]");
    var live = el.parentNode.querySelector("[data-live]");
    var tick = function () {
      var now = Date.now();
      if (now >= start && now <= end) { el.hidden = true; if (live) live.hidden = false; return; }
      if (now > end) { el.hidden = true; return; }
      var s = Math.floor((start - now) / 1000);
      var v = { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
      cells.forEach(function (c) { c.textContent = String(v[c.getAttribute("data-unit")]).padStart(2, "0"); });
    };
    tick();
    setInterval(tick, 1000);
  });

  /* programme day tabs */
  document.querySelectorAll("[data-tabs]").forEach(function (wrap) {
    var tabs = wrap.querySelectorAll("[role=tab]");
    var select = function (tab) {
      tabs.forEach(function (t) {
        var sel = t === tab;
        t.setAttribute("aria-selected", String(sel));
        t.tabIndex = sel ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !sel;
      });
    };
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!k) return;
        var n = tabs[(i + k + tabs.length) % tabs.length];
        n.focus(); select(n);
      });
    });
    wrap.classList.add("is-tabbed");
    select(wrap.querySelector("[role=tab][aria-selected=true]") || tabs[0]);
  });
})();
