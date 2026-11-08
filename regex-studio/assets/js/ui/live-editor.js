/**
 * Live Regex Editor & Reactive UI Controller (< 200 lines)
 */

window.RegexLiveEditor = (function() {
  let state = {
    pattern: '^(?:(?:\\+?98|0098|0)?9\\d{9})$',
    flags: 'gm',
    testString: '09123456789\n+989351234567\n00989198765432\n02188776655',
    replaceString: 'REDACTED_PHONE'
  };

  function showToast(msg) {
    let toast = document.getElementById('regex-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'regex-toast';
      toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-2xl transition-all duration-300 opacity-0 pointer-events-none';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.remove('opacity-0', 'translate-y-2');
    setTimeout(() => toast.classList.add('opacity-0', 'translate-y-2'), 2200);
  }

  function getActiveFlags() {
    const flagBtns = document.querySelectorAll('.flag-toggle-btn');
    let f = '';
    flagBtns.forEach(btn => {
      if (btn.classList.contains('active')) {
        f += btn.getAttribute('data-flag');
      }
    });
    return f;
  }

  function setActiveFlags(flagsStr) {
    document.querySelectorAll('.flag-toggle-btn').forEach(btn => {
      const fl = btn.getAttribute('data-flag');
      btn.classList.toggle('active', flagsStr.includes(fl));
    });
  }

  function update() {
    const patternInput = document.getElementById('regex-pattern-input');
    const testInput = document.getElementById('regex-test-input');
    const replaceInput = document.getElementById('regex-replace-input');
    const highlightBox = document.getElementById('regex-highlight-view');
    const replaceBox = document.getElementById('regex-replace-result');
    const matchCountEl = document.getElementById('regex-match-count');
    const execTimeEl = document.getElementById('regex-exec-time');
    const statusBadge = document.getElementById('regex-status-badge');
    const explainerList = document.getElementById('regex-explainer-list');

    if (patternInput) state.pattern = patternInput.value;
    if (testInput) state.testString = testInput.value;
    if (replaceInput) state.replaceString = replaceInput.value;
    state.flags = getActiveFlags();

    const res = window.RegexMatcher.executeMatch(
      state.pattern,
      state.flags,
      state.testString,
      state.replaceString
    );

    // Update status badge
    if (statusBadge) {
      if (!state.pattern) {
        statusBadge.innerHTML = '<span class="text-slate-400">الگویی وارد نشده</span>';
      } else if (res.isValid) {
        statusBadge.innerHTML = '<span class="text-emerald-400 font-semibold flex items-center gap-1"><span>✓</span><span>سینتکس معتبر</span></span>';
      } else {
        statusBadge.innerHTML = `<span class="text-rose-400 font-semibold flex items-center gap-1" title="${res.error}"><span>✗</span><span>خطا در سینتکس</span></span>`;
      }
    }

    // Update matches and badges
    if (matchCountEl) matchCountEl.textContent = `${res.matches.length} تطابق یافت شد`;
    if (execTimeEl) execTimeEl.textContent = `${res.execTime} ms`;
    if (highlightBox) highlightBox.innerHTML = res.highlightedHtml;
    if (replaceBox) replaceBox.textContent = res.replacedText || 'خروجی جایگزینی در اینجا نمایش داده می‌شود...';

    // Update breakdown explainer
    if (explainerList && window.RegexExplainer) {
      const steps = window.RegexExplainer.explain(state.pattern);
      if (!steps.length) {
        explainerList.innerHTML = '<div class="text-xs text-slate-500 py-3 text-center">الگویی برای تشریح وجود ندارد.</div>';
      } else {
        explainerList.innerHTML = steps.map((s, idx) => `
          <div class="explainer-item flex items-start gap-3 p-2.5 rounded-xl bg-dark-900/50 border border-white/5 hover:border-indigo-500/30 transition">
            <span class="explainer-token font-mono px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold">${window.RegexMatcher.escapeHtml(s.token)}</span>
            <div class="flex-1">
              <div class="text-xs font-bold text-white mb-0.5">${s.title}</div>
              <div class="text-[11px] text-slate-400 leading-relaxed">${s.desc}</div>
            </div>
            <span class="text-[10px] text-slate-500 font-mono">#${idx + 1}</span>
          </div>
        `).join('');
      }
    }
  }

  function init(initialPreset) {
    const patternInput = document.getElementById('regex-pattern-input');
    const testInput = document.getElementById('regex-test-input');
    const replaceInput = document.getElementById('regex-replace-input');

    if (initialPreset) {
      state.pattern = initialPreset.pattern;
      state.flags = initialPreset.flags;
      state.testString = initialPreset.testString;
      if (initialPreset.replaceStr) state.replaceString = initialPreset.replaceStr;
    }

    if (patternInput) patternInput.value = state.pattern;
    if (testInput) testInput.value = state.testString;
    if (replaceInput) replaceInput.value = state.replaceString;
    setActiveFlags(state.flags);

    // Event listeners
    patternInput?.addEventListener('input', update);
    testInput?.addEventListener('input', update);
    replaceInput?.addEventListener('input', update);

    document.querySelectorAll('.flag-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        update();
      });
    });

    document.getElementById('btn-copy-pattern')?.addEventListener('click', () => {
      navigator.clipboard.writeText(`/${state.pattern}/${state.flags}`);
      showToast('الگوی Regex با موفقیت کپی شد! 📋');
    });

    document.getElementById('btn-copy-replace')?.addEventListener('click', () => {
      const text = document.getElementById('regex-replace-result')?.textContent || '';
      navigator.clipboard.writeText(text);
      showToast('متن جایگزین‌شده کپی شد! 📋');
    });

    document.getElementById('btn-clear-all')?.addEventListener('click', () => {
      if (patternInput) patternInput.value = '';
      if (testInput) testInput.value = '';
      update();
      showToast('ادیتور با موفقیت پاکسازی شد.');
    });

    update();
  }

  function setPreset(preset) {
    const patternInput = document.getElementById('regex-pattern-input');
    const testInput = document.getElementById('regex-test-input');
    const replaceInput = document.getElementById('regex-replace-input');

    state.pattern = preset.pattern;
    state.flags = preset.flags;
    state.testString = preset.testString;
    if (preset.replaceStr) state.replaceString = preset.replaceStr;

    if (patternInput) patternInput.value = state.pattern;
    if (testInput) testInput.value = state.testString;
    if (replaceInput) replaceInput.value = state.replaceString;
    setActiveFlags(state.flags);
    update();
    showToast(`پریست «${preset.title}» بارگذاری شد.`);
  }

  function getState() { return state; }

  return { init, update, setPreset, showToast, getState };
})();
