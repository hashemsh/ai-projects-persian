/**
 * UTM Builder Pro | Form UI Controller & Event Handlers
 */
window.UtmFormController = {
  init(onUpdateCallback) {
    this.onUpdate = onUpdateCallback;
    this.bindInputs();
    this.renderPresets();
    this.bindOptions();
    this.loadSavedState();
  },

  getValues() {
    return {
      url: document.getElementById('inpUrl')?.value || '',
      source: document.getElementById('inpSource')?.value || '',
      medium: document.getElementById('inpMedium')?.value || '',
      campaign: document.getElementById('inpCampaign')?.value || '',
      term: document.getElementById('inpTerm')?.value || '',
      content: document.getElementById('inpContent')?.value || '',
      customKey: document.getElementById('inpCustomKey')?.value || '',
      customVal: document.getElementById('inpCustomVal')?.value || '',
      autoLowercase: document.getElementById('chkLowercase')?.checked ?? true,
      spaceFormat: document.querySelector('input[name="spaceFormat"]:checked')?.value || 'hyphen'
    };
  },

  setValues(vals) {
    if (vals.url !== undefined) document.getElementById('inpUrl').value = vals.url;
    if (vals.source !== undefined) document.getElementById('inpSource').value = vals.source;
    if (vals.medium !== undefined) document.getElementById('inpMedium').value = vals.medium;
    if (vals.campaign !== undefined) document.getElementById('inpCampaign').value = vals.campaign;
    if (vals.term !== undefined) document.getElementById('inpTerm').value = vals.term;
    if (vals.content !== undefined) document.getElementById('inpContent').value = vals.content;
    if (vals.customKey !== undefined) document.getElementById('inpCustomKey').value = vals.customKey;
    if (vals.customVal !== undefined) document.getElementById('inpCustomVal').value = vals.customVal;
    if (vals.autoLowercase !== undefined) document.getElementById('chkLowercase').checked = vals.autoLowercase;
    if (vals.spaceFormat) {
      const radio = document.querySelector(`input[name="spaceFormat"][value="${vals.spaceFormat}"]`);
      if (radio) radio.checked = true;
    }
    this.saveState();
    this.triggerUpdate();
  },

  bindInputs() {
    const ids = ['inpUrl', 'inpSource', 'inpMedium', 'inpCampaign', 'inpTerm', 'inpContent', 'inpCustomKey', 'inpCustomVal'];
    ids.forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => {
        this.saveState();
        this.triggerUpdate();
      });
    });
  },

  bindOptions() {
    document.getElementById('chkLowercase')?.addEventListener('change', () => {
      this.saveState();
      this.triggerUpdate();
    });

    document.querySelectorAll('input[name="spaceFormat"]').forEach(r => {
      r.addEventListener('change', () => {
        this.saveState();
        this.triggerUpdate();
      });
    });
  },

  renderPresets() {
    const container = document.getElementById('networkPresetsContainer');
    if (!container || !window.UtmPresets?.networks) return;

    container.innerHTML = window.UtmPresets.networks.map(n => `
      <button type="button" class="preset-network-btn px-3 py-2 rounded-xl border transition flex items-center gap-2 text-xs font-semibold" data-id="${n.id}">
        <span>${n.icon}</span>
        <span>${n.name}</span>
      </button>
    `).join('');

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.preset-network-btn');
      if (!btn) return;
      const id = btn.getAttribute('data-id');
      const network = window.UtmPresets.networks.find(n => n.id === id);
      if (network && network.defaults) {
        if (network.defaults.source) document.getElementById('inpSource').value = network.defaults.source;
        if (network.defaults.medium) document.getElementById('inpMedium').value = network.defaults.medium;
        if (network.defaults.campaign && !document.getElementById('inpCampaign').value) {
          document.getElementById('inpCampaign').value = network.defaults.campaign;
        }
        if (network.defaults.term) document.getElementById('inpTerm').value = network.defaults.term;
        if (network.defaults.content) document.getElementById('inpContent').value = network.defaults.content;

        this.highlightActivePreset(btn);
        this.saveState();
        this.triggerUpdate();
        window.UtmExport?.showToast('پریست اعمال شد', `تنظیمات کانال ${network.name} بارگذاری شد.`);
      }
    });
  },

  highlightActivePreset(activeBtn) {
    document.querySelectorAll('.preset-network-btn').forEach(b => {
      b.classList.remove('active-preset');
    });
    activeBtn.classList.add('active-preset');
  },

  resetForm() {
    this.setValues({
      url: '', source: '', medium: '', campaign: '', term: '', content: '', customKey: '', customVal: ''
    });
    localStorage.removeItem('utm_builder_current_form');
    window.UtmExport?.showToast('فرم پاک‌سازی شد', 'تمام فیلدها ریست شدند.', 'info');
  },

  loadSample() {
    const sample = window.UtmPresets?.sampleData;
    if (sample) {
      this.setValues(sample);
      window.UtmExport?.showToast('داده نمونه بارگذاری شد', 'کمپین تخفیف نوروز در فیلدها قرار گرفت.');
    }
  },

  saveState() {
    try {
      localStorage.setItem('utm_builder_current_form', JSON.stringify(this.getValues()));
    } catch (_) {}
  },

  loadSavedState() {
    try {
      const saved = JSON.parse(localStorage.getItem('utm_builder_current_form'));
      if (saved && saved.url) {
        this.setValues(saved);
        return;
      }
    } catch (_) {}
    // Load default sample if first visit
    this.loadSample();
  },

  triggerUpdate() {
    if (typeof this.onUpdate === 'function') {
      this.onUpdate(this.getValues());
    }
  }
};
