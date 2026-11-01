/**
 * پرامپت پلاس | موتور ترجمه و تحلیل زبانی
 * تبدیل خودکار پرامپت‌های فارسی به انگلیسی حرفه‌ای با پشتیبانی آنلاین و آفلاین
 */
window.PromptTranslator = {
  isPersian: function(text) {
    return /[\u0600-\u06FF]/.test(text || '');
  },

  translateToEn: async function(text) {
    const clean = (text || '').trim();
    if (!clean || !this.isPersian(clean)) {
      return clean;
    }

    try {
      const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(clean) + '&langpair=fa|en';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const translated = data?.responseData?.translatedText;
        if (translated && !translated.includes('MYMEMORY WARNING')) {
          return this.cleanTranslatedText(translated);
        }
      }
    } catch (e) {
      console.warn('Online translation failed or timed out, fallback to rule engine:', e);
    }

    return this.offlineFallback(clean);
  },

  cleanTranslatedText: function(text) {
    return text
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .trim();
  },

  offlineFallback: function(text) {
    let result = text;
    const dictionary = [
      { fa: /یک وبسایت|یک سایت|وب‌سایت/gi, en: 'a web application' },
      { fa: /برای سرچ|برای جستجو/gi, en: 'to search and discover' },
      { fa: /محصولات|محصول/gi, en: 'products' },
      { fa: /از سطح اینترنت|از وب/gi, en: 'across the web' },
      { fa: /لینک و عنوان/gi, en: 'links and titles' },
      { fa: /برام بیاره|پیدا کنه/gi, en: 'and extract data' },
      { fa: /برنامه نویس پایتون|پایتون/gi, en: 'Python programmer' },
      { fa: /کد کل پروژه/gi, en: 'full project codebase' },
      { fa: /سنگین نباشه/gi, en: 'lightweight' },
      { fa: /بدون مقدمه چینی/gi, en: 'without introduction' }
    ];

    dictionary.forEach(entry => {
      result = result.replace(entry.fa, entry.en);
    });

    return result;
  },

  extractConstraints: function(text) {
    const lower = (text || '').toLowerCase();
    const constraintsEn = [];
    const constraintsFa = [];

    if (/مقدمه|pleasantries|fluff|intro/i.test(lower)) {
      constraintsEn.push('No conversational preamble, greetings, or introductory filler.');
      constraintsFa.push('بدون هیچ‌گونه تعارف، مقدمه‌چینی یا نتیجه‌گیری کلیشه‌ای.');
    }
    if (/کد کل پروژه|full code|entire project|کامل/i.test(lower)) {
      constraintsEn.push('Provide complete, self-contained, and runnable source code without placeholders.');
      constraintsFa.push('ارائه کل کدهای پروژه به صورت کامل، یکپارچه و آماده اجرا بدون بخش‌های ناتمام.');
    }
    if (/سنگین نباشه|سبک|lightweight|minimal/i.test(lower)) {
      constraintsEn.push('Keep the solution clean, lightweight, and performant without unnecessary bloat.');
      constraintsFa.push('پیاده‌سازی سبک، بهینه و پرسرعت بدون کتابخانه‌ها یا وابستگی‌های سنگین.');
    }

    return { en: constraintsEn, fa: constraintsFa };
  }
};
