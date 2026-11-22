/**
 * Universal Shared Header & Footer Layout Component (< 200 lines)
 * Clean Modular Web architecture: shared across root hub and all micro-tools.
 */
(function () {
  var isSub = /\/(lorem-plus|prompt-optimizer|placeholder-pro|site-auditor|utm-builder|schema-generator|qr-studio|regex-studio|webp-converter|ai-cost-estimator)\//.test(window.location.pathname) || (document.body && document.body.dataset.root === 'sub');
  var rootPath = isSub ? '../' : './';
  var logoSrc = rootPath + 'assets/images/logo.svg';
  var hubUrl = isSub ? rootPath + 'index.html' : './';
  var toolsUrl = isSub ? rootPath + 'index.html#tools' : '#tools';
  var roadmapUrl = rootPath + 'ROADMAP.md';
  var readmeUrl = rootPath + 'README.md';
  var aboutUrl = isSub ? rootPath + 'index.html#about' : '#about';

  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') ||
           localStorage.getItem('theme') ||
           localStorage.getItem('ai_hub_theme') ||
           (mq.matches ? 'dark' : 'light');
  }

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    root.classList.toggle('light-theme', t === 'light');
    try {
      localStorage.setItem('theme', t);
      localStorage.setItem('ai_hub_theme', t);
    } catch (_) {}
    var tg = document.querySelector('[data-theme-toggle]');
    if (tg) tg.setAttribute('aria-pressed', String(t === 'dark'));
  }
  applyTheme(currentTheme());

  function renderHeader() {
    var el = document.getElementById('shared-header');
    if (!el) return;
    el.innerHTML = [
      '<div class="nav">',
      '  <a class="logo" href="' + hubUrl + '"><img src="' + logoSrc + '" alt="لوگو" class="logo-img" width="30" height="30"><span>هاب ابزارها</span></a>',
      '  <div class="links">',
      '    <a class="' + (!isSub ? 'on' : '') + '" href="' + hubUrl + '">خانه</a>',
      '    <a href="' + toolsUrl + '">ابزارها</a>',
      '    <a href="' + roadmapUrl + '">نقشه راه</a>',
      '    <a href="' + readmeUrl + '">مستندات</a>',
      '    <a href="' + aboutUrl + '">درباره</a>',
      '  </div>',
      '  <button class="nav-srch-btn" type="button" aria-label="جستجو در ابزارها">',
      '    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
      '    <span>جستجو</span><span class="kb">/</span>',
      '  </button>',
      '  <div class="nav-actions" style="display:flex;align-items:center;gap:8px">',
      '    <button class="tg" type="button" data-theme-toggle aria-label="تغییر تم روشن/تیره" aria-pressed="' + String(currentTheme() === 'dark') + '">◐</button>',
      '    <button class="menu-btn" type="button" aria-label="باز کردن منو" aria-expanded="false" id="menu-toggle">',
      '      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
      '    </button>',
      '    <a class="btn bp nav-btn" href="https://github.com/hashemsh/ai-projects-persian" target="_blank" rel="noopener noreferrer">ستاره در گیت‌هاب</a>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function renderDrawer() {
    if (document.getElementById('mobile-drawer')) return;
    var backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    backdrop.id = 'drawer-backdrop';

    var drawer = document.createElement('aside');
    drawer.className = 'drawer';
    drawer.id = 'mobile-drawer';
    drawer.setAttribute('aria-label', 'منوی موبایل');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML = [
      '<div class="drawer-head">',
      '  <a class="logo" href="' + hubUrl + '"><img src="' + logoSrc + '" alt="لوگو" class="logo-img" width="30" height="30"><span>هاب ابزارها</span></a>',
      '  <button class="drawer-close" type="button" id="drawer-close" aria-label="بستن منو">✕</button>',
      '</div>',
      '<nav class="drawer-nav">',
      '  <a class="' + (!isSub ? 'on' : '') + '" href="' + hubUrl + '">خانه</a>',
      '  <a href="' + toolsUrl + '">ابزارها</a>',
      '  <a href="' + roadmapUrl + '">نقشه راه</a>',
      '  <a href="' + readmeUrl + '">مستندات</a>',
      '  <a href="' + aboutUrl + '">درباره‌ی هاب</a>',
      '</nav>',
      '<div class="drawer-foot">',
      '  <a class="btn bp" style="width:100%;justify-content:center" href="https://github.com/hashemsh/ai-projects-persian" target="_blank" rel="noopener noreferrer">★ ستاره در گیت‌هاب</a>',
      '  <div class="drawer-socials">',
      '    <a href="https://t.me/init10" target="_blank" rel="noopener noreferrer">تلگرام</a>',
      '    <a href="https://www.linkedin.com/in/hashemsheikhypour" target="_blank" rel="noopener noreferrer">لینکدین</a>',
      '    <a href="https://github.com/hashemsh" target="_blank" rel="noopener noreferrer">گیت‌هاب</a>',
      '  </div>',
      '</div>'
    ].join('\n');

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);
  }

  function renderFooter() {
    var el = document.getElementById('shared-footer');
    if (!el) return;
    el.innerHTML = [
      '<div class="ft"><div class="sh">',
      '  <span>طراحی و توسعه توسط <a href="https://www.linkedin.com/in/hashemsheikhypour" target="_blank" rel="noopener noreferrer" style="color:var(--ink);font-weight:700">هاشم شیخی‌پور (Hashem Sh)</a> | قدرت‌گرفته از <a href="https://antigravity.google" target="_blank" rel="noopener noreferrer" style="color:var(--bt);font-weight:700">Antigravity</a></span>',
      '  <span><a href="https://t.me/init10" target="_blank" rel="noopener noreferrer">تلگرام</a> · <a href="https://www.linkedin.com/in/hashemsheikhypour" target="_blank" rel="noopener noreferrer">لینکدین</a> · <a href="https://github.com/hashemsh" target="_blank" rel="noopener noreferrer">گیت‌هاب</a></span>',
      '</div></div>'
    ].join('\n');
  }

  function wireEvents() {
    var tg = document.querySelector('[data-theme-toggle]');
    if (tg) {
      tg.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }

    var navSrch = document.querySelector('.nav-srch-btn');
    if (navSrch) {
      navSrch.addEventListener('click', function (e) {
        if (e && e.preventDefault) e.preventDefault();
        var inp = document.getElementById('hero-search-input');
        if (inp) {
          inp.focus();
          inp.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(function () { inp.focus(); }, 40);
        } else {
          window.location.href = toolsUrl;
        }
      });
    }

    var menuBtn = document.getElementById('menu-toggle');
    var drawer = document.getElementById('mobile-drawer');
    var backdrop = document.getElementById('drawer-backdrop');
    var closeBtn = document.getElementById('drawer-close');
    if (!menuBtn || !drawer || !backdrop) return;

    function openDrawer() {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(function (l) { l.addEventListener('click', closeDrawer); });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
  }

  function init() {
    renderHeader();
    renderDrawer();
    renderFooter();
    wireEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
