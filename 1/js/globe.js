/* GlobalNetworkGlobe — dotted WebGL globe for the association page.
   Nodes are a concept of the global network, not FBSD offices. */
(function () {
  var stage = document.querySelector("[data-globe]");
  if (!stage || !window.FBSD_LAND) return;

  var NODES = [
    { id: "hk", lat: 22.3193, lon: 114.1694, hub: true, zh: "香港", en: "Hong Kong" },
    { id: "gva", lat: 46.2044, lon: 6.1432, origin: true, zh: "日内瓦", en: "Geneva" },
    { id: "lon", lat: 51.5072, lon: -0.1276, zh: "伦敦", en: "London" },
    { id: "nyc", lat: 40.7128, lon: -74.006, zh: "纽约", en: "New York" },
    { id: "sao", lat: -23.5505, lon: -46.6333, zh: "圣保罗", en: "São Paulo" },
    { id: "syd", lat: -33.8688, lon: 151.2093, zh: "悉尼", en: "Sydney" },
    { id: "sin", lat: 1.3521, lon: 103.8198, zh: "新加坡", en: "Singapore" },
    { id: "nbo", lat: -1.2921, lon: 36.8219, zh: "内罗毕", en: "Nairobi" },
    { id: "dxb", lat: 25.2048, lon: 55.2708, zh: "迪拜", en: "Dubai" }
  ];
  var LINKS = [
    { id: "gva", lift: 0.48 },
    { id: "lon", lift: 0.36 },
    { id: "nyc", lift: 0.7 },
    { id: "sao", lift: 0.58 },
    { id: "syd", lift: 0.32 },
    { id: "sin", lift: 0.22 },
    { id: "nbo", lift: 0.44 },
    { id: "dxb", lift: 0.28 }
  ];

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var webgl = stage.querySelector(".globe-webgl");
  var over = stage.querySelector(".globe-overlay");
  var tip = stage.querySelector("[data-globe-tip]");
  var tagHk = stage.querySelector('[data-tag="hk"]');
  var tagGva = stage.querySelector('[data-tag="gva"]');
  var octx = over.getContext("2d");
  var gl = webgl.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: false });

  var yaw = -114.1694 * Math.PI / 180;
  var pitch = 0.34;
  var auto = !reduced;
  var dragging = false;
  var resumeAt = 0;
  var visible = false;
  var raf = 0;
  var last = 0;
  var entered = 0;
  var dpr = 1;
  var w = 1;
  var h = 1;
  var cam = 3.15;
  var positions = null;
  var arcs = [];

  function ll(lat, lon) {
    var p = lat * Math.PI / 180;
    var l = lon * Math.PI / 180;
    var cp = Math.cos(p);
    return [cp * Math.sin(l), Math.sin(p), cp * Math.cos(l)];
  }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, s) { return [a[0] * s, a[1] * s, a[2] * s]; }
  function apply(m, x, y, z) {
    return [
      m[0] * x + m[4] * y + m[8] * z + m[12],
      m[1] * x + m[5] * y + m[9] * z + m[13],
      m[2] * x + m[6] * y + m[10] * z + m[14],
      m[3] * x + m[7] * y + m[11] * z + m[15]
    ];
  }
  function rotY(a) {
    var c = Math.cos(a), s = Math.sin(a);
    return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
  }
  function rotX(a) {
    var c = Math.cos(a), s = Math.sin(a);
    return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
  }
  function matMul(a, b) {
    var o = new Float32Array(16);
    for (var c = 0; c < 4; c++) {
      for (var r = 0; r < 4; r++) {
        o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
      }
    }
    return o;
  }
  function perspective(fov, aspect, near, far) {
    var f = 1 / Math.tan(fov / 2);
    var nf = 1 / (near - far);
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, 2 * far * near * nf, 0
    ]);
  }
  function viewOf() {
    var ry = rotY(yaw);
    var rx = rotX(pitch);
    var model = matMul(rx, ry);
    var view = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -cam, 1]);
    return matMul(view, model);
  }

  NODES.forEach(function (node) { node.p = ll(node.lat, node.lon); });
  var byId = {};
  NODES.forEach(function (node) { byId[node.id] = node; });
  var hk = byId.hk;
  LINKS.forEach(function (link, index) {
    var to = byId[link.id];
    var pts = [];
    var n = 28;
    var mid = mul((function () {
      var v = add(hk.p, to.p);
      var len = Math.hypot(v[0], v[1], v[2]) || 1;
      return [v[0] / len, v[1] / len, v[2] / len];
    })(), 1 + link.lift);
    for (var i = 0; i <= n; i++) {
      var t = i / n;
      var u = 1 - t;
      pts.push(add(add(mul(hk.p, u * u), mul(mid, 2 * u * t)), mul(to.p, t * t)));
    }
    arcs.push({ id: link.id, pts: pts, delay: index * 0.16, phase: index * 0.13 });
  });

  var land = window.FBSD_LAND;
  var xyz = new Float32Array((land.length / 2) * 3);
  for (var i = 0, j = 0; i < land.length; i += 2, j += 3) {
    var p = ll(land[i] / 50, land[i + 1] / 50);
    xyz[j] = p[0];
    xyz[j + 1] = p[1];
    xyz[j + 2] = p[2];
  }

  var prog = null;
  var buf = null;
  var uMV = null;
  var uP = null;
  var uSize = null;
  if (gl) {
    function shader(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    var vs = shader(gl.VERTEX_SHADER, [
      "attribute vec3 aPos;",
      "uniform mat4 uMV;",
      "uniform mat4 uP;",
      "uniform float uSize;",
      "varying float vZ;",
      "void main(){",
      "  vec4 v = uMV * vec4(aPos, 1.0);",
      "  vZ = v.z;",
      "  gl_Position = uP * v;",
      "  gl_PointSize = uSize;",
      "}"
    ].join("\n"));
    var fs = shader(gl.FRAGMENT_SHADER, [
      "precision mediump float;",
      "varying float vZ;",
      "void main(){",
      "  if (vZ < -3.18) discard;",
      "  vec2 c = gl_PointCoord - vec2(0.5);",
      "  if (dot(c, c) > 0.25) discard;",
      "  gl_FragColor = vec4(0.561, 0.722, 0.875, 0.92);",
      "}"
    ].join("\n"));
    prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      gl = null;
    } else {
      buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, xyz, gl.STATIC_DRAW);
      uMV = gl.getUniformLocation(prog, "uMV");
      uP = gl.getUniformLocation(prog, "uP");
      uSize = gl.getUniformLocation(prog, "uSize");
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
  }

  function resize() {
    var rect = stage.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = Math.max(2, Math.round(rect.width * dpr));
    h = Math.max(2, Math.round(rect.height * dpr));
    webgl.width = w;
    webgl.height = h;
    over.width = w;
    over.height = h;
    if (gl) gl.viewport(0, 0, w, h);
  }

  function project(mv, proj, x, y, z) {
    var v = apply(mv, x, y, z);
    if (v[2] < -3.18) return null;
    var c = apply(proj, v[0], v[1], v[2]);
    var iw = c[3] || 1;
    return [(c[0] / iw * 0.5 + 0.5) * w, (1 - (c[1] / iw * 0.5 + 0.5)) * h, v[2]];
  }

  function drawOverlay(mv, proj, now) {
    octx.clearRect(0, 0, w, h);
    if (!gl) {
      octx.fillStyle = "rgba(143,184,223,0.9)";
      for (var di = 0; di < xyz.length; di += 3) {
        var ds = project(mv, proj, xyz[di], xyz[di + 1], xyz[di + 2]);
        if (!ds) continue;
        octx.fillRect(ds[0], ds[1], Math.max(1, dpr), Math.max(1, dpr));
      }
    }
    var center = project(mv, proj, 0, 0, 0);
    var limb = apply(proj, 1, 0, -cam);
    var radius = 0;
    if (center && limb[3]) {
      var lx = (limb[0] / limb[3] * 0.5 + 0.5) * w;
      radius = Math.abs(lx - center[0]);
      octx.beginPath();
      octx.arc(center[0], center[1], radius, 0, Math.PI * 2);
      octx.strokeStyle = "rgba(143,184,223,0.55)";
      octx.lineWidth = Math.max(1, dpr);
      octx.stroke();
    }

    var age = entered ? (now - entered) / 1000 : 0;
    octx.lineWidth = Math.max(1, dpr * 0.9);
    arcs.forEach(function (arc) {
      var fade = reduced ? 1 : Math.max(0, Math.min(1, (age - arc.delay) / 0.55));
      if (fade <= 0) return;
      octx.beginPath();
      var started = false;
      for (var k = 0; k < arc.pts.length; k++) {
        var q = arc.pts[k];
        var s = project(mv, proj, q[0], q[1], q[2]);
        if (!s) { started = false; continue; }
        if (!started) { octx.moveTo(s[0], s[1]); started = true; }
        else octx.lineTo(s[0], s[1]);
      }
      octx.strokeStyle = "rgba(0,116,184," + (0.38 * fade) + ")";
      octx.stroke();
      if (!reduced && fade > 0.8) {
        var t = (age * 0.18 + arc.phase) % 1;
        var idx = Math.min(arc.pts.length - 1, Math.floor(t * arc.pts.length));
        var flow = arc.pts[idx];
        var fs = project(mv, proj, flow[0], flow[1], flow[2]);
        if (fs) {
          octx.beginPath();
          octx.arc(fs[0], fs[1], 2.2 * dpr, 0, Math.PI * 2);
          octx.fillStyle = "rgba(0,73,135,0.95)";
          octx.fill();
        }
      }
    });

    var hit = [];
    NODES.forEach(function (node) {
      var s = project(mv, proj, node.p[0], node.p[1], node.p[2]);
      node.screen = s;
      if (!s) return;
      var rad = (node.hub ? 6.5 : node.origin ? 4.4 : 2.8) * dpr;
      if (node.hub && !reduced) {
        [0, 0.5].forEach(function (shift) {
          var pulse = ((now / 1000) * 0.36 + shift) % 1;
          octx.beginPath();
          octx.arc(s[0], s[1], rad + pulse * 22 * dpr, 0, Math.PI * 2);
          octx.strokeStyle = "rgba(0,116,184," + ((1 - pulse) * 0.45) + ")";
          octx.lineWidth = Math.max(1, dpr);
          octx.stroke();
        });
        octx.beginPath();
        octx.arc(s[0], s[1], rad * 2.1, 0, Math.PI * 2);
        octx.fillStyle = "rgba(0,116,184,0.18)";
        octx.fill();
      }
      octx.beginPath();
      octx.arc(s[0], s[1], rad, 0, Math.PI * 2);
      octx.fillStyle = node.hub ? "#0074b8" : "rgba(0,73,135,0.72)";
      octx.fill();
      hit.push(node);
    });
    placeTag(tagHk, hk.screen, 16 * dpr, -34 * dpr);
    placeTag(tagGva, byId.gva.screen, 12 * dpr, -36 * dpr);
    stage._hit = hit;
  }

  function placeTag(el, screen, dx, dy) {
    if (!el) return;
    if (!screen) { el.hidden = true; return; }
    el.hidden = false;
    var x = screen[0] / dpr + dx / dpr;
    var y = screen[1] / dpr + dy / dpr;
    var maxX = Math.max(4, stage.clientWidth - el.offsetWidth - 4);
    var maxY = Math.max(4, stage.clientHeight - el.offsetHeight - 4);
    el.style.left = Math.min(maxX, Math.max(4, x)) + "px";
    el.style.top = Math.min(maxY, Math.max(4, y)) + "px";
  }

  function draw(now) {
    var mv = viewOf();
    var proj = perspective(Math.PI / 5.2, w / h, 0.1, 20);
    if (gl && prog) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniformMatrix4fv(uMV, false, mv);
      gl.uniformMatrix4fv(uP, false, proj);
      gl.uniform1f(uSize, 2.7 * dpr);
      var loc = gl.getAttribLocation(prog, "aPos");
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, xyz.length / 3);
    }
    drawOverlay(mv, proj, now);
  }

  function loop(now) {
    if (!visible || document.hidden) { raf = 0; return; }
    var dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    if (auto && !dragging && !reduced && now > resumeAt) yaw += dt * (Math.PI * 2 / 78);
    pitch = Math.max(-0.7, Math.min(0.9, pitch));
    draw(now);
    raf = window.requestAnimationFrame(loop);
  }
  function wake() {
    if (!raf && visible && !document.hidden) {
      last = 0;
      raf = window.requestAnimationFrame(loop);
    }
  }

  resize();
  if (typeof ResizeObserver === "function") {
    new ResizeObserver(function () { resize(); if (visible) draw(performance.now()); }).observe(stage);
  } else {
    window.addEventListener("resize", resize);
  }

  var sx = 0;
  var sy = 0;
  stage.addEventListener("pointerdown", function (event) {
    dragging = true;
    auto = false;
    sx = event.clientX;
    sy = event.clientY;
    stage.classList.add("is-dragging");
    if (stage.setPointerCapture) stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener("pointermove", function (event) {
    if (!dragging) {
      hover(event);
      return;
    }
    yaw += (event.clientX - sx) * 0.005;
    pitch += (event.clientY - sy) * 0.005;
    sx = event.clientX;
    sy = event.clientY;
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove("is-dragging");
    resumeAt = performance.now() + 900;
    auto = !reduced;
  }
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);
  stage.addEventListener("pointerleave", function () {
    if (tip) tip.hidden = true;
  });
  window.addEventListener("scroll", function () {
    if (tip) tip.hidden = true;
  }, { passive: true });

  function hover(event) {
    if (!tip || !stage._hit) return;
    var rect = stage.getBoundingClientRect();
    var x = (event.clientX - rect.left) * dpr;
    var y = (event.clientY - rect.top) * dpr;
    var en = document.documentElement.classList.contains("lang-en");
    var found = null;
    var best = 18 * dpr;
    stage._hit.forEach(function (node) {
      if (node.hub || node.origin) return;
      var dx = node.screen[0] - x;
      var dy = node.screen[1] - y;
      var dist = Math.hypot(dx, dy);
      if (dist < best) { best = dist; found = node; }
    });
    if (!found) { tip.hidden = true; return; }
    tip.hidden = false;
    tip.textContent = en ? found.en : found.zh;
    tip.style.left = (found.screen[0] / dpr + 10) + "px";
    tip.style.top = (found.screen[1] / dpr - 28) + "px";
  }

  var seen = false;
  if ("IntersectionObserver" in window) {
    var watch = new IntersectionObserver(function (entries) {
      visible = entries.some(function (entry) { return entry.isIntersecting; });
      if (visible && !seen) {
        seen = true;
        entered = performance.now();
        stage.classList.add("is-in");
        runCounts();
      }
      if (visible) wake();
    }, { threshold: 0.15 });
    watch.observe(stage);
  } else {
    visible = true;
    seen = true;
    entered = performance.now();
    stage.classList.add("is-in");
    runCounts();
    wake();
  }
  document.addEventListener("visibilitychange", wake);

  function runCounts() {
    var nodes = document.querySelectorAll("[data-count]");
    nodes.forEach(function (el) {
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
        var eased = 1 - Math.pow(1 - t, 3);
        paint(target * eased);
        if (t < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    });
  }

  var en = document.documentElement.classList.contains("lang-en");
  stage.setAttribute("aria-label", en
    ? "A draggable dotted globe. Hong Kong faces forward. The points illustrate a global network. They are not association offices."
    : "可拖动的点阵地球，香港位于正面。节点是全球网络示意，不是协会的分支机构。");
})();
