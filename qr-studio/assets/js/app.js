/**
 * QR Code Studio Pro - Main Orchestrator & Controller
 */
window.QRApp = (function() {
  const state = {
    type: 'url',
    dotType: 'square',
    cornerSquareType: 'square',
    cornerDotType: 'square',
    color1: '#000000',
    color2: '#000000',
    gradient: false,
    gradientType: 'linear',
    bgColor: '#ffffff',
    transparentBg: false,
    logo: null,
    logoSize: 0.26,
    errorCorrection: 'H',
    margin: 10
  };

  let debounceTimer = null;
  function triggerRender() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const formData = window.QRFormHandlers.getFormData(state.type);
      const payload = window.QRPayload.buildPayload(state.type, formData);
      const container = document.getElementById('qrCanvasBox');
      window.QRRenderer.render({ ...state, data: payload }, container);
      updateScanBadge();
    }, 120);
  }

  function initUI() {
    // 1. Data Type Tabs
    document.querySelectorAll('.type-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.type = tab.dataset.type;
        window.QRFormHandlers.renderForm(state.type, document.getElementById('dynamicFormContainer'));
        bindFormInputs();
        triggerRender();
      });
    });

    // 2. Initial Form Render
    window.QRFormHandlers.renderForm(state.type, document.getElementById('dynamicFormContainer'));
    bindFormInputs();

    // 3. Dot Pattern Style Pills
    document.querySelectorAll('.dot-style-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.dot-style-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.dotType = pill.dataset.style;
        triggerRender();
      });
    });

    // 4. Corner Style Selectors
    document.getElementById('selCornerSquare')?.addEventListener('change', (e) => { state.cornerSquareType = e.target.value; triggerRender(); });
    document.getElementById('selCornerDot')?.addEventListener('change', (e) => { state.cornerDotType = e.target.value; triggerRender(); });

    // 5. Palettes & Brand Logos
    setupColorAndLogos();

    // 6. Action Buttons
    bindActionButtons();

    // Initial render
    triggerRender();
  }

  function bindFormInputs() {
    const box = document.getElementById('dynamicFormContainer');
    if (!box) return;
    box.querySelectorAll('input, select, textarea').forEach(inp => {
      inp.addEventListener('input', triggerRender);
      inp.addEventListener('change', triggerRender);
    });
  }

  function setupColorAndLogos() {
    const list = document.getElementById('colorPresetsList');
    window.QRPalettePicker.renderColorPresets(list, (p) => {
      state.gradient = p.type !== 'solid';
      state.gradientType = p.type;
      state.color1 = p.color1;
      state.color2 = p.color2;
      state.bgColor = p.bg;
      state.transparentBg = false;

      const c1 = document.getElementById('inpColor1');
      const c2 = document.getElementById('inpColor2');
      const bg = document.getElementById('inpBgColor');
      const trans = document.getElementById('chkTransparentBg');
      const chkGrad = document.getElementById('chkEnableGradient');

      if (c1) c1.value = p.color1;
      if (c2) c2.value = p.color2;
      if (bg) bg.value = p.bg;
      if (trans) trans.checked = false;
      if (chkGrad) {
        chkGrad.checked = state.gradient;
        document.getElementById('gradientSecondColorWrapper')?.classList.toggle('hidden', !state.gradient);
      }
      triggerRender();
    });

    document.getElementById('inpColor1')?.addEventListener('input', (e) => { state.color1 = e.target.value; triggerRender(); });
    document.getElementById('inpColor2')?.addEventListener('input', (e) => { state.color2 = e.target.value; triggerRender(); });
    document.getElementById('inpBgColor')?.addEventListener('input', (e) => { state.bgColor = e.target.value; triggerRender(); });
    document.getElementById('chkTransparentBg')?.addEventListener('change', (e) => { state.transparentBg = e.target.checked; triggerRender(); });
    document.getElementById('chkEnableGradient')?.addEventListener('change', (e) => {
      state.gradient = e.target.checked;
      document.getElementById('gradientSecondColorWrapper')?.classList.toggle('hidden', !e.target.checked);
      triggerRender();
    });

    document.getElementById('inpLogoSize')?.addEventListener('input', (e) => {
      state.logoSize = parseFloat(e.target.value);
      const lbl = document.getElementById('lblLogoSize');
      if (lbl) lbl.textContent = `${Math.round(state.logoSize * 100)}%`;
      triggerRender();
    });

    document.getElementById('inpCustomLogo')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        state.logo = evt.target.result;
        document.getElementById('logoControlsWrapper')?.classList.remove('hidden');
        triggerRender();
        window.QRPalettePicker.showToast('لوگو بارگذاری شد', 'لوگو در مرکز کیوآرکد قرار گرفت.');
      };
      reader.readAsDataURL(file);
    });

    document.getElementById('btnClearLogo')?.addEventListener('click', () => {
      state.logo = null;
      const f = document.getElementById('inpCustomLogo');
      if (f) f.value = '';
      document.getElementById('logoControlsWrapper')?.classList.add('hidden');
      triggerRender();
      window.QRPalettePicker.showToast('لوگو حذف شد', 'کیوآرکد بدون لوگو بازنشانی گردید.');
    });
  }

  function bindActionButtons() {
    const handleDownload = (ext, size, label) => {
      window.QRRenderer.download(ext, `qrcode-${state.type}-${Date.now()}`, size);
      window.QRPalettePicker.showToast('دانلود آغاز شد', `فایل ${label} با موفقیت ذخیره گردید.`);
    };

    document.getElementById('btnDownloadPng')?.addEventListener('click', () => handleDownload('png', 1200, 'PNG باکیفیت'));
    document.getElementById('btnDownloadSvg')?.addEventListener('click', () => handleDownload('svg', null, 'وکتور SVG'));
    document.getElementById('btnDownloadWebp')?.addEventListener('click', () => handleDownload('webp', 1024, 'WebP'));

    document.getElementById('btnCopyClipboard')?.addEventListener('click', async () => {
      try {
        await window.QRRenderer.copyToClipboard();
        window.QRPalettePicker.showToast('کپی شد!', 'تصویر کیوآرکد در کلیپ‌بورد کپی گردید.');
      } catch (err) {
        window.QRPalettePicker.showToast('خطا در کپی', err.message, true);
      }
    });

    document.getElementById('btnVerifyScan')?.addEventListener('click', async () => {
      const res = await window.QRRenderer.decodeCurrentQR();
      const statusBox = document.getElementById('scanVerifyResult');
      if (!statusBox) return;
      if (res.success) {
        statusBox.innerHTML = `
          <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-1">
            <div class="font-bold flex items-center gap-1.5"><span>✓</span><span>تست دوربین ۱۰۰٪ موفق بود!</span></div>
            <div class="text-[11px] text-slate-300 break-all font-mono select-all bg-dark-950/60 p-2 rounded-lg">${res.data}</div>
          </div>`;
      } else {
        statusBox.innerHTML = `
          <div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            خطا در خوانش اسکنر: ${res.error}
          </div>`;
      }
    });
  }

  function updateScanBadge() {
    const badge = document.getElementById('qrReadyBadge');
    if (badge) badge.textContent = `✓ آماده اسکن | نسخه استاندارد`;
  }

  return { init: initUI };
})();

document.addEventListener('DOMContentLoaded', () => window.QRApp.init());
