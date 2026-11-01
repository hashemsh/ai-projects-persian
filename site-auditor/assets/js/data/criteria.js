/**
 * Criteria weights, benchmarks and fix templates for the audit engine
 */
window.AuditorCriteria = {
  categories: {
    seo: { title: 'سئو درون‌صفحه‌ای (On-Page SEO)', weight: 35, color: '#38bdf8' },
    perf: { title: 'پرفورمنس و لودینگ (Performance)', weight: 25, color: '#fbbf24' },
    ux: { title: 'تجربه کاربری و دسترسی (UI/UX)', weight: 20, color: '#34d399' },
    sec: { title: 'امنیت و استانداردهای وب (Security)', weight: 20, color: '#a78bfa' }
  },
  
  benchmarks: {
    titleMinLength: 30,
    titleMaxLength: 65,
    descMinLength: 80,
    descMaxLength: 165
  },

  fixTemplates: {
    missingTitle: `<title>عنوان جذاب، منحصر‌به‌فرد و دارای کلمات کلیدی (۵۰ تا ۶۰ کاراکتر)</title>`,
    missingDesc: `<meta name="description" content="توضیحات جذاب و ترغیب‌کننده درباره محتوای این صفحه شامل کلمات کلیدی هدف (۱۲۰ تا ۱۵۵ کاراکتر).">`,
    missingViewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    missingCanonical: `<link rel="canonical" href="https://yourdomain.com/exact-canonical-path/">`,
    missingCharset: `<meta charset="UTF-8">`,
    missingLangDir: `<html lang="fa" dir="rtl">`,
    missingOG: `<!-- تگ‌های اشتراک‌گذاری سوشال OpenGraph -->
<meta property="og:title" content="عنوان صفحه برای اشتراک در تلگرام و لینکدین">
<meta property="og:description" content="خلاصه توضیحات صفحه">
<meta property="og:image" content="https://yourdomain.com/assets/images/og-cover.jpg">
<meta property="og:url" content="https://yourdomain.com/page-url">
<meta property="og:type" content="website">`,
    renderBlockingScript: `<script src="assets/js/app.js" defer></script>`,
    lazyImage: `<img src="image.jpg" alt="توضیح کامل تصویر" width="800" height="500" loading="lazy">`,
    safeExternalLink: `<a href="https://external-domain.com" target="_blank" rel="noopener noreferrer">لینک خارجی امن</a>`
  }
};
