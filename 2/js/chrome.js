(function () {
  var lang = "zh";
  try { lang = localStorage.getItem("fbsd-lang") === "en" ? "en" : "zh"; } catch (e) {}
  document.documentElement.classList.toggle("lang-en", lang === "en");
  document.documentElement.lang = lang === "en" ? "en" : "zh-Hans";

  var page = document.body.getAttribute("data-page") || "";
  var about = ["about", "mission", "history", "governance", "leadership"];
  var how = ["standards", "pledge", "indicators", "learning"];
  var news = ["events", "founding", "research"];
  var join = ["join", "apply", "collaborate", "contact"];

  function current(ids) {
    return ids.indexOf(page) !== -1 ? ' aria-current="page"' : "";
  }
  function link(href, ids, zh, en) {
    return '<a href="' + href + '"' + current(ids) + '><span class="zh">' + zh + '</span><span class="en">' + en + "</span></a>";
  }
  var ico = {
    menu: '<svg class="icon lucide lucide-menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>',
    search: '<svg class="icon lucide lucide-search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',
    close: '<svg class="icon lucide lucide-x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    chev: '<svg class="icon lucide lucide-chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    arrow: '<svg class="icon lucide lucide-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>'
  };

  var header =
    '<a class="skip" href="#main"><span class="zh">跳到正文</span><span class="en">Skip to content</span></a>' +
    '<header class="site-header" id="main-navbar">' +
    '<div class="header-left">' +
    '<button class="burger" type="button" aria-controls="mega-menu" aria-expanded="false" aria-label="Menu">' + ico.menu + "</button>" +
    '<ul class="inline-nav" id="mega-menu-inline">' +
    '<li class="has-sub"><button class="nav-link" type="button" aria-expanded="false"><span class="zh">关于</span><span class="en">About</span>' + ico.chev + "</button>" +
    '<div class="t-dropdown" data-origin="top-left">' +
    link("about.html", ["about"], "网络简介", "The network") +
    link("mission.html", ["mission"], "使命与原则", "Mission") +
    link("history.html", ["history"], "发展沿革", "History") +
    link("governance.html", ["governance"], "治理架构", "Governance") +
    link("leadership.html", ["leadership"], "领导团队", "Leadership") +
    "</div></li>" +
    '<li class="has-sub"><button class="nav-link" type="button" aria-expanded="false"><span class="zh">如何参与</span><span class="en">How to</span>' + ico.chev + "</button>" +
    '<div class="t-dropdown" data-origin="top-left">' +
    link("standards.html", ["standards"], "标准与工具", "Standards") +
    link("pledge.html", ["pledge"], "承诺2030", "Pledge 2030") +
    link("indicators.html", ["indicators"], "可持续发展指标", "Indicators") +
    link("learning.html", ["learning"], "培养", "Learning") +
    "</div></li>" +
    '<li class="has-sub"><button class="nav-link" type="button" aria-expanded="false"><span class="zh">动态</span><span class="en">What\'s new</span>' + ico.chev + "</button>" +
    '<div class="t-dropdown" data-origin="top-left">' +
    link("events.html", ["events", "founding"], "活动与对话", "Events") +
    link("research.html", ["research"], "研究", "Research") +
    "</div></li>" +
    "<li>" + link("join.html", join, "会员", "Members") + "</li>" +
    "<li>" + link("pledge.html", ["pledge"], "承诺2030", "Pledge 2030") + "</li>" +
    "</ul></div>" +
    '<a class="header-brand" href="index.html" aria-label="FBSD"><img src="img/logo.jpg" alt="FBSD"></a>' +
    '<div class="header-right">' +
    '<button class="icon-btn" type="button" data-search aria-haspopup="dialog">' + ico.search + '<span class="sr-only"><span class="zh">搜索</span><span class="en">Search</span></span></button>' +
    '<div class="lang-switch" role="group" aria-label="Language">' +
    '<button class="lang-btn" type="button" data-lang="zh" aria-pressed="' + (lang === "zh") + '">中文</button>' +
    '<button class="lang-btn" type="button" data-lang="en" aria-pressed="' + (lang === "en") + '">EN</button>' +
    "</div>" +
    '<a class="btn btn-login" href="contact.html"><span class="zh">联系</span><span class="en">Contact</span></a>' +
    '<a class="btn btn-sm" href="apply.html"><span class="zh">申请加入</span><span class="en">Become a member</span>' + ico.arrow + "</a>" +
    "</div></header>" +
    '<div class="mega-back" id="mega-back" hidden></div>' +
    '<nav class="t-panel-slide" id="mega-menu" data-open="false" aria-label="Menu">' +
    '<div class="mega-head"><button type="button" data-mega-close aria-label="Close">' + ico.close + "</button>" +
    '<a href="index.html"><img src="img/logo.jpg" alt="" width="40"></a></div>' +
    '<ul class="mega-list">' +
    "<li>" + link("about.html", about, "关于", "About") + "</li>" +
    "<li>" + link("standards.html", how, "标准与工具", "Standards") + "</li>" +
    "<li>" + link("research.html", ["research"], "研究", "Research") + "</li>" +
    "<li>" + link("events.html", news, "活动", "Events") + "</li>" +
    "<li>" + link("learning.html", ["learning"], "培养", "Learning") + "</li>" +
    "<li>" + link("join.html", join, "加入", "Join") + "</li>" +
    "<li>" + link("apply.html", ["apply"], "申请加入", "Apply") + "</li>" +
    '<li class="mega-lang"><button class="lang-btn" type="button" data-lang="zh">中文</button> <button class="lang-btn" type="button" data-lang="en">EN</button></li>' +
    "</ul></nav>" +
    '<div class="t-modal" id="search-dialog" role="dialog" aria-modal="true" hidden>' +
    '<div class="search-box">' +
    '<label class="sr-only" for="site-search"><span class="zh">搜索本站</span><span class="en">Search this site</span></label>' +
    '<input id="site-search" type="search" placeholder="Search">' +
    "<ul>" +
    "<li>" + link("about.html", [], "网络简介", "The network") + "</li>" +
    "<li>" + link("pledge.html", [], "承诺2030", "Pledge 2030") + "</li>" +
    "<li>" + link("indicators.html", [], "可持续发展指标", "Indicators") + "</li>" +
    "<li>" + link("research.html", [], "研究", "Research") + "</li>" +
    "<li>" + link("events.html", [], "活动与对话", "Events") + "</li>" +
    "<li>" + link("join.html", [], "会员制度", "Membership") + "</li>" +
    "<li>" + link("apply.html", [], "提交申请", "Apply") + "</li>" +
    "<li>" + link("contact.html", [], "联系秘书处", "Contact") + "</li>" +
    "</ul></div></div>";

  document.write(header);
})();
