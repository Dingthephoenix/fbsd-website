#!/usr/bin/env python3
"""Generate the static China Network site."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent

HEAD = """<!DOCTYPE html>
<html lang="zh-Hans">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title_zh}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Glegoo:wght@400;700&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/site.css?v=navy">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230186d1'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-family='Georgia' font-size='16' fill='white'%3EF%3C/text%3E%3C/svg%3E">
</head>
<body data-page="{page}" data-title-zh="{title_zh}" data-title-en="{title_en}">
<script src="js/chrome.js?v=logo"></script>
<main id="main">
"""

FOOT = """
</main>
<script src="js/footer.js"></script>
<script src="js/site.js"></script>
</body>
</html>
"""

WAVE = """<svg class="wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path fill="#ffffff" d="M0,46 C280,92 520,8 760,42 C1040,82 1240,18 1440,46 L1440,90 L0,90 Z"></path></svg>"""

def page(name, page_id, title_zh, title_en, desc, body):
    html = HEAD.format(page=page_id, title_zh=title_zh, title_en=title_en, desc=desc) + body + FOOT
    (ROOT / name).write_text(html, encoding="utf-8")

def hero(zh, en, lede_zh, lede_en, actions=""):
    return f"""<section class="page-hero"><div class="page-hero-inner"><h1><span class="zh">{zh}</span><span class="en">{en}</span></h1><p class="lede"><span class="zh">{lede_zh}</span><span class="en">{lede_en}</span></p>{actions}</div>{WAVE}</section>"""

ABOUT_NAV = """<nav class="subnav" aria-label="About"><a href="about.html"{about}><span class="zh">网络简介</span><span class="en">The network</span></a><a href="mission.html"{mission}><span class="zh">使命与原则</span><span class="en">Mission</span></a><a href="history.html"{history}><span class="zh">发展沿革</span><span class="en">History</span></a><a href="governance.html"{governance}><span class="zh">治理架构</span><span class="en">Governance</span></a><a href="leadership.html"{leadership}><span class="zh">领导团队</span><span class="en">Leadership</span></a></nav>"""

def about_nav(current):
    keys = ["about", "mission", "history", "governance", "leadership"]
    return ABOUT_NAV.format(**{k: ' aria-current="page"' if k == current else "" for k in keys})

STD_NAV = """<nav class="subnav" aria-label="Standards"><a href="standards.html"{standards}><span class="zh">工具总览</span><span class="en">Toolkit</span></a><a href="pledge.html"{pledge}><span class="zh">承诺2030</span><span class="en">Pledge 2030</span></a><a href="indicators.html"{indicators}><span class="zh">可持续发展指标</span><span class="en">Indicators</span></a></nav>"""

def std_nav(current):
    keys = ["standards", "pledge", "indicators"]
    return STD_NAV.format(**{k: ' aria-current="page"' if k == current else "" for k in keys})

JOIN_NAV = """<nav class="subnav" aria-label="Join"><a href="join.html"{join}><span class="zh">会员制度</span><span class="en">Membership</span></a><a href="apply.html"{apply}><span class="zh">提交申请</span><span class="en">Apply</span></a><a href="collaborate.html"{collaborate}><span class="zh">合作与赞助</span><span class="en">Collaborate</span></a><a href="contact.html"{contact}><span class="zh">联系</span><span class="en">Contact</span></a></nav>"""

def join_nav(current):
    keys = ["join", "apply", "collaborate", "contact"]
    return JOIN_NAV.format(**{k: ' aria-current="page"' if k == current else "" for k in keys})

