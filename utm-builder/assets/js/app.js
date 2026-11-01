/**
 * UTM Builder Pro | Main Application Orchestrator (< 200 lines)
 */
document.addEventListener('DOMContentLoaded', () => {
  let currentResult = null;

  function updateAll(formVals) {
    const res = window.UtmEngine.build(formVals, {
      lowercase: formVals.autoLowercase,
      spaceFormat: formVals.spaceFormat
    });
    currentResult = res;
    renderOutput(res);
    window.UtmGa4Simulator.render('#ga4ReportContainer', res.params || {});
    renderAudit(formVals);
  }

  function renderOutput(res) {
    const urlDisplay = document.getElementById('outputFinalUrl');
    const paramsList = document.getElementById('paramsBreakdownList');
    if (!urlDisplay) return;

    if (!res.success) {
      urlDisplay.textContent = res.error || 'لطفاً آدرس معتبر وارد کنید...';
      urlDisplay.classList.add('text-rose-400');
      return;
    }

    urlDisplay.classList.remove('text-rose-400');
    urlDisplay.textContent = res.url;

    if (paramsList) {
      const p = res.params || {};
      const items = [
        { k: 'Source', v: p.source, c: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
        { k: 'Medium', v: p.medium, c: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' },
        { k: 'Campaign', v: p.campaign, c: 'text-pink-400 border-pink-500/30 bg-pink-500/10' },
        { k: 'Term', v: p.term, c: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
        { k: 'Content', v: p.content, c: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' }
      ].filter(i => i.v);

      paramsList.innerHTML = items.map(i => `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border ${i.c}">
          <span class="opacity-60">${i.k}:</span>
          <span class="font-bold">${i.v}</span>
        </span>
      `).join('');
    }

    if (res.success && res.params?.source && res.params?.campaign) {
      window.UtmExport?.saveHistory(res);
    }
  }

  function renderAudit(formVals) {
    const audit = window.UtmEngine.analyzeQuality(formVals);
    const scoreText = document.getElementById('auditScoreText');
    const scoreBar = document.getElementById('auditScoreBar');
    const criteriaBox = document.getElementById('auditCriteriaContainer');

    if (scoreText) scoreText.textContent = `${audit.score}%`;
    if (scoreBar) {
      scoreBar.style.width = `${audit.score}%`;
      scoreBar.className = `h-full transition-all duration-500 ${audit.score >= 75 ? 'bg-emerald-500' : audit.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`;
    }

    if (criteriaBox) {
      criteriaBox.innerHTML = audit.checks.map(c => `
        <div class="flex items-center justify-between text-xs p-2 rounded-lg ${c.passed ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-slate-800/40 text-slate-400 border border-white/5'}">
          <span class="flex items-center gap-1.5 font-medium"><span>${c.passed ? '✓' : '○'}</span><span>${c.label}</span></span>
          <span class="text-[11px] opacity-75">${c.passed ? 'تکمیل' : 'ناقص'}</span>
        </div>
      `).join('');
    }
  }

  function initActionButtons() {
    document.getElementById('btnCopyUrl')?.addEventListener('click', () => {
      if (currentResult && currentResult.success) {
        window.UtmExport.copyText(currentResult.url, 'کپی شد!', 'لینک استاندارد کمپین در کلیپ‌بورد کپی شد.');
      }
    });

    document.getElementById('btnResetForm')?.addEventListener('click', () => window.UtmFormController.resetForm());
    document.getElementById('btnLoadSample')?.addEventListener('click', () => window.UtmFormController.loadSample());

    // QR Code Modal
    const qrModal = document.getElementById('qrModal');
    let lastQrSvg = '';
    document.getElementById('btnOpenQr')?.addEventListener('click', () => {
      if (!currentResult || !currentResult.success) {
        return window.UtmExport.showToast('خطا', 'ابتدا یک آدرس معتبر وارد کنید.', 'error');
      }
      lastQrSvg = window.UtmQr.renderSvg(currentResult.url, { fgColor: '#0f172a', bgColor: '#ffffff', size: 220 });
      const box = document.getElementById('qrPreviewBox');
      if (box) box.innerHTML = lastQrSvg;
      qrModal?.classList.remove('hidden');
    });

    document.getElementById('btnCloseQr')?.addEventListener('click', () => qrModal?.classList.add('hidden'));
    document.getElementById('btnDownloadQr')?.addEventListener('click', () => {
      if (lastQrSvg) window.UtmQr.downloadSvg(lastQrSvg, 'campaign-utm-qr.svg');
    });

    // Batch Generation Modal
    document.getElementById('btnGenerateBatch')?.addEventListener('click', () => {
      const vals = window.UtmFormController.getValues();
      if (!vals.url || !vals.campaign) {
        return window.UtmExport.showToast('نیاز به اطلاعات', 'لطفاً آدرس پایه و نام کمپین را وارد کنید.', 'error');
      }
      renderBatchModal(window.UtmBatchEngine.generate(vals.url, vals.campaign, [], vals));
    });

    // History Modal
    document.getElementById('btnOpenHistory')?.addEventListener('click', () => renderHistoryModal());
  }

  function renderBatchModal(batchList) {
    const modal = document.getElementById('batchModal');
    const tbody = document.getElementById('batchTableBody');
    if (!modal || !tbody) return;

    tbody.innerHTML = batchList.map(item => `
      <tr class="border-b border-white/5 hover:bg-white/5 transition text-xs">
        <td class="py-2.5 px-3 font-bold text-white">${item.name}</td>
        <td class="py-2.5 px-3 font-mono text-cyan-300">${item.source}</td>
        <td class="py-2.5 px-3 font-mono text-indigo-300">${item.medium}</td>
        <td class="py-2.5 px-3 font-mono text-slate-300 max-w-xs truncate" dir="ltr">${item.url}</td>
        <td class="py-2.5 px-3">
          <button type="button" class="btn-copy-batch p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white transition" data-url="${item.url}" title="کپی">📋</button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.btn-copy-batch').forEach(b => {
      b.addEventListener('click', (e) => window.UtmExport.copyText(e.currentTarget.getAttribute('data-url')));
    });

    document.getElementById('btnDownloadBatchCsv')?.onclick = () => {
      window.UtmBatchEngine.downloadCsv(window.UtmBatchEngine.toCsv(batchList));
    };

    modal.classList.remove('hidden');
    document.getElementById('btnCloseBatch')?.onclick = () => modal.classList.add('hidden');
  }

  function renderHistoryModal() {
    const modal = document.getElementById('historyModal');
    const list = document.getElementById('historyItemsList');
    if (!modal || !list) return;

    const history = window.UtmExport.getHistory();
    list.innerHTML = !history.length 
      ? '<p class="text-xs text-slate-400 text-center py-8">هنوز لینکی در تاریخچه ذخیره نشده است.</p>'
      : history.map(h => `
        <div class="p-3 rounded-xl border border-white/10 bg-dark-900 flex items-center justify-between gap-3 text-xs">
          <div class="flex-1 truncate">
            <div class="font-bold text-white mb-1">${h.campaign} <span class="font-mono text-[11px] text-cyan-300">(${h.source} / ${h.medium})</span></div>
            <div class="text-[11px] text-slate-400 font-mono truncate" dir="ltr">${h.url}</div>
          </div>
          <button type="button" class="btn-copy-hist px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white transition" data-url="${h.url}">کپی</button>
        </div>
      `).join('');

    list.querySelectorAll('.btn-copy-hist').forEach(b => {
      b.addEventListener('click', (e) => window.UtmExport.copyText(e.currentTarget.getAttribute('data-url')));
    });

    modal.classList.remove('hidden');
    document.getElementById('btnCloseHistory')?.onclick = () => modal.classList.add('hidden');
    document.getElementById('btnClearHistory')?.onclick = () => {
      window.UtmExport.clearHistory();
      renderHistoryModal();
    };
  }

  window.UtmFormController.init(updateAll);
  initActionButtons();
});
