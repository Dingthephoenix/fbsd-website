(function () {
  function titleFor(lang) {
    var body = document.body;
    return lang === "en" ? body.getAttribute("data-title-en") : body.getAttribute("data-title-zh");
  }

  function applyLang(lang) {
    var en = lang === "en";
    document.documentElement.classList.toggle("lang-en", en);
    document.documentElement.lang = en ? "en" : "zh-Hans";
    try { localStorage.setItem("fbsd-lang", en ? "en" : "zh"); } catch (e) {}
    var next = titleFor(en ? "en" : "zh");
    if (next) document.title = next;
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === (en ? "en" : "zh")));
    });
  }

  applyLang(document.documentElement.classList.contains("lang-en") ? "en" : "zh");

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () { applyLang(btn.getAttribute("data-lang")); });
  });

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var list = document.querySelector(group.getAttribute("data-list"));
    var empty = document.querySelector(group.getAttribute("data-empty"));
    group.querySelectorAll("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        group.querySelectorAll("[data-filter]").forEach(function (item) {
          item.setAttribute("aria-pressed", "false");
        });
        btn.setAttribute("aria-pressed", "true");
        var key = btn.getAttribute("data-filter");
        var shown = 0;
        list.querySelectorAll("[data-tags]").forEach(function (row) {
          var tags = row.getAttribute("data-tags").split(/\s+/);
          var on = key === "all" || tags.indexOf(key) !== -1;
          row.hidden = !on;
          if (on) shown += 1;
        });
        if (empty) empty.hidden = shown !== 0;
      });
    });
  });

  var hero = document.querySelector("[data-hero]");
  if (hero) {
    var slides = Array.prototype.slice.call(hero.querySelectorAll(".hero-slides img"));
    var index = 0;
    var timer = 0;
    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (img, i) { img.classList.toggle("is-active", i === index); });
    }
    function arm() {
      window.clearInterval(timer);
      timer = window.setInterval(function () { show(index + 1); }, 2000);
    }
    hero.querySelector(".hero-prev").addEventListener("click", function () {
      show(index - 1);
      arm();
    });
    hero.querySelector(".hero-next").addEventListener("click", function () {
      show(index + 1);
      arm();
    });
    arm();
  }

  document.querySelectorAll("form[data-static]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var value = (input.value || "").trim();
        var bad = !value;
        if (!bad && input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) bad = true;
        field.classList.toggle("is-invalid", bad);
        var err = field.querySelector(".err");
        if (err) {
          var zh = bad ? (input.type === "email" && value ? "请填写有效邮箱。" : "请填写此项。") : "";
          var en = bad ? (input.type === "email" && value ? "Enter a valid email." : "This field is required.") : "";
          err.innerHTML = '<span class="zh">' + zh + '</span><span class="en">' + en + "</span>";
        }
        if (bad) ok = false;
      });
      if (!ok) {
        var first = form.querySelector(".is-invalid input, .is-invalid select, .is-invalid textarea");
        if (first) first.focus();
        return;
      }
      form.hidden = true;
      var done = form.parentElement.querySelector("[data-success]");
      if (done) done.hidden = false;
    });
  });

  var historyRoot = document.querySelector("[data-history]");
  if (historyRoot) {
    var tabs = Array.prototype.slice.call(historyRoot.querySelectorAll(".history-axis [role=tab]"));
    function selectHistory(tab) {
      tabs.forEach(function (item) {
        var on = item === tab;
        item.setAttribute("aria-selected", on ? "true" : "false");
        item.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(item.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
    }
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { selectHistory(tab); });
      tab.addEventListener("keydown", function (event) {
        var next = -1;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next < 0) return;
        event.preventDefault();
        selectHistory(tabs[next]);
        tabs[next].focus();
      });
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll(".history-switch"), function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll("[role=tab]"));
    function selectSwitch(tab) {
      tabs.forEach(function (item) {
        var on = item === tab;
        item.setAttribute("aria-selected", on ? "true" : "false");
        item.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(item.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
    }
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { selectSwitch(tab); });
      tab.addEventListener("keydown", function (event) {
        var next = -1;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next < 0) return;
        event.preventDefault();
        selectSwitch(tabs[next]);
        tabs[next].focus();
      });
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-history-gallery]"), function (gallery) {
    var images = Array.prototype.slice.call(gallery.querySelectorAll(".history-gallery-frame img"));
    var zh = gallery.querySelector("[data-gallery-zh]");
    var en = gallery.querySelector("[data-gallery-en]");
    var dots = Array.prototype.slice.call(gallery.querySelectorAll("[data-gallery-dot]"));
    var frame = gallery.querySelector(".history-gallery-frame");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var index = 0;
    var busy = false;
    var drag = null;
    images.forEach(function (img, i) { if (!img.hidden) index = i; });
    function settle(next) {
      next = (next + images.length) % images.length;
      index = next;
      images.forEach(function (img, i) {
        img.hidden = i !== next;
        img.classList.remove("is-over");
        img.style.transform = "";
        img.style.transition = "";
      });
      zh.textContent = images[next].getAttribute("data-zh");
      en.textContent = images[next].getAttribute("data-en");
      dots.forEach(function (dot, i) {
        if (i === next) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }
    function go(target) {
      var next = (target + images.length) % images.length;
      if (next === index || busy) return;
      if (reduce) {
        settle(next);
        return;
      }
      var forward = (next - index + images.length) % images.length;
      var dir = forward <= images.length / 2 ? 1 : -1;
      var current = images[index];
      var incoming = images[next];
      incoming.hidden = false;
      incoming.classList.add("is-over");
      current.style.transition = "none";
      incoming.style.transition = "none";
      current.style.transform = "translateX(0)";
      incoming.style.transform = "translateX(" + (dir > 0 ? "100%" : "-100%") + ")";
      incoming.offsetWidth;
      play(next, dir > 0 ? "-100%" : "100%", "0");
    }
    function play(next, currentEnd, incomingEnd) {
      var current = images[index];
      var incoming = images[next];
      busy = true;
      incoming.hidden = false;
      incoming.classList.add("is-over");
      var shift = "transform 0.42s cubic-bezier(0.22, 0.61, 0.36, 1)";
      current.style.transition = shift;
      incoming.style.transition = shift;
      current.style.transform = "translateX(" + currentEnd + ")";
      incoming.style.transform = "translateX(" + incomingEnd + ")";
      var finished = false;
      function done() {
        if (finished) return;
        finished = true;
        busy = false;
        settle(next);
      }
      current.addEventListener("transitionend", function onEnd(event) {
        if (event.propertyName !== "transform") return;
        current.removeEventListener("transitionend", onEnd);
        done();
      });
      window.setTimeout(done, 520);
    }
    function place(dx) {
      var width = frame.clientWidth || 1;
      var dir = dx < 0 ? 1 : -1;
      var incoming = images[(index + dir + images.length) % images.length];
      var current = images[index];
      var shift = Math.max(Math.min(dx, width), -width);
      images.forEach(function (img) {
        if (img === current || img === incoming) return;
        img.hidden = true;
        img.classList.remove("is-over");
        img.style.transform = "";
        img.style.transition = "";
      });
      incoming.hidden = false;
      incoming.classList.add("is-over");
      current.style.transition = "none";
      incoming.style.transition = "none";
      current.style.transform = "translateX(" + shift + "px)";
      incoming.style.transform = "translateX(" + (shift + (dir > 0 ? width : -width)) + "px)";
    }
    function snapBack() {
      if (reduce) {
        settle(index);
        return;
      }
      var current = images[index];
      var shift = "transform 0.28s ease";
      current.style.transition = shift;
      current.style.transform = "translateX(0)";
      images.forEach(function (img) {
        if (img === current || img.hidden) return;
        var match = /translateX\(([-\d.]+)px\)/.exec(img.style.transform);
        var px = match ? parseFloat(match[1]) : 1;
        img.style.transition = shift;
        img.style.transform = "translateX(" + (px < 0 ? "-100%" : "100%") + ")";
      });
      window.setTimeout(function () { if (!busy) settle(index); }, 320);
    }
    dots.forEach(function (dot, dotIndex) {
      dot.addEventListener("click", function () { go(dotIndex); });
    });
    frame.addEventListener("pointerdown", function (event) {
      if (busy) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (event.pointerType === "mouse") event.preventDefault();
      drag = { x: event.clientX, y: event.clientY, id: event.pointerId, axis: "" };
      frame.classList.add("is-dragging");
      try { frame.setPointerCapture(event.pointerId); } catch (err) {}
    });
    frame.addEventListener("pointermove", function (event) {
      if (!drag || event.pointerId !== drag.id) return;
      var dx = event.clientX - drag.x;
      var dy = event.clientY - drag.y;
      if (!drag.axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        drag.axis = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
      }
      if (drag.axis !== "h") return;
      event.preventDefault();
      place(dx);
    }, { passive: false });
    function endDrag(event) {
      if (!drag || event.pointerId !== drag.id) return;
      var dx = event.clientX - drag.x;
      var axis = drag.axis;
      drag = null;
      frame.classList.remove("is-dragging");
      if (axis !== "h") return;
      if (reduce) {
        if (Math.abs(dx) >= 48) settle(index + (dx < 0 ? 1 : -1));
        else settle(index);
        return;
      }
      if (Math.abs(dx) < 48) {
        snapBack();
        return;
      }
      var dir = dx < 0 ? 1 : -1;
      var next = (index + dir + images.length) % images.length;
      play(next, dir > 0 ? "-100%" : "100%", "0");
    }
    frame.addEventListener("pointerup", endDrag);
    frame.addEventListener("pointercancel", function (event) {
      if (!drag || event.pointerId !== drag.id) return;
      drag = null;
      frame.classList.remove("is-dragging");
      snapBack();
    });
    gallery.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      go(index + (event.key === "ArrowRight" ? 1 : -1));
    });
  });
})();
