/**
 * پلیس‌هولدر پرو | ماژول المان‌های رابط کاربری، پالت‌ها و سوئیچ حالت‌ها
 * زیر ۲۰۰ سطر - سازگار با Clean Modular Web
 */

(function () {
  const { state, resetState } = window.PlaceholderState;
  const { renderCanvas } = window.PlaceholderRenderer;
  const { showToast } = window.PlaceholderExporter;

  function switchMode(mode) {
    state.mode = mode;
    const btnGraphic = document.getElementById('btnModeGraphic');
    const btnPhoto = document.getElementById('btnModePhoto');
    const cardGraphic1 = document.getElementById('cardGraphicTypography');
    const cardGraphic2 = document.getElementById('cardGraphicStyles');
    const cardPhoto = document.getElementById('cardRealPhotoOptions');
    const canvasWrap = document.getElementById('viewPreviewCanvas');
    const photoWrap = document.getElementById('viewPreviewPhoto');

    const isGraphic = mode === 'graphic';

    btnGraphic.classList.toggle('bg-pink-600', isGraphic);
    btnGraphic.classList.toggle('text-white', isGraphic);
    btnGraphic.classList.toggle('shadow-glow-pink', isGraphic);
    btnGraphic.classList.toggle('text-slate-400', !isGraphic);

    btnPhoto.classList.toggle('bg-cyan-600', !isGraphic);
    btnPhoto.classList.toggle('text-white', !isGraphic);
    btnPhoto.classList.toggle('shadow-glow-cyan', !isGraphic);
    btnPhoto.classList.toggle('text-slate-400', isGraphic);

    if (cardGraphic1) cardGraphic1.classList.toggle('hidden', !isGraphic);
    if (cardGraphic2) cardGraphic2.classList.toggle('hidden', !isGraphic);
    if (cardPhoto) cardPhoto.classList.toggle('hidden', isGraphic);

    if (canvasWrap) canvasWrap.classList.toggle('hidden', !isGraphic);
    if (photoWrap) photoWrap.classList.toggle('hidden', isGraphic);

    if (isGraphic) {
      renderCanvas();
    } else {
      window.PlaceholderRealPhoto.updatePhotoPreview();
    }
  }

  function populatePresets() {
    const data = window.PLACEHOLDER_DATA || { categories: {} };
    const cat = data.categories[state.activeCategory];
    const container = document.getElementById('presetsContainer');
    if (!cat || !container) return;

    container.innerHTML = cat.presets.map(p => `
      <button type="button" class="preset-btn text-right p-2.5 rounded-xl border border-white/5 bg-slate-900/60 hover:bg-slate-800 hover:border-pink-500/40 transition group" data-w="${p.w}" data-h="${p.h}">
        <div class="flex items-center justify-between text-xs font-bold text-white group-hover:text-pink-300">
          <span>${p.name}</span>
          <span class="font-mono text-[10px] text-slate-500">${p.ratio}</span>
        </div>
        <div class="font-mono text-[11px] text-slate-400 mt-1">${p.w} × ${p.h} px</div>
      </button>
    `).join('');

    container.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const w = parseInt(btn.dataset.w, 10);
        const h = parseInt(btn.dataset.h, 10);
        state.width = w;
        state.height = h;
        state.lockedRatio = w / h;
        document.getElementById('inpWidth').value = w;
        document.getElementById('inpHeight').value = h;
        if (state.mode === 'graphic') {
          renderCanvas();
        } else {
          window.PlaceholderRealPhoto.updatePhotoPreview();
        }
      });
    });
  }

  function populateColorPalettes() {
    const data = window.PLACEHOLDER_DATA || { colorPalettes: [] };
    const container = document.getElementById('palettesContainer');
    if (!container) return;

    container.innerHTML = data.colorPalettes.map((p, idx) => {
      const bgStyle = p.isGradient 
        ? `background: linear-gradient(135deg, ${p.bgGradient[0]}, ${p.bgGradient[1]});` 
        : `background: ${p.bg};`;
      return `<button type="button" class="color-swatch" style="${bgStyle}" title="${p.name}" data-idx="${idx}"></button>`;
    }).join('');

    container.querySelectorAll('.color-swatch').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = data.colorPalettes[parseInt(btn.dataset.idx, 10)];
        if (!p) return;
        container.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (p.isGradient) {
          state.isGradient = true;
          state.bgColor = p.bgGradient[0];
          state.gradientEnd = p.bgGradient[1];
          document.getElementById('chkIsGradient').checked = true;
          document.getElementById('gradientControls').classList.remove('hidden');
          document.getElementById('inpBgColor').value = p.bgGradient[0];
          document.getElementById('inpGradientEnd').value = p.bgGradient[1];
        } else {
          state.isGradient = false;
          state.bgColor = p.bg;
          document.getElementById('chkIsGradient').checked = false;
          document.getElementById('gradientControls').classList.add('hidden');
          document.getElementById('inpBgColor').value = p.bg;
        }

        state.textColor = p.text;
        document.getElementById('inpTextColor').value = p.text;
        renderCanvas();
      });
    });
  }

  function resetFormToDefaults() {
    resetState();
    switchMode('graphic');
    document.getElementById('inpWidth').value = 800;
    document.getElementById('inpHeight').value = 600;
    document.getElementById('inpText').value = "تصویر ماکت";
    document.getElementById('inpSubtitle').value = "";
    document.getElementById('inpBgColor').value = "#0f172a";
    document.getElementById('inpTextColor').value = "#38bdf8";
    document.getElementById('chkIsGradient').checked = false;
    document.getElementById('gradientControls').classList.add('hidden');
    document.getElementById('chkShowGrid').checked = false;
    document.getElementById('selectIcon').value = "image";
    document.getElementById('rangeFontSize').value = 0;
    document.getElementById('lblFontSize').textContent = "خودکار";
    document.getElementById('rangeBorderRadius').value = 0;
    document.getElementById('lblBorderRadius').textContent = "0px";
    document.getElementById('chkPhotoGrayscale').checked = false;
    document.getElementById('chkPhotoBlur').checked = false;
    document.getElementById('photoBlurControls').classList.add('hidden');
    renderCanvas();
    showToast('تنظیمات بازنشانی شد', 'مقادیر به حالت پیش‌فرض بازگشتند.');
  }

  window.PlaceholderUI = {
    switchMode,
    populatePresets,
    populateColorPalettes,
    resetFormToDefaults
  };
})();
