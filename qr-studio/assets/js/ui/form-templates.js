/**
 * QR Code Studio Pro - HTML Input Templates for each data type
 */
window.QRFormTemplates = (function() {
  const templates = {
    url: () => `
      <div class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">آدرس وب‌سایت یا لینک مستقیم (URL):</label>
          <div class="relative">
            <span class="absolute inset-y-0 right-3 flex items-center text-slate-500 pointer-events-none">🔗</span>
            <input type="url" id="inpUrl" class="qr-input w-full pr-10 pl-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-left" dir="ltr" placeholder="https://example.com" value="https://tablighma.com/">
          </div>
          <p class="text-[11px] text-slate-400 mt-1">با اسکن کیوآرکد، مرورگر گوشی مستقیماً به این صفحه اینترنتی هدایت می‌شود.</p>
        </div>
      </div>
    `,
    wifi: () => `
      <div class="space-y-3.5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">نام شبکه وای‌فای (SSID):</label>
            <input type="text" id="inpWifiSsid" class="qr-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm" placeholder="مثلاً: MyHomeWiFi" value="MyHomeWiFi">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">نوع رمزنگاری امنیتی:</label>
            <select id="inpWifiType" class="qr-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm">
              <option value="WPA" selected>WPA / WPA2 / WPA3 (پیشنهادی)</option>
              <option value="WEP">WEP (قدیمی)</option>
              <option value="nopass">شبکه باز و عمومی (بدون پسورد)</option>
            </select>
          </div>
        </div>
        <div id="wifiPassWrapper">
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">رمز عبور وای‌فای (Password):</label>
          <div class="relative">
            <input type="password" id="inpWifiPass" class="qr-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-mono" placeholder="رمز عبور شبکه" value="FastInternet2026">
            <button type="button" id="btnToggleWifiPass" class="absolute inset-y-0 left-3 flex items-center text-xs text-slate-400 hover:text-cyan-300">نمایش</button>
          </div>
        </div>
        <label class="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
          <input type="checkbox" id="inpWifiHidden" class="rounded bg-dark-900 border-white/20 text-cyan-500 focus:ring-0">
          <span>این شبکه مخفی است (Hidden SSID)</span>
        </label>
      </div>
    `,
    whatsapp: () => `
      <div class="space-y-3.5">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">شماره موبایل واتساپ (همراه با کد کشور یا بدون صفر):</label>
          <div class="relative">
            <span class="absolute inset-y-0 right-3 flex items-center text-slate-500 pointer-events-none">💬</span>
            <input type="tel" id="inpWaPhone" class="qr-input w-full pr-10 pl-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-left" dir="ltr" placeholder="09123456789" value="09123456789">
          </div>
          <p class="text-[11px] text-slate-400 mt-1">سیستم شماره را خودکار به فرمت بین‌المللی (+98) تبدیل می‌کند.</p>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">متن پیام آماده و پیش‌فرض (اختیاری):</label>
          <textarea id="inpWaText" rows="2" class="qr-input w-full p-3 rounded-xl text-xs leading-relaxed" placeholder="سلام، مایل به دریافت اطلاعات تکمیلی هستم...">سلام، در رابطه با خدمات وب‌سایت سوال داشتم.</textarea>
          <p class="text-[11px] text-slate-400 mt-1">با اسکن کیوآرکد، چت واتساپ با این پیام آماده برای ارسال باز می‌شود.</p>
        </div>
      </div>
    `,
    telegram: () => `
      <div class="space-y-3.5">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">آیدی کانال، گروه یا ربات تلگرام (بدون @ یا با @):</label>
          <div class="relative">
            <span class="absolute inset-y-0 right-3 flex items-center text-slate-500 pointer-events-none">✈️</span>
            <input type="text" id="inpTgTarget" class="qr-input w-full pr-10 pl-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-left" dir="ltr" placeholder="tablighma" value="tablighma">
          </div>
          <p class="text-[11px] text-slate-400 mt-1">کیوآرکد کاربر را مستقیماً به صفحه یا چت این آیدی در تلگرام منتقل می‌کند.</p>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">متن پیام یا اشتراک‌گذاری (اختیاری):</label>
          <input type="text" id="inpTgText" class="qr-input w-full px-3.5 py-2.5 rounded-xl text-xs" placeholder="متن همراه برای اشتراک..." value="سلام، پیام ارسالی جهت همکاری">
        </div>
      </div>
    `,
    instagram: () => `
      <div class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">نام کاربری پیج اینستاگرام (Username) یا لینک مستقیم:</label>
          <div class="relative">
            <span class="absolute inset-y-0 right-3 flex items-center text-slate-500 pointer-events-none">📸</span>
            <input type="text" id="inpIgUser" class="qr-input w-full pr-10 pl-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-left" dir="ltr" placeholder="tablighma" value="tablighma">
          </div>
          <p class="text-[11px] text-slate-400 mt-1">با اسکن کد، پیج اینستاگرام در اپلیکیشن یا مرورگر کاربر گشوده می‌شود.</p>
        </div>
      </div>
    `
  };

  return { templates };
})();
