/**
 * پلیس‌هولدر پرو | کنترلر رویدادها و راه‌اندازی اپلیکیشن
 * زیر ۲۰۰ سطر - سازگار با Clean Modular Web
 */

(function () {
  const { state, calculateAspectRatio } = window.PlaceholderState;
  const { renderCanvas } = window.PlaceholderRenderer;
  const { showToast, copyActiveCode, downloadPng, downloadWebp, downloadSvg } = window.PlaceholderExporter;
  const { populatePresets, populateColorPalettes, resetFormToDefaults } = window.PlaceholderUI;

  function initDimensionEvents() {
    const inpW = document.getElementById('inpWidth');
    const inpH = document.getElementById('inpHeight');
    const btnLock = document.getElementById('btnRatioLock');

    inpW.addEventListener('input', (e) => {
      const val = Math.max(10, parseInt(e.target.value, 10) || 10);
      state.width = val;
      if (state.ratioLock) {
        state.height = Math.round(val / state.lockedRatio);
        inpH.value = state.height;
      }
      renderCanvas();
    });

    inpH.addEventListener('input', (e) => {
      const val = Math.max(10, parseInt(e.target.value, 10) || 10);
      state.height = val;
      if (state.ratioLock) {
        state.width = Math.round(val * state.lockedRatio);
        inpW.value = state.width;
      }
      renderCanvas();
    });

    btnLock.addEventListener('click', () => {
      state.ratioLock = !state.ratioLock;
      btnLock.classList.toggle('bg-pink-600', state.ratioLock);
      btnLock.classList.toggle('text-white', state.ratioLock);
      btnLock.classList.toggle('bg-slate-800', !state.ratioLock);
      btnLock.classList.toggle('text-slate-400', !state.ratioLock);
      if (state.ratioLock) {
        state.lockedRatio = state.width / state.height;
        showToast('قفل نسبت فعال شد', `نسبت ${calculateAspectRatio(state.width, state.height)} حفظ می‌شود.`);
      }
    });

    document.getElementById('btnSwapDimensions').addEventListener('click', () => {
      const temp = state.width;
      state.width = state.height;
      state.height = temp;
      state.lockedRatio = state.width / state.height;
      inpW.value = state.width;
      inpH.value = state.height;
      renderCanvas();
    });
  }

  function initTabAndActionEvents() {
    const tabs = [
      { id: 'tabPreview', mode: 'preview' },
      { id: 'tabImgTag', mode: 'html' },
      { id: 'tabSvgCode', mode: 'svg' },
      { id: 'tabOnlineUrl', mode: 'url' },
      { id: 'tabBase64', mode: 'base64' }
    ];

    tabs.forEach(({ id, mode }) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('click', () => {
        tabs.forEach(t => {
          const b = document.getElementById(t.id);
          b.classList.remove('bg-pink-600', 'text-white');
          b.classList.add('text-slate-400');
        });
        btn.classList.add('bg-pink-600', 'text-white');
        btn.classList.remove('text-slate-400');

        state.activeTab = mode;
        const isPrev = mode === 'preview';
        document.getElementById('viewPreview').classList.toggle('hidden', !isPrev);
        document.getElementById('txtOutput').classList.toggle('hidden', isPrev);
        if (!isPrev) window.PlaceholderExporter.updateCodeView();
      });
    });

    document.getElementById('btnCopyActiveCode').addEventListener('click', copyActiveCode);
    document.getElementById('btnDownloadPng').addEventListener('click', downloadPng);
    document.getElementById('btnDownloadWebp').addEventListener('click', downloadWebp);
    document.getElementById('btnDownloadSvg').addEventListener('click', downloadSvg);
    document.getElementById('btnReset').addEventListener('click', resetFormToDefaults);
  }

  function initInputEvents() {
    document.getElementById('inpText').addEventListener('input', (e) => { state.text = e.target.value; renderCanvas(); });
    document.getElementById('inpSubtitle').addEventListener('input', (e) => { state.subtitle = e.target.value; renderCanvas(); });
    document.getElementById('chkShowDimensions').addEventListener('change', (e) => { state.showDimensions = e.target.checked; renderCanvas(); });
    document.getElementById('selectFont').addEventListener('change', (e) => { state.fontFamily = e.target.value; renderCanvas(); });

    document.getElementById('rangeFontSize').addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      state.fontSize = val;
      document.getElementById('lblFontSize').textContent = val === 0 ? "خودکار" : `${val}px`;
      renderCanvas();
    });

    document.getElementById('inpBgColor').addEventListener('input', (e) => { state.bgColor = e.target.value; renderCanvas(); });
    document.getElementById('inpTextColor').addEventListener('input', (e) => { state.textColor = e.target.value; renderCanvas(); });
    document.getElementById('chkIsGradient').addEventListener('change', (e) => {
      state.isGradient = e.target.checked;
      document.getElementById('gradientControls').classList.toggle('hidden', !state.isGradient);
      renderCanvas();
    });
    document.getElementById('inpGradientEnd').addEventListener('input', (e) => { state.gradientEnd = e.target.value; renderCanvas(); });
    document.getElementById('rangeGradientAngle').addEventListener('input', (e) => {
      state.gradientAngle = parseInt(e.target.value, 10);
      document.getElementById('lblGradientAngle').textContent = `${state.gradientAngle}°`;
      renderCanvas();
    });
    document.getElementById('selectIcon').addEventListener('change', (e) => { state.icon = e.target.value; renderCanvas(); });
    document.getElementById('chkShowGrid').addEventListener('change', (e) => { state.showGrid = e.target.checked; renderCanvas(); });
    document.getElementById('rangeBorderRadius').addEventListener('input', (e) => {
      state.borderRadius = parseInt(e.target.value, 10);
      document.getElementById('lblBorderRadius').textContent = `${state.borderRadius}px`;
      renderCanvas();
    });

    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.cat-pill').forEach(p => {
          p.classList.remove('bg-pink-600', 'text-white');
          p.classList.add('bg-slate-900', 'text-slate-400');
        });
        pill.classList.add('bg-pink-600', 'text-white');
        pill.classList.remove('bg-slate-900', 'text-slate-400');
        state.activeCategory = pill.dataset.cat;
        populatePresets();
      });
    });
  }

  function boot() {
    populatePresets();
    populateColorPalettes();
    initDimensionEvents();
    initTabAndActionEvents();
    initInputEvents();
    renderCanvas();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
