import { appState } from '../state/app-state.js';
import { compilePrompt } from '../utils/generator.js';
import { enhanceWithGemini } from '../utils/api-client.js';
import { renderAuditor } from './auditor-ui.js';
import { showToast } from './toast-ui.js';

/**
 * Editor & Controls UI Controller
 */
export function initEditorUI() {
  const rawInput = document.getElementById('raw-prompt-input');
  const modelSelect = document.getElementById('target-model-select');
  const personaSelect = document.getElementById('persona-select');
  const toneSelect = document.getElementById('tone-select');
  const languageSelect = document.getElementById('language-select');
  const cotCheckbox = document.getElementById('cot-toggle');
  const optimizeBtn = document.getElementById('btn-optimize');
  const outputText = document.getElementById('output-text');
  const copyBtn = document.getElementById('btn-copy');
  const clearBtn = document.getElementById('btn-clear');
  const auditorContainer = document.getElementById('auditor-container');

  // Input listener for real-time audit
  rawInput.addEventListener('input', (e) => {
    appState.setState({ rawPrompt: e.target.value });
    renderAuditor(e.target.value, auditorContainer);
  });

  // Controls listeners
  modelSelect.addEventListener('change', (e) => appState.setState({ targetModel: e.target.value }));
  personaSelect.addEventListener('change', (e) => appState.setState({ persona: e.target.value }));
  toneSelect.addEventListener('change', (e) => appState.setState({ tone: e.target.value }));
  languageSelect.addEventListener('change', (e) => appState.setState({ language: e.target.value }));
  cotCheckbox.addEventListener('change', (e) => appState.setState({ cotEnabled: e.target.checked }));

  // Main Optimize Action
  optimizeBtn.addEventListener('click', async () => {
    const state = appState.getState();
    if (!state.rawPrompt.trim()) {
      showToast('لطفاً ابتدا دستور یا پرامپت اولیه را بنویسید.', 'error');
      return;
    }

    try {
      optimizeBtn.disabled = true;
      optimizeBtn.innerHTML = '<span>⚡ در حال بهینه‌سازی...</span>';

      let result = '';
      if (state.apiKey) {
        result = await enhanceWithGemini(state.apiKey, state.rawPrompt);
      } else {
        result = compilePrompt(state);
      }

      appState.setState({ optimizedPrompt: result });
      appState.addToHistory({ raw: state.rawPrompt, optimized: result });
      showToast('پرامپت با موفقیت مهندسی و ارتقا یافت!', 'success');
    } catch (err) {
      showToast(err.message || 'خطا در ارتقای پرامپت', 'error');
    } finally {
      optimizeBtn.disabled = false;
      optimizeBtn.innerHTML = '<span>🚀 مهندسی و ارتقای پرامپت</span>';
    }
  });

  // Copy Action
  copyBtn.addEventListener('click', () => {
    const text = outputText.textContent;
    if (!text || text.includes('هنوز پرامپتی')) {
      showToast('پرامپتی برای کپی وجود ندارد', 'error');
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      showToast('پرامپت در کلیپ‌بورد کپی شد!', 'success');
    });
  });

  // Clear Action
  clearBtn.addEventListener('click', () => {
    appState.setState({ rawPrompt: '', optimizedPrompt: '' });
    rawInput.value = '';
    outputText.textContent = 'خروجی پرامپت بهینه‌شده اینجا نمایش داده خواهد شد...';
    outputText.classList.add('empty');
    renderAuditor('', auditorContainer);
    showToast('فیلدها پاکسازی شدند.', 'info');
  });

  // State Subscription to update view
  appState.subscribe((state) => {
    if (rawInput.value !== state.rawPrompt) rawInput.value = state.rawPrompt;
    modelSelect.value = state.targetModel;
    personaSelect.value = state.persona;
    toneSelect.value = state.tone;
    languageSelect.value = state.language;
    cotCheckbox.checked = state.cotEnabled;

    if (state.optimizedPrompt) {
      outputText.textContent = state.optimizedPrompt;
      outputText.classList.remove('empty');
    }
  });

  // Initial audit render
  renderAuditor(rawInput.value, auditorContainer);
}
