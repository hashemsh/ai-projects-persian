/**
 * Comparison Table & Top Recommendations Renderer (< 200 lines)
 */
const TableRenderer = (function() {
  function renderRecommendations(evaluatedList, container) {
    if (!container) return;
    if (!evaluatedList || evaluatedList.length === 0) {
      container.innerHTML = '<div class="col-span-3 text-center py-6 text-slate-400 text-xs">مدلی با فیلتر انتخابی یافت نشد.</div>';
      return;
    }

    const bestQuality = evaluatedList.find(e => e.model.badge === 'best-quality') || evaluatedList[0];
    const bestValue = evaluatedList.find(e => e.model.badge === 'best-value') || evaluatedList[1] || evaluatedList[0];
    const freeOption = evaluatedList.find(e => e.model.billingType === 'free' || e.model.hasFreeTier === true);

    const freeCardHtml = freeOption ? `
      <div class="glass-card p-5 stat-card-glow border-cyan-500/20">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="badge-free badge-nowrap text-[11px] px-2.5 py-1 rounded-lg font-bold">طرح رایگان پیشنهادی</span>
          <span class="text-xs text-slate-300 font-bold truncate">${freeOption.model.name}</span>
        </div>
        <div class="text-xl font-black text-white mb-1">${freeOption.formattedUSD} <span class="text-xs text-cyan-400 font-normal">هزینه پایه</span></div>
        <div class="text-xs text-emerald-400 font-semibold mb-3">${freeOption.formattedToman}</div>
        <p class="text-[11px] text-slate-400 leading-relaxed">${freeOption.model.freeQuota || freeOption.model.desc}</p>
      </div>
    ` : `
      <div class="glass-card p-5 border-white/5 opacity-70">
        <div class="text-[11px] text-slate-400 font-bold mb-2">طرح رایگان دائمی</div>
        <div class="text-sm font-bold text-slate-300 mb-1">فاقد گزینه کاملاً رایگان</div>
        <p class="text-[11px] text-slate-500">تمامی مدل‌های این فیلتر نیازمند اشتراک یا خرید اعتبار API هستند.</p>
      </div>
    `;

    container.innerHTML = `
      <div class="glass-card p-5 stat-card-glow border-pink-500/20">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="badge-best-quality badge-nowrap text-[11px] px-2.5 py-1 rounded-lg font-bold">کیفیت خروجی برتر</span>
          <span class="text-xs text-slate-300 font-bold truncate">${bestQuality.model.name}</span>
        </div>
        <div class="text-xl font-black text-white mb-1">${bestQuality.formattedUSD} <span class="text-xs text-pink-400 font-normal">برآورد هزینه</span></div>
        <div class="text-xs text-emerald-400 font-semibold mb-3">${bestQuality.formattedToman}</div>
        <p class="text-[11px] text-slate-400 leading-relaxed">${bestQuality.model.desc}</p>
      </div>

      <div class="glass-card p-5 stat-card-glow border-emerald-500/20">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="badge-best-value badge-nowrap text-[11px] px-2.5 py-1 rounded-lg font-bold">بیشترین ارزش خرید</span>
          <span class="text-xs text-slate-300 font-bold truncate">${bestValue.model.name}</span>
        </div>
        <div class="text-xl font-black text-white mb-1">${bestValue.formattedUSD} <span class="text-xs text-emerald-400 font-normal">برآورد هزینه</span></div>
        <div class="text-xs text-emerald-400 font-semibold mb-3">${bestValue.formattedToman}</div>
        <p class="text-[11px] text-slate-400 leading-relaxed">${bestValue.model.desc}</p>
      </div>

      ${freeCardHtml}
    `;
  }

  function renderTable(evaluatedList, tbody, currencyMode) {
    if (!tbody) return;
    if (!evaluatedList || evaluatedList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-400 text-xs">مدلی با این فیلتر یافت نشد.</td></tr>`;
      return;
    }

    tbody.innerHTML = evaluatedList.map(item => {
      const m = item.model;
      let badgeHtml = '';
      if (m.badge === 'best-quality') {
        badgeHtml = `<span class="badge-best-quality badge-nowrap text-[11px] px-2.5 py-1 rounded-lg font-bold">${m.badgeText || 'کیفیت بالا'}</span>`;
      } else if (m.badge === 'best-value') {
        badgeHtml = `<span class="badge-best-value badge-nowrap text-[11px] px-2.5 py-1 rounded-lg font-bold">${m.badgeText || 'ارزش خرید'}</span>`;
      } else if (m.badge === 'free' || m.billingType === 'free') {
        badgeHtml = `<span class="badge-free badge-nowrap text-[11px] px-2.5 py-1 rounded-lg font-bold">${m.badgeText || 'طرح رایگان'}</span>`;
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

      const sourceLink = m.source_url ? `
        <a href="${m.source_url}" target="_blank" rel="noopener noreferrer" class="text-[11px] text-indigo-400 hover:text-indigo-300 transition inline-flex items-center gap-1 mt-1" title="مشاهده مستندات رسمی تعرفه">
          <span>مستندات تعرفه</span><span class="text-[9px]">↗</span>
        </a>
      ` : '';

      return `
        <tr>
          <td>
            <div class="flex items-center gap-3">
              <div class="model-logo-box">
                <img src="${m.logo}" alt="${m.name}" loading="lazy" />
              </div>
              <div>
                <div class="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>${m.name}</span>
                </div>
                <div class="text-[11px] text-slate-400">${m.desc}</div>
                ${sourceLink}
              </div>
            </div>
          </td>
          <td><span class="text-xs text-slate-300 font-medium whitespace-nowrap">${m.provider}</span></td>
          <td>
            <div class="text-xs font-semibold text-cyan-300">${m.unitDesc}</div>
            <div class="text-[10px] text-slate-500 mt-0.5">${m.freeQuota}</div>
          </td>
          <td>
            <div class="whitespace-nowrap">${costDisplay}</div>
            <div class="text-[10px] text-slate-500 mt-0.5">${item.billingNote}</div>
          </td>
          <td>
            <span class="${m.hasFreeTier ? 'badge-free' : 'badge-paid'} badge-nowrap text-[11px] px-2 py-0.5 rounded-lg">
              ${m.monthlyDesc || (m.billingType === 'free' ? 'کاملاً رایگان' : 'API مصرفی')}
            </span>
          </td>
          <td class="text-center"><div class="inline-flex">${badgeHtml}</div></td>
        </tr>
      `;
    }).join('');
  }

  return { renderRecommendations, renderTable };
})();
