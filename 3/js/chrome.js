(function () {
  var lang = "zh";
  try { lang = localStorage.getItem("fbsd-lang") === "en" ? "en" : "zh"; } catch (e) {}
  document.documentElement.classList.toggle("lang-en", lang === "en");
  document.documentElement.lang = lang === "en" ? "en" : "zh-Hans";

  var page = document.body.getAttribute("data-page") || "";
  var about = ["about", "mission", "history", "governance", "leadership"];
  var standards = ["standards", "pledge", "indicators"];
  var join = ["join", "apply", "collaborate", "contact"];

  function current(ids) {
    return ids.indexOf(page) !== -1 ? ' aria-current="page"' : "";
  }
  function link(href, ids, zh, en) {
    return '<a href="' + href + '"' + current(ids) + '><span class="zh">' + zh + '</span><span class="en">' + en + "</span></a>";
  }
  function item(href, ids, zh, en) {
    return "<li>" + link(href, ids, zh, en) + "</li>";
  }

  var header =
    '<a class="skip" href="#main"><span class="zh">跳到正文</span><span class="en">Skip to content</span></a>' +
    '<header class="site-header">' +
    '<div class="util">' +
    link("standards.html", standards, "标准与工具", "Standards") +
    link("research.html", ["research"], "研究", "Research") +
    link("events.html", ["events", "founding"], "活动", "Events") +
    link("contact.html", ["contact"], "联系", "Contact") +
    '<div class="lang-switch" role="group" aria-label="Language">' +
    '<button class="lang-btn" type="button" data-lang="zh" aria-pressed="' + (lang === "zh" ? "true" : "false") + '">中文</button>' +
    '<button class="lang-btn" type="button" data-lang="en" aria-pressed="' + (lang === "en" ? "true" : "false") + '">EN</button>' +
    "</div>" +
    '<a class="btn btn-purple" href="apply.html"><span class="zh">申请加入</span><span class="en">Apply</span></a>' +
    "</div>" +
    '<div class="bar">' +
    '<a class="brand" href="index.html"><img src="img/logo.jpg" alt="FBSD"></a>' +
    '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-panel"><span class="zh">菜单</span><span class="en">Menu</span></button>' +
    '<nav class="site-nav" aria-label="Main">' +
    '<div class="menu">' +
    link("about.html", about, "关于", "About") +
    '<div class="t-dropdown" data-origin="top-left">' +
    link("about.html", ["about"], "网络简介", "The network") +
    link("mission.html", ["mission"], "使命与原则", "Mission") +
    link("history.html", ["history"], "发展沿革", "History") +
    link("governance.html", ["governance"], "治理架构", "Governance") +
    link("leadership.html", ["leadership"], "领导团队", "Leadership") +
    "</div></div>" +
    '<div class="menu">' +
    link("standards.html", standards, "标准与工具", "Standards") +
    '<div class="t-dropdown" data-origin="top-left">' +
    link("standards.html", ["standards"], "工具总览", "Toolkit") +
    link("pledge.html", ["pledge"], "承诺2030", "Pledge 2030") +
    link("indicators.html", ["indicators"], "可持续发展指标", "Indicators") +
    "</div></div>" +
    link("research.html", ["research"], "研究", "Research") +
    link("events.html", ["events", "founding"], "活动与对话", "Events") +
    link("learning.html", ["learning"], "培养", "Learning") +
    '<div class="menu">' +
    link("join.html", join, "加入", "Join") +
    '<div class="t-dropdown" data-origin="top-right">' +
    link("join.html", ["join"], "会员制度", "Membership") +
    link("apply.html", ["apply"], "提交申请", "Apply") +
    link("collaborate.html", ["collaborate"], "合作与赞助", "Collaborate") +
    link("contact.html", ["contact"], "联系", "Contact") +
    "</div></div>" +
    "</nav>" +
    '<button class="search-open" type="button" aria-expanded="false" aria-controls="search-dialog"><span class="zh">搜索</span><span class="en">Search</span></button>' +
    "</div>" +
    '<div class="t-panel-slide mobile-panel" id="mobile-panel" data-open="false">' +
    link("about.html", about, "关于", "About") +
    link("standards.html", standards, "标准与工具", "Standards") +
    link("pledge.html", ["pledge"], "承诺2030", "Pledge 2030") +
    link("research.html", ["research"], "研究", "Research") +
    link("events.html", ["events", "founding"], "活动与对话", "Events") +
    link("learning.html", ["learning"], "培养", "Learning") +
    link("join.html", join, "加入", "Join") +
    link("apply.html", ["apply"], "申请加入", "Apply") +
    "</div></header>" +
    '<div class="search-layer" id="search-layer">' +
    '<div class="t-modal" id="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-label">' +
    '<button class="search-close" type="button"><span class="zh">关闭</span><span class="en">Close</span></button>' +
    '<p id="search-label"><span class="zh">在本站查找</span><span class="en">Search this site</span></p>' +
    '<input id="search-input" type="search" autocomplete="off">' +
    "<ul>" +
    item("about.html", ["about"], "网络简介", "The network") +
    item("mission.html", ["mission"], "使命与原则", "Mission") +
    item("pledge.html", ["pledge"], "承诺2030", "Pledge 2030") +
    item("indicators.html", ["indicators"], "可持续发展指标", "Indicators") +
    item("research.html", ["research"], "研究", "Research") +
    item("events.html", ["events"], "活动与对话", "Events") +
    item("learning.html", ["learning"], "培养", "Learning") +
    item("join.html", ["join"], "会员制度", "Membership") +
    item("apply.html", ["apply"], "提交申请", "Apply") +
    item("contact.html", ["contact"], "联系", "Contact") +
    "</ul></div></div>";

  document.write(header);
})();
