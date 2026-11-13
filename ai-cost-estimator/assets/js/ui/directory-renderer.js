/**
 * AI Models Directory & Monthly Subscription Plans Table Renderer (< 200 lines)
 */
const DirectoryRenderer = (function() {
  function renderDirectory(directoryData, tbody, usdRate) {
    if (!tbody || !directoryData) return;

    tbody.innerHTML = directoryData.map(item => {
      const monthlyToman = item.monthlyUSD > 0 ? Math.round(item.monthlyUSD * usdRate) : 0;
      const formattedToman = monthlyToman > 0 
        ? `${AICalculator.formatNumberFa(monthlyToman)} تومان / ماه`
        : 'رایگان یا بر مبنای مصرف API';

      const formattedUsd = item.monthlyUSD > 0 
        ? `$${item.monthlyUSD} / ماه`
        : 'بدون اشتراک اجباری';

      return `
        <tr>
          <td>
            <div class="flex items-center gap-3">
              <div class="model-logo-box">
                <img src="${item.logo}" alt="${item.name} logo" loading="lazy" />
              </div>
              <div>
                <div class="font-bold text-white text-sm">${item.name}</div>
                <div class="text-[11px] text-slate-400 sm:hidden">${item.company}</div>
              </div>
            </div>
          </td>
          <td class="hidden sm:table-cell"><span class="text-xs text-slate-300 font-medium">${item.company}</span></td>
          <td>
            <div class="text-xs text-slate-300 leading-relaxed max-w-md">${item.capability}</div>
          </td>
          <td>
            <div class="font-bold text-sm text-cyan-300">${formattedUsd}</div>
            <div class="text-[11px] text-slate-400">${item.monthlyDesc}</div>
          </td>
          <td>
            <div class="font-bold text-xs text-emerald-400">${formattedToman}</div>
          </td>
          <td>
            <div class="text-xs text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg inline-block">
              ${item.freeTier}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  return { renderDirectory };
})();
