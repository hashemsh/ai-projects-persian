/**
 * LocalStorage state persistence utility
 */
window.AuditorStorage = {
  STORAGE_KEY: 'site_auditor_pro_state_v1',

  saveState(state) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save state to localStorage', e);
    }
  },

  loadState() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Failed to load state from localStorage', e);
      return null;
    }
  },

  clearState() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear state from localStorage', e);
    }
  }
};