page(
    "index.html", "home",
    "家族企业促进可持续发展中国网络",
    "Family Business for Sustainable Development China Network",
    "以标准、研究、培训与对话，推动家族企业的可持续转型。",
    f"""
<section class="hero" data-hero>
  <div class="hero-slides">
    <img class="is-active" src="img/solar.jpg?v=2" alt="阳光下的光伏板">
    <img src="img/wind.jpg?v=2" alt="海上风力发电机">
    <img src="img/forest.jpg?v=2" alt="云雾中的河流与森林">
  </div>
  <button class="hero-arrow hero-prev" type="button"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="sr-only"><span class="zh">上一张</span><span class="en">Previous</span></span></button>
  <button class="hero-arrow hero-next" type="button"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="sr-only"><span class="zh">下一张</span><span class="en">Next</span></span></button>
  <div class="hero-inner">
    <h1><span class="zh">家族企业促进可持续发展中国网络</span><span class="en">Family Business for Sustainable Development China Network</span></h1>
    <p class="lede"><span class="zh">以标准、研究、培训与对话，推动家族企业的可持续转型。</span><span class="en">Standards, research, training and dialogue for the sustainable transition of family businesses.</span></p>
    <div class="hero-actions">
      <a class="btn btn-light" href="standards.html"><span class="zh">了解标准</span><span class="en">See the standards</span></a>
      <a class="btn btn-light" href="apply.html"><span class="zh">申请加入</span><span class="en">Apply to join</span></a>
    </div>
  </div>
  <svg class="wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path fill="#f3f8fc" d="M0,46 C280,92 520,8 760,42 C1040,82 1240,18 1440,46 L1440,90 L0,90 Z"></path></svg>
</section>
<section class="band band-mist">
  <div class="wrap">
    <h2><span class="zh">四项原则</span><span class="en">Four principles</span></h2>
    <div class="quad">
      <a href="pledge.html#growth"><h3><span class="zh">可持续增长</span><span class="en">Sustainable growth</span></h3><p><span class="zh">以长期价值创造衡量经营成果。</span><span class="en">Measure performance by long-term value creation.</span></p></a>
      <a href="pledge.html#environment"><h3><span class="zh">环境守护</span><span class="en">Environmental stewardship</span></h3><p><span class="zh">把气候与资源约束纳入投资和运营决策。</span><span class="en">Bring climate and resource limits into investment and operations.</span></p></a>
      <a href="pledge.html#inclusion"><h3><span class="zh">社会包容</span><span class="en">Social inclusion</span></h3><p><span class="zh">让员工、社区与供应链分享增长。</span><span class="en">Share growth with workers, communities and supply chains.</span></p></a>
      <a href="pledge.html#governance"><h3><span class="zh">良善治理</span><span class="en">Good governance</span></h3><p><span class="zh">以透明、问责和制度安排保障代际交接。</span><span class="en">Use transparency, accountability and rules for succession.</span></p></a>
    </div>
  </div>
</section>
<section class="band">
  <div class="wrap">
    <h2><span class="zh">四条主线</span><span class="en">Four lines of work</span></h2>
    <div class="work-list">
      <a href="standards.html"><strong><span class="zh">标准</span><span class="en">Standards</span></strong><span><span class="zh">《承诺2030》与可持续发展指标，签署后在全球平台公开。</span><span class="en">The 2030 Pledge and sustainability indicators, published on the global platform.</span></span><span class="more"><span class="zh">查看</span><span class="en">Open</span></span></a>
      <a href="research.html"><strong><span class="zh">研究</span><span class="en">Research</span></strong><span><span class="zh">年度报告与专题白皮书。首份白皮书预计 2027 年 2 月发布。</span><span class="en">Annual reports and thematic papers. The first paper is planned for February 2027.</span></span><span class="more"><span class="zh">查看</span><span class="en">Open</span></span></a>
      <a href="learning.html"><strong><span class="zh">培训</span><span class="en">Training</span></strong><span><span class="zh">青年培养、导师计划，以及可持续报告辅导。</span><span class="en">Training for younger family members, mentoring, and help with sustainability reports.</span></span><span class="more"><span class="zh">查看</span><span class="en">Open</span></span></a>
      <a href="events.html"><strong><span class="zh">对话</span><span class="en">Dialogue</span></strong><span><span class="zh">年度论坛、闭门研讨会、国际对话与实地参访。</span><span class="en">The annual forum, closed seminars, international dialogue and visits.</span></span><span class="more"><span class="zh">查看</span><span class="en">Open</span></span></a>
    </div>
  </div>
</section>
<section class="band band-navy">
  <div class="wrap">
    <h2><span class="zh">落地路径</span><span class="en">How it is put to work</span></h2>
    <ol class="path">
      <li><strong><span class="zh">签署承诺</span><span class="en">Sign the pledge</span></strong><span><span class="zh">确认四项原则。</span><span class="en">Commit to the four principles.</span></span></li>
      <li><strong><span class="zh">建立指标</span><span class="en">Set indicators</span></strong><span><span class="zh">用可持续发展指标衡量进展。</span><span class="en">Measure progress with the indicator set.</span></span></li>
      <li><strong><span class="zh">能力建设</span><span class="en">Build capacity</span></strong><span><span class="zh">培训、报告辅导与跨代对话。</span><span class="en">Training, reporting support and cross-generation dialogue.</span></span></li>
      <li><strong><span class="zh">公开披露</span><span class="en">Disclose</span></strong><span><span class="zh">承诺可在全球平台刊登。</span><span class="en">The pledge can be listed on the global platform.</span></span></li>
    </ol>
    <p class="source"><span class="zh">签署与填报在 <a href="https://fbsd.unctad.org/make-the-pledge">联合国贸发会议托管的全球平台</a> 完成。本网站作中文导引，不另建填报系统。</span><span class="en">Signing and reporting happen on the <a href="https://fbsd.unctad.org/make-the-pledge">UNCTAD-hosted global platform</a>. This site guides participants in Chinese and does not run a separate reporting system.</span></p>
  </div>
</section>
<section class="band">
  <div class="wrap">
    <h2><span class="zh">近期安排</span><span class="en">Coming up</span></h2>
    <div class="date-list">
      <a href="events.html#shanghai"><time datetime="2026-12-11">2026.12.11</time><span><span class="zh">上海说明会</span><span class="en">Shanghai briefing</span></span><span class="more"><span class="zh">议程确认中</span><span class="en">Agenda to be confirmed</span></span></a>
      <a href="events.html#hongkong"><time datetime="2026-12-18">2026.12.18</time><span><span class="zh">香港说明会</span><span class="en">Hong Kong briefing</span></span><span class="more"><span class="zh">议程确认中</span><span class="en">Agenda to be confirmed</span></span></a>
      <a href="founding.html"><time datetime="2027-01-22">2027.01.22</time><span><span class="zh">成立会议暨人工智能闭门会</span><span class="en">Founding meeting and closed AI session</span></span><span class="more"><span class="zh">受邀参加</span><span class="en">By invitation</span></span></a>
      <a href="research.html"><time datetime="2027-02">2027.02</time><span><span class="zh">首次公开活动与首份白皮书</span><span class="en">First public programme and first paper</span></span><span class="more"><span class="zh">预告</span><span class="en">Preview</span></span></a>
    </div>
  </div>
</section>
<section class="band band-close">
  <div class="wrap">
    <h2><span class="zh">加入中国网络</span><span class="en">Join the China Network</span></h2>
    <p style="max-width:42rem"><span class="zh">创始理事、机构会员与个人会员都签署《承诺2030》。创始理事二十家，承担治理职责，确认截止 2026 年 12 月 31 日。</span><span class="en">Founding council members, institutions and individuals all sign the 2030 Pledge. Twenty founding council seats carry governance duties. Confirmation closes on 31 December 2026.</span></p>
    <div class="actions"><a class="btn btn-light" href="join.html"><span class="zh">查看会员制度</span><span class="en">Membership</span></a></div>
  </div>
</section>
""",
)

page(
    "about.html", "about",
    "网络简介 · FBSD 中国网络",
    "The network · FBSD China Network",
    "中国网络的覆盖范围、服务对象与法律主体。",
    hero("网络简介", "The network", "对外以中国网络名义开展合作与活动，覆盖大中华区。", "The public name is the China Network. It works across Greater China.")
    + f'<section class="band"><div class="wrap">{about_nav("about")}<div class="prose stack"><p><span class="zh">联合国贸易和发展组织家族企业促进可持续发展中国网络，英文 Family Business for Sustainable Development China Network。2026 年 9 月于厦门投洽会「未来投资大会」授牌成立。</span><span class="en">The Family Business for Sustainable Development China Network was inaugurated in September 2026 at the Future Investment Conference during the China International Fair for Investment and Trade in Xiamen.</span></p><p><span class="zh">网络覆盖香港、澳门、台湾和中国内地，服务家族企业、家族办公室、上市公司和专业服务机构。工作方式是标准、研究、培训、对话四条主线并行。</span><span class="en">It covers Hong Kong, Macao, Taiwan and the Chinese mainland, and serves family businesses, family offices, listed companies and professional firms. The work runs on four lines: standards, research, training and dialogue.</span></p><p><span class="zh">法律与运营主体是未来企业促进可持续发展有限公司，英文 Future Business for Sustainable Development (FBSD) Limited，在香港设立的非营利担保有限公司。成员责任以担保额为限，利润不分派。公司注册完成后，将同步申请香港《税务条例》第 88 条慈善团体免税资格。</span><span class="en">The legal and operating entity is Future Business for Sustainable Development (FBSD) Limited, a Hong Kong non-profit company limited by guarantee. Liability is limited to the guarantee, and profits are not distributed. After registration, the company will apply for charitable exemption under section 88 of the Inland Revenue Ordinance.</span></p><p><span class="zh">公开活动以企业出海、气候变化、减碳和科技等议题命名。家族企业是服务对象，不作为活动名称。</span><span class="en">Public programmes are named for topics such as international expansion, climate, decarbonisation and technology. Family business is who the network serves, not the title of an event.</span></p></div></div></section>',
)

