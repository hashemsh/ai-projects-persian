/**
 * Live Search Module with Debouncing (< 200 lines)
 * Persian AI Projects Hub
 */

window.HubUI = window.HubUI || {};

window.HubUI.initSearch = function() {
  const searchInput = document.getElementById('tool-search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const spinner = document.getElementById('search-spinner');
  const statusBar = document.getElementById('search-status-bar');
  const statusText = document.getElementById('search-status-text');
  const container = document.querySelector('#projects-container');
  const quickTags = document.querySelectorAll('.quick-filter-tag');

  if (!searchInput || !container) return;

  let debounceTimer = null;
  const DEBOUNCE_DELAY = 280;

  function normalize(str) {
    if (!str) return '';
    return String(str).toLowerCase()
      .replace(/[ي]/g, 'ی').replace(/[ك]/g, 'ک').replace(/[ة]/g, 'ه')
      .replace(/[\u200C\u200B]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function filterProjects(rawQuery) {
    const projects = (window.HubData && window.HubData.projects) || [];
    const cats = (window.HubData && window.HubData.categories) || [];
    const query = normalize(rawQuery);
    if (!query) return projects;

    const terms = query.split(' ').filter(Boolean);
    return projects.filter(p => {
      const cat = cats.find(c => c.key === p.category);
      const catTitle = cat ? `${cat.title} ${cat.shortTitle}` : '';
      const target = normalize(`${p.title} ${p.description} ${(p.techs || []).join(' ')} ${p.badge || ''} ${catTitle}`);
      return terms.every(term => target.includes(term));
    });
  }

  function renderSearchResults(query, matched) {
    if (!query) {
      if (statusBar) statusBar.classList.add('hidden');
      if (typeof window.HubUI.renderProjects === 'function') {
        window.HubUI.renderProjects('#projects-container');
      }
      return;
    }

    if (statusBar && statusText) {
      statusBar.classList.remove('hidden');
      statusText.innerHTML = `<span>🎯</span> <span>${matched.length} ابزار برای <strong>«${query}»</strong> پیدا شد</span>`;
    }

    if (matched.length === 0) {
      container.innerHTML = `
        <div class="search-empty-state">
          <div class="text-4xl mb-3 animate-bounce">🔍</div>
          <h3 class="text-lg font-bold text-white mb-2">ابزاری با عبارت «${query}» پیدا نشد!</h3>
          <p class="text-xs text-slate-400 max-w-md mx-auto mb-5 leading-relaxed">
            می‌توانید کلمات عمومی‌تری مانند سئو، عکس، پرامپت، QR، کد یا مارکتینگ را امتحان کنید.
          </p>
          <button type="button" id="btn-reset-empty-search" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/30">
            <span>بازنشانی و مشاهده تمام ابزارها</span> <span>↺</span>
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-empty-search');
      if (resetBtn) resetBtn.addEventListener('click', resetSearch);
      return;
    }

    const cardsHtml = matched.map(p => {
      return (typeof window.HubUI.renderProjectCard === 'function') ? window.HubUI.renderProjectCard(p) : '';
    }).join('');

    container.innerHTML = `
      <div class="mb-6 flex items-center justify-between pb-3 border-b border-white/10">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <h2 class="text-lg sm:text-xl font-black text-white">نتایج فیلتر شده</h2>
        </div>
        <button type="button" id="btn-clear-filter-view" class="text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition">
          نمایش دسته‌بندی‌شده همه ابزارها ←
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${cardsHtml}
      </div>
    `;

    const clearFilterBtn = document.getElementById('btn-clear-filter-view');
    if (clearFilterBtn) clearFilterBtn.addEventListener('click', resetSearch);

    if (typeof window.HubUI.initCardInteractions === 'function') {
      window.HubUI.initCardInteractions();
    }
  }

  function executeSearch(query) {
    const matched = filterProjects(query);
    renderSearchResults(query, matched);
  }

  function resetSearch() {
    searchInput.value = '';
    if (clearBtn) clearBtn.classList.add('hidden');
    if (spinner) spinner.classList.add('hidden');
    quickTags.forEach(t => t.classList.remove('active'));
    executeSearch('');
    searchInput.focus();
  }

  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (clearBtn) clearBtn.classList.toggle('hidden', !val);
    if (spinner) spinner.classList.toggle('hidden', !val);

    clearTimeout(debounceTimer);
    if (!val) {
      if (spinner) spinner.classList.add('hidden');
      quickTags.forEach(t => t.classList.remove('active'));
      executeSearch('');
      return;
    }

    debounceTimer = setTimeout(() => {
      if (spinner) spinner.classList.add('hidden');
      executeSearch(val);
    }, DEBOUNCE_DELAY);
  });

  if (clearBtn) clearBtn.addEventListener('click', resetSearch);

  // Quick Preset Tags
  quickTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const q = tag.getAttribute('data-query') || '';
      const isAlreadyActive = tag.classList.contains('active');
      quickTags.forEach(t => t.classList.remove('active'));

      if (isAlreadyActive) {
        resetSearch();
      } else {
        tag.classList.add('active');
        searchInput.value = q;
        if (clearBtn) clearBtn.classList.remove('hidden');
        executeSearch(q);
        const toolsSection = document.getElementById('tools');
        if (toolsSection) toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Keyboard Shortcuts: Ctrl+K or '/' to focus, Esc to clear
  document.addEventListener('keydown', (e) => {
    const isEditing = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
    if ((e.ctrlKey && (e.key === 'k' || e.key === 'K')) || (e.key === '/' && !isEditing)) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    } else if (e.key === 'Escape' && document.activeElement === searchInput) {
      resetSearch();
      searchInput.blur();
    }
  });
};
