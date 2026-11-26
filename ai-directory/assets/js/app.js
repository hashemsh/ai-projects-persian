/**
 * AI Models Directory Application Logic
 * Clean Modular Web Architecture - High Performance Vanilla JS
 */

(function () {
  'use strict';

  var data = window.AiDirectoryData || { items: [], categories: [], pricingTypes: [] };
  var items = data.items || [];
  var logos = data.logos || {};

  // State
  var state = {
    query: '',
    category: 'all',
    pricing: 'all'
  };

  // DOM Elements
  var searchInput = document.getElementById('aid-search-input');
  var searchClear = document.getElementById('aid-search-clear');
  var categoryContainer = document.getElementById('aid-category-chips');
  var pricingSelect = document.getElementById('aid-pricing-select');
  var resultsCountEl = document.getElementById('aid-results-count');
  var tableBody = document.getElementById('aid-table-body');
  var mobileList = document.getElementById('aid-mobile-cards');
  var emptyState = document.getElementById('aid-empty-state');
  var resetFiltersBtn = document.getElementById('aid-reset-filters');
  var toastEl = document.getElementById('aid-toast');

  // Persian text normalizer for accurate search
  function normalizeText(text) {
    if (!text) return '';
    return String(text)
      .toLowerCase()
      .replace(/[\u200B-\u200D\uFEFF]/g, ' ') // zero-width spaces to space
      .replace(/[ي]/g, 'ی')
      .replace(/[ك]/g, 'ک')
      .replace(/[أإآ]/g, 'ا')
      .replace(/[ة]/g, 'ه')
      .trim();
  }

  // Filter Items
  function getFilteredItems() {
    var q = normalizeText(state.query);
    return items.filter(function (item) {
      // Category filter
      if (state.category !== 'all' && item.category !== state.category) {
        return false;
      }
      // Pricing filter
      if (state.pricing !== 'all' && item.pricing !== state.pricing) {
        return false;
      }
      // Query filter
      if (q) {
        var searchable = normalizeText(
          item.name + ' ' +
          item.provider + ' ' +
          item.bestFor + ' ' +
          item.description + ' ' +
          (item.capabilities ? item.capabilities.join(' ') : '') + ' ' +
          (item.keywords || '')
        );
        var queryTerms = q.split(/\s+/).filter(Boolean);
        var matches = queryTerms.every(function (term) {
          return searchable.indexOf(term) !== -1;
        });
        if (!matches) return false;
      }
      return true;
    });
  }

  // Toast notification
  var toastTimeout = null;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2500);
  }

  // Copy to clipboard helper
  function copyText(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(successMsg || 'کپی شد!');
      }).catch(function () {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || 'کپی شد!');
    } catch (_) {
      showToast('خطا در کپی');
    }
    document.body.removeChild(textarea);
  }

  // Get official Logo HTML (SVG/PNG local asset with fallback)
  function getLogoHtml(item) {
    if (item.logoFile) {
      return '<img src="./assets/images/logos/' + item.logoFile + '" alt="' + item.name + '" class="aid-logo-img" loading="lazy" onerror="this.style.display=\'none\'">';
    }
    return logos[item.logoKey] || logos.defaultAi;
  }

  // Render Category Buttons (4 per row grid, no scroll)
  function renderCategoryChips() {
    if (!categoryContainer) return;
    categoryContainer.innerHTML = '';

    data.categories.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'aid-cat-btn' + (state.category === cat.id ? ' active' : '');
      btn.setAttribute('data-category', cat.id);
      
      // Count for category
      var count = cat.id === 'all' 
        ? items.length 
        : items.filter(function (i) { return i.category === cat.id; }).length;

      btn.innerHTML = [
        '<div class="aid-cat-btn-content">',
        '  <span class="aid-cat-btn-icon">' + cat.icon + '</span>',
        '  <span class="aid-cat-btn-title">' + cat.name + '</span>',
        '</div>',
        '<span class="aid-cat-btn-count">' + count + '</span>'
      ].join('');

      btn.addEventListener('click', function () {
        state.category = cat.id;
        updateUI();
      });

      categoryContainer.appendChild(btn);
    });
  }

  // Render Table & Cards
  function renderResults() {
    var filtered = getFilteredItems();

    // Results Counter
    if (resultsCountEl) {
      resultsCountEl.textContent = 'نمایش ' + filtered.length + ' مدل از مجموع ' + items.length + ' ابزار هوش مصنوعی';
    }

    // Empty State visibility
    if (filtered.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (tableBody) tableBody.innerHTML = '';
      if (mobileList) mobileList.innerHTML = '';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // 1. Render Desktop Table Body
    if (tableBody) {
      var rowsHtml = '';
      filtered.forEach(function (item) {
        var logoHtml = getLogoHtml(item);
        var pricingBadgeClass = item.pricing === 'open-source' ? 'aid-badge-open' :
                               (item.pricing === 'free' ? 'aid-badge-free' : 'aid-badge-paid');

        rowsHtml += [
          '<tr class="aid-table-row">',
          '  <!-- Col 1: Logo -->',
          '  <td class="aid-col-logo">',
          '    <div class="aid-logo-box" title="' + item.provider + '">',
          '      ' + logoHtml,
          '    </div>',
          '  </td>',
          '  <!-- Col 2: Name & Provider -->',
          '  <td class="aid-col-name">',
          '    <div class="aid-title-wrap">',
          '      <span class="aid-item-name">' + item.name + '</span>',
          '      <span class="aid-item-provider">' + item.provider + '</span>',
          '    </div>',
          '    <div class="aid-badges-row">',
          '      <span class="aid-badge ' + pricingBadgeClass + '">' + item.pricingLabel + '</span>',
          '      ' + (item.badge ? '<span class="aid-badge aid-badge-highlight">' + item.badge + '</span>' : ''),
          '    </div>',
          '  </td>',
          '  <!-- Col 3: URL & Action -->',
          '  <td class="aid-col-url">',
          '    <a href="' + item.url + '" target="_blank" rel="noopener noreferrer" class="aid-url-link" title="باز کردن در تب جدید">',
          '      <span>' + item.displayUrl + '</span>',
          '      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
          '    </a>',
          '    <button type="button" class="aid-btn-copy" data-copy-url="' + item.url + '" title="کپی آدرس سایت">',
          '      <span>📋 کپی لینک</span>',
          '    </button>',
          '  </td>',
          '  <!-- Col 4: Capability & Highlights -->',
          '  <td class="aid-col-desc">',
          '    <div class="aid-best-for">',
          '      <span class="aid-best-icon">🎯</span>',
          '      <strong>بهترین برای:</strong> ' + item.bestFor,
          '    </div>',
          '    <p class="aid-desc-text">' + item.description + '</p>',
          '    <div class="aid-caps-wrap">',
                 (item.capabilities || []).map(function (c) {
                   return '<span class="aid-cap-pill">✓ ' + c + '</span>';
                 }).join(''),
          '    </div>',
          '  </td>',
          '</tr>'
        ].join('');
      });
      tableBody.innerHTML = rowsHtml;
    }

    // 2. Render Mobile Cards View
    if (mobileList) {
      var cardsHtml = '';
      filtered.forEach(function (item) {
        var logoHtml = getLogoHtml(item);
        var pricingBadgeClass = item.pricing === 'open-source' ? 'aid-badge-open' :
                               (item.pricing === 'free' ? 'aid-badge-free' : 'aid-badge-paid');

        cardsHtml += [
          '<article class="aid-mobile-card">',
          '  <div class="aid-card-header">',
          '    <div class="aid-logo-box">',
          '      ' + logoHtml,
          '    </div>',
          '    <div class="aid-card-header-info">',
          '      <h3 class="aid-item-name">' + item.name + '</h3>',
          '      <span class="aid-item-provider">' + item.provider + '</span>',
          '    </div>',
          '  </div>',
          '  <div class="aid-badges-row mb-3">',
          '    <span class="aid-badge ' + pricingBadgeClass + '">' + item.pricingLabel + '</span>',
          '    ' + (item.badge ? '<span class="aid-badge aid-badge-highlight">' + item.badge + '</span>' : ''),
          '  </div>',
          '  <div class="aid-best-for mb-2">',
          '    <strong>🎯 کاربرد اصلی:</strong> ' + item.bestFor,
          '  </div>',
          '  <p class="aid-desc-text mb-3">' + item.description + '</p>',
          '  <div class="aid-caps-wrap mb-4">',
               (item.capabilities || []).map(function (c) {
                 return '<span class="aid-cap-pill">✓ ' + c + '</span>';
               }).join(''),
          '  </div>',
          '  <div class="aid-card-footer">',
          '    <a href="' + item.url + '" target="_blank" rel="noopener noreferrer" class="aid-card-open-btn">',
          '      <span>ورود به ' + item.displayUrl + '</span>',
          '      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
          '    </a>',
          '    <button type="button" class="aid-btn-copy" data-copy-url="' + item.url + '" title="کپی لینک">📋 کپی</button>',
          '  </div>',
          '</article>'
        ].join('');
      });
      mobileList.innerHTML = cardsHtml;
    }

    // Attach copy button listeners
    document.querySelectorAll('[data-copy-url]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var url = btn.getAttribute('data-copy-url');
        copyText(url, 'لینک وب‌سایت در کلیپ‌بورد کپی شد ✨');
      });
    });
  }

  // Update UI and category chips
  function updateUI() {
    renderCategoryChips();
    renderResults();
  }

  // Bind Event Listeners
  function initEvents() {
    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        state.query = e.target.value;
        if (searchClear) {
          searchClear.style.display = state.query ? 'block' : 'none';
        }
        renderResults();
      });
    }

    // Search clear
    if (searchClear) {
      searchClear.addEventListener('click', function () {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        state.query = '';
        searchClear.style.display = 'none';
        renderResults();
      });
    }

    // Pricing select
    if (pricingSelect) {
      pricingSelect.addEventListener('change', function (e) {
        state.pricing = e.target.value;
        renderResults();
      });
    }

    // Reset filters button
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', function () {
        state.query = '';
        state.category = 'all';
        state.pricing = 'all';
        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.style.display = 'none';
        if (pricingSelect) pricingSelect.value = 'all';
        updateUI();
      });
    }

    // Global keyboard shortcut '/' to focus search
    window.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  // Init
  function init() {
    renderCategoryChips();
    renderResults();
    initEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