page(
    "mission.html", "mission",
    "使命与原则 · FBSD 中国网络",
    "Mission · FBSD China Network",
    "四项原则同时是承诺2030的签署内容和评价维度。",
    hero("使命与原则", "Mission and principles", "把可持续发展融入商业战略，并作出可衡量的贡献。", "Embed sustainability in business strategy and make a measurable contribution.")
    + f'<section class="band"><div class="wrap">{about_nav("mission")}<div class="prose stack"><p><span class="zh">网络要为传统商业模式与可持续发展提供融合路径和工具，促进可持续发展、包容性增长与长期繁荣。</span><span class="en">The network offers a path and tools that join conventional business models with sustainability, in support of sustainable development, inclusive growth and long-term prosperity.</span></p><p><span class="zh">四项原则同时构成《承诺2030》的签署内容，也是指标体系的评价维度。</span><span class="en">The four principles are both the content of the 2030 Pledge and the dimensions of the indicator set.</span></p></div><div class="quad" style="margin-top:2.5rem"><div><h3><span class="zh">可持续增长</span><span class="en">Sustainable growth</span></h3><p><span class="zh">以长期价值创造衡量经营成果，不以短期利润替代长期能力。</span><span class="en">Judge results by long-term value, not by short-term profit in place of lasting capability.</span></p></div><div><h3><span class="zh">环境守护</span><span class="en">Environmental stewardship</span></h3><p><span class="zh">把气候与资源约束纳入投资与运营决策，以技术降低环境负荷。</span><span class="en">Put climate and resource constraints into investment and operating decisions.</span></p></div><div><h3><span class="zh">社会包容</span><span class="en">Social inclusion</span></h3><p><span class="zh">兼顾员工、社区与供应链，让增长可共享。</span><span class="en">Include workers, communities and supply chains so growth can be shared.</span></p></div><div><h3><span class="zh">良善治理</span><span class="en">Good governance</span></h3><p><span class="zh">以透明、问责与制度安排保障代际传承。</span><span class="en">Secure succession through transparency, accountability and rules.</span></p></div></div></div></section>',
)

page(
    "history.html", "history",
    "发展沿革 · FBSD 中国网络",
    "History · FBSD China Network",
    "从 2019 年全球倡议到中国网络与香港运营主体。",
    hero("发展沿革", "History", "从全球倡议到中国网络。", "From the global initiative to the China Network.")
    + f'<section class="band"><div class="wrap">{about_nav("history")}<ol class="timeline"><li><time datetime="2019-12">2019.12</time><span><span class="zh">联合国贸易和发展会议与全球家族企业网络在日内瓦签署全球倡议。</span><span class="en">UNCTAD and the Family Business Network signed the global initiative in Geneva.</span></span></li><li><time datetime="2021-02">2021.02</time><span><span class="zh">倡议在世界投资论坛正式启动。</span><span class="en">The initiative was launched at the World Investment Forum.</span></span></li><li><time datetime="2026-09">2026.09</time><span><span class="zh">中国网络在厦门投洽会「未来投资大会」授牌成立。</span><span class="en">The China Network was inaugurated in Xiamen.</span></span></li><li><time datetime="2026-10">2026.10</time><span><span class="zh">在香港发起设立运营主体。</span><span class="en">The Hong Kong operating entity was initiated.</span></span></li><li><time datetime="2026-12">2026.12.31</time><span><span class="zh">创始理事确认截止。</span><span class="en">Deadline to confirm founding council members.</span></span></li><li><time datetime="2027-01">2027.01.22</time><span><span class="zh">成立会议暨人工智能闭门会。</span><span class="en">Founding meeting and closed session on artificial intelligence.</span></span></li><li><time datetime="2027-02">2027.02</time><span><span class="zh">首次公开活动，发布首份白皮书。此后进入常态运行：年度白皮书、年度论坛、青年项目与指标应用。</span><span class="en">First public programme and first paper. Regular work then runs through the annual paper, annual forum, youth programme and use of the indicators.</span></span></li></ol></div></section>',
)

page(
    "governance.html", "governance",
    "治理架构 · FBSD 中国网络",
    "Governance · FBSD China Network",
    "理事会决策，秘书处执行。荣誉职衔不参与决策。",
    hero("治理架构", "Governance", "理事会决策，秘书处执行。", "The council decides. The secretariat carries the work out.")
    + f'<section class="band"><div class="wrap">{about_nav("governance")}<div class="prose stack"><p><span class="zh">发起人是陈永岚、王辉耀、陈英龙。理事会现由陈永岚、陈英龙、苗绿、候朝辉组成。陈永岚任理事会主席，并任秘书长。候朝辉任执行秘书长，由理事会任命，负责日常运营。秘书长统筹对外合作与整体协调。</span><span class="en">The initiators are Chen Yonglan, Wang Huiyao and Chen Yinglong. The council is Chen Yonglan, Chen Yinglong, Miao Lu and Hou Chaohui. Chen Yonglan chairs the council and is Secretary-General. Hou Chaohui is Executive Secretary-General, appointed by the council, and runs daily operations.</span></p><p><span class="zh">专业委员会按需设立，首批方向包括企业出海法律风控和人工智能，由秘书处报理事会批准。</span><span class="en">Expert committees are added as needed. The first themes are legal and risk control for international expansion, and artificial intelligence. The secretariat proposes them and the council approves.</span></p><p><span class="zh">顾问委员会、名誉主席和荣誉理事属于荣誉体系，提供咨询与资源支持，不进入理事会，不参与决策和运营。荣誉职衔不取酬。</span><span class="en">The advisory circle, honorary chairs and honorary council titles are outside governance. They advise and open relationships. They do not sit on the council, decide, or operate the network, and the roles are unpaid.</span></p><p><span class="zh">账目将由香港执业会计师作年度审计。公司注册完成后，经审计报表按香港担保有限公司的要求提交公司注册处，并向成员提供。</span><span class="en">Accounts will be audited annually by a Hong Kong practice. After registration, audited statements will be filed as required for a company limited by guarantee and provided to members.</span></p></div></div></section>',
)

