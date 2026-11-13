/**
 * Dynamic Tabs & Requirement Controls UI (< 200 lines)
 */
const TabsUI = (function() {
  const controlsTemplates = {
    image: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-2">تعداد تصاویر مورد نیاز:</label>
          <div class="flex items-center gap-3">
            <input type="range" id="param-qty" min="1" max="100" value="1" class="w-full accent-indigo-500">
            <span id="param-qty-val" class="w-16 text-center px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-sm">۱ عدد</span>
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-2">رزولوشن و کیفیت:</label>
          <select id="param-quality" class="glass-input w-full px-3 py-2 text-xs sm:text-sm">
            <option value="standard">استاندارد (Standard / 1024×1024)</option>
            <option value="hd">فوق‌العاده بالا (HD / 2K - 4K)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-2">فیلتر نوع مدل‌ها:</label>
          <div class="flex items-center gap-2">
            <button type="button" class="filter-chip active px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold" data-filter="all">همه</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="free">فقط رایگان</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="paid">فقط تجاری</button>
          </div>
        </div>
      </div>
    `,
    video: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-2">مدت زمان ویدیو (ثانیه):</label>
          <div class="flex items-center gap-3">
            <input type="range" id="param-seconds" min="5" max="60" step="5" value="10" class="w-full accent-indigo-500">
            <span id="param-seconds-val" class="w-16 text-center px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-sm">۱۰ ثانیه</span>
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-2">کیفیت خروجی ویدیو:</label>
          <select id="param-resolution" class="glass-input w-full px-3 py-2 text-xs sm:text-sm">
            <option value="720p">HD 720p (استاندارد و سریع)</option>
            <option value="1080p">FHD 1080p (حرفه‌ای و شارپ)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-2">فیلتر نوع دسترسی:</label>
          <div class="flex items-center gap-2">
            <button type="button" class="filter-chip active px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold" data-filter="all">همه</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="free">سهمیه رایگان</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="paid">پلن پولی</button>
          </div>
        </div>
      </div>
    `,
    code: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-2">مقیاس و حجم پروژه نرم‌افزاری:</label>
          <select id="param-scope" class="glass-input w-full px-3 py-2 text-xs sm:text-sm">
            <option value="script">اسکریپت و توابع ساده (میکروتسک)</option>
            <option value="landing">صفحه فرود / لندینگ پیج کامل (UI + کد)</option>
            <option value="fullapp">اپلیکیشن و وبسایت فول‌استک جامع (Full MVP)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-2">نوع ابزار هدف:</label>
          <div class="text-xs text-slate-400 leading-relaxed pt-1">
            شامل API خام مدل‌ها و محیط‌های فوری ساخت (Cursor, v0, Bolt)
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-2">فیلتر مدل‌ها:</label>
          <div class="flex items-center gap-2">
            <button type="button" class="filter-chip active px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold" data-filter="all">همه گزینه‌ها</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="free">پلن رایگان</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="paid">تجاری / پرو</button>
          </div>
        </div>
      </div>
    `,
    chat: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-2">تعداد پیام و پرامپت متنی:</label>
          <div class="flex items-center gap-3">
            <input type="range" id="param-prompts" min="50" max="2000" step="50" value="100" class="w-full accent-indigo-500">
            <span id="param-prompts-val" class="w-20 text-center px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-sm">۱۰۰ پیام</span>
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-2">تخمین مصرف توکن:</label>
          <div class="text-xs text-cyan-300 pt-2 font-mono">~ ۵۰,۰۰۰ تا ۲۰۰,۰۰۰ توکن ورودی/خروجی</div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-2">فیلتر مدل‌های متنی:</label>
          <div class="flex items-center gap-2">
            <button type="button" class="filter-chip active px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold" data-filter="all">همه</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="free">رایگان در وب</button>
            <button type="button" class="filter-chip px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-semibold" data-filter="paid">API / کلود</button>
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
      slider?.addEventListener('input', () => {
        val.textContent = `${slider.value} پیام`;
        onParamChange();
      });
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
