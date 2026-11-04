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
          <p class="text-[11px] text-slate-400 mt-1">با اسکن کیوآرکد، مرورگر گوشی مستقیماً به این صفحه هدایت می‌شود.</p>
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
    vcard: () => `
      <div class="space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام:</label>
            <input type="text" id="inpVcFirst" class="qr-input w-full px-3 py-2 rounded-xl text-xs" placeholder="هاشم" value="هاشم">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام خانوادگی:</label>
            <input type="text" id="inpVcLast" class="qr-input w-full px-3 py-2 rounded-xl text-xs" placeholder="شیخی‌پور" value="شیخی‌پور">
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">شرکت / سازمان:</label>
            <input type="text" id="inpVcOrg" class="qr-input w-full px-3 py-2 rounded-xl text-xs" placeholder="نام برند یا شرکت" value="تبلیغ ما">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">عنوان شغلی:</label>
            <input type="text" id="inpVcTitle" class="qr-input w-full px-3 py-2 rounded-xl text-xs" placeholder="مدیر محصول" value="مدیر ارشد مارکتینگ">
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">شماره موبایل:</label>
            <input type="tel" id="inpVcPhone" class="qr-input w-full px-3 py-2 rounded-xl text-xs font-mono text-left" dir="ltr" placeholder="0912..." value="09123456789">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">ایمیل کاری:</label>
            <input type="email" id="inpVcEmail" class="qr-input w-full px-3 py-2 rounded-xl text-xs font-mono text-left" dir="ltr" placeholder="info@example.com" value="info@tablighma.com">
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">آدرس وب‌سایت:</label>
          <input type="url" id="inpVcUrl" class="qr-input w-full px-3 py-2 rounded-xl text-xs font-mono text-left" dir="ltr" placeholder="https://..." value="https://tablighma.com/">
        </div>
      </div>
    `,
    bank: () => `
      <div class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">شماره کارت ۱۶ رقمی شتاب:</label>
          <input type="text" id="inpBankCard" maxlength="19" class="qr-input w-full px-3.5 py-2.5 rounded-xl text-sm font-mono text-center tracking-widest text-amber-300" placeholder="6037-9975-XXXX-XXXX" value="6037-9975-1234-5678">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">شماره شبا (IBAN):</label>
          <input type="text" id="inpBankSheba" maxlength="26" class="qr-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-left tracking-wider" dir="ltr" placeholder="IR000000000000000000000000" value="IR000000000000000000000000">
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام صاحب حساب:</label>
            <input type="text" id="inpBankOwner" class="qr-input w-full px-3 py-2 rounded-xl text-xs" placeholder="هاشم شیخی‌پور" value="هاشم شیخی‌پور">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام بانک:</label>
            <input type="text" id="inpBankName" class="qr-input w-full px-3 py-2 rounded-xl text-xs" placeholder="بانک ملی ایران" value="بانک ملی ایران">
          </div>
        </div>
      </div>
    `,
    sms: () => `
      <div class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">شماره گیرنده پیامک:</label>
          <input type="tel" id="inpSmsPhone" class="qr-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-left" dir="ltr" placeholder="0912..." value="09123456789">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">متن پیش‌فرض پیامک:</label>
          <textarea id="inpSmsMsg" rows="3" class="qr-input w-full p-3 rounded-xl text-xs leading-relaxed" placeholder="متن ارسالی کاربر...">سلام، برای مشاوره و دریافت تعرفه‌ها پیام می‌دهم.</textarea>
        </div>
      </div>
    `,
    email: () => `
      <div class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">آدرس ایمیل گیرنده:</label>
          <input type="email" id="inpMailTo" class="qr-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-left" dir="ltr" placeholder="info@example.com" value="info@tablighma.com">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">موضوع ایمیل (Subject):</label>
          <input type="text" id="inpMailSub" class="qr-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm" placeholder="موضوع پیام..." value="درخواست همکاری تبلیغاتی">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">متن پیام:</label>
          <textarea id="inpMailBody" rows="3" class="qr-input w-full p-3 rounded-xl text-xs leading-relaxed" placeholder="متن ایمیل...">سلام و احترام، لطفا اطلاعات تکمیلی پلن‌ها را ارسال نمایید.</textarea>
        </div>
      </div>
    `,
    geo: () => `
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">عرض جغرافیایی (Lat):</label>
            <input type="text" id="inpGeoLat" class="qr-input w-full px-3 py-2 rounded-xl text-xs font-mono text-left" dir="ltr" placeholder="35.6892" value="35.6892">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">طول جغرافیایی (Lng):</label>
            <input type="text" id="inpGeoLng" class="qr-input w-full px-3 py-2 rounded-xl text-xs font-mono text-left" dir="ltr" placeholder="51.3890" value="51.3890">
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">نام یا عنوان محل:</label>
          <input type="text" id="inpGeoTitle" class="qr-input w-full px-3.5 py-2.5 rounded-xl text-xs" placeholder="دفتر مرکزی - تهران" value="میدان آزادی تهران">
        </div>
      </div>
    `,
    event: () => `
      <div class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">عنوان رویداد / جلسه:</label>
          <input type="text" id="inpEventTitle" class="qr-input w-full px-3.5 py-2 rounded-xl text-xs font-semibold" placeholder="نام وبینار یا جلسه" value="گردهمایی دیجیتال مارکتینگ">
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">شروع:</label>
            <input type="datetime-local" id="inpEventStart" class="qr-input w-full px-3 py-1.5 rounded-xl text-xs font-mono" value="2026-12-15T09:00">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">پایان:</label>
            <input type="datetime-local" id="inpEventEnd" class="qr-input w-full px-3 py-1.5 rounded-xl text-xs font-mono" value="2026-12-15T17:00">
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">محل برگزاری:</label>
          <input type="text" id="inpEventLoc" class="qr-input w-full px-3.5 py-2 rounded-xl text-xs" placeholder="سالن همایش / لینک آنلاین" value="تهران، مرکز همایش‌های بین‌المللی">
        </div>
      </div>
    `,
    text: () => `
      <div class="space-y-2">
        <label class="block text-xs font-semibold text-slate-300">متن آزاد فارسی یا انگلیسی:</label>
        <textarea id="inpRawText" rows="4" class="qr-input w-full p-3.5 rounded-xl text-xs leading-relaxed" placeholder="هرگونه متن دلخواه، پیام تبریک، کد تخفیف یا یادداشت...">این یک کیوآرکد اختصاصی و امن با پشتیبانی کامل از حروف و اعداد فارسی است.</textarea>
      </div>
    `
  };

  return { templates };
})();