page(
    "leadership.html", "leadership",
    "领导团队 · FBSD 中国网络",
    "Leadership · FBSD China Network",
    "理事会与秘书处负责人。",
    hero("领导团队", "Leadership", "理事会与秘书处负责人。", "The council and the secretariat.")
    + f'<section class="band"><div class="wrap">{about_nav("leadership")}<div class="people"><article><h3>陈永岚 Chen Yonglan</h3><p class="role"><span class="zh">发起人，理事会主席、秘书长</span><span class="en">Initiator, Council Chair and Secretary-General</span></p><p><span class="zh">中国碳中和发展集团有限公司董事局主席，联合国贸易和发展组织高级顾问。曾任联合国开发计划署信息技术中心主任、瑞典政府投资促进署副署长。</span><span class="en">Chairman of China Carbon Neutral Development Group and a senior adviser to UNCTAD. He previously led the UNDP information technology centre and was deputy director of Invest Sweden.</span></p></article><article><h3>王辉耀 Wang Huiyao</h3><p class="role"><span class="zh">发起人</span><span class="en">Initiator</span></p><p><span class="zh">全球化智库（CCG）创始人兼理事长，国务院原参事，国际人才组织联合会总干事。</span><span class="en">Founder and president of the Center for China and Globalization, a former counsellor of the State Council, and director-general of the Alliance of Global Talent Organizations.</span></p></article><article><h3>陈英龙 Chen Yinglong</h3><p class="role"><span class="zh">发起人、理事</span><span class="en">Initiator and council member</span></p><p><span class="zh">香港中华煤气执行董事暨首席投资总裁，兼赋生资本管理合伙人。</span><span class="en">Executive director and chief investment officer of Hong Kong and China Gas, and managing partner of Fusheng Capital.</span></p></article><article><h3>苗绿 Miao Lu</h3><p class="role"><span class="zh">理事</span><span class="en">Council member</span></p><p><span class="zh">全球化智库联合创始人兼秘书长，国际青年领袖对话发起人兼秘书长，北京市政协委员。</span><span class="en">Co-founder and secretary-general of the Center for China and Globalization, and a member of the Beijing CPPCC.</span></p></article><article><h3>候朝辉 Hou Chaohui</h3><p class="role"><span class="zh">理事、执行秘书长</span><span class="en">Council member and Executive Secretary-General</span></p><p><span class="zh">锦天城律师事务所合伙人，复旦大学管理学院科创出海实战导师。</span><span class="en">Partner at AllBright Law Offices and a practitioner mentor at the Fudan University School of Management.</span></p></article></div></div></section>',
)

page(
    "standards.html", "standards",
    "标准与工具 · FBSD 中国网络",
    "Standards · FBSD China Network",
    "签署承诺、建立指标、能力建设、公开披露。",
    hero("标准与工具", "Standards and tools", "两条国际标准，加上能力建设。", "Two international instruments, plus capacity building.")
    + f'<section class="band"><div class="wrap">{std_nav("standards")}<div class="work-list"><a href="pledge.html"><strong><span class="zh">承诺</span><span class="en">Pledge</span></strong><span><span class="zh">《家族企业可持续发展承诺2030》。四项原则。签署后可在全球平台公开刊登。</span><span class="en">The Family Business Sustainability Pledge 2030. Four principles. Once signed, it can be listed on the global platform.</span></span><span class="more"><span class="zh">阅读</span><span class="en">Read</span></span></a><a href="indicators.html"><strong><span class="zh">指标</span><span class="en">Indicators</span></strong><span><span class="zh">家族企业可持续发展指标，基于联合国贸发会议《核心指标指南》（2019），对齐可持续发展目标。</span><span class="en">Sustainability Indicators for Family Business, built on UNCTAD’s 2019 core-indicator guidance and aligned with the Sustainable Development Goals.</span></span><span class="more"><span class="zh">阅读</span><span class="en">Read</span></span></a><a href="learning.html"><strong><span class="zh">能力</span><span class="en">Capacity</span></strong><span><span class="zh">培训与知识共享，承接指标落地和可持续报告编制，并开展青年企业家专题培训。</span><span class="en">Training and shared knowledge for using the indicators, preparing sustainability reports, and teaching young entrepreneurs.</span></span><span class="more"><span class="zh">阅读</span><span class="en">Read</span></span></a></div><p class="source" style="color:var(--text-soft)"><span class="zh">全球平台目前公布的使用情况，是倡议整体的数字，不是中国网络的会员数。引用时请注明来源为 <a href="https://fbsd.unctad.org/">fbsd.unctad.org</a>。</span><span class="en">Figures published on the global platform describe the initiative as a whole. They are not a count of China Network members. Cite <a href="https://fbsd.unctad.org/">fbsd.unctad.org</a> when you use them.</span></p></div></section>',
)

