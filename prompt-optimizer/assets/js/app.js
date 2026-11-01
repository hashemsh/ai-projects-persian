/**
 * پرامپت پلاس | کنترلر اصلی واسط کاربری و رویدادها
 * CORS-safe for file:/// and HTTP
 */
document.addEventListener('DOMContentLoaded', function() {
  initDropdowns();
  initAuditor();
  initPresetsModal();
  initActions();
  if (window.PromptExportUI) window.PromptExportUI.init();
});

function initDropdowns() {
  const modelSelect = document.getElementById('selectModel');
  const personaSelect = document.getElementById('selectPersona');
  const toneSelect = document.getElementById('selectTone');
  const langSelect = document.getElementById('selectLang');

  if (modelSelect) {
    modelSelect.innerHTML = window.PromptData.models.map(m => `<option value="${m.id}">🤖 ${m.name}</option>`).join('');
  }
  if (personaSelect) {
    personaSelect.innerHTML = window.PromptData.personas.map(p => `<option value="${p.id}">👤 ${p.name}</option>`).join('');
  }
  if (toneSelect) {
    toneSelect.innerHTML = window.PromptData.tones.map(t => `<option value="${t.id}">🎭 لحن: ${t.name}</option>`).join('');
  }
  if (langSelect) {
    langSelect.innerHTML = window.PromptData.languages.map(l => `<option value="${l.id}">🌐 ${l.name}</option>`).join('');
    langSelect.value = 'bilingual';
  }
}

function initAuditor() {
  const input = document.getElementById('rawPromptInput');
  if (!input) return;

  function update() {
    const res = window.PromptScorer.audit(input.value);
    document.getElementById('auditScoreText').textContent = res.score;
    document.getElementById('auditScoreBar').style.width = res.score + '%';
    document.getElementById('auditScoreBar').className = `h-full rounded-full transition-all duration-500 ${res.barColor}`;
    
    const badge = document.getElementById('auditBadge');
    badge.className = `px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${res.badgeColor}`;

    const critList = document.getElementById('auditCriteriaList');
    critList.innerHTML = res.criteria.map(c => `
      <div class="flex items-center gap-2 text-xs ${c.pass ? 'text-emerald-400' : 'text-slate-500'}">
        <span>${c.pass ? '✓' : '○'}</span><span>${c.label}</span>
      </div>
    `).join('');

    const tipsBox = document.getElementById('auditTipsList');
    tipsBox.innerHTML = res.tips.length > 0 ? res.tips.map(t => `
      <div class="text-[11px] p-2 rounded-lg bg-indigo-500/10 border-r-2 border-indigo-400 text-indigo-300">${t}</div>
    `).join('') : '';
  }

  input.addEventListener('input', update);
  update();
}

function initActions() {
  const optimizeBtn = document.getElementById('btnOptimize');
  const copyBtn = document.getElementById('btnCopy');
  const clearBtn = document.getElementById('btnClear');
  const input = document.getElementById('rawPromptInput');
  const output = document.getElementById('outputResult');

  optimizeBtn.addEventListener('click', async function() {
    const text = input.value.trim();
    if (!text) return showToast('خطا در ورودی', 'لطفاً ابتدا دستور یا پرامپت اولیه را بنویسید.', 'error');

    const originalContent = optimizeBtn.innerHTML;
    try {
      optimizeBtn.disabled = true;
      optimizeBtn.innerHTML = '<span>⚡ در حال تحلیل، ترجمه و ارتقای پرامپت...</span>';

      const compiled = await window.PromptGenerator.compile({
        rawPrompt: text,
        model: document.getElementById('selectModel').value,
        persona: document.getElementById('selectPersona').value,
        tone: document.getElementById('selectTone').value,
        language: document.getElementById('selectLang').value,
        cot: document.getElementById('toggleCot').checked
      });

      output.textContent = compiled;
      output.classList.remove('text-slate-500', 'italic');
      output.classList.add('text-slate-200');

      showToast('پرامپت ارتقا یافت!', 'پرامپت با ترجمه تخصصی و استانداردهای جهانی مهندسی شد.', 'success');
    } catch (err) {
      console.error(err);
      showToast('خطا در پردازش', 'مشکلی در ارتقای پرامپت رخ داد.', 'error');
    } finally {
      optimizeBtn.disabled = false;
      optimizeBtn.innerHTML = originalContent;
    }
  });

  copyBtn.addEventListener('click', function() {
    const text = output.textContent.trim();
    if (!text || text.includes('خروجی پرامپت مهندسی‌شده')) {
      return showToast('موردی برای کپی نیست', 'ابتدا پرامپت را ارتقا دهید.', 'error');
    }
    navigator.clipboard.writeText(text).then(() => {
      showToast('با موفقیت کپی شد!', 'پرامپت مهندسی‌شده در کلیپ‌بورد ذخیره گردید.', 'success');
    });
  });

  clearBtn.addEventListener('click', function() {
    input.value = '';
    output.textContent = 'خروجی پرامپت مهندسی‌شده در این بخش نمایش داده خواهد شد...';
    output.classList.add('text-slate-500', 'italic');
    output.classList.remove('text-slate-200');
    window.PromptScorer.audit('');
    input.dispatchEvent(new Event('input'));
    showToast('پاکسازی شد', 'فیلدها با موفقیت به حالت اولیه برگشتند.', 'info');
  });
}

function initPresetsModal() {
  const modal = document.getElementById('presetsModal');
  const openBtn = document.getElementById('btnOpenPresets');
  const closeBtn = document.getElementById('btnClosePresets');
  const container = document.getElementById('presetsContainer');

  if (!modal || !openBtn || !closeBtn || !container) return;

  container.innerHTML = window.PromptData.presets.map(p => `
    <div class="glass-card glass-card-hover rounded-xl p-4 cursor-pointer flex flex-col justify-between" data-id="${p.id}">
      <div>
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">${p.category}</span>
        <h4 class="text-sm font-bold text-white mt-2 mb-1">${p.name}</h4>
        <p class="text-xs text-slate-400 leading-relaxed">${p.desc}</p>
      </div>
      <div class="text-xs font-semibold text-indigo-400 mt-3 flex items-center gap-1"><span>بارگذاری الگو</span> ←</div>
    </div>
  `).join('');

  container.addEventListener('click', function(e) {
    const card = e.target.closest('[data-id]');
    if (!card) return;
    const item = window.PromptData.presets.find(p => p.id === card.getAttribute('data-id'));
    if (item) {
      document.getElementById('rawPromptInput').value = item.prompt;
      document.getElementById('selectModel').value = item.model;
      document.getElementById('selectPersona').value = item.persona;
      document.getElementById('selectTone').value = item.tone;
      document.getElementById('rawPromptInput').dispatchEvent(new Event('input'));
      modal.classList.add('hidden');
      showToast('الگو بارگذاری شد', `الگوی «${item.name}» اعمال گردید.`, 'success');
    }
  });

  openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
}

function showToast(title, message, type) {
  const toast = document.getElementById('toast');
  const titleEl = document.getElementById('toastTitle');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !titleEl || !msgEl) return;

  titleEl.textContent = title;
  msgEl.textContent = message;
  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 2600);
}
