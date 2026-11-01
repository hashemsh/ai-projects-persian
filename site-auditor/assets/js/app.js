/**
 * Site Auditor Pro - Main Application Orchestrator
 */
window.AuditorApp = {
  currentData: null,
  activeMode: 'html',

  init() {
    this.bindEvents();
    this.restoreSavedState();
  },

  bindEvents() {
    const tabUrl = document.getElementById('tab-mode-url');
    const tabHtml = document.getElementById('tab-mode-html');
    const secUrl = document.getElementById('section-input-url');
    const secHtml = document.getElementById('section-input-html');

    tabUrl?.addEventListener('click', () => {
      this.activeMode = 'url';
      tabUrl.classList.add('active');
      tabHtml.classList.remove('active');
      secUrl.classList.remove('hidden');
      secHtml.classList.add('hidden');
    });

    tabHtml?.addEventListener('click', () => {
      this.activeMode = 'html';
      tabHtml.classList.add('active');
      tabUrl.classList.remove('active');
      secHtml.classList.remove('hidden');
      secUrl.classList.add('hidden');
    });

    document.getElementById('btn-run-audit')?.addEventListener('click', () => this.runAudit());
    document.getElementById('btn-sample-bad')?.addEventListener('click', () => this.loadSample('sample-ecommerce'));
    document.getElementById('btn-sample-good')?.addEventListener('click', () => this.loadSample('sample-perfect'));
    document.getElementById('btn-reset-form')?.addEventListener('click', () => this.resetForm());
    document.getElementById('file-upload-html')?.addEventListener('change', (e) => this.handleFileUpload(e));

    document.querySelectorAll('.btn-filter-status').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.btn-filter-status').forEach(b => b.classList.remove('active', 'border-indigo-500'));
        e.currentTarget.classList.add('active', 'border-indigo-500');
        window.AuditorResults.currentFilter = e.currentTarget.getAttribute('data-filter') || 'all';
        if (this.currentData) window.AuditorResults.render(this.currentData.results);
      });
    });

    this.bindExportEvents();
  },

  bindExportEvents() {
    document.getElementById('btn-export-html')?.addEventListener('click', () => {
      if (!this.currentData) return;
      window.AuditorExporter.exportHtmlReport(this.currentData);
      window.AuditorToast.show('گزارش HTML آماده و دانلود شد! 📄', 'success');
    });

    document.getElementById('btn-export-json')?.addEventListener('click', () => {
      if (!this.currentData) return;
      window.AuditorExporter.exportJson(this.currentData);
      window.AuditorToast.show('فایل ساختاریافته JSON ذخیره شد! 💾', 'success');
    });

    document.getElementById('btn-copy-markdown')?.addEventListener('click', () => {
      if (!this.currentData) return;
      navigator.clipboard.writeText(window.AuditorExporter.exportMarkdown(this.currentData)).then(() => {
        window.AuditorToast.show('خلاصه گزارش مارک‌داون کپی شد! 📋', 'success');
      });
    });
  },

  handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const ta = document.getElementById('input-raw-html');
      if (ta) ta.value = evt.target.result;
      window.AuditorToast.show(`فایل ${file.name} بارگذاری شد.`, 'info');
      this.runAudit();
    };
    reader.readAsText(file);
  },

  loadSample(sampleId) {
    const s = window.AuditorSamples.find(item => item.id === sampleId);
    if (!s) return;
    const ta = document.getElementById('input-raw-html');
    const urlIn = document.getElementById('input-website-url');
    if (ta) ta.value = s.html;
    if (urlIn) urlIn.value = s.url;
    window.AuditorToast.show(`نمونه بارگذاری شد.`, 'info');
    this.runAudit();
  },

  resetForm() {
    const ta = document.getElementById('input-raw-html');
    const urlIn = document.getElementById('input-website-url');
    if (ta) ta.value = '';
    if (urlIn) urlIn.value = '';
    window.AuditorStorage.clearState();
    document.getElementById('audit-results-wrapper')?.classList.add('hidden');
    window.AuditorToast.show('فرم پاکسازی شد.', 'info');
  },

  async resolveHtmlContent() {
    if (this.activeMode === 'url') {
      const url = (document.getElementById('input-website-url')?.value || '').trim();
      if (!url) {
        window.AuditorToast.show('لطفاً آدرس اینترنتی معتبری وارد کنید.', 'error');
        return null;
      }
      try {
        window.AuditorToast.show('در حال پردازش آدرس وب...', 'info');
        const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
        if (!res.ok) throw new Error();
        return { html: await res.text(), source: url };
      } catch (_) {
        window.AuditorToast.show('خطا در دریافت مستقیم دامنه. از حالت پیست HTML استفاده کنید.', 'warning');
        return null;
      }
    }
    const html = (document.getElementById('input-raw-html')?.value || '').trim();
    if (!html) {
      window.AuditorToast.show('لطفاً کدهای HTML صفحه را پیست یا فایل را آپلود کنید.', 'error');
      return null;
    }
    return { html, source: 'سورس کد مستقیم HTML' };
  },

  async runAudit() {
    const payload = await this.resolveHtmlContent();
    if (!payload) return;

    const parsed = window.AuditorParser.parse(payload.html, payload.source);
    const allChecks = [
      ...window.AuditorSeo.evaluate(parsed),
      ...window.AuditorPerf.evaluate(parsed),
      ...window.AuditorUx.evaluate(parsed),
      ...window.AuditorSecurity.evaluate(parsed)
    ];

    const summary = {
      errors: allChecks.filter(c => c.status === 'error').length,
      warnings: allChecks.filter(c => c.status === 'warning').length,
      passed: allChecks.filter(c => c.status === 'pass').length
    };

    const scoreData = window.AuditorGauge.calculateScores(allChecks);
    this.currentData = { parsed, results: allChecks, summary, ...scoreData, source: payload.source };

    document.getElementById('audit-results-wrapper')?.classList.remove('hidden');
    window.AuditorGauge.render(scoreData, summary);
    window.AuditorResults.render(allChecks);
    window.AuditorPreview.render(parsed);

    window.AuditorStorage.saveState({ mode: this.activeMode, html: payload.html, source: payload.source });
    window.AuditorToast.show('ممیزی کامل صفحه با موفقیت انجام شد! 🚀', 'success');
  },

  restoreSavedState() {
    const saved = window.AuditorStorage.loadState();
    if (saved && saved.html) {
      const ta = document.getElementById('input-raw-html');
      if (ta) ta.value = saved.html;
      this.runAudit();
    } else {
      this.loadSample('sample-ecommerce');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => window.AuditorApp.init());
