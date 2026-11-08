/**
 * Multi-Language Code Modal & Exporter (< 200 lines)
 */

window.RegexCodeModal = (function() {
  let currentLang = 'javascript';

  function renderModal() {
    if (document.getElementById('code-modal')) return;
    const modalDiv = document.createElement('div');
    modalDiv.id = 'code-modal';
    modalDiv.className = 'fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 hidden';
    modalDiv.innerHTML = `
      <div class="glass-card p-6 max-w-2xl w-full flex flex-col border border-indigo-500/40 shadow-2xl">
        <div class="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <h3 class="text-sm font-black text-white">تولید کد عبارت منظم (Code Export)</h3>
          <button type="button" id="btn-close-code-modal" class="text-slate-400 hover:text-white text-lg">✕</button>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap mb-4">
          <button type="button" class="code-lang-btn active" data-lang="javascript">JavaScript</button>
          <button type="button" class="code-lang-btn" data-lang="typescript">TypeScript</button>
          <button type="button" class="code-lang-btn" data-lang="python">Python</button>
          <button type="button" class="code-lang-btn" data-lang="php">PHP</button>
          <button type="button" class="code-lang-btn" data-lang="csharp">C#</button>
          <button type="button" class="code-lang-btn" data-lang="java">Java</button>
          <button type="button" class="code-lang-btn" data-lang="go">Go</button>
          <button type="button" class="code-lang-btn" data-lang="cpp">C++</button>
        </div>
        <pre class="p-4 rounded-xl bg-dark-950 font-mono text-xs text-cyan-300 overflow-x-auto max-h-[260px] border border-white/10" dir="ltr"><code id="code-snippet-output"></code></pre>
        <div class="mt-4 pt-3 border-t border-white/10 flex justify-end">
          <button type="button" id="btn-copy-code-snippet" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs">کپی کد در کلیپ‌بورد</button>
        </div>
      </div>
    `;
    document.body.appendChild(modalDiv);
  }

  function init() {
    renderModal();
    const modal = document.getElementById('code-modal');
    const openBtn = document.getElementById('btn-open-code-modal');
    const closeBtn = document.getElementById('btn-close-code-modal');
    const copyBtn = document.getElementById('btn-copy-code-snippet');
    const codeOutput = document.getElementById('code-snippet-output');
    const langBtns = document.querySelectorAll('.code-lang-btn');

    function updateCode() {
      if (!window.RegexLiveEditor || !window.RegexCodeGenerator || !codeOutput) return;
      const state = window.RegexLiveEditor.getState();
      const snippet = window.RegexCodeGenerator.generate(
        currentLang,
        state.pattern,
        state.flags,
        state.testString
      );
      codeOutput.textContent = snippet;
    }

    openBtn?.addEventListener('click', () => {
      updateCode();
      modal?.classList.remove('hidden');
    });

    closeBtn?.addEventListener('click', () => {
      modal?.classList.add('hidden');
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });

    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLang = btn.getAttribute('data-lang') || 'javascript';
        updateCode();
      });
    });

    copyBtn?.addEventListener('click', () => {
      if (!codeOutput) return;
      navigator.clipboard.writeText(codeOutput.textContent);
      if (window.RegexLiveEditor) {
        window.RegexLiveEditor.showToast(`کد ${currentLang} با موفقیت کپی شد! 📋`);
      }
    });
  }

  return { init };
})();
