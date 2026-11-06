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

  var header = document.getElementById("main-navbar");
  function stick() {
    if (header) header.classList.toggle("is-stuck", window.scrollY > 8);
  }
  stick();
  window.addEventListener("scroll", stick, { passive: true });

  document.querySelectorAll(".has-sub").forEach(function (item) {
    var btn = item.querySelector(".nav-link");
    var panel = item.querySelector(".t-dropdown");
    if (!btn || !panel) return;
    var timer;
    function open() {
      clearTimeout(timer);
      document.querySelectorAll(".t-dropdown.is-open").forEach(function (el) {
        if (el !== panel) closeEl(el);
      });
      panel.classList.remove("is-closing");
      panel.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
    function closeEl(el) {
      var owner = el.closest(".has-sub");
      el.classList.remove("is-open");
      el.classList.add("is-closing");
      if (owner) owner.querySelector(".nav-link").setAttribute("aria-expanded", "false");
      setTimeout(function () { el.classList.remove("is-closing"); }, 150);
    }
    function close() { closeEl(panel); }
    item.addEventListener("mouseenter", open);
    item.addEventListener("mouseleave", function () { timer = setTimeout(close, 80); });
    btn.addEventListener("click", function () {
      if (panel.classList.contains("is-open")) close(); else open();
    });
  });

  var mega = document.getElementById("mega-menu");
  var back = document.getElementById("mega-back");
  var burger = document.querySelector(".burger");
  function setMega(open) {
    if (!mega) return;
    mega.setAttribute("data-open", String(open));
    if (back) {
      back.hidden = !open;
      back.classList.toggle("is-open", open);
    }
    document.body.classList.toggle("mega-lock", open);
    if (burger) burger.setAttribute("aria-expanded", String(open));
  }
  if (burger) burger.addEventListener("click", function () { setMega(mega.getAttribute("data-open") !== "true"); });
  if (back) back.addEventListener("click", function () { setMega(false); });
  document.querySelectorAll("[data-mega-close]").forEach(function (btn) {
    btn.addEventListener("click", function () { setMega(false); });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMega(false);
      closeSearch();
    }
  });

  var dialog = document.getElementById("search-dialog");
  var searchInput = document.getElementById("site-search");
  function openSearch() {
    if (!dialog) return;
    dialog.hidden = false;
    dialog.classList.remove("is-closing");
    dialog.classList.add("is-open");
    if (searchInput) searchInput.focus();
  }
  function closeSearch() {
    if (!dialog || !dialog.classList.contains("is-open")) return;
    dialog.classList.remove("is-open");
    dialog.classList.add("is-closing");
    setTimeout(function () {
      dialog.classList.remove("is-closing");
      dialog.hidden = true;
    }, 150);
  }
  document.querySelectorAll("[data-search]").forEach(function (btn) {
    btn.addEventListener("click", openSearch);
  });
  if (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeSearch();
    });
  }
  if (searchInput && dialog) {
    searchInput.addEventListener("input", function () {
      var q = searchInput.value.toLowerCase();
      dialog.querySelectorAll("li").forEach(function (row) {
        row.hidden = q !== "" && row.textContent.toLowerCase().indexOf(q) === -1;
      });
    });
  }

  if (window.Swiper && document.querySelector(".hero .swiper")) {
    var bg = document.getElementById("slider-bg");
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".hero-tabs button"));
    var swiper = new Swiper(".hero .swiper", {
      loop: true,
      speed:600,
      autoplay:{delay:5e3,disableOnInteraction:!1},
      on: {
        init: sync,
        slideChange: sync
      }
    });
    function sync(sw) {
      var slide = sw.slides[sw.activeIndex];
      var url = slide && slide.getAttribute("data-url");
      if (bg && url) bg.style.backgroundImage = 'url("' + url + '")';
      var real = typeof sw.realIndex === "number" ? sw.realIndex : 0;
      tabs.forEach(function (tab, i) { tab.classList.toggle("is-on", i === real); });
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { swiper.slideToLoop(i); });
    });
  }

  document.querySelectorAll("[data-tabs]").forEach(function (bar) {
    var tabs = Array.prototype.slice.call(bar.querySelectorAll(".t-tab"));
    var panels = document.querySelectorAll(bar.getAttribute("data-tabs"));
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var key = tab.getAttribute("data-filter");
        tabs.forEach(function (item) { item.setAttribute("aria-selected", String(item === tab)); });
        panels.forEach(function (card) {
          var tags = (card.getAttribute("data-tags") || "").split(/\s+/);
          card.hidden = key !== "all" && tags.indexOf(key) === -1;
        });
      });
    });
  });

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
        if (!list) return;
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

  document.querySelectorAll(".t-acc > button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var acc = btn.parentElement;
      acc.setAttribute("data-open", acc.getAttribute("data-open") === "true" ? "false" : "true");
    });
  });

  document.querySelectorAll("form[data-static]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var value = (input.value || "").trim();
        var field = input.closest(".field") || input.parentElement;
        var err = field.querySelector(".err");
        var valid = value !== "";
        if (input.type === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (err) err.textContent = valid ? "" : (document.documentElement.classList.contains("lang-en") ? "Required" : "请填写");
        if (!valid) ok = false;
      });
      if (!ok) return;
      var done = form.parentElement.querySelector("[data-success]") || form.nextElementSibling;
      form.hidden = true;
      if (done) done.hidden = false;
    });
  });
})();
