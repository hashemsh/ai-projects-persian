/**
 * Dynamic Tabs & Requirement Controls UI (< 200 lines)
 */
const TabsUI = (function() {
  const controlsTemplates = {
    image: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <label for="param-qty" class="block text-xs font-bold text-slate-300 mb-2">تعداد تصاویر مورد نیاز:</label>
          <div class="flex items-center gap-3">
            <input type="range" id="param-qty" min="1" max="100" value="1" class="w-full accent-indigo-500">
            <span id="param-qty-val" class="w-16 text-center px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-sm">۱ عدد</span>
          </div>
        </div>
        <div>
          <label for="param-quality" class="block text-xs font-bold text-slate-300 mb-2">رزولوشن و کیفیت:</label>
          <select id="param-quality" class="glass-input w-full px-3 py-2 text-xs sm:text-sm">
            <option value="standard">استاندارد (Standard / 1024×1024)</option>
            <option value="hd">کیفیت بالا (HD / 2K - 4K)</option>
          </select>
        </div>
        <div>
          <span class="block text-xs font-bold text-slate-300 mb-2">فیلتر نوع دسترسی:</span>
          <div class="flex items-center gap-2" role="group" aria-label="فیلتر مدل‌های تصویری">
            <button type="button" class="filter-chip active px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold" data-filter="all">همه</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="free">دارای طرح رایگان</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="paid">فقط تجاری</button>
          </div>
        </div>
      </div>
    `,
    video: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <label for="param-seconds" class="block text-xs font-bold text-slate-300 mb-2">مدت زمان ویدیو (ثانیه):</label>
          <div class="flex items-center gap-3">
            <input type="range" id="param-seconds" min="5" max="60" step="5" value="10" class="w-full accent-indigo-500">
            <span id="param-seconds-val" class="w-16 text-center px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-sm">۱۰ ثانیه</span>
          </div>
        </div>
        <div>
          <label for="param-resolution" class="block text-xs font-bold text-slate-300 mb-2">کیفیت خروجی ویدیو:</label>
          <select id="param-resolution" class="glass-input w-full px-3 py-2 text-xs sm:text-sm">
            <option value="720p">HD 720p (استاندارد)</option>
            <option value="1080p">FHD 1080p / 4K (حرفه‌ای)</option>
          </select>
        </div>
        <div>
          <span class="block text-xs font-bold text-slate-300 mb-2">فیلتر نوع مدل:</span>
          <div class="flex items-center gap-2" role="group" aria-label="فیلتر مدل‌های ویدیویی">
            <button type="button" class="filter-chip active px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold" data-filter="all">همه</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="free">دارای سهمیه رایگان</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="paid">اشتراک / API</button>
          </div>
        </div>
      </div>
    `,
    code: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <label for="param-scope" class="block text-xs font-bold text-slate-300 mb-2">مقیاس و حجم پروژه نرم‌افزاری:</label>
          <select id="param-scope" class="glass-input w-full px-3 py-2 text-xs sm:text-sm">
            <option value="script">اسکریپت و توابع ساده (~۵۵K توکن)</option>
            <option value="landing">صفحه فرود / UI کامل (~۲۱۰K توکن)</option>
            <option value="fullapp">اپلیکیشن جامع فول‌استک (~۸۵۰K توکن)</option>
          </select>
        </div>
        <div>
          <span class="block text-xs font-bold text-slate-300 mb-1">تفکیک مدل‌های توسعه:</span>
          <p class="text-[11px] text-slate-400 leading-relaxed">
            محاسبه هزینه بر اساس مصرف توکن API (مانند Claude و DeepSeek) و اشتراک ثابت ماهیانه ابزارها (Cursor و v0).
          </p>
        </div>
        <div>
          <span class="block text-xs font-bold text-slate-300 mb-2">فیلتر مدل‌ها:</span>
          <div class="flex items-center gap-2" role="group" aria-label="فیلتر مدل‌های کد">
            <button type="button" class="filter-chip active px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold" data-filter="all">همه</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="free">دارای سهمیه رایگان</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="paid">پلن تجاری</button>
          </div>
        </div>
      </div>
    `,
    chat: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <label for="param-prompts" class="block text-xs font-bold text-slate-300 mb-2">تعداد پیام و پرامپت متنی:</label>
          <div class="flex items-center gap-3">
            <input type="range" id="param-prompts" min="20" max="2000" step="20" value="100" class="w-full accent-indigo-500">
            <span id="param-prompts-val" class="w-20 text-center px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-sm">۱۰۰ پیام</span>
          </div>
        </div>
        <div>
          <label for="param-tokens-per-msg" class="block text-xs font-bold text-slate-300 mb-2">میانگین توکن هر تعامل (رفت و برگشت):</label>
          <select id="param-tokens-per-msg" class="glass-input w-full px-3 py-2 text-xs sm:text-sm">
            <option value="400">کوتاه و روزمره (~۴۰۰ توکن)</option>
            <option value="800" selected>استاندارد (~۸۰۰ توکن)</option>
            <option value="1600">طولانی و تحلیلی (~۱,۶۰۰ توکن)</option>
          </select>
        </div>
        <div>
          <span class="block text-xs font-bold text-slate-300 mb-2">فیلتر مدل‌ها:</span>
          <div class="flex items-center gap-2" role="group" aria-label="فیلتر مدل‌های چت">
            <button type="button" class="filter-chip active px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold" data-filter="all">همه</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="free">رایگان در وب</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="paid">API تجاری</button>
          </div>
        </div>
      </div>
    `
  };

  function renderControls(category, container, onParamChange) {
    container.innerHTML = controlsTemplates[category] || '';
    bindEvents(category, container, onParamChange);
  }

  function bindEvents(category, container, onParamChange) {
    if (category === 'image') {
      const slider = container.querySelector('#param-qty');
      const val = container.querySelector('#param-qty-val');
      const q = container.querySelector('#param-quality');
      slider?.addEventListener('input', () => {
        val.textContent = `${slider.value} عدد`;
        onParamChange();
      });
      q?.addEventListener('change', onParamChange);
    } else if (category === 'video') {
      const slider = container.querySelector('#param-seconds');
      const val = container.querySelector('#param-seconds-val');
      const res = container.querySelector('#param-resolution');
      slider?.addEventListener('input', () => {
        val.textContent = `${slider.value} ثانیه`;
        onParamChange();
      });
      res?.addEventListener('change', onParamChange);
    } else if (category === 'code') {
      container.querySelector('#param-scope')?.addEventListener('change', onParamChange);
    } else if (category === 'chat') {
      const slider = container.querySelector('#param-prompts');
      const val = container.querySelector('#param-prompts-val');
      const tokensSel = container.querySelector('#param-tokens-per-msg');
      slider?.addEventListener('input', () => {
        val.textContent = `${slider.value} پیام`;
        onParamChange();
      });
      tokensSel?.addEventListener('change', onParamChange);
    }

    container.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.filter-chip').forEach(b => {
          b.classList.remove('active', 'bg-indigo-600', 'text-white');
          b.classList.add('bg-white/5', 'text-slate-400');
        });
        btn.classList.add('active', 'bg-indigo-600', 'text-white');
        btn.classList.remove('bg-white/5', 'text-slate-400');
        onParamChange();
      });
    });
  }

  return { renderControls };
})();
