/**
 * Evaluates UI/UX and Web Accessibility (a11y)
 */
window.AuditorUx = {
  evaluate(data) {
    const checks = [];
    const { fixTemplates } = window.AuditorCriteria;

    // 1. Viewport Meta Tag (Responsive Readiness)
    if (!data.viewport) {
      checks.push({
        id: 'ux-viewport-missing',
        category: 'ux',
        title: 'متاتگ ریسپانسیو موبایل (Viewport)',
        status: 'error',
        message: 'متاتگ Viewport تعریف نشده است. صفحه در گوشی‌ها و تبلت‌ها به صورت دسکتاپ کوچک‌شده باز می‌شود.',
        fixSnippet: fixTemplates.missingViewport,
        penalty: 35
      });
    } else {
      checks.push({
        id: 'ux-viewport-ok',
        category: 'ux',
        title: 'متاتگ ریسپانسیو استاندارد',
        status: 'pass',
        message: 'متاتگ Viewport به صورت استاندارد برای سازگاری با موبایل تنظیم شده است.',
        penalty: 0
      });
    }

    // 2. HTML Language & Direction Attributes
    if (!data.lang) {
      checks.push({
        id: 'ux-lang-missing',
        category: 'ux',
        title: 'صفت زبان تگ HTML (lang attribute)',
        status: 'warning',
        message: 'صفت lang در تگ <html> مشخص نشده است. این موضوع به صفحه‌خوان‌های نابینایان و سئو آسیب می‌زند.',
        fixSnippet: fixTemplates.missingLangDir,
        penalty: 15
      });
    } else {
      checks.push({
        id: 'ux-lang-ok',
        category: 'ux',
        title: 'زبان صفحه مشخص است',
        status: 'pass',
        message: `زبان سند وب به صورت lang="${data.lang}" تعیین شده است.`,
        penalty: 0
      });
    }

    // 3. Image Alt Attributes
    const totalImgs = data.images.length;
    if (totalImgs > 0) {
      const missingAlt = data.images.filter(img => !img.hasAlt);
      if (missingAlt.length > 0) {
        checks.push({
          id: 'ux-img-alt-missing',
          category: 'ux',
          title: 'متن جایگزین تصاویر (Alt Attributes)',
          status: 'error',
          message: `${missingAlt.length} تصویر از ${totalImgs} تصویر فاقد صفت معنادار alt هستند. دسترسی‌پذیری و سئو ایمیج آسیب می‌بیند.`,
          fixSnippet: `<img src="sample.jpg" alt="توضیح کامل و دقیق تصویر برای موتورهای جستجو">`,
          penalty: 25
        });
      } else {
        checks.push({
          id: 'ux-img-alt-ok',
          category: 'ux',
          title: 'دسترسی‌پذیری کامل تصاویر (Alt)',
          status: 'pass',
          message: 'تمامی تصاویر دارای صفت توضیحی alt معتبر هستند.',
          penalty: 0
        });
      }
    }

    // 4. Accessible Links (No empty links)
    const emptyLinks = data.links.filter(l => !l.text && !l.hasAria);
    if (emptyLinks.length > 0) {
      checks.push({
        id: 'ux-empty-links',
        category: 'ux',
        title: 'لینک‌های مبهم یا فاقد متن دسترسی‌پذیری',
        status: 'warning',
        message: `${emptyLinks.length} تگ لینک <a> فاقد متن توصیفی یا برچسب aria-label شناسایی شد.`,
        fixSnippet: `<a href="/profile" aria-label="ورود به پنل کاربری"><i class="icon"></i></a>`,
        penalty: 15
      });
    } else {
      checks.push({
        id: 'ux-links-ok',
        category: 'ux',
        title: 'لینک‌های دسترس‌پذیر و توصیفی',
        status: 'pass',
        message: 'لینک‌های موجود در صفحه دارای عنوان متنی یا صفت‌های کمکی مناسب هستند.',
        penalty: 0
      });
    }

    return checks;
  }
};
