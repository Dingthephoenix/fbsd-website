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

  document.querySelectorAll(".menu").forEach(function (menu) {
    var panel = menu.querySelector(".t-dropdown");
    var trigger = menu.querySelector(":scope > a");
    if (!panel || !trigger) return;
    var closeTimer;
    function open() {
      clearTimeout(closeTimer);
      panel.classList.remove("is-closing");
      panel.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
    function close() {
      panel.classList.remove("is-open");
      panel.classList.add("is-closing");
      trigger.setAttribute("aria-expanded", "false");
      closeTimer = setTimeout(function () { panel.classList.remove("is-closing"); }, 150);
    }
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", function (event) {
      if (panel.classList.contains("is-open")) return;
      event.preventDefault();
      open();
    });
    menu.addEventListener("mouseenter", open);
    menu.addEventListener("mouseleave", close);
    menu.addEventListener("focusout", function (event) {
      if (!menu.contains(event.relatedTarget)) close();
    });
  });

  var toggle = document.querySelector(".nav-toggle");
  var mobile = document.getElementById("mobile-panel");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      var open = mobile.getAttribute("data-open") !== "true";
      mobile.setAttribute("data-open", open ? "true" : "false");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  var searchOpen = document.querySelector(".search-open");
  var searchLayer = document.getElementById("search-layer");
  var searchDialog = document.getElementById("search-dialog");
  var searchInput = document.getElementById("search-input");
  function closeSearch() {
    if (!searchDialog) return;
    searchDialog.classList.remove("is-open");
    searchDialog.classList.add("is-closing");
    if (searchOpen) searchOpen.setAttribute("aria-expanded", "false");
    setTimeout(function () {
      searchDialog.classList.remove("is-closing");
      if (searchLayer) searchLayer.classList.remove("is-shown");
    }, 150);
  }
  if (searchOpen && searchLayer && searchDialog) {
    searchOpen.addEventListener("click", function () {
      searchLayer.classList.add("is-shown");
      searchDialog.classList.remove("is-closing");
      searchDialog.classList.add("is-open");
      searchOpen.setAttribute("aria-expanded", "true");
      if (searchInput) searchInput.focus();
    });
    searchLayer.addEventListener("click", function (event) {
      if (event.target === searchLayer) closeSearch();
    });
    var searchClose = searchDialog.querySelector(".search-close");
    if (searchClose) searchClose.addEventListener("click", closeSearch);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeSearch();
    });
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        var q = searchInput.value.trim().toLowerCase();
        searchDialog.querySelectorAll("li").forEach(function (li) {
          li.hidden = q.length > 0 && li.textContent.toLowerCase().indexOf(q) === -1;
        });
      });
    }
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
