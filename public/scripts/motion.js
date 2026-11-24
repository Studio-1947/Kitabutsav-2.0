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
    ".shelf__books", ".names .marquee", ".fmt", ".invite", ".pfind", ".fend", ".fcover", ".ab-intro", ".ab-ch", ".ev-next", ".ev-day", ".pc-map", ".pc-side", ".pt-shelf", ".pt-join", ".nw-clip", ".nw-kit li", ".nw-glance", ".nw-desk", ".vs-tips li", ".vs-help", ".au-group", ".ed-lead", ".ed-side", ".ed-faces li", ".ed-route", ".ed-cards li", ".gallery__item", ".speaker",
    ".edition-card", ".prose > *", ".totals li", ".infobox", ".partner", ".press-item", ".faq-item",
    ".year-block", ".day-panel", ".notice",
  ].join(",");
  if (!reduce) {
    // Anything already on screen when the page opens is left alone: hiding it now would make
    // it blink, since it has already been painted.
    var fold = window.innerHeight;
    var items = Array.prototype.slice.call(document.querySelectorAll(REVEAL)).filter(function (el) {
      return !el.closest(".bhero, .page-hero, .foot__bottom") && !el.matches(".mega, .big") && el.getBoundingClientRect().top > fold;
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
        card.style.setProperty("--ry", ((px - 0.5) * 4).toFixed(2) + "deg");
        card.style.setProperty("--rx", ((0.5 - py) * 4).toFixed(2) + "deg");
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
      speed += ((mq.classList.contains("is-paused") ? 0 : want) - speed) * 0.06;
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
  if ((grids.length || document.querySelector("[data-albums], [data-filmstrip]")) && window.HTMLDialogElement) {
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
    // Other parts of the page (the About albums) open the viewer with their own photo list.
    window.__openPhotos = function (photos, idx) {
      list = photos; show(idx, 0); dlg.showModal(); root.classList.add("lb-open");
    };
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
  var heads = Array.prototype.slice.call(document.querySelectorAll(".mani .mega, .agenda .big, .names .big, .formats .big, .bpartners .big"));
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
        setTimeout(function () { w.classList.remove("hop"); }, 900);
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

  /* 10. Names bookshelf: a spine opens its book (one at a time); arrow keys move along the shelf. */
  document.querySelectorAll("[data-shelf]").forEach(function (shelf) {
    var spines = Array.prototype.slice.call(shelf.querySelectorAll("button.book__spine"));
    var open = function (btn, focus) {
      spines.forEach(function (s) {
        var on = s === btn;
        s.setAttribute("aria-expanded", String(on));
        s.closest(".book").classList.toggle("is-open", on);
        var panel = document.getElementById(s.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) btn.focus();
    };
    spines.forEach(function (s, i) {
      if (s.getAttribute("aria-expanded") === "true") s.closest(".book").classList.add("is-open");
      s.addEventListener("click", function () { open(s); });
      s.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          open(spines[(i + (e.key === "ArrowRight" ? 1 : -1) + spines.length) % spines.length], true);
        }
      });
    });
  });

  /* 11. Buttons lean toward the mouse when it comes near (desktop). */
  if (finePointer && !reduce) {
    document.querySelectorAll(".mani .btn, .names .btn, .invite .btn, .more").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.translate = ((e.clientX - r.left - r.width / 2) * 0.08).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * 0.12).toFixed(1) + "px";
      });
      b.addEventListener("pointerleave", function () { b.style.translate = ""; });
    });
  }
  /* 12. Partners: city chips. Picking a city eases the logo marquee to a stop and flips that
         city's partners forward as cards; "All cities" sets the marquee moving again. */
  document.querySelectorAll("[data-pfind]").forEach(function (box) {
    var chips = box.querySelectorAll(".pchip"), cards = box.querySelectorAll(".pcard");
    var hint = box.querySelector("[data-pfind-hint]");
    var mq = box.parentElement.querySelector(".marquee--logos");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var city = chip.dataset.city, n = 0;
        chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        cards.forEach(function (card) {
          var on = city !== "all" && card.dataset.city === city;
          card.hidden = !on;
          card.classList.remove("is-in");
          if (on) { card.style.setProperty("--ci", n++); void card.offsetWidth; card.classList.add("is-in"); }
        });
        if (hint) hint.hidden = city !== "all";
        if (mq) mq.classList.toggle("is-paused", city !== "all");
      });
    });
  });
  /* 13. Footer wordmark: its letters fill in one by one when it scrolls into view. */
  var fword = document.querySelectorAll(".fword");
  if (reduce) fword.forEach(function (w) { w.classList.add("is-in"); });
  else inView(Array.prototype.slice.call(fword), function (w) { w.classList.add("is-in"); }, { threshold: 0.35 });
  /* 14. About page route: a dashed line runs through every stop in order (whatever the layout)
         and draws itself as the section scrolls past. Rebuilt on resize and once images load. */
  document.querySelectorAll("[data-route]").forEach(function (box) {
    var svg = box.querySelector(".route__line"), track = box.querySelector(".route__track"), ink = box.querySelector(".route__ink");
    var stops = Array.prototype.slice.call(box.querySelectorAll(".stop__pin"));
    var len = 0;
    var build = function () {
      var r = box.getBoundingClientRect();
      svg.setAttribute("width", r.width); svg.setAttribute("height", r.height);
      svg.setAttribute("viewBox", "0 0 " + r.width + " " + r.height);
      var pts = stops.map(function (p) { var b = p.getBoundingClientRect(); return [b.left + b.width / 2 - r.left, b.top + b.height / 2 - r.top]; });
      if (pts.length < 2) return;
      // smooth curve through the pins (Catmull-Rom turned into cubic Béziers)
      var d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
      for (var i = 0; i < pts.length - 1; i++) {
        var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
        var c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        var c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += " C" + c1.map(function (n) { return n.toFixed(1); }).join(" ") + " " + c2.map(function (n) { return n.toFixed(1); }).join(" ") + " " + p2[0].toFixed(1) + " " + p2[1].toFixed(1);
      }
      track.setAttribute("d", d); ink.setAttribute("d", d);
      len = ink.getTotalLength();
      ink.style.strokeDasharray = len + " " + len;
      progress();
    };
    var progress = function () {
      if (!len) return;
      if (reduce) { ink.style.strokeDashoffset = 0; stops.forEach(function (pin) { pin.closest(".stop").classList.add("is-reached"); }); return; }
      var r = box.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / r.height));
      ink.style.strokeDashoffset = (len * (1 - p)).toFixed(1);
      // pins light up as the line reaches them
      stops.forEach(function (pin, i) { pin.closest(".stop").classList.toggle("is-reached", i / (stops.length - 1) <= p + 0.001); });
    };
    build();
    window.addEventListener("load", build);
    window.addEventListener("resize", build);
    window.addEventListener("scroll", progress, { passive: true });
  });
  /* 15. About gallery as photo albums. An album (a stack of photos) opens its panel: a big
         feature photo, caption and counter, arrows, and a strip of thumbnails. The feature opens
         the full-screen viewer. #gallery-<edition> links open that album. */
  document.querySelectorAll("[data-albums]").forEach(function (wrap) {
    var tabs = Array.prototype.slice.call(wrap.querySelectorAll(".album"));
    var panels = {};
    wrap.querySelectorAll(".alb-panel").forEach(function (panel) {
      var thumbs = Array.prototype.slice.call(panel.querySelectorAll(".alb-thumb"));
      var feat = panel.querySelector(".alb-feature img"), cap = panel.querySelector(".alb-cap__text");
      var count = panel.querySelector(".alb-cap__n"), credit = panel.querySelector(".alb-cap__credit");
      var at = 0;
      var data = thumbs.map(function (b) {
        return { src: b.dataset.src, alt: b.dataset.cap, cap: b.dataset.cap, credit: b.dataset.credit || "", href: b.dataset.href || "" };
      });
      var go = function (i, dir) {
        at = (i + thumbs.length) % thumbs.length;
        var d = data[at];
        feat.classList.remove("is-in", "from-l", "from-r");
        void feat.offsetWidth;
        feat.src = d.src; feat.alt = d.cap;
        feat.classList.add("is-in", dir < 0 ? "from-l" : "from-r");
        cap.textContent = d.cap;
        count.textContent = (at + 1) + " / " + thumbs.length;
        credit.textContent = "";
        if (d.credit) {
          var a = document.createElement(d.href ? "a" : "span");
          a.textContent = d.credit;
          if (d.href) { a.href = d.href; a.target = "_blank"; a.rel = "noopener"; }
          credit.append(hi ? "फ़ोटो: " : "Photo: ", a);
        }
        thumbs.forEach(function (b, k) { b.setAttribute("aria-current", k === at ? "true" : "false"); });
        var strip = thumbs[at].parentElement.parentElement, b = thumbs[at];
        strip.scrollTo({ left: b.offsetLeft - strip.clientWidth / 2 + b.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
      };
      thumbs.forEach(function (b, k) { b.addEventListener("click", function () { go(k, k < at ? -1 : 1); }); });
      panel.querySelector(".alb-prev").addEventListener("click", function () { go(at - 1, -1); });
      panel.querySelector(".alb-next").addEventListener("click", function () { go(at + 1, 1); });
      panel.querySelector(".alb-feature").addEventListener("click", function () { if (window.__openPhotos) window.__openPhotos(data, at); });
      panel.addEventListener("keydown", function (e) {
        if (e.target.closest(".alb-strip, .alb-stage") && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
          e.preventDefault(); go(at + (e.key === "ArrowRight" ? 1 : -1), e.key === "ArrowRight" ? 1 : -1);
        }
      });
      // swipe the feature photo on phones
      var sx = null;
      panel.querySelector(".alb-stage").addEventListener("pointerdown", function (e) { sx = e.clientX; });
      panel.querySelector(".alb-stage").addEventListener("pointerup", function (e) {
        if (sx === null) return; var dx = e.clientX - sx; sx = null;
        if (Math.abs(dx) > 50) { e.preventDefault(); go(at + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); panel.dataset.swiped = "1"; }
      });
      panel.querySelector(".alb-feature").addEventListener("click", function (e) {
        if (panel.dataset.swiped) { delete panel.dataset.swiped; e.stopImmediatePropagation(); }
      }, true);
      panels[panel.id] = panel;
    });
    var open = function (id, scroll) {
      tabs.forEach(function (tab) {
        var on = tab.getAttribute("aria-controls") === id;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        document.getElementById(tab.getAttribute("aria-controls")).hidden = !on;
      });
      if (scroll) document.getElementById(id).scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { open(tab.getAttribute("aria-controls")); });
      tab.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        var n = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
        n.focus(); open(n.getAttribute("aria-controls"));
      });
    });
    var m = location.hash.match(/^#(?:gallery-)?([a-z]+-\d{4})$/);
    if (m && panels["gp-" + m[1]]) { open("gp-" + m[1]); document.getElementById("gallery").scrollIntoView(); }
  });
  /* 16. On-this-page nav: the section in view is marked current, and a marker slides under it. */
  document.querySelectorAll("[data-spy]").forEach(function (nav) {
    var bar = nav.querySelector(".page-tabs__bar"), ind = nav.querySelector(".page-tabs__ind");
    var links = Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']"));
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
    var cur = -1;
    var place = function () {
      var a = links[cur];
      if (!a) { bar.classList.remove("has-active"); return; }
      ind.style.width = a.offsetWidth + "px";
      ind.style.setProperty("--ind-x", a.offsetLeft + "px");
      bar.classList.add("has-active");
    };
    var spy = function () {
      var line = window.innerHeight * 0.35, k = -1;
      secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= line) k = i; });
      if (k === cur) return;
      cur = k;
      links.forEach(function (a, i) { if (i === k) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
      place();
    };
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", place);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
    spy();
  });
  /* 17. Events day planner: legend chips highlight one kind of session across the days; during
         the festival, today's tab opens by itself, past sessions dim and a "now" line shows. */
  document.querySelectorAll("[data-planner]").forEach(function (pl) {
    var keys = pl.querySelectorAll(".ev-key");
    keys.forEach(function (k) {
      k.addEventListener("click", function () {
        var on = k.getAttribute("aria-pressed") !== "true";
        keys.forEach(function (o) { o.setAttribute("aria-pressed", String(o === k && on)); });
        pl.dataset.focus = on ? k.dataset.kind : "";
        pl.querySelectorAll(".ev-s").forEach(function (s) { s.classList.toggle("is-match", on && s.dataset.kind === pl.dataset.focus); });
      });
    });
    var ist = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    var part = function (n) { return (ist.find(function (x) { return x.type === n; }) || {}).value; };
    var today = part("year") + "-" + part("month") + "-" + part("day");
    var nowMin = parseInt(part("hour"), 10) % 24 * 60 + parseInt(part("minute"), 10);
    var tab = pl.querySelector('.ev-day[data-date="' + today + '"]');
    if (!tab) return;
    tab.classList.add("is-today");
    tab.click();
    var panel = pl.querySelector('.ev-panel[data-date="' + today + '"]');
    var mins = function (s) { var p = s.split(":"); return +p[0] * 60 + +p[1]; };
    var placed = false;
    panel.querySelectorAll(".ev-s").forEach(function (s) {
      var end = s.dataset.end ? mins(s.dataset.end) : mins(s.dataset.start) + 90;
      if (end <= nowMin) s.classList.add("is-past");
      if (!placed && mins(s.dataset.start) > nowMin) {
        var li = document.createElement("li");
        li.className = "ev-now"; li.innerHTML = "<span>" + (hi ? "अभी" : "Now") + "</span>";
        s.parentNode.insertBefore(li, s); placed = true;
      }
    });
  });
  /* 18. Partners page: city (map pins or chips) and kind filters; shelves with nothing left hide;
         cards flip on hover (desktop) or tap (touch). */
  document.querySelectorAll("[data-pfind2]").forEach(function (box) {
    var state = { city: "", group: "" };
    var cards = box.querySelectorAll(".pt-card"), shelves = box.querySelectorAll(".pt-shelf");
    var pins = box.querySelectorAll(".pt-pin"), count = box.querySelector("[data-pcount]"), empty = box.querySelector("[data-pempty]");
    var apply = function () {
      var n = 0;
      cards.forEach(function (c) {
        var on = (!state.city || c.dataset.city.split(" ").indexOf(state.city) >= 0) && (!state.group || c.dataset.group === state.group);
        c.hidden = !on; if (on) n++;
        if (on && !reduce) { c.classList.remove("is-pop"); void c.offsetWidth; c.classList.add("is-pop"); }
      });
      shelves.forEach(function (s) { s.hidden = !s.querySelector(".pt-card:not([hidden])"); });
      box.querySelectorAll(".pt-chip[data-city]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.city === state.city)); });
      box.querySelectorAll(".pt-chip[data-group]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.group === state.group)); });
      pins.forEach(function (p) { p.classList.toggle("is-on", p.dataset.city === state.city); p.classList.toggle("is-dim", !!state.city && p.dataset.city !== state.city); });
      count.textContent = n; empty.hidden = n > 0;
    };
    box.querySelectorAll(".pt-chip[data-city]").forEach(function (b) { b.addEventListener("click", function () { state.city = b.dataset.city; apply(); }); });
    box.querySelectorAll(".pt-chip[data-group]").forEach(function (b) { b.addEventListener("click", function () { state.group = b.dataset.group; apply(); }); });
    pins.forEach(function (p) {
      p.addEventListener("click", function () { state.city = state.city === p.dataset.city ? "" : p.dataset.city; apply(); });
    });
    cards.forEach(function (c) {
      c.querySelector(".pt-card__in").addEventListener("click", function () { c.classList.toggle("is-flipped"); });
    });
  });
  /* 19. Press masthead: today's date, in the page's language (the page itself is built ahead of time). */
  document.querySelectorAll("[data-today]").forEach(function (el) {
    el.textContent = new Intl.DateTimeFormat(hi ? "hi-IN" : "en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date());
  });
  /* 20. FAQ as a chat: a question chip posts the question as the visitor's message, shows a
         typing indicator, then the answer from the page's own list. Search filters the chips.
         #q3-style links open that answer straight away. */
  document.querySelectorAll("[data-faq-chat]").forEach(function (chat) {
    var list = chat.querySelector("[data-faq-list]"), thread = chat.querySelector("[data-faq-thread]");
    var pairs = Array.prototype.slice.call(list.querySelectorAll(".fq-pair"));
    var chips = Array.prototype.slice.call(chat.querySelectorAll(".fq-chip"));
    var search = chat.querySelector("[data-faq-search]"), none = chat.querySelector("[data-faq-none]");
    chat.classList.add("is-chat");
    list.hidden = true;
    var busy = Promise.resolve();
    var scroll = function () { thread.scrollTo({ top: thread.scrollHeight, behavior: reduce ? "auto" : "smooth" }); };
    var post = function (i, quick) {
      var pair = pairs[i]; if (!pair) return;
      chips[i].classList.add("is-asked");
      busy = busy.then(function () {
        return new Promise(function (done) {
          var me = pair.querySelector("dt").cloneNode(true);
          var me2 = document.createElement("div"); me2.className = me.className + " is-new"; me2.innerHTML = me.innerHTML;
          thread.appendChild(me2); scroll();
          var typing = document.createElement("div");
          typing.className = "fq-msg fq-msg--bot fq-typing";
          typing.innerHTML = pair.querySelector("dd .fq-av").outerHTML + '<span class="fq-bubble"><i></i><i></i><i></i></span>';
          typing.setAttribute("aria-hidden", "true");
          var wait = quick || reduce ? 0 : 650 + Math.min(900, pair.querySelector("dd").textContent.length * 3);
          setTimeout(function () {
            thread.appendChild(typing); scroll();
            setTimeout(function () {
              typing.remove();
              var ans = document.createElement("div"); ans.className = "fq-msg fq-msg--bot is-new";
              ans.innerHTML = pair.querySelector("dd").innerHTML;
              thread.appendChild(ans); scroll(); done();
            }, wait);
          }, quick || reduce ? 0 : 250);
        });
      });
    };
    chips.forEach(function (c, i) { c.addEventListener("click", function () { post(i); }); });
    chat.querySelector("[data-faq-all]").addEventListener("click", function () { pairs.forEach(function (_, i) { if (!chips[i].classList.contains("is-asked")) post(i, true); }); });
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase(), n = 0;
      chips.forEach(function (c, i) {
        var hay = (c.textContent + " " + pairs[i].querySelector("dd").textContent).toLowerCase();
        var on = !q || hay.indexOf(q) >= 0; c.hidden = !on; if (on) n++;
      });
      none.hidden = n > 0;
    });
    search.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var first = chips.filter(function (c) { return !c.hidden; })[0];
      if (first) { e.preventDefault(); first.click(); }
    });
    var m = location.hash.match(/^#q(\d+)$/);
    if (m) post(parseInt(m[1], 10) - 1, true);
  });
  /* 21. Authors catalogue: search, city and kind filters, the A–Z bar, and a side panel
         (a sheet from the bottom on phones) with the author's bio and editions. /resources/#slug
         opens that author. */
  document.querySelectorAll("[data-catalogue]").forEach(function (cat) {
    var cards = Array.prototype.slice.call(cat.querySelectorAll(".au-card"));
    var groups = Array.prototype.slice.call(cat.querySelectorAll(".au-group"));
    var search = cat.querySelector("[data-au-search]"), city = cat.querySelector("[data-au-city]");
    var kinds = cat.querySelectorAll(".au-kind"), count = cat.querySelector("[data-au-count]"), none = cat.querySelector("[data-au-none]");
    var kind = "";
    var apply = function () {
      var q = search.value.trim().toLowerCase(), c = city.value, n = 0;
      cards.forEach(function (el) {
        var on = (!q || el.dataset.search.indexOf(q) >= 0) && (!c || el.dataset.cities.split(" ").indexOf(c) >= 0) && (!kind || el.dataset.kinds.split(" ").indexOf(kind) >= 0);
        el.hidden = !on; if (on) n++;
      });
      groups.forEach(function (g) {
        var any = !!g.querySelector(".au-card:not([hidden])");
        g.hidden = !any;
        var link = cat.querySelector('.au-index a[data-letter="' + g.dataset.group + '"]');
        if (link) link.classList.toggle("is-off", !any);
      });
      count.textContent = n; none.hidden = n > 0;
    };
    search.addEventListener("input", apply);
    city.addEventListener("change", apply);
    kinds.forEach(function (b) {
      b.addEventListener("click", function () {
        kind = b.dataset.kind;
        kinds.forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
        apply();
      });
    });

    // Side panel
    var dlg = document.createElement("dialog");
    dlg.className = "au-panel";
    dlg.innerHTML = '<button type="button" class="au-panel__x" aria-label="' + (hi ? "बंद करें" : "Close") + '">&times;</button><div class="au-panel__body"></div>';
    document.body.appendChild(dlg);
    var body = dlg.querySelector(".au-panel__body");
    var open = function (slug) {
      var card = document.getElementById(slug);
      if (!card || !card.classList.contains("au-card")) return;
      body.innerHTML = card.querySelector(".au-detail").innerHTML;
      dlg.setAttribute("aria-label", card.querySelector(".au-card__name").textContent);
      if (!dlg.open) dlg.showModal();
      root.classList.add("lb-open");
    };
    dlg.addEventListener("close", function () { root.classList.remove("lb-open"); });
    dlg.querySelector(".au-panel__x").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    document.querySelectorAll("[data-open]").forEach(function (b) {
      b.addEventListener("click", function () { open(b.dataset.open); });
    });
    var m = location.hash.slice(1);
    if (m && document.getElementById(m) && document.getElementById(m).classList.contains("au-card")) {
      window.addEventListener("load", function () { open(m); });
    }
  });
  /* 22. Edition filmstrip: a photo opens the full-screen viewer with the strip's photos. */
  document.querySelectorAll("[data-filmstrip]").forEach(function (strip) {
    var btns = Array.prototype.slice.call(strip.querySelectorAll(".ed-film__ph"));
    var data = btns.map(function (b) { return { src: b.dataset.src, alt: b.dataset.cap, cap: b.dataset.cap, credit: b.dataset.credit, href: b.dataset.href }; });
    btns.forEach(function (b, i) { b.addEventListener("click", function () { if (window.__openPhotos) window.__openPhotos(data, i); }); });
  });
  /* 22. Authors hero: a spotlight stage. One headliner stands in the light at a time and the
         stage moves on every few seconds (not for reduced motion). It holds still while the mouse
         or keyboard focus is on it, or when it is off screen. Thumbnails pick a headliner (arrow
         keys move along them), a swipe on phones goes to the next one, and the featured portrait
         opens the side panel (section 21). The beam and confetti lean toward the mouse. The
         "Jump to" chips set the catalogue's kind filter and scroll down to it. */
  document.querySelectorAll("[data-au-stage]").forEach(function (stage) {
    var spots = Array.prototype.slice.call(stage.querySelectorAll(".au-spot"));
    var stars = Array.prototype.slice.call(stage.querySelectorAll(".au-star"));
    if (!spots.length) return;
    var cur = 0, timer = 0, dwell = 5000, held = false, visible = true;
    stage.style.setProperty("--dwell", dwell + "ms");
    var show = function (i) {
      i = (i + spots.length) % spots.length;
      if (i === cur) return;
      spots.forEach(function (sp, k) { sp.classList.toggle("is-out", k === cur); });
      spots[cur].classList.remove("is-on");
      spots[cur].setAttribute("aria-hidden", "true"); spots[cur].tabIndex = -1;
      spots[i].classList.remove("is-out"); spots[i].classList.add("is-on");
      spots[i].removeAttribute("aria-hidden"); spots[i].removeAttribute("tabindex");
      stars.forEach(function (b, k) { b.setAttribute("aria-pressed", String(k === i)); });
      cur = i;
      play();
    };
    var play = function () {
      clearTimeout(timer);
      if (reduce) return;
      stage.classList.remove("is-playing");
      if (held || !visible) { stage.classList.add("is-paused"); return; }
      stage.classList.remove("is-paused");
      void stage.offsetWidth; // restart the progress bar
      stage.classList.add("is-playing");
      timer = setTimeout(function () { show(cur + 1); }, dwell);
    };
    var hold = function (on) { held = on; play(); };
    stage.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hold(true); });
    stage.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") hold(false); });
    stage.addEventListener("focusin", function () { hold(true); });
    stage.addEventListener("focusout", function (e) { if (!stage.contains(e.relatedTarget)) hold(false); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; play(); }, { threshold: 0.3 }).observe(stage);
    }
    document.addEventListener("visibilitychange", function () { visible = !document.hidden; play(); });

    stars.forEach(function (b, k) {
      b.addEventListener("click", function () { show(k); });
      b.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var n = (k + d + stars.length) % stars.length;
        stars[n].focus(); stars[n].scrollIntoView({ block: "nearest", inline: "nearest" });
        show(n);
      });
    });

    var x0 = null;
    stage.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (x0 === null || !e.target.closest(".au-stage__spots")) { x0 = null; return; }
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
    }, { passive: true });

    if (finePointer && !reduce) {
      var hero = stage.closest("section") || stage;
      hero.addEventListener("pointermove", function (e) {
        var r = stage.getBoundingClientRect();
        var mx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
        var my = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
        stage.style.setProperty("--mx", mx.toFixed(3));
        stage.style.setProperty("--my", my.toFixed(3));
      });
      hero.addEventListener("pointerleave", function () { stage.style.setProperty("--mx", 0); stage.style.setProperty("--my", 0); });
    }
    play();
  });
  document.querySelectorAll("[data-jump]").forEach(function (b) {
    b.addEventListener("click", function () {
      var cat = document.querySelector("[data-catalogue]");
      var chip = cat && cat.querySelector('.au-kind[data-kind="' + b.dataset.jump + '"]');
      if (!chip) return;
      chip.click();
      cat.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  });
  /* 23. Touch layer. Phones can't hover, so what hover did is re-thought (see touch.css):
         - centre stage: the card passing the middle of the screen (or of a sideways strip) gets
           .is-center, which carries the old hover look;
         - the home ticket list becomes a swipeable deck with dots and a counter;
         - heading words and the footer wordmark hop when tapped;
         - "write to us" paper planes fly off when tapped, then the mail opens;
         - the manifesto's floating letters drift with scroll instead of the mouse;
         - the About collage brings a tapped photo to the front;
         - a light tap of vibration on toggles, where the phone supports it. */
  var touch = window.matchMedia("(hover: none)").matches;
  if (touch) {
    var buzz = function () { if (navigator.vibrate && !reduce) navigator.vibrate(8); };

    // Centre stage, vertical: a thin band across the middle of the screen.
    if ("IntersectionObserver" in window) {
      var midIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { en.target.classList.toggle("is-center", en.isIntersecting); });
      }, { rootMargin: "-42% 0px -42% 0px" });
      document.querySelectorAll(".ecard, .fmt, .ab-ch, .stop, .ev-s, .nw-clip, .vs-pass").forEach(function (el) { midIO.observe(el); });

      // Centre stage, sideways strips (and the ticket deck when it scrolls sideways).
      var stripMid = function (strip, items, onChange) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            en.target.classList.toggle("is-center", en.isIntersecting);
            if (en.isIntersecting && onChange) onChange(items.indexOf(en.target));
          });
        }, { root: strip, rootMargin: "0px -40% 0px -40%" });
        items.forEach(function (el) { io.observe(el); });
      };
      document.querySelectorAll(".ed-film, .ed-cards").forEach(function (strip) {
        stripMid(strip, Array.prototype.slice.call(strip.querySelectorAll("li")));
      });

      // Ticket deck: dots, counter, swipe. Only when the list actually scrolls sideways (phones).
      document.querySelectorAll("[data-deck]").forEach(function (deck) {
        var items = Array.prototype.slice.call(deck.querySelectorAll(":scope > li"));
        if (deck.scrollWidth <= deck.clientWidth + 4) { items.forEach(function (el) { midIO.observe(el); }); return; }
        var dots = document.createElement("div"); dots.className = "deck-dots";
        var count = document.createElement("p"); count.className = "deck-count"; count.setAttribute("aria-live", "polite");
        items.forEach(function (li, i) {
          var b = document.createElement("button"); b.type = "button";
          b.setAttribute("aria-label", (hi ? "टिकट " : "Ticket ") + (i + 1));
          b.addEventListener("click", function () { li.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" }); });
          dots.appendChild(b);
        });
        deck.after(dots); dots.after(count);
        var setCur = function (k) {
          if (k < 0) return;
          dots.querySelectorAll("button").forEach(function (b, i) { if (i === k) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
          count.textContent = (k + 1) + " / " + items.length;
        };
        setCur(0);
        stripMid(deck, items, setCur);
      });
    }

    // Heading words and footer wordmark letters hop on tap.
    document.addEventListener("pointerdown", function (e) {
      var w = e.target.closest(".split .w, .fword.is-in .fword__g");
      if (!w || reduce) return;
      w.classList.remove("hop"); void w.offsetWidth; w.classList.add("hop");
      setTimeout(function () { w.classList.remove("hop"); }, 950);
    }, { passive: true });

    // Paper planes take off before the mail app opens.
    document.querySelectorAll(".btn--plane, .pt-join__go").forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (reduce || a.classList.contains("fly")) return;
        e.preventDefault(); buzz();
        a.classList.add("fly");
        setTimeout(function () { a.classList.remove("fly"); window.location.href = a.href; }, 520);
      });
    });

    // Manifesto letters follow scroll position instead of the mouse.
    var mani = document.querySelector(".mani");
    if (mani && !reduce) {
      var maniTick = 0;
      var maniMove = function () {
        maniTick = 0;
        var r = mani.getBoundingClientRect(), vh = window.innerHeight;
        var p = Math.max(-1, Math.min(1, ((r.top + r.height / 2) - vh / 2) / vh));
        mani.style.setProperty("--mx", (p * .9).toFixed(3));
        mani.style.setProperty("--my", (p * .7).toFixed(3));
      };
      window.addEventListener("scroll", function () { if (!maniTick) maniTick = requestAnimationFrame(maniMove); }, { passive: true });
      maniMove();
    }

    // About collage: tap a photo to bring it to the front.
    document.querySelectorAll(".ab-collage").forEach(function (col) {
      col.style.pointerEvents = "auto";
      col.querySelectorAll(".ab-collage__p").forEach(function (ph) {
        ph.addEventListener("click", function () {
          col.querySelectorAll(".ab-collage__p").forEach(function (o) { o.classList.toggle("is-front", o === ph); });
          buzz();
        });
      });
    });

    // A light buzz on toggles.
    document.addEventListener("click", function (e) {
      if (e.target.closest(".book__spine, .pt-card__in, .album, .pchip, .pt-chip, .ev-key, .ev-day, .au-kind, .fq-chip, .au-star, .alb-thumb")) buzz();
    });
  }
  /* 24. The bottom tab bar steps aside while the footer is on screen: the footer has the same
         links (and more), and the bar would cover its last lines. It slides back on scrolling up. */
  var tabbar = document.querySelector(".mobile-tabbar"), foot = document.querySelector("footer.foot");
  if (tabbar && foot && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      tabbar.classList.toggle("at-footer", en[0].isIntersecting);
    }, { rootMargin: "0px 0px -12% 0px" }).observe(foot);
  }
  /* 25. Partners "city by city": a pin on the map or a numbered chip picks a city; its card
         (photo, names, partner list, edition link) slides in. Arrow keys move between cities. */
  document.querySelectorAll("[data-pcity]").forEach(function (box) {
    var pins = Array.prototype.slice.call(box.querySelectorAll(".pc-pin"));
    var chips = Array.prototype.slice.call(box.querySelectorAll(".pc-chip"));
    var cards = Array.prototype.slice.call(box.querySelectorAll(".pc-card"));
    var keys = chips.map(function (c) { return c.dataset.city; });
    var pick = function (key) {
      pins.concat(chips).forEach(function (el) {
        var on = el.dataset.city === key;
        el.setAttribute("aria-pressed", String(on));
        el.classList.toggle("is-on", on);
      });
      cards.forEach(function (c) {
        var on = c.dataset.city === key;
        if (on && c.hidden) { c.hidden = false; c.classList.remove("is-in"); void c.offsetWidth; c.classList.add("is-in"); }
        else if (!on) c.hidden = true;
      });
    };
    pins.concat(chips).forEach(function (el) {
      el.addEventListener("click", function () { pick(el.dataset.city); });
      el.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        var i = keys.indexOf(el.dataset.city) + (e.key === "ArrowRight" ? 1 : -1);
        var k = keys[(i + keys.length) % keys.length];
        pick(k);
        var same = el.classList.contains("pc-pin") ? pins : chips;
        same.filter(function (x) { return x.dataset.city === k; })[0].focus();
      });
    });
  });
})();
