/**
 * Evaluates On-Page and Technical SEO metrics
 */
window.AuditorSeo = {
  evaluate(data) {
    const checks = [];
    const { benchmarks, fixTemplates } = window.AuditorCriteria;

    // 1. Title Tag
    if (!data.title) {
      checks.push({
        id: 'seo-title-missing',
        category: 'seo',
        title: 'تگ عنوان صفحه (Title Tag)',
        status: 'error',
        message: 'صفحه فاقد تگ <title> است. این موضوع شدیدترین آسیب را به رتبه سئو می‌زند.',
        fixSnippet: fixTemplates.missingTitle,
        penalty: 30
      });
    } else if (data.title.length < benchmarks.titleMinLength) {
      checks.push({
        id: 'seo-title-short',
        category: 'seo',
        title: 'طول تگ عنوان (کوتاه)',
        status: 'warning',
        message: `طول عنوان فعلی (${data.title.length} کاراکتر) کمتر از حد استاندارد (حداقل ۳۰ کاراکتر) است.`,
        fixSnippet: fixTemplates.missingTitle,
        penalty: 10
      });
    } else if (data.title.length > benchmarks.titleMaxLength) {
      checks.push({
        id: 'seo-title-long',
        category: 'seo',
        title: 'طول تگ عنوان (بیش از حد مجاز)',
        status: 'warning',
        message: `طول عنوان (${data.title.length} کاراکتر) ممکن است در نتایج سرپ گوگل بریده شود (حداکثر ۶۵ کاراکتر).`,
        fixSnippet: fixTemplates.missingTitle,
        penalty: 5
      });
    } else {
      checks.push({
        id: 'seo-title-ok',
        category: 'seo',
        title: 'تگ عنوان استاندارد',
        status: 'pass',
        message: `طول عنوان مطلوب و بهینه است (${data.title.length} کاراکتر): "${data.title}"`,
        penalty: 0
      });
    }

    // 2. Meta Description
    if (!data.description) {
      checks.push({
        id: 'seo-desc-missing',
        category: 'seo',
        title: 'توضیحات متا (Meta Description)',
        status: 'error',
        message: 'تگ توضیحات متا یافت نشد. وجود آن برای افزایش نرخ کلیک (CTR) در نتایج گوگل حیاتی است.',
        fixSnippet: fixTemplates.missingDesc,
        penalty: 25
      });
    } else if (data.description.length < benchmarks.descMinLength || data.description.length > benchmarks.descMaxLength) {
      checks.push({
        id: 'seo-desc-length',
        category: 'seo',
        title: 'طول بهینه توضیحات متا',
        status: 'warning',
        message: `طول توضیحات متا (${data.description.length} کاراکتر) در محدوده استاندارد (۸۰ تا ۱۶۵ کاراکتر) نیست.`,
        fixSnippet: fixTemplates.missingDesc,
        penalty: 8
      });
    } else {
      checks.push({
        id: 'seo-desc-ok',
        category: 'seo',
        title: 'توضیحات متا بهینه',
        status: 'pass',
        message: `توضیحات متا با طول ایده‌آل (${data.description.length} کاراکتر) تعریف شده است.`,
        penalty: 0
      });
    }

    // 3. H1 Heading structure
    const h1Count = data.headings.h1.length;
    if (h1Count === 0) {
      checks.push({
        id: 'seo-h1-missing',
        category: 'seo',
        title: 'تگ تیتر اصلی (H1)',
        status: 'error',
        message: 'هیچ تگ <h1> در صفحه یافت نشد. ساختار سلسله‌مراتب صفحه ناقص است.',
        fixSnippet: `<h1>موضوع و هدف اصلی صفحه</h1>`,
        penalty: 20
      });
    } else if (h1Count > 1) {
      checks.push({
        id: 'seo-h1-multiple',
        category: 'seo',
        title: 'چندین تگ H1 در صفحه',
        status: 'warning',
        message: `تعداد ${h1Count} تگ H1 یافت شد. برای سئو بهتر است تنها یک تگ H1 به عنوان عنوان محوری استفاده شود.`,
        fixSnippet: `<!-- فقط ۱ تگ H1 در هر صفحه قرار دهید و بقیه را H2 کنید -->`,
        penalty: 10
      });
    } else {
      checks.push({
        id: 'seo-h1-ok',
        category: 'seo',
        title: 'تگ H1 اصولی و یکتا',
        status: 'pass',
        message: `یک تگ H1 با محتوای مناسب تعریف شده است: "${data.headings.h1[0]}"`,
        penalty: 0
      });
    }

    // 4. Canonical Tag
    if (!data.canonical) {
      checks.push({
        id: 'seo-canonical-missing',
        category: 'seo',
        title: 'تگ کنونیکال (Canonical)',
        status: 'warning',
        message: 'تگ Canonical تعریف نشده است که می‌تواند باعث مشکل محتوای تکراری (Duplicate Content) شود.',
        fixSnippet: fixTemplates.missingCanonical,
        penalty: 10
      });
    } else {
      checks.push({
        id: 'seo-canonical-ok',
        category: 'seo',
        title: 'تگ کنونیکال موجود',
        status: 'pass',
        message: `تگ Canonical با آدرس "${data.canonical}" تعریف شده است.`,
        penalty: 0
      });
    }

    // 5. OpenGraph Tags
    const hasOg = data.openGraph.title && data.openGraph.image;
    if (!hasOg) {
      checks.push({
        id: 'seo-og-missing',
        category: 'seo',
        title: 'متاتگ‌های اشتراک‌گذاری سوشال (Open Graph)',
        status: 'warning',
        message: 'متاتگ‌های og:title یا og:image کامل نیستند. پیش‌نمایش صفحه در تلگرام و توییتر ناقص خواهد بود.',
        fixSnippet: fixTemplates.missingOG,
        penalty: 12
      });
    } else {
      checks.push({
        id: 'seo-og-ok',
        category: 'seo',
        title: 'کارت‌های Open Graph کامل',
        status: 'pass',
        message: 'متاتگ‌های عنوان و تصویر اشتراک‌گذاری شبکه‌های اجتماعی به‌درستی تنظیم شده‌اند.',
        penalty: 0
      });
    }

    // 6. Structured Schema (JSON-LD)
    const jsonLdScripts = data.scripts.filter(s => s.isJsonLd);
    if (jsonLdScripts.length === 0) {
      checks.push({
        id: 'seo-schema-missing',
        category: 'seo',
        title: 'اسکیما مارک‌آپ ساختاریافته (JSON-LD)',
        status: 'info',
        message: 'هیچ اسکیمای ساختاریافته‌ای (Schema.org) یافت نشد. اضافه کردن اسکیما به ریچ‌اسنیپت‌های گوگل کمک می‌کند.',
        fixSnippet: `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "عنوان صفحه"\n}\n</script>`,
        penalty: 5
      });
    } else {
      checks.push({
        id: 'seo-schema-ok',
        category: 'seo',
        title: 'اسکیما مارک‌آپ ساختاریافته',
        status: 'pass',
        message: `تعداد ${jsonLdScripts.length} اسکریپت اسکیما JSON-LD در صفحه شناسایی شد.`,
        penalty: 0
      });
    }

    return checks;
  }
};
