/* Hindi letters that stream in from every direction and orbit the cursor while it hovers the footer.
   Letters sit on concentric lanes and push each other apart, so paths never cross or overlap.
   Ported unchanged from the store (kt/letters.js), except the layer styles now live in rk-chrome.css. */
(function () {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Hover area; a page can override it with data-target on the script tag (the /2/ design uses ".foot").
  var TARGET = (document.currentScript && document.currentScript.dataset.target) || ".site-footer";
  var GLYPHS = ["अ", "आ", "इ", "उ", "क", "ख", "ग", "च", "ज", "त", "द", "न", "प", "ब", "म", "य", "र", "ल", "व", "स", "ह"];
  var COUNT = 120;
  var SIZES = [6, 7, 8, 10, 12, 14, 17];
  var LANES = [26, 48, 70, 92, 114, 136, 158, 180, 202, 224];
  var GAP = 3;

  var layer = document.createElement("div");
  layer.className = "cursor-letters";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  var mouse = { x: -200, y: -200 };
  var total = LANES.reduce(function (a, r) { return a + r; }, 0);
  var letters = [];
  var made = 0;
  LANES.forEach(function (radius, lane) {
    var n = lane === LANES.length - 1 ? COUNT - made : Math.round((COUNT * radius) / total);
    var dir = lane % 2 ? -1 : 1;
    var speed = 0.004 + (LANES.length - lane) * 0.0006;
    for (var k = 0; k < n; k++) {
      var el = document.createElement("span");
      el.textContent = GLYPHS[(made + k * 3) % GLYPHS.length];
      var size = SIZES[(made * 5 + k * 3 + lane) % SIZES.length];
      el.style.fontSize = size + "px";
      layer.appendChild(el);
      letters.push({ el: el, size: size, x: -200, y: -200, angle: (k / n) * Math.PI * 2 + lane * 0.6, speed: speed * dir, radius: radius, ease: 0.012 + ((made + k) % 7) * 0.006, rot: 0, spin: (((made + k) % 5) - 2) * 0.3 });
    }
    made += n;
  });

  var active = false, raf = 0, hideTimer = 0, seeded = false;

  function tick() {
    var i, j, l, m;
    for (i = 0; i < letters.length; i++) {
      l = letters[i];
      l.angle += l.speed;
      l.x += (mouse.x + Math.cos(l.angle) * l.radius - l.x) * l.ease;
      l.y += (mouse.y + Math.sin(l.angle) * l.radius - l.y) * l.ease;
    }
    for (i = 0; i < letters.length; i++) {
      l = letters[i];
      for (j = i + 1; j < letters.length; j++) {
        m = letters[j];
        var dx = m.x - l.x, dy = m.y - l.y;
        var min = (l.size + m.size) * 0.55 + GAP;
        var d2 = dx * dx + dy * dy;
        if (d2 < min * min) {
          var d = Math.sqrt(d2) || 0.01;
          var push = (min - d) * 0.5, ux = dx / d, uy = dy / d;
          l.x -= ux * push; l.y -= uy * push;
          m.x += ux * push; m.y += uy * push;
        }
      }
    }
    for (i = 0; i < letters.length; i++) {
      l = letters[i];
      l.rot += l.spin;
      l.el.style.transform = "translate(" + l.x.toFixed(1) + "px," + l.y.toFixed(1) + "px) rotate(" + l.rot.toFixed(1) + "deg)";
    }
    raf = requestAnimationFrame(tick);
  }

  function start() {
    clearTimeout(hideTimer);
    if (!seeded) {
      letters.forEach(function (l) {
        var a = Math.random() * Math.PI * 2, dist = 320 + Math.random() * 640;
        l.x = mouse.x + Math.cos(a) * dist;
        l.y = mouse.y + Math.sin(a) * dist;
      });
      seeded = true;
    }
    layer.classList.add("on");
    if (!raf) raf = requestAnimationFrame(tick);
    active = true;
  }
  function stop() {
    active = false;
    layer.classList.remove("on");
    hideTimer = setTimeout(function () { cancelAnimationFrame(raf); raf = 0; seeded = false; }, 450);
  }

  document.addEventListener("pointermove", function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY;
    var over = e.target.closest && e.target.closest(TARGET);
    if (over && !active) start();
    else if (!over && active) stop();
  }, { passive: true });
  document.addEventListener("pointerleave", stop);
  window.addEventListener("blur", stop);
})();
