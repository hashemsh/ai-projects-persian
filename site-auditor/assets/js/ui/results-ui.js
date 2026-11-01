/**
 * Audit checks checklist and issue cards renderer with interactive filter
 */
window.AuditorResults = {
  currentFilter: 'all',

  render(results, containerId = 'audit-items-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const filtered = results.filter(item => {
      if (this.currentFilter === 'all') return true;
      if (this.currentFilter === 'errors') return item.status === 'error';
      if (this.currentFilter === 'warnings') return item.status === 'warning';
      if (this.currentFilter === 'passed') return item.status === 'pass';
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-400 glass-card rounded-2xl">
          <p class="text-sm">هیچ موردی مطابق فیلتر انتخاب‌شده یافت نشد.</p>
        </div>`;
      return;
    }

    container.innerHTML = filtered.map(item => this.createItemHtml(item)).join('');
    this.bindEvents(container);
  },

  createItemHtml(item) {
    const statusMap = {
      error: { badge: 'خطای بحرانی', class: 'status-error', textClass: 'text-rose-400', icon: '❌' },
      warning: { badge: 'هشدار مهم', class: 'status-warning', textClass: 'text-amber-400', icon: '⚠️' },
      pass: { badge: 'بهینه و پاس‌شده', class: 'status-success', textClass: 'text-emerald-400', icon: '✅' },
      info: { badge: 'نکته پیشنهادی', class: 'status-info', textClass: 'text-cyan-400', icon: 'ℹ️' }
    };

    const s = statusMap[item.status] || statusMap.info;

    return `
      <div class="audit-item ${s.class} mb-3.5" data-id="${item.id}">
        <div class="flex items-start justify-between gap-3 mb-2">
          <div class="flex items-center gap-2">
            <input type="checkbox" class="checklist-checkbox" id="check-${item.id}" data-id="${item.id}">
            <h4 class="text-sm font-bold text-white">${item.title}</h4>
          </div>
          <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/5 ${s.textClass} border border-current/20">
            ${s.badge}
          </span>
        </div>

        <p class="text-xs text-slate-300 leading-relaxed mb-2.5 mr-6">
          ${item.message}
        </p>

        ${item.fixSnippet ? `
          <div class="mt-2.5 mr-6 p-2.5 rounded-xl bg-dark-900/90 border border-white/5">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] text-slate-400 font-medium">کد اصلاحی پیشنهادی:</span>
              <button type="button" class="btn-copy-fix text-[11px] text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1" data-snippet="${encodeURIComponent(item.fixSnippet)}">
                <span>📋 کپی کد</span>
              </button>
            </div>
            <pre class="code-preview-box"><code>${this.escapeHtml(item.fixSnippet)}</code></pre>
          </div>
        ` : ''}
      </div>
    `;
  },

  bindEvents(container) {
    // Copy code snippet
    container.querySelectorAll('.btn-copy-fix').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rawSnippet = decodeURIComponent(e.currentTarget.getAttribute('data-snippet') || '');
        navigator.clipboard.writeText(rawSnippet).then(() => {
          if (window.AuditorToast) window.AuditorToast.show('کد اصلاحی با موفقیت کپی شد! 📋', 'success');
        });
      });
    });

    // Checkbox toggling
    container.querySelectorAll('.checklist-checkbox').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const parent = e.target.closest('.audit-item');
        if (e.target.checked) {
          parent.style.opacity = '0.55';
          if (window.AuditorToast) window.AuditorToast.show('مورد به عنوان برطرف‌شده علامت خورد ✅', 'info');
        } else {
          parent.style.opacity = '1';
        }
      });
    });
  },

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};