page(
    "pledge.html", "pledge",
    "承诺2030 · FBSD 中国网络",
    "Pledge 2030 · FBSD China Network",
    "四项原则，以及如何在全球平台签署。",
    hero("承诺2030", "Pledge 2030", "一份可公开的原则承诺，不是另一套评级。", "A public commitment to four principles, not another rating.")
    + f"""<section class="band"><div class="wrap">{std_nav("pledge")}
<div class="prose stack"><p><span class="zh">《家族企业可持续发展承诺2030》由全球家族企业网络与联合国贸易和发展会议共同形成。签署方承诺推动可持续增长、环境守护、社会包容和良善治理，并把原则放进商业战略。</span><span class="en">The Family Business Sustainability Pledge 2030 comes from the Family Business Network and UNCTAD. Signatories commit to sustainable growth, environmental stewardship, social inclusion and good governance, and to placing those principles in business strategy.</span></p><p><span class="zh">中国网络会员均须签署这份承诺。签署与刊登在全球平台完成。本页说明中文路径，不收取签署费用，也不代替全球平台作审核。</span><span class="en">Members of the China Network sign this pledge. Signing and listing are completed on the global platform. This page explains the path in Chinese. It does not charge a signing fee and does not review applications in place of the global platform.</span></p></div>
<div class="quad" style="margin:2.5rem 0">
<div id="growth"><h3><span class="zh">可持续增长</span><span class="en">Sustainable growth</span></h3><p><span class="zh">推动能够带来长期价值的经营和投资。</span><span class="en">Advance business and investment that create long-term value.</span></p></div>
<div id="environment"><h3><span class="zh">环境守护</span><span class="en">Environmental stewardship</span></h3><p><span class="zh">应对气候变化，采用可持续的生产和消费，审慎使用自然资源。</span><span class="en">Act on climate change, shift production and consumption, and use natural resources with care.</span></p></div>
<div id="inclusion"><h3><span class="zh">社会包容</span><span class="en">Social inclusion</span></h3><p><span class="zh">在社区内外推动性别平等、多元和体面工作。</span><span class="en">Advance gender equality, diversity and decent work.</span></p></div>
<div id="governance"><h3><span class="zh">良善治理</span><span class="en">Good governance</span></h3><p><span class="zh">建立透明、包容、可问责的家族与公司治理，遵守廉洁经营。</span><span class="en">Build transparent, inclusive and accountable family and corporate governance.</span></p></div>
</div>
<div class="actions"><a class="btn" href="https://fbsd.unctad.org/make-the-pledge"><span class="zh">前往全球平台签署</span><span class="en">Sign on the global platform</span></a><a class="btn btn-ghost" href="https://fbsd.unctad.org/pledge"><span class="zh">阅读全球承诺页</span><span class="en">Read the global pledge page</span></a></div>
</div></section>""",
)

page(
    "indicators.html", "indicators",
    "可持续发展指标 · FBSD 中国网络",
    "Indicators · FBSD China Network",
    "家族企业可持续发展指标的用途与填报入口。",
    hero("可持续发展指标", "Sustainability indicators", "用来衡量承诺是否落地，而不是替代企业自己的报告。", "A way to see whether the pledge is being carried out.")
    + f"""<section class="band"><div class="wrap">{std_nav("indicators")}
<div class="prose stack"><p><span class="zh">家族企业可持续发展指标（Sustainability Indicators for Family Business）建立在联合国贸发会议《核心指标指南》（2019）之上，并对齐联合国可持续发展目标。核心指标由贸发会议国际会计和报告准则政府间专家工作组认可。</span><span class="en">The Sustainability Indicators for Family Business build on UNCTAD’s 2019 Guidance on Core Indicators and are aligned with the Sustainable Development Goals. The core indicators were endorsed through UNCTAD’s intergovernmental working group on accounting and reporting.</span></p><p><span class="zh">指标在核心披露之外，补充家族企业治理、供应链、环境绩效和社区影响。企业可用它对照自身进展。全球平台上的个别填报默认不公开，汇总结果用于观察倡议整体，除非企业另行授权。</span><span class="en">Beyond the core disclosures, the set adds family-business governance, supply chains, environmental performance and community impact. Individual responses on the global platform are not published. Aggregated results describe the initiative, unless a business authorises more.</span></p><p><span class="zh">中国网络提供中文说明、行业适配讨论和报告辅导。填报系统使用全球平台，本网站不保存指标答卷。</span><span class="en">The China Network offers a Chinese explanation, discussion of sector fit, and help with reporting. The questionnaire stays on the global platform. This website does not store responses.</span></p></div>
<div class="actions"><a class="btn" href="https://fbsd.eregistrations.org/login?lng=en"><span class="zh">打开全球填报入口</span><span class="en">Open global reporting</span></a><a class="btn btn-ghost" href="https://fbsd.unctad.org/indicators"><span class="zh">阅读指标说明</span><span class="en">Read the indicator note</span></a></div>
</div></section>""",
)

page(
    "research.html", "research",
    "研究 · FBSD 中国网络",
    "Research · FBSD China Network",
    "年度报告与专题白皮书。首份白皮书预计 2027 年 2 月。",
    hero("研究", "Research", "白皮书为论坛、培养和国际对话提供议题基础。", "The papers set the agenda for forums, learning and international dialogue.")
    + """
<section class="band"><div class="wrap">
<div class="filters" data-filter-group data-list="#papers" data-empty="#papers-empty">
<button type="button" data-filter="all" aria-pressed="true"><span class="zh">全部</span><span class="en">All</span></button>
<button type="button" data-filter="outbound"><span class="zh">企业出海</span><span class="en">International expansion</span></button>
<button type="button" data-filter="tech"><span class="zh">科技创新</span><span class="en">Technology</span></button>
<button type="button" data-filter="investment"><span class="zh">负责任投资</span><span class="en">Responsible investment</span></button>
<button type="button" data-filter="climate"><span class="zh">气候与减碳</span><span class="en">Climate</span></button>
</div>
<div id="papers" class="work-list">
<article data-tags="preview">
<strong><span class="zh">预告</span><span class="en">Preview</span></strong>
<span><span class="zh">首份白皮书，预计 2027 年 2 月发布。系列将围绕企业出海、科技创新、负责任投资、气候变化与减碳展开。企业案例经确认后可联合署名。</span><span class="en">The first paper is planned for February 2027. The series will cover international expansion, technology, responsible investment, climate change and decarbonisation. Company cases can be co-signed after confirmation.</span></span>
<span><button class="btn btn-ghost" type="button" disabled><span class="zh">发布后下载</span><span class="en">Download after publication</span></button></span>
</article>
</div>
<p id="papers-empty" class="notice" hidden><span class="zh">这个主题还没有出版的报告。系列启动后会列在这里。</span><span class="en">No published paper under this theme yet. It will be listed when the series begins.</span></p>
</div></section>
""",
)

