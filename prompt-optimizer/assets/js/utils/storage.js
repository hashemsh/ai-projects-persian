/**
 * LocalStorage wrapper with safe fallback
 */
const STORAGE_KEYS = {
  SETTINGS: 'persian_prompt_optimizer_settings',
  HISTORY: 'persian_prompt_optimizer_history',
  THEME: 'persian_prompt_optimizer_theme'
};

export const Storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('Storage save failed:', err);
    }
  },

  loadTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  },

  saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (err) {
      console.warn('Theme save failed:', err);
    }
  },

  loadHistory() {
    return this.get(STORAGE_KEYS.HISTORY, []);
  },

  saveHistory(history) {
    this.set(STORAGE_KEYS.HISTORY, history);
  }
};
