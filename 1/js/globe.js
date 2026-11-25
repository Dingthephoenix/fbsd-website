/* Flat dotted globe. Nodes illustrate a network. They are not association offices. */
(function () {
  var stage = document.querySelector("[data-globe]");
  if (!stage || !window.FBSD_LAND) return;

  var canvas = stage.querySelector("canvas");
  var tag = stage.querySelector('[data-tag="hk"]');
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var CENTER = 16;
  var SPAN = 1.58;
  var PITCH = 0.38;
  var HK = { lat: 22.3193, lon: 114.1694 };

  var NODES = [
    { lat: 49.28, lon: -123.12 },
    { lat: 34.05, lon: -118.24 },
    { lat: 40.71, lon: -74.01 },
    { lat: 19.43, lon: -99.13 },
    { lat: -12.05, lon: -77.04 },
    { lat: -23.55, lon: -46.63 },
    { lat: -34.6, lon: -58.38 },
    { lat: 51.51, lon: -0.13 },
    { lat: 48.86, lon: 2.35 },
    { lat: 50.11, lon: 8.68 },
    { lat: 41.9, lon: 12.5 },
    { lat: 59.33, lon: 18.07 },
    { lat: 55.75, lon: 37.62 },
    { lat: 41.01, lon: 28.98 },
    { lat: 30.04, lon: 31.24 },
    { lat: -1.29, lon: 36.82 },
    { lat: -26.2, lon: 28.05 },
    { lat: 6.52, lon: 3.38 },
    { lat: 25.2, lon: 55.27 },
    { lat: 19.08, lon: 72.88 },
    { lat: 28.61, lon: 77.21 },
    { lat: 1.35, lon: 103.82 },
    { lat: 13.76, lon: 100.5 },
    { lat: -6.21, lon: 106.85 },
    { lat: 31.23, lon: 121.47 },
    { lat: 39.9, lon: 116.41 },
    { lat: 35.68, lon: 139.69 },
    { lat: 37.57, lon: 126.98 },
    { lat: -33.87, lon: 151.21 }
  ];

  function place(lat, lon) {
    var p = lat * Math.PI / 180;
    var rel = ((lon - CENTER) / SPAN) * Math.PI / 180;
    var cp = Math.cos(p);
    var x = cp * Math.sin(rel);
    var y = Math.sin(p);
    var z = cp * Math.cos(rel);
    var cx = Math.cos(PITCH);
    var sx = Math.sin(PITCH);
    return [x, cx * y - sx * z, sx * y + cx * z];
  }

  var land = window.FBSD_LAND;
  var dots = new Float32Array((land.length / 2) * 3);
  for (var i = 0, j = 0; i < land.length; i += 2, j += 3) {
    var p = place(land[i] / 50, land[i + 1] / 50);
    dots[j] = p[0];
    dots[j + 1] = p[1];
    dots[j + 2] = p[2];
  }

  var hk = place(HK.lat, HK.lon);
  var arcs = NODES.map(function (node, index) {
    return { end: place(node.lat, node.lon), phase: index * 0.07 };
  });

  var dpr = 1;
  var w = 1;
  var h = 1;
  var visible = false;
  var raf = 0;
  var seen = false;

  function resize() {
    var rect = stage.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = Math.max(2, Math.round(rect.width * dpr));
    h = Math.max(2, Math.round(rect.height * dpr));
    canvas.width = w;
    canvas.height = h;
  }

  function xy(p, R, cx, cy) {
    if (p[2] < -0.02) return null;
    return [cx + p[0] * R, cy - p[1] * R, p[2]];
  }

  function draw(now) {
    var cx = w * 0.5;
    var cy = h * 0.5;
    var R = Math.min(w, h) * 0.4;
    ctx.clearRect(0, 0, w, h);

    var glow = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.22);
    glow.addColorStop(0, "rgba(90, 176, 220, 0.28)");
    glow.addColorStop(1, "rgba(90, 176, 220, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
    ctx.fill();

    var body = ctx.createRadialGradient(cx - R * 0.42, cy - R * 0.46, R * 0.02, cx + R * 0.05, cy + R * 0.04, R);
    body.addColorStop(0, "#d7f0fb");
    body.addColorStop(0.16, "#8ec8e8");
    body.addColorStop(0.48, "#2f86be");
    body.addColorStop(1, "#0b568c");
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();

    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = Math.max(1, dpr * 0.7);
    var lat;
    var lon;
    for (lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      var started = false;
      for (lon = -180; lon <= 180; lon += 6) {
        var s = xy(place(lat, lon), R, cx, cy);
        if (!s) { started = false; continue; }
        if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
        else ctx.lineTo(s[0], s[1]);
      }
      ctx.stroke();
    }
    for (lon = -180; lon < 180; lon += 30) {
      ctx.beginPath();
      started = false;
      for (lat = -80; lat <= 80; lat += 4) {
        s = xy(place(lat, lon), R, cx, cy);
        if (!s) { started = false; continue; }
        if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
        else ctx.lineTo(s[0], s[1]);
      }
      ctx.stroke();
    }

    for (var di = 0; di < dots.length; di += 3) {
      if (dots[di + 2] < 0.02) continue;
      var ds = xy([dots[di], dots[di + 1], dots[di + 2]], R, cx, cy);
      if (!ds) continue;
      ctx.fillStyle = "rgba(255,255,255," + (0.55 + dots[di + 2] * 0.45) + ")";
      var dot = Math.max(1.4, dpr * 1.55);
      ctx.fillRect(ds[0], ds[1], dot, dot);
    }

    ctx.restore();

    var hub = xy(hk, R, cx, cy);
    var age = seen ? (now - seen) / 1000 : 0;
    if (hub) {
      arcs.forEach(function (arc) {
        var end = xy(arc.end, R, cx, cy);
        if (!end) return;
        var dx = end[0] - hub[0];
        var dy = end[1] - hub[1];
        var len = Math.hypot(dx, dy) || 1;
        var bow = Math.min(R * 0.22, len * 0.22);
        var px = -dy / len * bow;
        var py = dx / len * bow;
        if (py > 0) { px = -px; py = -py; }
        var cpx = (hub[0] + end[0]) / 2 + px;
        var cpy = (hub[1] + end[1]) / 2 + py;
        ctx.beginPath();
        ctx.moveTo(hub[0], hub[1]);
        ctx.quadraticCurveTo(cpx, cpy, end[0], end[1]);
        ctx.strokeStyle = "rgba(186, 232, 255, 0.92)";
        ctx.lineWidth = Math.max(1.35, dpr * 1.35);
        ctx.shadowColor = "rgba(140, 214, 255, 0.95)";
        ctx.shadowBlur = 7 * dpr;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(end[0], end[1], 2.6 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(190, 235, 255, 0.95)";
        ctx.shadowBlur = 8 * dpr;
        ctx.fill();
        ctx.shadowBlur = 0;
        if (!reduced) {
          var t = (age * 0.16 + arc.phase) % 1;
          var u = 1 - t;
          var fx = u * u * hub[0] + 2 * u * t * cpx + t * t * end[0];
          var fy = u * u * hub[1] + 2 * u * t * cpy + t * t * end[1];
          ctx.beginPath();
          ctx.arc(fx, fy, 2.2 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }
      });

      var pulse = reduced ? 0.85 : 0.7 + Math.sin(now / 700) * 0.18;
      var burst = ctx.createRadialGradient(hub[0], hub[1], 0, hub[0], hub[1], 46 * dpr);
      burst.addColorStop(0, "rgba(255,255,255,1)");
      burst.addColorStop(0.16, "rgba(210,242,255,1)");
      burst.addColorStop(0.4, "rgba(90, 196, 255," + pulse + ")");
      burst.addColorStop(1, "rgba(0,150,220,0)");
      ctx.fillStyle = burst;
      ctx.beginPath();
      ctx.arc(hub[0], hub[1], 46 * dpr, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(hub[0], hub[1], 4.4 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(255,255,255,0.95)";
      ctx.shadowBlur = 12 * dpr;
      ctx.fill();
      ctx.shadowBlur = 0;
      if (tag) {
        var left = hub[0] / dpr + 16;
        var top = hub[1] / dpr - 46;
        var maxX = Math.max(6, stage.clientWidth - tag.offsetWidth - 6);
        var maxY = Math.max(6, stage.clientHeight - tag.offsetHeight - 6);
        tag.hidden = false;
        tag.style.left = Math.min(maxX, Math.max(6, left)) + "px";
        tag.style.top = Math.min(maxY, Math.max(6, top)) + "px";
      }
    }

    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = Math.max(1.5, dpr * 1.4);
    ctx.stroke();
  }

  function frame(now) {
    if (!visible || document.hidden) { raf = 0; return; }
    draw(now);
    if (reduced) { raf = 0; return; }
    raf = window.requestAnimationFrame(frame);
  }
  function wake() {
    if (!raf && visible && !document.hidden) raf = window.requestAnimationFrame(frame);
  }

  resize();
  if (typeof ResizeObserver === "function") {
    new ResizeObserver(function () { resize(); draw(performance.now()); }).observe(stage);
  } else {
    window.addEventListener("resize", function () { resize(); draw(performance.now()); });
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries.some(function (entry) { return entry.isIntersecting; });
      if (visible && !seen) {
        seen = performance.now();
        stage.classList.add("is-in");
        runCounts();
      }
      if (visible) wake();
    }, { threshold: 0.15 }).observe(stage);
  } else {
    visible = true;
    seen = performance.now();
    stage.classList.add("is-in");
    runCounts();
    wake();
  }
  document.addEventListener("visibilitychange", wake);

  function runCounts() {
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = Number(el.getAttribute("data-count"));
      var plus = el.getAttribute("data-format") === "plus";
      function paint(value) {
        var n = Math.round(value);
        el.textContent = plus ? n.toLocaleString("en-US") + "+" : String(n);
      }
      if (reduced) { paint(target); return; }
      var start = performance.now();
      function step(now) {
        var t = Math.min(1, (now - start) / 1100);
        paint(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    });
  }

  stage.setAttribute("aria-label", document.documentElement.classList.contains("lang-en")
    ? "A flat globe. Hong Kong is marked as the hub. The points illustrate a global network. They are not association offices."
    : "平面地球示意图，香港总部标在右侧。节点是全球网络示意，不是协会的分支机构。");
})();
