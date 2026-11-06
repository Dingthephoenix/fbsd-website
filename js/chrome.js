(function () {
  var lang = "zh";
  try {
    lang = localStorage.getItem("fbsd-lang") === "en" ? "en" : "zh";
  } catch (e) {}
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
    return '<a href="' + href + '"' + current(ids) + '><span class="zh">' + zh + "</span><span class=\"en\">" + en + "</span></a>";
  }

  var header =
    '<a class="skip" href="#main"><span class="zh">跳到正文</span><span class="en">Skip to content</span></a>' +
    '<header class="site-header">' +
    '<div class="header-inner">' +
    '<a class="brand" href="index.html"><img src="img/logo.jpg" alt="FBSD, Family Business for Sustainable Development"></a>' +
    '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="zh">菜单</span><span class="en">Menu</span></button>' +
    '<nav class="site-nav" id="site-nav" aria-label="Main">' +
    link("index.html", ["home"], "首页", "Home") +
    '<div class="menu">' +
    link("about.html", about, "关于", "About") +
    '<div class="menu-panel">' +
    link("about.html", ["about"], "网络简介", "The network") +
    link("mission.html", ["mission"], "使命与原则", "Mission") +
    link("history.html", ["history"], "发展沿革", "History") +
    link("governance.html", ["governance"], "治理架构", "Governance") +
    link("leadership.html", ["leadership"], "领导团队", "Leadership") +
    "</div></div>" +
    '<div class="menu">' +
    link("standards.html", standards, "标准与工具", "Standards") +
    '<div class="menu-panel">' +
    link("standards.html", ["standards"], "工具总览", "Toolkit") +
    link("pledge.html", ["pledge"], "承诺2030", "Pledge 2030") +
    link("indicators.html", ["indicators"], "可持续发展指标", "Indicators") +
    "</div></div>" +
    link("research.html", ["research"], "研究", "Research") +
    link("events.html", ["events", "founding"], "活动与对话", "Events") +
    link("learning.html", ["learning"], "培养", "Learning") +
    '<div class="menu">' +
    link("join.html", join, "加入", "Join") +
    '<div class="menu-panel">' +
    link("join.html", ["join"], "会员制度", "Membership") +
    link("apply.html", ["apply"], "提交申请", "Apply") +
    link("collaborate.html", ["collaborate"], "合作与赞助", "Collaborate") +
    link("contact.html", ["contact"], "联系", "Contact") +
    "</div></div></nav>" +
    '<div class="header-tools">' +
    '<div class="lang-switch" role="group" aria-label="Language">' +
    '<button class="lang-btn" type="button" data-lang="zh" aria-pressed="' + (lang === "zh" ? "true" : "false") + '">中文</button>' +
    '<button class="lang-btn" type="button" data-lang="en" aria-pressed="' + (lang === "en" ? "true" : "false") + '">EN</button>' +
    "</div>" +
    '<a class="btn" href="apply.html"><span class="zh">申请加入</span><span class="en">Apply</span></a>' +
    "</div></div>" +
    '<div class="sdg-bar" aria-hidden="true">' +
    ["#e5243b", "#dda63a", "#4c9f38", "#c5192d", "#ff3a21", "#26bde2", "#fcc30b", "#a21942", "#fd6925", "#dd1367", "#fd9d24", "#bf8b2e", "#3f7e44", "#0a97d9", "#56c02b", "#00689d", "#19486a"]
      .map(function (c) { return '<i style="background:' + c + '"></i>'; })
      .join("") +
    "</div></header>";

  document.write(header);
})();
