import { Storage } from './utils/storage.js';
import { appState } from './state/app-state.js';
import { TARGET_MODELS, OUTPUT_LANGUAGES } from './data/frameworks.js';
import { PERSONAS, TONES } from './data/personas.js';
import { initEditorUI } from './ui/editor-ui.js';
import { initPresetsModal } from './ui/presets-ui.js';
import { showToast } from './ui/toast-ui.js';

/**
 * Main Application Bootstrap
 */
document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  populateDropdowns();
  initEditorUI();
  initPresetsModal();
  setupApiKeyModal();
});

function setupTheme() {
  const themeToggle = document.getElementById('btn-toggle-theme');
  const currentTheme = Storage.loadTheme();
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = active === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      Storage.saveTheme(next);
      showToast(`حالت ${next === 'dark' ? 'تیره' : 'روشن'} فعال شد`, 'info');
    });
  }
}

function populateDropdowns() {
  const modelSelect = document.getElementById('target-model-select');
  const personaSelect = document.getElementById('persona-select');
  const toneSelect = document.getElementById('tone-select');
  const languageSelect = document.getElementById('language-select');

  if (modelSelect) {
    modelSelect.innerHTML = TARGET_MODELS.map(m => `<option value="${m.id}">🤖 ${m.name}</option>`).join('');
  }

  if (personaSelect) {
    personaSelect.innerHTML = PERSONAS.map(p => `<option value="${p.id}">👤 ${p.name}</option>`).join('');
  }

  if (toneSelect) {
    toneSelect.innerHTML = TONES.map(t => `<option value="${t.id}">🎭 لحن: ${t.name}</option>`).join('');
  }

  if (languageSelect) {
    languageSelect.innerHTML = OUTPUT_LANGUAGES.map(l => `<option value="${l.id}">🌐 ${l.name}</option>`).join('');
    languageSelect.value = 'bilingual';
  }
}

function setupApiKeyModal() {
  const modal = document.getElementById('api-modal');
  const openBtn = document.getElementById('btn-open-api');
  const closeBtn = document.getElementById('btn-close-api');
  const saveBtn = document.getElementById('btn-save-api');
  const input = document.getElementById('api-key-input');

  if (!modal || !openBtn) return;

  openBtn.addEventListener('click', () => modal.classList.add('active'));
  closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  saveBtn?.addEventListener('click', () => {
    const val = input.value.trim();
    appState.setState({ apiKey: val });
    modal.classList.remove('active');
    showToast(val ? 'کلید API ذخیره شد.' : 'حالت آفلاین فعال است.', 'success');
  });
}