page(
    "events.html", "events",
    "活动与对话 · FBSD 中国网络",
    "Events · FBSD China Network",
    "说明会、成立会议与后续论坛。",
    hero("活动与对话", "Events and dialogue", "活动以议题命名。闭门会只接受邀请。", "Programmes are named for their subject. Closed sessions are by invitation.")
    + """
<section class="band"><div class="wrap">
<div class="filters" data-filter-group data-list="#event-list" data-empty="#events-empty">
<button type="button" data-filter="all" aria-pressed="true"><span class="zh">全部</span><span class="en">All</span></button>
<button type="button" data-filter="upcoming"><span class="zh">即将举行</span><span class="en">Upcoming</span></button>
<button type="button" data-filter="past"><span class="zh">往期</span><span class="en">Past</span></button>
</div>
<div id="event-list" class="date-list">
<a id="shanghai" href="contact.html" data-tags="upcoming"><time datetime="2026-12-11">2026.12.11</time><span><span class="zh">上海说明会。面向上海及周边候选机构，介绍会员安排。场地与议程确认后在本页更新。</span><span class="en">Shanghai briefing for prospective members in and around Shanghai. Venue and agenda will be posted when confirmed.</span></span><span class="more"><span class="zh">询问席位</span><span class="en">Ask</span></span></a>
<a id="hongkong" href="contact.html" data-tags="upcoming"><time datetime="2026-12-18">2026.12.18</time><span><span class="zh">香港说明会。面向香港候选机构。场地与议程确认后在本页更新。</span><span class="en">Hong Kong briefing for prospective members. Venue and agenda will be posted when confirmed.</span></span><span class="more"><span class="zh">询问席位</span><span class="en">Ask</span></span></a>
<a href="founding.html" data-tags="upcoming"><time datetime="2027-01-22">2027.01.22</time><span><span class="zh">成立会议暨人工智能闭门会。五十人以内，受邀参加。</span><span class="en">Founding meeting and a closed session on artificial intelligence. Up to fifty people, by invitation.</span></span><span class="more"><span class="zh">查看</span><span class="en">Open</span></span></a>
</div>
<p id="events-empty" class="notice" hidden><span class="zh">还没有往期活动。成立会议之后，纪要和相关材料会留在这里。</span><span class="en">No past programmes yet. Notes will stay here after the founding meeting.</span></p>
</div></section>
""",
)

page(
    "founding.html", "founding",
    "成立会议 · FBSD 中国网络",
    "Founding meeting · FBSD China Network",
    "2027 年 1 月 22 日，成立会议暨人工智能闭门会。",
    hero("成立会议暨人工智能闭门会", "Founding meeting and closed AI session", "2027 年 1 月 22 日，五十人以内，受邀参加。", "22 January 2027. Up to fifty people, by invitation.")
    + """
<section class="band"><div class="wrap prose stack">
<p><span class="zh">这次会议标志中国网络从筹备进入运行，并以人工智能为议题做一场闭门讨论。场地、详细议程和嘉宾在确认后通知受邀机构，不在本页公开报名。</span><span class="en">The meeting marks the move from preparation into regular work, with a closed discussion on artificial intelligence. Venue, agenda and speakers will be sent to invited organisations. There is no open registration on this page.</span></p>
<p><span class="zh">如希望被纳入考虑，请通过申请页留下机构资料，或由现有理事介绍。秘书处不保证席位。</span><span class="en">To be considered, leave your organisation’s details on the application page, or ask a council member to introduce you. A seat is not guaranteed.</span></p>
<div class="actions"><a class="btn" href="apply.html"><span class="zh">提交机构资料</span><span class="en">Submit details</span></a><a class="btn btn-ghost" href="events.html"><span class="zh">返回活动</span><span class="en">All events</span></a></div>
</div></section>
""",
)

page(
    "learning.html", "learning",
    "培养 · FBSD 中国网络",
    "Learning · FBSD China Network",
    "青年培养、导师计划与可持续报告辅导。",
    hero("培养", "Learning", "面向家族企业的下一代和青年企业家。", "For the next generation in family businesses and for young entrepreneurs.")
    + """
<section class="band"><div class="wrap">
<div class="work-list">
<article><strong><span class="zh">青年营</span><span class="en">Youth</span></strong><span><span class="zh">围绕企业转型和出海的专题训练，建立跨代对话。招生安排在成立会议之后公布。</span><span class="en">Workshops on business transition and international expansion, and a place for cross-generation dialogue. Recruitment opens after the founding meeting.</span></span><span class="more"><span class="zh">筹备中</span><span class="en">In preparation</span></span></article>
<article><strong><span class="zh">导师</span><span class="en">Mentors</span></strong><span><span class="zh">由会员企业和专业人士担任导师。名额与配对规则随首期青年项目一起公布。</span><span class="en">Mentors will come from member firms and professional practices. Places and matching rules will be published with the first youth cohort.</span></span><span class="more"><span class="zh">筹备中</span><span class="en">In preparation</span></span></article>
<article><strong><span class="zh">报告辅导</span><span class="en">Reporting</span></strong><span><span class="zh">帮助会员把可持续发展指标用到自己的披露里。不代替审计，也不代写报告。</span><span class="en">Help for members using the indicators in their own disclosure. This is not an audit and not report-writing for hire.</span></span><span class="more"><span class="zh">会员服务</span><span class="en">For members</span></span></article>
</div>
<p class="form-note" style="margin-top:1.5rem"><span class="zh">现在可以留下培养意向。此表只在您的浏览器里确认，尚未发送到秘书处。</span><span class="en">You can register interest now. This form confirms on your own browser and is not yet sent to the secretariat.</span></p>
<div style="margin-top:1rem">
<form data-static novalidate>
<div class="field"><label for="l-name"><span class="zh">姓名</span><span class="en">Name</span> <span class="req">*</span></label><input id="l-name" name="name" required><p class="err"></p></div>
<div class="field"><label for="l-org"><span class="zh">机构</span><span class="en">Organisation</span> <span class="req">*</span></label><input id="l-org" name="org" required><p class="err"></p></div>
<div class="field"><label for="l-mail"><span class="zh">邮箱</span><span class="en">Email</span> <span class="req">*</span></label><input id="l-mail" name="email" type="email" required autocomplete="email"><p class="err"></p></div>
<div class="field"><label for="l-which"><span class="zh">关注哪一项</span><span class="en">Interest</span></label><select id="l-which" name="which"><option>青年营 / Youth</option><option>导师计划 / Mentoring</option><option>报告辅导 / Reporting</option></select></div>
<button class="btn" type="submit"><span class="zh">留下意向</span><span class="en">Register interest</span></button>
</form>
<div data-success hidden class="success"><h2><span class="zh">已记在这台设备上</span><span class="en">Kept on this device</span></h2><p><span class="zh">秘书处邮箱公布之后，请再提交一次，或通过联系页等候通知。现在的内容没有发到网络。</span><span class="en">Please submit again once the secretariat publishes an email address. Nothing has been sent.</span></p></div>
</div>
</div></section>
""",
)

