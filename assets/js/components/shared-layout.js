/**
 * Universal Shared Header and Footer Navigation Component
 * Reusable across Hub and all sub-projects with zero code duplication.
 */
(function() {
  function initSharedLayout() {
    const path = window.location.pathname;
    const isSub = path.includes('/lorem-plus/') ||
                  path.includes('/prompt-optimizer/') ||
                  path.includes('/placeholder-pro/') ||
                  path.includes('/site-auditor/') ||
                  (document.body && document.body.dataset.root === 'sub');

    const rootPath = isSub ? '../' : './';
    const logoSrc = isSub ? '../assets/images/logo.svg' : 'assets/images/logo.svg';

    let activeId = 'hub';
    if (path.includes('lorem-plus')) activeId = 'lorem-plus';
    else if (path.includes('prompt-optimizer')) activeId = 'prompt-optimizer';
    else if (path.includes('placeholder-pro')) activeId = 'placeholder-pro';
    else if (path.includes('site-auditor')) activeId = 'site-auditor';

    const menuItems = [
      { id: 'hub', title: 'صفحه اصلی', icon: '🏠', url: isSub ? '../index.html' : './index.html' },
      { id: 'lorem-plus', title: 'لورم پلاس', icon: '✨', url: isSub ? '../lorem-plus/' : './lorem-plus/' },
      { id: 'prompt-optimizer', title: 'پرامپت پلاس', icon: '⚡', url: isSub ? '../prompt-optimizer/' : './prompt-optimizer/' },
      { id: 'placeholder-pro', title: 'پلیس‌هولدر پرو', icon: '🖼️', url: isSub ? '../placeholder-pro/' : './placeholder-pro/' },
      { id: 'site-auditor', title: 'سایت آدیتور', icon: '🔍', url: isSub ? '../site-auditor/' : './site-auditor/', badge: 'بتا' }
    ];

    renderHeader(menuItems, activeId, rootPath, logoSrc);
    renderFooter(menuItems, rootPath, logoSrc);
  }

  function renderHeader(items, activeId, rootPath, logoSrc) {
    const headerEl = document.getElementById('shared-header');
    if (!headerEl) return;

    const linksHtml = items.map(item => `
      <a href="${item.url}" class="shared-nav-link ${item.id === activeId ? 'active' : ''}">
        <span class="nav-icon">${item.icon}</span>
        <span>${item.title}</span>
        ${item.badge ? `<span class="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">${item.badge}</span>` : ''}
      </a>
    `).join('');

    headerEl.innerHTML = `
      <nav class="shared-navbar px-4 sm:px-6 py-3.5 mb-8 md:mb-12 shadow-glass relative z-50">
        <div class="flex items-center justify-between gap-3">
          <!-- Logo & Hub Brand -->
          <a href="${rootPath}index.html" class="flex items-center gap-3 group transition">
            <div class="w-10 h-10 rounded-xl bg-dark-900 border border-indigo-500/30 p-1 flex items-center justify-center shadow-glow-indigo group-hover:scale-105 transition">
              <img src="${logoSrc}" alt="AI Nexus Logo" class="w-full h-full object-contain">
            </div>
            <div>
              <span class="font-black text-sm sm:text-base text-white group-hover:text-cyan-300 transition block">هاب پروژه‌های هوش مصنوعی</span>
              <span class="text-[10px] text-slate-400 font-mono tracking-wider">AI Apps &amp; Production Micro-Tools</span>
            </div>
          </a>

          <!-- Desktop Navigation Menu -->
          <div class="hidden lg:flex items-center gap-1.5 bg-dark-900/60 p-1.5 rounded-2xl border border-white/5">
            ${linksHtml}
          </div>

          <!-- Quick Action / GitHub Star -->
          <div class="flex items-center gap-2">
            <a href="https://github.com/hashemsh/ai-projects-persian" target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition">
              <span class="text-amber-400">★</span>
              <span>Star on GitHub</span>
            </a>
            <!-- Mobile Menu Toggle Button -->
            <button type="button" id="btn-toggle-mobile-menu" class="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition" aria-label="منوی سایت">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Drawer Menu -->
        <div id="mobile-nav-menu" class="mobile-nav-menu lg:hidden pt-3 border-t border-white/10 mt-3 flex flex-col gap-1.5">
          ${linksHtml}
        </div>
      </nav>
    `;

    const toggleBtn = headerEl.querySelector('#btn-toggle-mobile-menu');
    const mobileMenu = headerEl.querySelector('#mobile-nav-menu');
    toggleBtn?.addEventListener('click', () => {
      mobileMenu?.classList.toggle('open');
    });
  }

  function renderFooter(items, rootPath, logoSrc) {
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
            <a href="https://github.com/hashemsh" target="_blank" rel="noopener noreferrer" class="social-pill">
              <span>🐙</span><span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/hashemsheikhypour" target="_blank" rel="noopener noreferrer" class="social-pill">
              <span>💼</span><span>LinkedIn</span>
            </a>
            <a href="https://t.me/init10" target="_blank" rel="noopener noreferrer" class="social-pill">
              <span>✈️</span><span>Telegram</span>
            </a>
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
            ${items.map(m => `<a href="${m.url}" class="hover:text-slate-300 transition">${m.title}</a>`).join('<span>•</span>')}
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
