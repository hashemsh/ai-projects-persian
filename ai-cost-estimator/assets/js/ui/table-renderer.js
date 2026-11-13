/**
 * Comparison Table & Top Recommendations Renderer (< 200 lines)
 */
const TableRenderer = (function() {
  function renderRecommendations(evaluatedList, container) {
    const bestQuality = evaluatedList.find(e => e.model.badge === 'best-quality') || evaluatedList[0];
    const bestValue = evaluatedList.find(e => e.model.badge === 'best-value') || evaluatedList[1] || evaluatedList[0];
    const freeOption = evaluatedList.find(e => e.model.badge === 'free' || e.model.type === 'free') || evaluatedList[evaluatedList.length - 1];

    container.innerHTML = `
      <div class="glass-card p-5 stat-card-glow border-pink-500/20">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="badge-best-quality badge-nowrap text-[11px] px-2.5 py-1 rounded-lg font-bold">🌟 بالاترین کیفیت</span>
          <span class="text-xs text-slate-300 font-bold truncate">${bestQuality.model.name}</span>
        </div>
        <div class="text-xl font-black text-white mb-1">${bestQuality.formattedUSD} <span class="text-xs text-pink-400 font-normal">کل هزینه</span></div>
        <div class="text-xs text-emerald-400 font-semibold mb-3">${bestQuality.formattedToman}</div>
        <p class="text-[11px] text-slate-400 leading-relaxed">${bestQuality.model.desc}</p>
      </div>

      <div class="glass-card p-5 stat-card-glow border-emerald-500/20">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="badge-best-value badge-nowrap text-[11px] px-2.5 py-1 rounded-lg font-bold">⚡ بهترین ارزش خرید</span>
          <span class="text-xs text-slate-300 font-bold truncate">${bestValue.model.name}</span>
        </div>
        <div class="text-xl font-black text-white mb-1">${bestValue.formattedUSD} <span class="text-xs text-emerald-400 font-normal">کل هزینه</span></div>
        <div class="text-xs text-emerald-400 font-semibold mb-3">${bestValue.formattedToman}</div>
        <p class="text-[11px] text-slate-400 leading-relaxed">${bestValue.model.desc}</p>
      </div>

      <div class="glass-card p-5 stat-card-glow border-cyan-500/20">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="badge-free badge-nowrap text-[11px] px-2.5 py-1 rounded-lg font-bold">🎁 بهترین گزینه رایگان</span>
          <span class="text-xs text-slate-300 font-bold truncate">${freeOption.model.name}</span>
        </div>
        <div class="text-xl font-black text-white mb-1">${freeOption.formattedUSD} <span class="text-xs text-cyan-400 font-normal">هزینه صفر</span></div>
        <div class="text-xs text-emerald-400 font-semibold mb-3">${freeOption.formattedToman}</div>
        <p class="text-[11px] text-slate-400 leading-relaxed">${freeOption.model.freeQuota || freeOption.model.desc}</p>
      </div>
    `;
  }

  function renderTable(evaluatedList, tbody, currencyMode) {
    if (!evaluatedList || evaluatedList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-400 text-xs">مدلی با این فیلتر یافت نشد.</td></tr>`;
      return;
    }

    tbody.innerHTML = evaluatedList.map(item => {
      const m = item.model;
      let badgeHtml = '';
      if (m.badge === 'best-quality') {
        badgeHtml = `<span class="badge-best-quality badge-nowrap text-[11px] px-2.5 py-1 rounded-lg font-bold">🌟 بالاترین کیفیت</span>`;
      } else if (m.badge === 'best-value') {
        badgeHtml = `<span class="badge-best-value badge-nowrap text-[11px] px-2.5 py-1 rounded-lg font-bold">⚡ ارزش خرید بالا</span>`;
      } else if (m.badge === 'free' || m.type === 'free') {
        badgeHtml = `<span class="badge-free badge-nowrap text-[11px] px-2.5 py-1 rounded-lg font-bold">🎁 رایگان</span>`;
      } else {
        badgeHtml = `<span class="text-slate-400 text-xs whitespace-nowrap">استاندارد</span>`;
      }

      let costDisplay = '';
      if (currencyMode === 'both') {
        costDisplay = `
          <div class="font-bold text-sm text-white">${item.formattedUSD}</div>
          <div class="text-xs text-emerald-400 font-semibold mt-0.5">${item.formattedToman}</div>
        `;
      } else if (currencyMode === 'usd') {
        costDisplay = `<div class="font-bold text-sm text-cyan-300">${item.formattedUSD}</div>`;
      } else {
        costDisplay = `<div class="font-bold text-sm text-emerald-400">${item.formattedToman}</div>`;
      }

      return `
        <tr>
          <td>
            <div class="flex items-center gap-3">
              <div class="model-logo-box">
                <img src="${m.logo}" alt="${m.name} logo" loading="lazy" />
              </div>
              <div>
                <div class="font-bold text-white text-sm flex items-center gap-2">
                  <span>${m.name}</span>
                </div>
                <div class="text-[11px] text-slate-400">${m.desc}</div>
              </div>
            </div>
          </td>
          <td><span class="text-xs text-slate-300 font-medium whitespace-nowrap">${m.provider}</span></td>
          <td>
            <div class="text-xs font-semibold text-cyan-300">${m.unitCostDesc}</div>
            <div class="text-[10px] text-slate-500 mt-0.5">${m.freeQuota}</div>
          </td>
          <td><div class="whitespace-nowrap">${costDisplay}</div></td>
          <td>
            <span class="${m.type === 'free' ? 'badge-free' : 'badge-paid'} badge-nowrap text-[11px] px-2 py-0.5 rounded-lg">
              ${m.typeText}
            </span>
          </td>
          <td class="text-center"><div class="inline-flex">${badgeHtml}</div></td>
        </tr>
      `;
    }).join('');
  }

  return { renderRecommendations, renderTable };
})();