page(
    "join.html", "join",
    "会员制度 · FBSD 中国网络",
    "Membership · FBSD China Network",
    "创始理事、机构会员与个人会员。",
    hero("会员制度", "Membership", "资格由理事会确认。三类会员都签署《承诺2030》。", "The council confirms each membership. All three kinds sign the 2030 Pledge.")
    + f"""<section class="band"><div class="wrap">{join_nav("join")}
<div class="sheet-wrap"><table class="sheet"><thead><tr><th><span class="zh"> </span><span class="en"> </span></th><th><span class="zh">创始理事</span><span class="en">Founding council</span></th><th><span class="zh">机构会员</span><span class="en">Institution</span></th><th><span class="zh">个人会员</span><span class="en">Individual</span></th></tr></thead><tbody>
<tr><th><span class="zh">谁可以申请</span><span class="en">Who</span></th><td><span class="zh">发起人提名，理事会确认。二十家。</span><span class="en">Nominated by the initiators and confirmed by the council. Twenty seats.</span></td><td><span class="zh">家族企业、家族办公室、上市公司、学术机构和专业服务机构。</span><span class="en">Family businesses, family offices, listed companies, academic bodies and professional firms.</span></td><td><span class="zh">商业领袖、家族企业下一代、专业人士和学者。</span><span class="en">Business leaders, next-generation family members, professionals and scholars.</span></td></tr>
<tr><th><span class="zh">表决</span><span class="en">Vote</span></th><td><span class="zh">有。参与治理和议题设定。</span><span class="en">Yes. Governance and the agenda.</span></td><td><span class="zh">无。</span><span class="en">No.</span></td><td><span class="zh">无。</span><span class="en">No.</span></td></tr>
<tr><th><span class="zh">共同权益</span><span class="en">Shared access</span></th><td colspan="3"><span class="zh">使用承诺与指标、研究署名和案例、活动席位、培训与报告辅导。</span><span class="en">Use of the pledge and indicators, research credit and cases, event places, training and reporting support.</span></td></tr>
<tr><th><span class="zh">义务</span><span class="en">Duty</span></th><td colspan="3"><span class="zh">支持网络宗旨，并签署《承诺2030》。</span><span class="en">Support the purpose of the network and sign the 2030 Pledge.</span></td></tr>
<tr><th><span class="zh">时间</span><span class="en">Timing</span></th><td><span class="zh">2026 年 12 月 31 日前确认。</span><span class="en">Confirm by 31 December 2026.</span></td><td colspan="2"><span class="zh">常年接受申请。</span><span class="en">Applications stay open.</span></td></tr>
</tbody></table></div>
<p class="form-note" style="margin-top:1.25rem"><span class="zh">会费标准待会员权益表由理事会定稿后公布。本页不列金额。</span><span class="en">Fees will be published after the council adopts the membership schedule. This page does not list amounts.</span></p>
<div class="actions"><a class="btn" href="apply.html"><span class="zh">提交申请</span><span class="en">Apply</span></a></div>
</div></section>""",
)

FORM = """
<div class="field"><label for="{id}-cat"><span class="zh">{label_zh}</span><span class="en">{label_en}</span> <span class="req">*</span></label>{control}<p class="err"></p></div>
"""

page(
    "apply.html", "apply",
    "提交申请 · FBSD 中国网络",
    "Apply · FBSD China Network",
    "填写申请。理事会确认会员类别。",
    hero("提交申请", "Apply", "三步：提交资料，理事会确认类别，签署《承诺2030》。", "Three steps: send your details, the council confirms the category, you sign the 2030 Pledge.")
    + f"""<section class="band"><div class="wrap">{join_nav("apply")}
<p class="form-note"><span class="zh">此版本把申请保存在您的浏览器里并给出确认，尚未接入秘书处。请同时保留一份副本，待联络邮箱公布后再正式发送。创始理事不接受自荐占额，由发起人提名、理事会确认。</span><span class="en">This version stores the application in your browser and confirms it here. It is not connected to the secretariat. Keep a copy and send it when a contact email is published. Founding council seats are not self-selected. Initiators nominate and the council confirms.</span></p>
<form data-static novalidate style="margin-top:1.25rem">
<div class="field"><label for="a-cat"><span class="zh">申请类别</span><span class="en">Category</span> <span class="req">*</span></label><select id="a-cat" name="category" required><option value="">—</option><option>机构会员 / Institution</option><option>个人会员 / Individual</option><option>希望被提名为创始理事 / Founding council, for nomination</option></select><p class="err"></p></div>
<div class="field"><label for="a-org"><span class="zh">机构或姓名</span><span class="en">Organisation or name</span> <span class="req">*</span></label><input id="a-org" name="org" required><p class="err"></p></div>
<div class="field"><label for="a-person"><span class="zh">联系人</span><span class="en">Contact person</span> <span class="req">*</span></label><input id="a-person" name="person" required autocomplete="name"><p class="err"></p></div>
<div class="field"><label for="a-role"><span class="zh">职务</span><span class="en">Role</span></label><input id="a-role" name="role"></div>
<div class="field"><label for="a-mail"><span class="zh">邮箱</span><span class="en">Email</span> <span class="req">*</span></label><input id="a-mail" name="email" type="email" required autocomplete="email"><p class="err"></p></div>
<div class="field"><label for="a-note"><span class="zh">为何加入，以及是否准备签署《承诺2030》</span><span class="en">Why you are joining, and whether you are ready to sign the 2030 Pledge</span> <span class="req">*</span></label><textarea id="a-note" name="note" required></textarea><p class="err"></p></div>
<button class="btn" type="submit"><span class="zh">提交到本机确认</span><span class="en">Confirm on this device</span></button>
</form>
<div data-success hidden class="success"><h2><span class="zh">申请已留在这台设备上</span><span class="en">The application stays on this device</span></h2><p><span class="zh">理事会还没有收到它。请保存您填写的内容。秘书处邮箱公布后，用同一内容正式提交。</span><span class="en">The council has not received it. Save what you wrote. Send the same content when the secretariat publishes an email address.</span></p><p><a href="pledge.html"><span class="zh">先阅读承诺2030</span><span class="en">Read Pledge 2030</span></a></p></div>
</div></section>""",
)

