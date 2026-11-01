/**
 * Evaluates Web Performance and Core Web Vitals readiness
 */
window.AuditorPerf = {
  evaluate(data) {
    const checks = [];
    const { fixTemplates } = window.AuditorCriteria;

    // 1. Render-Blocking External Scripts
    const extScripts = data.scripts.filter(s => s.src && !s.isJsonLd);
    const blockingScripts = extScripts.filter(s => !s.isAsync && !s.isDefer && !s.isTypeModule);

    if (blockingScripts.length > 0) {
      checks.push({
        id: 'perf-blocking-scripts',
        category: 'perf',
        title: 'اسکریپت‌های مسدودکننده رندر (Render-Blocking JS)',
        status: 'error',
        message: `${blockingScripts.length} فایل اسکریپت اکسترنال بدون ویژگی defer یا async شناسایی شد که لود اولیه صفحه را مسدود می‌کنند.`,
        fixSnippet: fixTemplates.renderBlockingScript,
        penalty: 30
      });
    } else {
      checks.push({
        id: 'perf-scripts-ok',
        category: 'perf',
        title: 'بهینه‌سازی لود اسکریپت‌ها',
        status: 'pass',
        message: 'اسکریپت‌های اکسترنال به صورت غیرهمگام (defer / async / module) لود می‌شوند.',
        penalty: 0
      });
    }

    // 2. Images Lazy Loading
    const totalImgs = data.images.length;
    if (totalImgs > 0) {
      const nonLazyImgs = data.images.filter(img => !img.isLazy);
      if (nonLazyImgs.length > 0) {
        checks.push({
          id: 'perf-lazy-missing',
          category: 'perf',
          title: 'لود تنبل تصاویر (Lazy Loading)',
          status: 'warning',
          message: `${nonLazyImgs.length} تصویر از مجموع ${totalImgs} تصویر فاقد صفت loading="lazy" هستند.`,
          fixSnippet: fixTemplates.lazyImage,
          penalty: 15
        });
      } else {
        checks.push({
          id: 'perf-lazy-ok',
          category: 'perf',
          title: 'تصاویر دارای Lazy Loading',
          status: 'pass',
          message: 'تمامی تصاویر دارای صفت بهینه loading="lazy" هستند.',
          penalty: 0
        });
      }

      // 3. Image Dimensions (CLS Prevention)
      const missingDimensions = data.images.filter(img => !img.hasDimensions);
      if (missingDimensions.length > 0) {
        checks.push({
          id: 'perf-img-cls',
          category: 'perf',
          title: 'ابعاد صریح تصاویر (جلوگیری از پرش لایوت CLS)',
          status: 'warning',
          message: `${missingDimensions.length} تصویر فاقد مقادیر صریح width و height هستند که منجر به افت نمره CLS در گوگل می‌شود.`,
          fixSnippet: `<img src="pic.jpg" width="600" height="400" alt="نمونه">`,
          penalty: 15
        });
      } else {
        checks.push({
          id: 'perf-img-cls-ok',
          category: 'perf',
          title: 'ابعاد فیکس تصاویر (کنترل CLS)',
          status: 'pass',
          message: 'تمامی تصاویر دارای ابعاد صریح هستند و از پرش لایوت جلوگیری شده است.',
          penalty: 0
        });
      }
    } else {
      checks.push({
        id: 'perf-no-images',
        category: 'perf',
        title: 'بررسی تصاویر صفحه',
        status: 'info',
        message: 'تصویری در سورس صفحه یافت نشد.',
        penalty: 0
      });
    }

    // 4. Stylesheets count & blocking inspection
    const cssCount = data.stylesheets.length;
    if (cssCount > 4) {
      checks.push({
        id: 'perf-css-excessive',
        category: 'perf',
        title: 'تعداد بالای فایل‌های CSS اکسترنال',
        status: 'warning',
        message: `تعداد ${cssCount} فایل استایل‌شیت اکسترنال شناسایی شد. ادغام آنها درخواست‌های HTTP را کاهش می‌دهد.`,
        fixSnippet: `<!-- فایل‌های CSS را در یک فایل فشرده ادغام کنید -->`,
        penalty: 10
      });
    } else {
      checks.push({
        id: 'perf-css-ok',
        category: 'perf',
        title: 'تعداد بهینه فایل‌های CSS',
        status: 'pass',
        message: `تعداد ${cssCount} استایل‌شیت در محدوده بهینه قرار دارد.`,
        penalty: 0
      });
    }

    return checks;
  }
};
