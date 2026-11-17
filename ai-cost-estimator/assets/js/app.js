/**
 * AI Cost Estimator - Main Application Orchestrator (< 200 lines)
 */
(function() {
  const state = {
    category: 'image',
    usdRate: 270000,
    currencyMode: 'both',
    filter: 'all',
    lastSyncText: window.AI_DATA_STORE?.meta?.lastVerifiedFa || 'آبان ۱۴۰۵'
  };

  const el = {
    usdRateInput: document.getElementById('usd-rate-input'),
    btnFetchRate: document.getElementById('btn-fetch-rate'),
    btnSyncData: document.getElementById('btn-sync-data'),
    resetRateBtn: document.getElementById('reset-rate-btn'),
    syncStatusBadge: document.getElementById('sync-status-badge'),
    controlsContainer: document.getElementById('controls-container'),
    recContainer: document.getElementById('recommendations-container'),
    modelsTableBody: document.getElementById('models-table-body'),
    directoryTableBody: document.getElementById('directory-table-body'),
    categoryTabs: document.querySelectorAll('.category-tab'),
    currencyButtons: document.querySelectorAll('.currency-toggle-pill')
  };

  function init() {
    if (el.syncStatusBadge) {
      el.syncStatusBadge.textContent = `آخرین اعتبارسنجی تعرفه‌ها: ${state.lastSyncText}`;
    }
    bindEvents();
    renderAll();
  }

  function getParams() {
    const c = el.controlsContainer;
    return {
      quantity: c?.querySelector('#param-qty')?.value || 1,
      quality: c?.querySelector('#param-quality')?.value || 'standard',
      seconds: c?.querySelector('#param-seconds')?.value || 10,
      resolution: c?.querySelector('#param-resolution')?.value || '720p',
      scope: c?.querySelector('#param-scope')?.value || 'script',
      prompts: c?.querySelector('#param-prompts')?.value || 100,
      avgTokensPerMsg: c?.querySelector('#param-tokens-per-msg')?.value || 800
    };
  }

  function renderAll() {
    const allModels = window.AI_DATA_STORE?.models || [];
    const categoryModels = allModels.filter(m => m.category === state.category);
    const activeFilter = el.controlsContainer?.querySelector('.filter-chip.active')?.dataset.filter || 'all';
    
    const filteredModels = categoryModels.filter(m => {
      if (activeFilter === 'free') return m.hasFreeTier === true || m.billingType === 'free';
      if (activeFilter === 'paid') return m.billingType !== 'free';
      return true;
    });

    const evaluated = AICalculator.evaluateCategory(filteredModels, state.category, getParams(), state.usdRate);
    
    TableRenderer.renderRecommendations(evaluated, el.recContainer);
    TableRenderer.renderTable(evaluated, el.modelsTableBody, state.currencyMode);
    DirectoryRenderer.renderDirectory(allModels, el.directoryTableBody, state.usdRate);
  }

  function bindEvents() {
    el.usdRateInput?.addEventListener('input', e => {
      const val = Number(e.target.value);
      if (val > 0) {
        state.usdRate = val;
        renderAll();
      }
    });

    el.resetRateBtn?.addEventListener('click', () => {
      state.usdRate = 270000;
      if (el.usdRateInput) el.usdRateInput.value = '270000';
      renderAll();
      showToast('نرخ دلار به مقدار پایه ۲۷۰,۰۰۰ تومان بازنشانی شد.');
    });

    el.btnFetchRate?.addEventListener('click', handleLiveRateRequest);
    el.btnSyncData?.addEventListener('click', syncModelsData);

    el.categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        el.categoryTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        state.category = tab.dataset.category;
        TabsUI.renderControls(state.category, el.controlsContainer, renderAll);
        renderAll();
      });
    });

    el.currencyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        el.currencyButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        state.currencyMode = btn.dataset.cur;
        renderAll();
      });
    });

    TabsUI.renderControls(state.category, el.controlsContainer, renderAll);
  }

  async function handleLiveRateRequest() {
    const btn = el.btnFetchRate;
    const spinIcon = btn?.querySelector('span');
    if (spinIcon) spinIcon.classList.add('animate-spin');

    const isLocalFile = window.location.protocol === 'file:';

    if (isLocalFile) {
      setTimeout(() => {
        if (spinIcon) spinIcon.classList.remove('animate-spin');
        showToast('در پروتکل محلی مرورگر (file://) استعلام اینترنتی مسدود است؛ نرخ بازار (۲۷۰,۰۰۰ تومان) به صورت دستی استفاده می‌شود.', 'warning');
      }, 400);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch('https://api.nobitex.ir/v2/orderbook/USDTIRT', { 
        cache: 'no-store',
        signal: controller.signal 
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data?.lastTradePrice) {
          const livePrice = Math.round(Number(data.lastTradePrice) / 10);
          if (livePrice > 50000) {
            state.usdRate = livePrice;
            if (el.usdRateInput) el.usdRateInput.value = livePrice;
            renderAll();
            showToast(`نرخ لحظه‌ای دلار از نوبیتکس استعلام شد: ${AICalculator.formatNumberFa(livePrice)} تومان`, 'success');
            if (spinIcon) spinIcon.classList.remove('animate-spin');
            return;
          }
        }
      }
    } catch (_) {}

    if (spinIcon) spinIcon.classList.remove('animate-spin');
    showToast('دریافت آنلاین نرخ ناموفق بود؛ نرخ پایه بازار (۲۷۰,۰۰۰ تومان) به صورت دستی فعال است.', 'warning');
  }

  async function syncModelsData() {
    const btn = el.btnSyncData;
    const icon = btn?.querySelector('.sync-icon');
    if (icon) icon.classList.add('animate-spin');

    try {
      const res = await fetch('assets/data/prices.json?t=' + Date.now()).catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json?.meta?.last_verified_fa) {
          state.lastSyncText = json.meta.last_verified_fa;
        }
      }
    } catch (_) {}

    setTimeout(() => {
      if (icon) icon.classList.remove('animate-spin');
      if (el.syncStatusBadge) {
        el.syncStatusBadge.textContent = `تعرفه‌ها با منبع اصلی همگام هستند (${state.lastSyncText})`;
        el.syncStatusBadge.classList.add('text-emerald-400');
      }
      renderAll();
      showToast('تعرفه‌ها و مستندات رسمی مدل‌ها با موفقیت همگام‌سازی شدند.', 'success');
    }, 450);
  }

  function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    const borderColor = type === 'warning' ? 'border-amber-500' : 'border-indigo-500';
    toast.className = `fixed bottom-6 right-6 z-50 glass-card px-4 py-3 ${borderColor} text-xs font-bold text-white shadow-2xl transition-all duration-300 max-w-sm leading-relaxed`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
