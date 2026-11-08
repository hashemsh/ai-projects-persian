/**
 * Main Application Bootstrapper for Regex AI Studio (< 200 lines)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Presets UI
  if (window.RegexPresetsUI && window.RegexPresets) {
    const firstPreset = window.RegexPresets[0];

    // 2. Initialize Live Editor
    if (window.RegexLiveEditor) {
      window.RegexLiveEditor.init(firstPreset);
    }

    window.RegexPresetsUI.renderPresets('presets-container', (selectedPreset) => {
      if (window.RegexLiveEditor) {
        window.RegexLiveEditor.setPreset(selectedPreset);
      }
    });
  }

  // 3. Initialize Code Modal
  if (window.RegexCodeModal) {
    window.RegexCodeModal.init();
  }

  // 4. Initialize AI Natural Language Prompt Engine
  const aiForm = document.getElementById('ai-prompt-form');
  const aiInput = document.getElementById('ai-prompt-input');

  aiForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!aiInput || !window.RegexNLP || !window.RegexLiveEditor) return;
    const text = aiInput.value.trim();
    if (!text) return;

    const result = window.RegexNLP.convertPrompt(text);
    if (result) {
      window.RegexLiveEditor.setPreset({
        title: result.name,
        pattern: result.pattern,
        flags: result.flags,
        testString: result.testString
      });
      window.RegexLiveEditor.showToast(`الگوی هوشمند برای «${result.name}» ساخته شد! ✨`);
    }
  });

  // 5. Render Persian Cheat Sheet Grid
  const cheatsheetContainer = document.getElementById('cheatsheet-grid');
  if (cheatsheetContainer && window.RegexCheatSheet) {
    cheatsheetContainer.innerHTML = window.RegexCheatSheet.map(cat => `
      <div class="cheatsheet-card p-5 rounded-2xl bg-dark-900/60 border border-white/10 flex flex-col justify-between">
        <div>
          <h3 class="text-sm font-black text-indigo-300 mb-3.5 pb-2 border-b border-white/5 flex items-center justify-between">
            <span>${cat.category}</span>
            <span class="text-[10px] text-slate-500 font-mono">${cat.items.length} آیتم</span>
          </h3>
          <div class="space-y-2.5">
            ${cat.items.map(it => `
              <div class="flex items-start justify-between gap-2 p-2 rounded-lg bg-dark-950/50 hover:bg-white/5 transition">
                <div class="flex-1">
                  <div class="text-xs font-semibold text-white mb-0.5">${it.name}</div>
                  <div class="text-[11px] text-slate-400 leading-relaxed">${it.desc}</div>
                </div>
                <code class="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 flex-shrink-0" dir="ltr">${it.token}</code>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }
});
