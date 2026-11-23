/*
 * Site-wide motion: scroll reveals, hero depth, count-up numbers, card tilt, the photo viewer
 * and the speaker-name marquee. Plain script, no dependencies, loaded on every page.
 *
 * Only transform/translate and opacity animate, so phones stay smooth. Visitors who ask for
 * reduced motion get no reveals, parallax, tilt, count-up or marquee drift; the photo viewer
 * still works for them, without the zoom-in.
 */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var hi = (root.lang || "").indexOf("hi") === 0;
  window.__motion = true;

  var inView = function (els, cb, opts) {
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { cb(el); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { io.unobserve(en.target); cb(en.target); } });
    }, opts || { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  };

  /* 1. Scroll reveal: things fade up as they enter, siblings one after another. */
  var REVEAL = [
    ".section-head", ".stack .ecard", ".mani__in > *", ".btotals li", ".big", ".tix__item", ".names .kick",
    ".names__list > li", ".names .marquee", ".invite", ".logos li", ".gallery__item", ".speaker",
    ".edition-card", ".prose > *", ".totals li", ".infobox", ".partner", ".press-item", ".faq-item",
    ".year-block", ".day-panel", ".notice",
  ].join(",");
  if (!reduce) {
    // Anything already on screen when the page opens is left alone: hiding it now would make
    // it blink, since it has already been painted.
    var fold = window.innerHeight;
    var items = Array.prototype.slice.call(document.querySelectorAll(REVEAL)).filter(function (el) {
      return !el.closest(".bhero, .page-hero, .foot") && !el.matches(".mega, .big") && el.getBoundingClientRect().top > fold;
    });
    var count = new Map();
    items.forEach(function (el) {
      var n = count.get(el.parentElement) || 0;
      count.set(el.parentElement, n + 1);
      el.style.setProperty("--rd", Math.min(n, 6) * 70 + "ms");
      el.classList.add("rv");
    });
    inView(items, function (el) {
      el.classList.add("is-in");
      // Once in place, hand the element back to its own hover transitions.
      setTimeout(function () { el.classList.remove("rv", "is-in"); }, 1000 + parseInt(el.style.getPropertyValue("--rd") || "0", 10));
    });
  }
  root.classList.add("motion-ready");

  /* 2. Hero depth: the illustration, skyline and clouds move at different rates with scroll,
        and lean a little toward the mouse on desktop. */
  var hero = document.querySelector(".bhero");
  if (hero && !reduce) {
    var target = { x: 0, y: 0 }, cur = { x: 0, y: 0 }, sy = -1, raf = 0;
    var tick = function () {
      raf = 0;
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      var y = Math.min(window.scrollY, hero.offsetHeight);
      if (y !== sy) { sy = y; hero.style.setProperty("--sy", y.toFixed(0)); }
      hero.style.setProperty("--mx", cur.x.toFixed(3));
      hero.style.setProperty("--my", cur.y.toFixed(3));
      if (Math.abs(target.x - cur.x) > 0.002 || Math.abs(target.y - cur.y) > 0.002) raf = requestAnimationFrame(tick);
    };
    var kick = function () { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("scroll", kick, { passive: true });
    if (finePointer) {
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
        kick();
      });
      hero.addEventListener("pointerleave", function () { target.x = 0; target.y = 0; kick(); });
    }
    kick();
  }

  /* 3. Numbers count up when they come into view ("16", "100+", "5000+"). */
  var nums = Array.prototype.slice.call(document.querySelectorAll(".btotals b, .totals b, .stats b, [data-count]"));
  nums = nums.filter(function (el) { return /^\s*\d[\d,]*\D*$/.test(el.textContent); });
  if (!reduce) {
    nums.forEach(function (el) {
      var txt = el.textContent.trim();
      el.dataset.final = txt;
      el.style.minWidth = txt.length + "ch";
      el.style.display = "inline-block";
      el.style.fontVariantNumeric = "tabular-nums";
      el.textContent = txt.replace(/[\d,]+/, "0");
    });
    inView(nums, function (el) {
      var txt = el.dataset.final, m = txt.match(/[\d,]+/), end = parseInt(m[0].replace(/,/g, ""), 10);
      var t0 = performance.now(), dur = Math.min(1600, 700 + end * 2);
      var step = function (now) {
        var p = Math.min(1, (now - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = txt.replace(m[0], m[0].indexOf(",") > -1 ? v.toLocaleString("en-IN") : String(v));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
  }

  /* 4. Edition cards tilt toward the mouse, with a soft light where the pointer is. */
  if (finePointer && !reduce) {
    document.querySelectorAll(".ecard, .edition-card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--ry", ((px - 0.5) * 7).toFixed(2) + "deg");
        card.style.setProperty("--rx", ((0.5 - py) * 7).toFixed(2) + "deg");
        card.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
      });
      card.addEventListener("pointerleave", function () {
        card.style.removeProperty("--rx"); card.style.removeProperty("--ry");
      });
    });
  }

  /* 5. Speaker-name marquee: drifts on its own, slows right down under the mouse or a finger,
        and only runs while it is on screen. */
  document.querySelectorAll(".marquee").forEach(function (mq) {
    if (reduce) return;
    var rows = Array.prototype.slice.call(mq.querySelectorAll(".marquee__row"));
    var state = rows.map(function (row, i) { return { row: row, x: 0, dir: i % 2 ? 1 : -1, w: 0 }; });
    var speed = 1, want = 1, on = false, last = 0;
    var measure = function () { state.forEach(function (s) { s.w = s.row.scrollWidth / 2; if (s.dir > 0) s.x = -s.w; }); };
    var frame = function (now) {
      if (!on) return;
      var dt = Math.min(64, now - (last || now)); last = now;
      speed += (want - speed) * 0.06;
      state.forEach(function (s) {
        if (!s.w) return;
        s.x += s.dir * speed * dt * 0.045;
        if (s.x <= -s.w) s.x += s.w;
        if (s.x > 0) s.x -= s.w;
        s.row.style.transform = "translate3d(" + s.x.toFixed(1) + "px,0,0)";
      });
      requestAnimationFrame(frame);
    };
    var slow = function () { want = 0.15; }, go = function () { want = 1; };
    mq.addEventListener("pointerenter", slow);
    mq.addEventListener("pointerleave", go);
    mq.addEventListener("pointerdown", slow);
    mq.addEventListener("pointerup", go);
    mq.addEventListener("pointercancel", go);
    window.addEventListener("resize", measure);
    measure();
    // The display font changes the row width once it arrives.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        on = en[0].isIntersecting; last = 0;
        if (on) requestAnimationFrame(frame);
      }).observe(mq);
    } else { on = true; requestAnimationFrame(frame); }
  });

  /* 6. Photo viewer: tap a gallery photo to see it full screen. Arrows, Esc and swipe work. */
  var grids = document.querySelectorAll(".gallery");
  if (grids.length && window.HTMLDialogElement) {
    var t = hi
      ? { close: "बंद करें", prev: "पिछली तस्वीर", next: "अगली तस्वीर", of: " / " }
      : { close: "Close", prev: "Previous photo", next: "Next photo", of: " of " };
    var dlg = document.createElement("dialog");
    dlg.className = "lb";
    dlg.setAttribute("aria-label", hi ? "तस्वीर" : "Photo");
    dlg.innerHTML =
      '<figure class="lb__fig"><img class="lb__img" alt="" /><figcaption class="lb__cap"><span class="lb__text"></span><span class="lb__meta"></span></figcaption></figure>' +
      '<button type="button" class="lb__btn lb__close" aria-label="' + t.close + '">&times;</button>' +
      '<button type="button" class="lb__btn lb__prev" aria-label="' + t.prev + '">&#8249;</button>' +
      '<button type="button" class="lb__btn lb__next" aria-label="' + t.next + '">&#8250;</button>';
    document.body.appendChild(dlg);
    var img = dlg.querySelector(".lb__img"), text = dlg.querySelector(".lb__text"), meta = dlg.querySelector(".lb__meta");
    var list = [], at = 0;

    var show = function (i, dir) {
      at = (i + list.length) % list.length;
      var src = list[at];
      img.classList.remove("lb__img--in", "lb__img--l", "lb__img--r");
      void img.offsetWidth;
      img.src = src.src; img.alt = src.alt;
      img.classList.add("lb__img--in", dir ? (dir > 0 ? "lb__img--r" : "lb__img--l") : "lb__img--z");
      text.textContent = src.cap;
      meta.innerHTML = "";
      meta.append(String(at + 1) + t.of + String(list.length));
      if (src.credit) {
        meta.append(" · ");
        var a = document.createElement(src.href ? "a" : "span");
        a.textContent = src.credit;
        if (src.href) { a.href = src.href; a.target = "_blank"; a.rel = "noopener"; }
        meta.append(a);
      }
      [at - 1, at + 1].forEach(function (k) { var p = list[(k + list.length) % list.length]; if (p) new Image().src = p.src; });
    };

    grids.forEach(function (grid) {
      grid.addEventListener("click", function (e) {
        var btn = e.target.closest(".gallery__open");
        if (!btn) return;
        list = Array.prototype.slice.call(grid.querySelectorAll(".gallery__item img")).map(function (im) {
          var fig = im.closest("figure"), cr = fig.querySelector("figcaption small a, figcaption small");
          return {
            src: im.currentSrc || im.src, alt: im.alt,
            cap: (fig.querySelector(".gallery__cap") || {}).textContent || "",
            credit: cr ? cr.textContent.replace(/^\s*·\s*/, "") : "", href: cr && cr.href ? cr.href : "",
          };
        });
        var idx = Array.prototype.indexOf.call(grid.querySelectorAll(".gallery__open"), btn);
        show(idx, 0);
        dlg.showModal();
        root.classList.add("lb-open");
      });
    });
    dlg.querySelector(".lb__close").addEventListener("click", function () { dlg.close(); });
    dlg.querySelector(".lb__prev").addEventListener("click", function () { show(at - 1, -1); });
    dlg.querySelector(".lb__next").addEventListener("click", function () { show(at + 1, 1); });
    dlg.addEventListener("close", function () { root.classList.remove("lb-open"); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(at - 1, -1);
      if (e.key === "ArrowRight") show(at + 1, 1);
    });
    var sx = null, sy0 = 0;
    dlg.addEventListener("pointerdown", function (e) { sx = e.clientX; sy0 = e.clientY; });
    dlg.addEventListener("pointerup", function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx, dy = e.clientY - sy0; sx = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(at + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) dlg.close();
    });
  }
  /* 7. Headings: words rise in one by one, then a hand-drawn line draws itself under the last
        word. Words hop when the mouse passes over them. Split by word, not letter, so Hindi
        conjuncts and matras stay shaped together. */
  var heads = Array.prototype.slice.call(document.querySelectorAll(".mani .mega, .agenda .big, .formats .big, .bpartners .big"));
  heads.forEach(function (h) {
    var words = h.textContent.trim().split(/\s+/);
    h.setAttribute("aria-label", h.textContent.trim());
    h.textContent = "";
    words.forEach(function (w, i) {
      var s = document.createElement("span");
      s.className = "w"; s.setAttribute("aria-hidden", "true"); s.style.setProperty("--wi", i);
      s.textContent = w;
      if (i === words.length - 1) {
        s.classList.add("w--last");
        s.insertAdjacentHTML("beforeend", '<svg class="scribble" viewBox="0 0 300 24" preserveAspectRatio="none"><path pathLength="1" d="M4 15C52 6 98 20 150 12S252 4 296 14" /></svg>');
      }
      h.appendChild(s);
      if (i < words.length - 1) h.appendChild(document.createTextNode(" "));
    });
    h.classList.add("split");
    if (reduce) { h.classList.add("words-in"); return; }
    if (finePointer) {
      h.addEventListener("pointerover", function (e) {
        var w = e.target.closest(".w");
        if (!w || w.classList.contains("hop")) return;
        w.classList.add("hop");
        setTimeout(function () { w.classList.remove("hop"); }, 600);
      });
    }
  });
  inView(heads.filter(function (h) { return !reduce; }), function (h) { h.classList.add("words-in"); }, { threshold: 0.4 });

  /* 8. Pointer position over a section, as --mx/--my from -1 to 1 (desktop only), for the
        floating letters and the blob in the manifesto. */
  if (finePointer && !reduce) {
    document.querySelectorAll(".mani").forEach(function (sec) {
      sec.addEventListener("pointermove", function (e) {
        var r = sec.getBoundingClientRect();
        sec.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        sec.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
      sec.addEventListener("pointerleave", function () { sec.style.setProperty("--mx", 0); sec.style.setProperty("--my", 0); });
    });
  }

  /* 10. Names: the + opens a card with the speaker's role and the editions they came to. */
  document.querySelectorAll(".names__more").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      card.hidden = open;
      btn.closest("li").classList.toggle("is-open", !open);
    });
  });

  /* 11. Buttons lean toward the mouse when it comes near (desktop). */
  if (finePointer && !reduce) {
    document.querySelectorAll(".mani .btn, .names .btn, .invite .btn, .more").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.translate = ((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1) + "px";
      });
      b.addEventListener("pointerleave", function () { b.style.translate = ""; });
    });
  }
})();