page(
    "collaborate.html", "collaborate",
    "合作与赞助 · FBSD 中国网络",
    "Collaborate · FBSD China Network",
    "合办与赞助只收意向，不在线收款。",
    hero("合作与赞助", "Collaboration and support", "合办活动，或支持研究与论坛。本页不标价，也不在线收款。", "Co-host a programme, or support research and the forum. This page lists no prices and takes no payment.")
    + f"""<section class="band"><div class="wrap">{join_nav("collaborate")}
<div class="prose stack"><p><span class="zh">合办面向与网络议题相符的公共机构、智库和学校。赞助面向希望支持白皮书、论坛或青年项目的机构。档位和权益由理事会与秘书处按具体项目商定，不在网站上下单。</span><span class="en">Co-hosting is for public bodies, research institutes and schools whose work matches the network. Support is for institutions that want to fund a paper, the forum or the youth programme. Levels and benefits are agreed for each project. Nothing is purchased on this website.</span></p></div>
<form data-static novalidate style="margin-top:1.25rem">
<div class="field"><label for="c-type"><span class="zh">合作意向</span><span class="en">Intention</span> <span class="req">*</span></label><select id="c-type" required><option value="">—</option><option>合办 / Co-host</option><option>赞助 / Support</option><option>其他 / Other</option></select><p class="err"></p></div>
<div class="field"><label for="c-org"><span class="zh">机构</span><span class="en">Organisation</span> <span class="req">*</span></label><input id="c-org" required><p class="err"></p></div>
<div class="field"><label for="c-person"><span class="zh">联系人</span><span class="en">Contact</span> <span class="req">*</span></label><input id="c-person" required><p class="err"></p></div>
<div class="field"><label for="c-mail"><span class="zh">邮箱</span><span class="en">Email</span> <span class="req">*</span></label><input id="c-mail" type="email" required><p class="err"></p></div>
<div class="field"><label for="c-note"><span class="zh">想合作的事项</span><span class="en">What you have in mind</span> <span class="req">*</span></label><textarea id="c-note" required></textarea><p class="err"></p></div>
<button class="btn" type="submit"><span class="zh">留下意向</span><span class="en">Leave a note</span></button>
</form>
<div data-success hidden class="success"><h2><span class="zh">意向留在这台设备上</span><span class="en">The note stays on this device</span></h2><p><span class="zh">秘书处尚未收到。请保留内容，待联络方式公布后发送。</span><span class="en">The secretariat has not received it. Keep the text and send it when contact details are published.</span></p></div>
</div></section>""",
)

page(
    "contact.html", "contact",
    "联系 · FBSD 中国网络",
    "Contact · FBSD China Network",
    "秘书处。注册地址与邮箱将在公司注册完成后公布。",
    hero("联系秘书处", "Contact the secretariat", "公司仍在香港办理设立。注册地址和对外邮箱公布前，请使用此页留下联络方式。", "The Hong Kong company is still being formed. Until an address and email are published, leave your details here.")
    + f"""<section class="band"><div class="wrap">{join_nav("contact")}
<form data-static novalidate>
<div class="field"><label for="k-name"><span class="zh">姓名</span><span class="en">Name</span> <span class="req">*</span></label><input id="k-name" required autocomplete="name"><p class="err"></p></div>
<div class="field"><label for="k-org"><span class="zh">机构</span><span class="en">Organisation</span></label><input id="k-org"></div>
<div class="field"><label for="k-mail"><span class="zh">邮箱</span><span class="en">Email</span> <span class="req">*</span></label><input id="k-mail" type="email" required autocomplete="email"><p class="err"></p></div>
<div class="field"><label for="k-msg"><span class="zh">事项</span><span class="en">Message</span> <span class="req">*</span></label><textarea id="k-msg" required></textarea><p class="err"></p></div>
<button class="btn" type="submit"><span class="zh">留在本机</span><span class="en">Keep on this device</span></button>
</form>
<div data-success hidden class="success"><h2><span class="zh">内容没有送出</span><span class="en">Nothing was sent</span></h2><p><span class="zh">网站还没有秘书处收件邮箱。请保存您写的内容。邮箱公布后会出现在本页。</span><span class="en">The site does not yet have a secretariat inbox. Save your message. The address will appear on this page when it is public.</span></p></div>
</div></section>""",
)

page(
    "legal.html", "legal",
    "名称使用与隐私 · FBSD 中国网络",
    "Name use and privacy · FBSD China Network",
    "联合国名称的使用边界，以及本版网站如何处理表单。",
    hero("名称使用与隐私", "Name use and privacy", "说清本网络与联合国的关系，以及这版网站不收集服务器数据。", "The relationship with the United Nations, and the fact that this version stores no data on a server.")
    + """
<section class="band"><div class="wrap prose stack">
<h2><span class="zh">名称</span><span class="en">Names</span></h2>
<p><span class="zh">对外名称是「联合国贸易和发展组织家族企业促进可持续发展中国网络」。这表示网络承接联合国贸易和发展会议与全球家族企业网络的倡议。它不是联合国的机构、基金或办事处，不能代表联合国表态，也不能把联合国或贸发会议的标志用在会员自己的宣传上。</span><span class="en">The public name is the UNCTAD Family Business for Sustainable Development China Network. It means the network carries forward an initiative of UNCTAD and the Family Business Network. It is not an office, fund or organ of the United Nations. It cannot speak for the United Nations, and members may not place the United Nations or UNCTAD emblem on their own materials.</span></p>
<p><span class="zh">法律主体的中文名称是未来企业促进可持续发展有限公司，英文 Future Business for Sustainable Development (FBSD) Limited。公司在香港设立，目前办理注册。第 88 条免税资格需在注册后另行申请，本站不宣称已经取得。</span><span class="en">The legal entity is Future Business for Sustainable Development (FBSD) Limited. It is being registered in Hong Kong. Section 88 charitable status has to be applied for after registration. This site does not claim that status.</span></p>
<h2><span class="zh">隐私</span><span class="en">Privacy</span></h2>
<p><span class="zh">申请、合作、培养和联系表单都在您的浏览器里校验并确认，不上传到秘书处服务器。语言偏好存在这台设备的本地存储。网站不设会员登录，不公开会员名录。</span><span class="en">Application, collaboration, learning and contact forms are checked and confirmed in your browser. They are not uploaded. Language preference is stored on this device. There is no member login and no public member directory.</span></p>
<p><span class="zh">全球平台上的承诺与指标填报由联合国贸发会议一侧处理，适用该平台自己的隐私说明。</span><span class="en">Pledges and indicator reports on the global platform are handled on the UNCTAD side and follow that platform’s own privacy notice.</span></p>
</div></section>
""",
)

print("wrote", len(list(ROOT.glob('*.html'))), "html files")
