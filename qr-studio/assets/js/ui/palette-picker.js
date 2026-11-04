/**
 * QR Code Studio Pro - Palette Picker, Icon Selector & Toast Helper
 */
window.QRPalettePicker = (function() {
  function renderColorPresets(listEl, onSelect) {
    if (!listEl || !window.QRPresets) return;
    listEl.innerHTML = window.QRPresets.colorPalettes.map((p, idx) => `
      <button type="button" class="btn-palette px-2.5 py-1.5 rounded-xl border border-white/10 hover:border-cyan-400/50 text-[11px] flex items-center gap-2 bg-dark-900 transition" data-idx="${idx}">
        <span class="w-3.5 h-3.5 rounded-full shadow-inner border border-white/20" style="background: ${p.type === 'linear' ? `linear-gradient(135deg, ${p.color1}, ${p.color2})` : p.color1}"></span>
        <span class="text-slate-300">${p.name}</span>
      </button>
    `).join('');

    listEl.querySelectorAll('.btn-palette').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = window.QRPresets.colorPalettes[parseInt(btn.dataset.idx, 10)];
        onSelect(p);
      });
    });
  }

  function renderBrandIcons(boxEl, onSelect) {
    if (!boxEl || !window.QRPresets) return;
    boxEl.innerHTML = window.QRPresets.brandIcons.map(icon => `
      <button type="button" class="btn-brand-icon p-2 rounded-xl border border-white/10 hover:border-cyan-400/50 bg-dark-900 transition flex items-center justify-center text-xs" data-id="${icon.id}" title="${icon.name}">
        ${icon.svg ? `<img src="${icon.svg}" class="w-5 h-5 pointer-events-none" alt="${icon.name}">` : `<span class="text-[11px] text-slate-400">بدون لوگو</span>`}
      </button>
    `).join('');

    boxEl.querySelectorAll('.btn-brand-icon').forEach(btn => {
      btn.addEventListener('click', () => {
        boxEl.querySelectorAll('.btn-brand-icon').forEach(b => b.classList.remove('border-cyan-400', 'bg-cyan-500/10'));
        btn.classList.add('border-cyan-400', 'bg-cyan-500/10');
        const found = window.QRPresets.brandIcons.find(i => i.id === btn.dataset.id);
        onSelect(found && found.svg ? found.svg : null);
      });
    });
  }

  function showToast(title, msg, isError = false) {
    const t = document.getElementById('qrToast');
    if (!t) return;
    t.innerHTML = `
      <div class="font-bold text-xs ${isError ? 'text-rose-400' : 'text-cyan-300'}">${title}</div>
      <div class="text-[11px] text-slate-300 mt-0.5">${msg}</div>
    `;
    t.classList.remove('translate-y-20', 'opacity-0');
    t.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      t.classList.add('translate-y-20', 'opacity-0');
      t.classList.remove('translate-y-0', 'opacity-100');
    }, 3500);
  }

  return {
    renderColorPresets,
    renderBrandIcons,
    showToast
  };
})();
