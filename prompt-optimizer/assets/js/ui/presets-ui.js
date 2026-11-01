import { PRESETS } from '../data/presets.js';
import { appState } from '../state/app-state.js';
import { showToast } from './toast-ui.js';

/**
 * Presets and History Modal Controller
 */
export function initPresetsModal() {
  const modal = document.getElementById('presets-modal');
  const openBtn = document.getElementById('btn-open-presets');
  const closeBtn = document.getElementById('btn-close-presets');
  const grid = document.getElementById('presets-grid');

  if (!modal || !openBtn || !closeBtn || !grid) return;

  // Render presets
  grid.innerHTML = PRESETS.map(preset => `
    <div class="preset-card" data-preset-id="${preset.id}">
      <span class="preset-tag">${preset.category}</span>
      <h4 class="preset-name">${preset.name}</h4>
      <p class="preset-desc">${preset.desc}</p>
    </div>
  `).join('');

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.preset-card');
    if (!card) return;

    const presetId = card.getAttribute('data-preset-id');
    const selected = PRESETS.find(p => p.id === presetId);
    if (selected) {
      appState.setState({
        rawPrompt: selected.prompt,
        targetModel: selected.model,
        persona: selected.persona,
        tone: selected.tone
      });
      modal.classList.remove('active');
      showToast(`الگوی «${selected.name}» بارگذاری شد`, 'success');
    }
  });

  openBtn.addEventListener('click', () => modal.classList.add('active'));
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
