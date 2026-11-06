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
    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (img, i) { img.classList.toggle("is-active", i === index); });
    }
    hero.querySelector(".hero-prev").addEventListener("click", function () { show(index - 1); });
    hero.querySelector(".hero-next").addEventListener("click", function () { show(index + 1); });
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
})();
