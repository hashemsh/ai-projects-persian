/**
 * UTM Builder Pro | Google Analytics 4 (GA4) Acquisition Simulator Module
 */
window.UtmGa4Simulator = {
  detectChannelGroup(source, medium) {
    const s = (source || '').toLowerCase();
    const m = (medium || '').toLowerCase();

    if (/cpc|ppc|paidsearch/i.test(m)) return { name: 'Paid Search (تبلیغات کلیکی)', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    if (/banner|display|native|interstitial/i.test(m)) return { name: 'Display / Native (تبلیغات بنری)', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
    if (/story|bio|channel|social|instagram|telegram|linkedin|twitter/i.test(m) || /instagram|telegram|linkedin|twitter/i.test(s)) {
      return { name: 'Paid / Organic Social (شبکه‌های اجتماعی)', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' };
    }
    if (/email|newsletter/i.test(m)) return { name: 'Email (ایمیل مارکتینگ)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (/sms/i.test(m)) return { name: 'SMS (پیامک مستقیم)', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' };
    if (/affiliate/i.test(m)) return { name: 'Affiliates (همکاری در فروش)', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' };
    return { name: 'Unassigned (دسته‌بندی متفرقه)', color: 'text-slate-400 bg-slate-500/10 border-slate-500/30' };
  },

  render(containerSelector, params) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const source = params.source || '(not set)';
    const medium = params.medium || '(not set)';
    const campaign = params.campaign || '(not set)';
    const channel = this.detectChannelGroup(params.source, params.medium);

    container.innerHTML = `
      <div class="overflow-x-auto">
        <table class="w-full text-right text-xs">
          <thead>
            <tr class="border-b border-white/10 text-slate-400 pb-2">
              <th class="py-2.5 font-semibold">متریک در GA4</th>
              <th class="py-2.5 font-semibold">مقدار ثبت‌شده در داشبورد</th>
              <th class="py-2.5 font-semibold">گزارش مربوطه</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 font-mono">
            <tr>
              <td class="py-2 text-slate-300 font-sans">Session default channel group</td>
              <td class="py-2"><span class="px-2 py-0.5 rounded text-[11px] font-sans font-bold border ${channel.color}">${channel.name}</span></td>
              <td class="py-2 text-slate-400 font-sans">Traffic Acquisition</td>
            </tr>
            <tr>
              <td class="py-2 text-slate-300 font-sans">Session source / medium</td>
              <td class="py-2 font-bold text-cyan-300">${source} / ${medium}</td>
              <td class="py-2 text-slate-400 font-sans">Acquisition > Source/Medium</td>
            </tr>
            <tr>
              <td class="py-2 text-slate-300 font-sans">Session campaign</td>
              <td class="py-2 font-bold text-indigo-300">${campaign}</td>
              <td class="py-2 text-slate-400 font-sans">Campaigns Report</td>
            </tr>
            <tr>
              <td class="py-2 text-slate-300 font-sans">Manual ad content</td>
              <td class="py-2 text-slate-400">${params.content || '(خالی)'}</td>
              <td class="py-2 text-slate-400 font-sans">Ad Content Breakdown</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
};
