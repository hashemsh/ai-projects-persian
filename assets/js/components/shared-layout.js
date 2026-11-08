/**
 * Universal Shared Header and Footer Navigation Component (< 200 lines)
 * With categorized dropdown submenus, smooth section scrolling and dual theme support.
 */
(function() {
  function getTheme() {
    return localStorage.getItem('ai_hub_theme') === 'light';
  }

  function applyTheme(isLight) {
    document.documentElement.classList.toggle('light-theme', isLight);
    const icon = document.getElementById('theme-toggle-icon');
    if (icon) icon.textContent = isLight ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const isLight = !document.documentElement.classList.contains('light-theme');
    applyTheme(isLight);
    try { localStorage.setItem('ai_hub_theme', isLight ? 'light' : 'dark'); } catch (_) {}
  }

  applyTheme(getTheme());

  function initSharedLayout() {
    const path = window.location.pathname;
    const isSub = /\/(lorem-plus|prompt-optimizer|placeholder-pro|site-auditor|utm-builder|schema-generator|qr-studio|regex-studio|webp-converter)\//.test(path) || (document.body && document.body.dataset.root === 'sub');
    const rootPath = isSub ? '../' : './';
    const logoSrc = isSub ? '../assets/images/logo.svg' : 'assets/images/logo.svg';
    const hubUrl = isSub ? '../' : './';
    const toolsUrl = isSub ? '../#tools' : '#tools';
    const isToolsActive = isSub || window.location.hash.includes('tools');

    const subCats = [
      { id: 'seo-tools', title: 'ابزارهای سئو', desc: 'اسکیما، ممیزی سایت و محتوا', icon: '🔍' },
      { id: 'marketing-tools', title: 'ابزارهای مارکتینگ', desc: 'کمپین UTM و استودیو QR', icon: '🎯' },
      { id: 'dev-tools', title: 'ابزارهای برنامه‌نویسی', desc: 'پرامپت پلاس و دیزاین موکاپ', icon: '💻' }
    ];

    renderHeader(hubUrl, toolsUrl, logoSrc, isToolsActive, isSub, subCats);
    renderFooter(hubUrl, toolsUrl, logoSrc);
    applyTheme(document.documentElement.classList.contains('light-theme'));
  }

  function renderHeader(hubUrl, toolsUrl, logoSrc, isToolsActive, isSub, subCats) {
    const headerEl = document.getElementById('shared-header');
    if (!headerEl) return;

    const desktopSubHtml = subCats.map(c => `
      <a href="${isSub ? '../#' + c.id : '#' + c.id}" class="nav-dropdown-item">
        <span class="text-base">${c.icon}</span>
        <div>
          <div class="dropdown-title">${c.title}</div>
          <div class="dropdown-desc">${c.desc}</div>
        </div>
      </a>
    `).join('');

    const mobileSubHtml = subCats.map(c => `
      <a href="${isSub ? '../#' + c.id : '#' + c.id}" class="mobile-subnav-link">
        <span>${c.icon}</span>
        <span>${c.title}</span>
      </a>
    `).join('');

    const isLight = document.documentElement.classList.contains('light-theme');

    headerEl.innerHTML = `
      <nav class="shared-navbar px-4 sm:px-6 py-3.5 mb-8 md:mb-12 shadow-glass relative z-50">
        <div class="flex items-center justify-between gap-3">
          <a href="${hubUrl}" class="flex items-center gap-3 group transition">
            <div class="w-10 h-10 rounded-xl bg-dark-900 border border-indigo-500/30 p-1 flex items-center justify-center shadow-glow-indigo group-hover:scale-105 transition">
              <img src="${logoSrc}" alt="AI Nexus Logo" class="w-full h-full object-contain">
            </div>
            <div>
              <span class="brand-title font-black text-sm sm:text-base text-white group-hover:text-cyan-300 transition block">هاب پروژه‌های هوش مصنوعی</span>
              <span class="text-[10px] text-slate-400 font-mono tracking-wider">AI Apps &amp; Production Micro-Tools</span>
            </div>
          </a>

          <!-- Desktop Navigation with Categorized Dropdown -->
          <div class="hidden sm:flex items-center gap-1.5 bg-dark-900/60 p-1.5 rounded-2xl border border-white/5">
            <a href="${hubUrl}" class="shared-nav-link ${!isToolsActive ? 'active' : ''}">
              <span class="nav-icon">🏠</span><span>صفحه اصلی</span>
            </a>
            <div class="nav-dropdown-container">
              <a href="${toolsUrl}" class="shared-nav-link ${isToolsActive ? 'active' : ''}">
                <span class="nav-icon">⚡</span><span>ابزارها</span>
                <svg class="w-3.5 h-3.5 opacity-70 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </a>
              <div class="nav-dropdown-menu">
                <a href="${toolsUrl}" class="nav-dropdown-item border-b border-white/5 pb-2 mb-1">
                  <span class="text-base">✨</span>
                  <div>
                    <div class="dropdown-title">همه ابزارها</div>
                    <div class="dropdown-desc">مشاهده تمام ابزارهای فعال</div>
                  </div>
                </a>
                ${desktopSubHtml}
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <a href="https://github.com/hashemsh/ai-projects-persian" target="_blank" rel="noopener noreferrer" class="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition">
              <span class="text-amber-400">★</span><span>Star on GitHub</span>
            </a>
            <button type="button" id="btn-theme-toggle" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition flex items-center justify-center text-sm" aria-label="تغییر تم">
              <span id="theme-toggle-icon">${isLight ? '☀️' : '🌙'}</span>
            </button>
            <button type="button" id="btn-toggle-mobile-menu" class="sm:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition" aria-label="منوی سایت">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
            </button>
          </div>
        </div>

        <!-- Mobile Drawer with Sub-categories -->
        <div id="mobile-nav-menu" class="mobile-nav-menu sm:hidden pt-3 border-t border-white/10 mt-3 flex flex-col gap-1.5">
          <a href="${hubUrl}" class="shared-nav-link ${!isToolsActive ? 'active' : ''}">
            <span class="nav-icon">🏠</span><span>صفحه اصلی</span>
          </a>
          <a href="${toolsUrl}" class="shared-nav-link ${isToolsActive ? 'active' : ''}">
            <span class="nav-icon">⚡</span><span>همه ابزارها</span>
          </a>
          <div class="mobile-subnav">${mobileSubHtml}</div>
        </div>
      </nav>
    `;

    const mobMenu = headerEl.querySelector('#mobile-nav-menu');
    headerEl.querySelector('#btn-toggle-mobile-menu')?.addEventListener('click', () => mobMenu?.classList.toggle('open'));
    headerEl.querySelectorAll('#mobile-nav-menu a')?.forEach(a => a.addEventListener('click', () => mobMenu?.classList.remove('open')));
    headerEl.querySelector('#btn-theme-toggle')?.addEventListener('click', toggleTheme);
  }

  function renderFooter(hubUrl, toolsUrl, logoSrc) {
    const footerEl = document.getElementById('shared-footer');
    if (!footerEl) return;

    footerEl.innerHTML = `
      <div class="shared-footer-card px-6 py-6 border border-white/10 shadow-glass mt-14 mb-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-right mb-4">
          <div class="flex items-center gap-3">
            <img src="${logoSrc}" alt="AI Nexus" class="w-8 h-8">
            <div class="text-xs text-slate-400 font-medium" dir="ltr">
              <span>Designed &amp; Developed by</span>
              <a href="https://github.com/hashemsh" target="_blank" rel="noopener noreferrer" class="font-bold text-white hover:text-cyan-400 transition ml-1">Hashem Sh</a>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-wrap justify-center text-xs">
            <a href="https://github.com/hashemsh" target="_blank" rel="noopener noreferrer" class="social-pill"><span>🐙</span><span>GitHub</span></a>
            <a href="https://www.linkedin.com/in/hashemsheikhypour" target="_blank" rel="noopener noreferrer" class="social-pill"><span>💼</span><span>LinkedIn</span></a>
            <a href="https://t.me/init10" target="_blank" rel="noopener noreferrer" class="social-pill"><span>✈️</span><span>Telegram</span></a>
          </div>
          <div class="flex items-center gap-1.5 text-xs text-slate-400 font-medium" dir="ltr">
            <span>Powered by</span>
            <span class="px-2 py-0.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">Antigravity</span>
            <span>&amp;</span>
            <span class="px-2 py-0.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-semibold">Gemini Pro</span>
          </div>
        </div>
        <div class="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>ویترین ابزارها و میکرواپ‌های وب توسعه‌یافته با دستیاری هوش مصنوعی</div>
          <div class="flex items-center gap-3">
            <a href="${hubUrl}" class="hover:text-slate-300 transition">صفحه اصلی</a>
            <span>•</span>
            <a href="${toolsUrl}" class="hover:text-slate-300 transition">ابزارها</a>
            <span>•</span>
            <a href="https://github.com/hashemsh/ai-projects-persian/issues/new" target="_blank" rel="noopener noreferrer" class="text-amber-400/90 hover:text-amber-300 transition flex items-center gap-1">
              <span>⚠️</span><span>گزارش باگ یا پیشنهاد</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSharedLayout);
  } else {
    initSharedLayout();
  }
})();
