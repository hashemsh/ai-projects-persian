/**
 * پرامپت پلاس | اکشن‌های اکسپورت، راهنما، متغیرها و مقایسه‌گر قبل/بعد
 * CORS-safe for file:/// and HTTP
 */
window.PromptExportUI = {
  init: function() {
    this.initGuideModal();
    this.initPlaceholders();
    this.initExportButtons();
    this.initDiffTabs();
  },

  initGuideModal: function() {
    const modal = document.getElementById('guideModal');
    const openBtn = document.getElementById('btnOpenGuide');
    const closeBtn = document.getElementById('btnCloseGuide');
    const container = document.getElementById('guideContainer');

    if (!modal || !openBtn || !container) return;

    container.innerHTML = (window.PromptGuide?.tips || []).map(tip => `
      <div class="glass-card rounded-xl p-4 flex flex-col gap-2 border border-white/5">
        <div class="flex items-center gap-2">
          <span class="text-xl">${tip.icon}</span>
          <h4 class="text-sm font-bold text-white">${tip.title}</h4>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${tip.desc}</p>
      </div>
    `).join('');

    openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    closeBtn?.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
  },

  initPlaceholders: function() {
    const container = document.getElementById('placeholderChips');
    const input = document.getElementById('rawPromptInput');
    if (!container || !input) return;

    container.innerHTML = (window.PromptGuide?.placeholders || []).map(p => `
      <button type="button" class="px-2.5 py-1 rounded-lg bg-dark-900/80 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-400 text-[11px] text-slate-300 transition" data-text="${p.text}">
        + ${p.label}
      </button>
    `).join('');

    container.addEventListener('click', function(e) {
      const btn = e.target.closest('button[data-text]');
      if (!btn) return;
      const textToInsert = btn.getAttribute('data-text');
      const start = input.selectionStart || input.value.length;
      const end = input.selectionEnd || input.value.length;
      const val = input.value;
      input.value = val.substring(0, start) + ' ' + textToInsert + ' ' + val.substring(end);
      input.focus();
      input.dispatchEvent(new Event('input'));
    });
  },

  initExportButtons: function() {
    const btnMd = document.getElementById('btnDownloadMd');
    const btnGpt = document.getElementById('btnOpenChatGpt');
    const btnClaude = document.getElementById('btnOpenClaude');
    const output = document.getElementById('outputResult');

    function getValidText() {
      const t = (output?.textContent || '').trim();
      return (t && !t.includes('خروجی پرامپت مهندسی‌شده')) ? t : null;
    }

    btnMd?.addEventListener('click', () => {
      const text = getValidText();
      if (!text) return showToast('خطا', 'ابتدا پرامپت را ارتقا دهید.', 'error');
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `Prompt-Plus-${Date.now()}.md`;
      a.click();
      showToast('دانلود انجام شد', 'فایل پرامپت با فرمت Markdown ذخیره شد.', 'success');
    });

    btnGpt?.addEventListener('click', () => {
      const text = getValidText();
      if (!text) return showToast('خطا', 'ابتدا پرامپت را ارتقا دهید.', 'error');
      navigator.clipboard.writeText(text).then(() => {
        window.open('https://chatgpt.com/', '_blank');
        showToast('کپی و باز شد!', 'پرامپت کپی شد و ChatGPT در تب جدید باز گردید.', 'success');
      });
    });

    btnClaude?.addEventListener('click', () => {
      const text = getValidText();
      if (!text) return showToast('خطا', 'ابتدا پرامپت را ارتقا دهید.', 'error');
      navigator.clipboard.writeText(text).then(() => {
        window.open('https://claude.ai/new', '_blank');
        showToast('کپی و باز شد!', 'پرامپت کپی شد و Claude در تب جدید باز گردید.', 'success');
      });
    });
  },

  initDiffTabs: function() {
    const tabOutput = document.getElementById('tabOutput');
    const tabDiff = document.getElementById('tabDiff');
    const outputBox = document.getElementById('outputResult');
    const diffBox = document.getElementById('diffResult');
    const input = document.getElementById('rawPromptInput');

    if (!tabOutput || !tabDiff || !outputBox || !diffBox) return;

    tabOutput.addEventListener('click', () => {
      tabOutput.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40';
      tabDiff.className = 'px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition';
      outputBox.classList.remove('hidden');
      diffBox.classList.add('hidden');
    });

    tabDiff.addEventListener('click', () => {
      tabDiff.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40';
      tabOutput.className = 'px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition';
      outputBox.classList.add('hidden');
      diffBox.classList.remove('hidden');
      
      const raw = input.value.trim() || 'درخواستی وارد نشده است';
      const opt = outputBox.textContent.trim();
      diffBox.innerHTML = `
        <div class="flex flex-col gap-3">
          <div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
            <span class="font-bold text-rose-300 block mb-1">❌ دستور خام و معمولی شما (قبل):</span>
            <p class="text-slate-300 leading-relaxed">${raw}</p>
          </div>
          <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
            <span class="font-bold text-emerald-300 block mb-1">✅ پرامپت مهندسی‌شده و تقویت‌شده (بعد):</span>
            <p class="text-slate-300 whitespace-pre-wrap leading-relaxed">${opt}</p>
          </div>
        </div>
      `;
    });
  }
};
