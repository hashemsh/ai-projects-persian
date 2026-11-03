/**
 * Schema Generator Pro - Main Application Orchestrator
 */
window.App = (function() {
  let activeType = 'Article';
  let activeTab = 'builder'; // 'builder' or 'validator'
  let isMobileSerp = false;
  let isMinified = false;
  let includeScriptTag = true;
  let currentSchemaObj = null;

  function init() {
    renderTypeTabs();
    setupMainModeTabs();
    setupEventListeners();
    loadType(activeType, true);
  }

  function renderTypeTabs() {
    const container = document.getElementById('schemaTypeTabs');
    if (!container || !window.SchemaData) return;

    container.innerHTML = window.SchemaData.types.map(t => {
      const title = t.name.split(' (')[0];
      const enSub = t.name.includes('(') ? t.name.split('(')[1].replace(')', '') : t.id;
      const isActive = t.id === activeType;

      return `
        <button type="button" data-type="${t.id}" class="schema-tab-btn group relative p-3 sm:p-3.5 rounded-2xl text-right flex flex-col justify-between border border-white/10 bg-dark-900/70 hover:border-indigo-500/40 transition-all cursor-pointer ${isActive ? 'active' : ''}">
          <div class="flex items-center justify-between w-full mb-2.5">
            <div class="schema-tab-icon w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg transition-transform group-hover:scale-110 shrink-0">
              ${t.icon}
            </div>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-slate-400 group-hover:text-slate-300 transition">
              ${t.category}
            </span>
          </div>
          <div>
            <div class="schema-tab-title text-xs sm:text-[13px] font-bold text-slate-100 group-hover:text-cyan-300 transition line-clamp-1">
              ${title}
            </div>
            <div class="text-[10px] text-slate-400 font-mono mt-0.5 truncate" dir="ltr">
              ${enSub}
            </div>
          </div>
          <div class="schema-tab-check absolute top-2.5 left-2.5 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-[10px] font-black ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} transition-all">
            ✓
          </div>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.schema-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        if (type !== activeType) {
          activeType = type;
          container.querySelectorAll('.schema-tab-btn').forEach(b => {
            b.classList.remove('active');
            const chk = b.querySelector('.schema-tab-check');
            if (chk) {
              chk.classList.add('opacity-0', 'scale-50');
              chk.classList.remove('opacity-100', 'scale-100');
            }
          });
          btn.classList.add('active');
          const activeChk = btn.querySelector('.schema-tab-check');
          if (activeChk) {
            activeChk.classList.remove('opacity-0', 'scale-50');
            activeChk.classList.add('opacity-100', 'scale-100');
          }
          loadType(activeType, true);
        }
      });
    });
  }

  function setupMainModeTabs() {
    const tabBuilder = document.getElementById('tabModeBuilder');
    const tabValidator = document.getElementById('tabModeValidator');
    const panelBuilder = document.getElementById('panelBuilder');
    const panelValidator = document.getElementById('panelValidator');

    if (tabBuilder && tabValidator) {
      tabBuilder.addEventListener('click', () => {
        activeTab = 'builder';
        tabBuilder.classList.add('bg-indigo-600', 'text-white');
        tabBuilder.classList.remove('text-slate-400');
        tabValidator.classList.remove('bg-indigo-600', 'text-white');
        tabValidator.classList.add('text-slate-400');
        panelBuilder.classList.remove('hidden');
        panelValidator.classList.add('hidden');
      });

      tabValidator.addEventListener('click', () => {
        activeTab = 'validator';
        tabValidator.classList.add('bg-indigo-600', 'text-white');
        tabValidator.classList.remove('text-slate-400');
        tabBuilder.classList.remove('bg-indigo-600', 'text-white');
        tabBuilder.classList.add('text-slate-400');
        panelValidator.classList.remove('hidden');
        panelBuilder.classList.add('hidden');

        // Pre-fill validator with current generated code if empty
        const valInput = document.getElementById('rawJsonInput');
        if (valInput && !valInput.value.trim() && currentSchemaObj) {
          valInput.value = JSON.stringify(currentSchemaObj, null, 2);
          runValidation();
        }
      });
    }
  }

  function loadType(type, loadSample = false) {
    const sampleData = loadSample && window.SchemaData && window.SchemaData.samples ? window.SchemaData.samples[type] : null;
    window.FormRenderer.renderForm(type, sampleData);
    updateSchemaOutput();
  }

  function updateSchemaOutput() {
    const formData = window.FormRenderer.getFormData();
    currentSchemaObj = window.SchemaBuilder.buildSchema(activeType, formData);

    // Format output
    const outputText = window.SchemaBuilder.formatOutput(currentSchemaObj, {
      minified: isMinified,
      includeScriptTag: includeScriptTag
    });

    const codeBox = document.getElementById('schemaOutputCode');
    if (codeBox) {
      codeBox.value = outputText;
    }

    // Update Live SERP Simulator
    if (window.SerpPreview) {
      window.SerpPreview.render(currentSchemaObj);
    }

    // Update quick validation score badge in header
    updateQuickBadge(currentSchemaObj);
  }

  function updateQuickBadge(schemaObj) {
    const badge = document.getElementById('quickAuditBadge');
    if (!badge || !window.SchemaValidator) return;

    const audit = window.SchemaValidator.auditSchema(schemaObj);
    if (audit.score >= 80) {
      badge.className = 'text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1';
      badge.innerHTML = `<span>✓</span><span>ریچ اسنیپت آماده گوگل (${audit.score}٪)</span>`;
    } else {
      badge.className = 'text-[11px] px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1';
      badge.innerHTML = `<span>⚠️</span><span>نیازمند تکمیل فیلدها (${audit.score}٪)</span>`;
    }
  }

  function setupEventListeners() {
    // Form Inputs Change
    const formWrap = document.getElementById('schemaFormContainer');
    if (formWrap) {
      formWrap.addEventListener('input', () => {
        updateSchemaOutput();
      });
      formWrap.addEventListener('change', () => {
        updateSchemaOutput();
      });
    }

    // Format Toggles
    const toggleMinify = document.getElementById('toggleMinify');
    if (toggleMinify) {
      toggleMinify.addEventListener('change', (e) => {
        isMinified = e.target.checked;
        updateSchemaOutput();
      });
    }

    const toggleScriptTag = document.getElementById('toggleScriptTag');
    if (toggleScriptTag) {
      toggleScriptTag.addEventListener('change', (e) => {
        includeScriptTag = e.target.checked;
        updateSchemaOutput();
      });
    }

    // Mobile / Desktop SERP Switcher
    const btnSerpDesktop = document.getElementById('btnSerpDesktop');
    const btnSerpMobile = document.getElementById('btnSerpMobile');
    if (btnSerpDesktop && btnSerpMobile) {
      btnSerpDesktop.addEventListener('click', () => {
        isMobileSerp = false;
        btnSerpDesktop.classList.add('bg-indigo-600', 'text-white');
        btnSerpMobile.classList.remove('bg-indigo-600', 'text-white');
        window.SerpPreview.setMode(false);
        window.SerpPreview.render(currentSchemaObj);
      });
      btnSerpMobile.addEventListener('click', () => {
        isMobileSerp = true;
        btnSerpMobile.classList.add('bg-indigo-600', 'text-white');
        btnSerpDesktop.classList.remove('bg-indigo-600', 'text-white');
        window.SerpPreview.setMode(true);
        window.SerpPreview.render(currentSchemaObj);
      });
    }

    // Top action buttons
    const btnLoadSample = document.getElementById('btnLoadSample');
    if (btnLoadSample) {
      btnLoadSample.addEventListener('click', () => {
        loadType(activeType, true);
        showToast('نمونه آماده بارگذاری شد', `اطلاعات استاندارد نمونه برای ${activeType} در فرم قرار گرفت.`);
      });
    }

    const btnResetForm = document.getElementById('btnResetForm');
    if (btnResetForm) {
      btnResetForm.addEventListener('click', () => {
        window.FormRenderer.renderForm(activeType, null);
        updateSchemaOutput();
        showToast('پاک‌سازی فرم', 'تمام فیلدها ریست شدند.');
      });
    }

    // Copy Button
    const btnCopyCode = document.getElementById('btnCopyCode');
    if (btnCopyCode) {
      btnCopyCode.addEventListener('click', () => {
        const codeBox = document.getElementById('schemaOutputCode');
        if (codeBox && codeBox.value) {
          navigator.clipboard.writeText(codeBox.value).then(() => {
            showToast('کد کپی شد!', 'کد اسکیما در کلیپ‌بورد کپی شد؛ آماده قرارگیری در سایت.');
          }).catch(() => {
            codeBox.select();
            document.execCommand('copy');
            showToast('کد کپی شد!', 'کد اسکیما در کلیپ‌بورد کپی شد.');
          });
        }
      });
    }

    // Download JSON Button
    const btnDownloadJson = document.getElementById('btnDownloadJson');
    if (btnDownloadJson) {
      btnDownloadJson.addEventListener('click', () => {
        if (!currentSchemaObj) return;
        const jsonStr = JSON.stringify(currentSchemaObj, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `schema-${activeType.toLowerCase()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('دانلود انجام شد', 'فایل JSON ذخیره شد.');
      });
    }

    // External Test Buttons
    const btnTestGoogle = document.getElementById('btnTestGoogle');
    if (btnTestGoogle) {
      btnTestGoogle.addEventListener('click', () => {
        window.open('https://search.google.com/test/rich-results', '_blank');
      });
    }

    const btnTestSchemaOrg = document.getElementById('btnTestSchemaOrg');
    if (btnTestSchemaOrg) {
      btnTestSchemaOrg.addEventListener('click', () => {
        window.open('https://validator.schema.org/', '_blank');
      });
    }

    // Validator Panel Buttons & Live input
    const btnRunValidation = document.getElementById('btnRunValidation');
    const rawJsonInput = document.getElementById('rawJsonInput');
    if (btnRunValidation) {
      btnRunValidation.addEventListener('click', runValidation);
    }
    if (rawJsonInput) {
      rawJsonInput.addEventListener('input', debounce(runValidation, 400));
    }

    const btnBeautifyVal = document.getElementById('btnBeautifyVal');
    if (btnBeautifyVal) {
      btnBeautifyVal.addEventListener('click', () => {
        const input = document.getElementById('rawJsonInput');
        if (!input) return;
        const res = window.SchemaValidator.validateJsonSyntax(input.value);
        if (res.isValid && res.parsed) {
          input.value = JSON.stringify(res.parsed, null, 2);
          showToast('مرتب‌سازی کد', 'کد JSON با تورفتگی مرتب شد.');
        } else {
          showToast('خطای سینتکس', 'ساختار کد معتبر نیست و نمی‌تواند مرتب شود.', true);
        }
      });
    }

    const btnLoadValSample = document.getElementById('btnLoadValSample');
    if (btnLoadValSample) {
      btnLoadValSample.addEventListener('click', () => {
        const input = document.getElementById('rawJsonInput');
        if (input && window.SchemaData && window.SchemaData.samples) {
          input.value = JSON.stringify(window.SchemaData.samples.Product, null, 2);
          runValidation();
          showToast('نمونه محصول بارگذاری شد', 'کد نمونه برای تست اعتبارسنج قرار داده شد.');
        }
      });
    }
  }

  function runValidation() {
    const input = document.getElementById('rawJsonInput');
    const resultBox = document.getElementById('validatorResultsArea');
    if (!input || !resultBox || !window.SchemaValidator) return;

    const val = input.value.trim();
    if (!val) {
      resultBox.innerHTML = `
        <div class="text-center py-10 text-slate-500 text-xs">
          کد JSON-LD را در کادر بالا وارد کرده یا روی «تست و اعتبارسنجی زنده» کلیک کنید.
        </div>
      `;
      return;
    }

    const syntaxCheck = window.SchemaValidator.validateJsonSyntax(val);
    if (!syntaxCheck.isValid) {
      resultBox.innerHTML = `
        <div class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2">
          <div class="font-bold flex items-center gap-2 text-sm">
            <span>❌</span><span>خطای بحرانی در ساختار JSON</span>
          </div>
          <p class="font-mono text-left leading-relaxed" dir="ltr">${syntaxCheck.error}</p>
          <p class="text-[11px] text-slate-400">راهنما: وجود علامت کامای اضافه در انتهای خطوط، نبستن کروشه یا گیومه از دلایل متداول این خطاست.</p>
        </div>
      `;
      return;
    }

    // Run Rich Results Guidelines Audit
    const audit = window.SchemaValidator.auditSchema(syntaxCheck.parsed);

    let issuesHtml = audit.issues.map(iss => {
      let icon = '✓';
      let border = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
      if (iss.severity === 'error') {
        icon = '❌';
        border = 'border-rose-500/30 bg-rose-500/10 text-rose-300';
      } else if (iss.severity === 'warning') {
        icon = '⚠️';
        border = 'border-amber-500/30 bg-amber-500/10 text-amber-300';
      }

      return `
        <div class="p-3 rounded-xl border ${border} text-xs flex items-start gap-2.5">
          <span class="shrink-0 mt-0.5">${icon}</span>
          <div class="flex-1">
            ${iss.field ? `<span class="font-mono font-bold ml-1 px-1.5 py-0.5 rounded bg-white/10 text-[11px]" dir="ltr">${iss.field}</span>` : ''}
            <span>${iss.text}</span>
          </div>
        </div>
      `;
    }).join('');

    resultBox.innerHTML = `
      <div class="space-y-4">
        <!-- Score Bar -->
        <div class="p-4 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-between flex-wrap gap-3">
          <div>
            <div class="text-xs text-slate-400">نوع ساختار شناسایی‌شده:</div>
            <div class="text-base font-bold text-white font-mono" dir="ltr">@type: "${audit.type}"</div>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-right">
              <div class="text-xs text-slate-400">نمره سازگاری ریچ اسنیپت:</div>
              <div class="text-xl font-black ${audit.score >= 80 ? 'text-emerald-400' : (audit.score >= 50 ? 'text-amber-400' : 'text-rose-400')}">
                ${audit.score} از ۱۰۰
              </div>
            </div>
          </div>
        </div>

        <!-- Issues List -->
        <div class="space-y-2">
          <div class="text-xs font-bold text-slate-300 mb-2">گزارش بازبینی دستورالعمل‌های گوگل (Rich Results Guidelines):</div>
          ${issuesHtml}
        </div>
      </div>
    `;
  }

  function showToast(title, msg, isError = false) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMsg = document.getElementById('toastMessage');
    if (!toast) return;

    toastTitle.textContent = title;
    toastMsg.textContent = msg;

    if (isError) {
      toast.firstElementChild.className = 'glass-card bg-slate-900/95 border-rose-500/40 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border shadow-rose-500/20';
    } else {
      toast.firstElementChild.className = 'glass-card bg-slate-900/95 border-emerald-500/40 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border shadow-emerald-500/20';
    }

    toast.classList.remove('opacity-0', 'translate-y-24', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-24', 'pointer-events-none');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 3200);
  }

  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  return {
    init,
    triggerUpdate: updateSchemaOutput
  };
})();

// Bootstrap when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
