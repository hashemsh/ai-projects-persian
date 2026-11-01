/**
 * UTM Builder Pro | Core URL & Parameter Sanitizer & Compiler Engine
 */
window.UtmEngine = {
  sanitizeText(text, options = { lowercase: true, spaceFormat: 'hyphen' }) {
    if (!text) return '';
    let val = text.trim();
    if (options.spaceFormat === 'hyphen') {
      val = val.replace(/\s+/g, '-');
    } else if (options.spaceFormat === 'underscore') {
      val = val.replace(/\s+/g, '_');
    } else if (options.spaceFormat === 'plus') {
      val = val.replace(/\s+/g, '+');
    }
    if (options.lowercase) {
      val = val.toLowerCase();
    }
    return val;
  },

  validateUrl(rawUrl) {
    if (!rawUrl || !rawUrl.trim()) {
      return { valid: false, error: 'آدرس پایه سایت (URL) الزامی است.' };
    }
    let url = rawUrl.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    try {
      const parsed = new URL(url);
      if (!parsed.hostname || !parsed.hostname.includes('.')) {
        return { valid: false, error: 'دامنه وارد شده ساختار معتبری ندارد.' };
      }
      return { valid: true, url: url, parsed };
    } catch (_) {
      return { valid: false, error: 'آدرس وارد شده معتبر نیست.' };
    }
  },

  build(params, options = { lowercase: true, spaceFormat: 'hyphen' }) {
    const check = this.validateUrl(params.url);
    if (!check.valid) return { success: false, error: check.error };

    const parsed = new URL(check.url);
    const s = (txt) => this.sanitizeText(txt, options);

    const source = s(params.source);
    const medium = s(params.medium);
    const campaign = s(params.campaign);
    const term = s(params.term);
    const content = s(params.content);

    if (source) parsed.searchParams.set('utm_source', source);
    if (medium) parsed.searchParams.set('utm_medium', medium);
    if (campaign) parsed.searchParams.set('utm_campaign', campaign);
    if (term) parsed.searchParams.set('utm_term', term);
    if (content) parsed.searchParams.set('utm_content', content);

    // Custom Extra Parameters (e.g., voucher, ref, affiliate)
    if (params.customKey && params.customVal) {
      parsed.searchParams.set(s(params.customKey), s(params.customVal));
    }

    const finalUrl = parsed.toString();
    const queryOnly = parsed.search.replace(/^\?/, '');

    return {
      success: true,
      url: finalUrl,
      query: queryOnly,
      params: { source, medium, campaign, term, content },
      components: {
        base: `${parsed.protocol}//${parsed.host}${parsed.pathname}`,
        queryCount: Array.from(parsed.searchParams.keys()).length,
        hash: parsed.hash
      }
    };
  },

  analyzeQuality(params) {
    const checks = [
      { label: 'منبع ترافیک (utm_source)', passed: !!params.source, tip: 'مشخص‌کننده پلتفرم یا سایت مبدا (مثلاً google یا yektanet)' },
      { label: 'رسانه کمپین (utm_medium)', passed: !!params.medium, tip: 'مشخص‌کننده کانال یا نوع رسانه (مانند cpc, banner, email)' },
      { label: 'نام کمپین (utm_campaign)', passed: !!params.campaign, tip: 'عنوان جشنواره، رویداد یا هدف تبلیغ (مانند norooz1405)' },
      { label: 'استاندارد حروف کوچک (Lowercase)', passed: (params.source === (params.source || '').toLowerCase()) && (params.medium === (params.medium || '').toLowerCase()), tip: 'جلوگیری از دوگانگی آمار در آنالیتیکس به خاطر حروف بزرگ' }
    ];

    const passedCount = checks.filter(c => c.passed).length;
    const score = Math.round((passedCount / checks.length) * 100);

    return { score, checks };
  }
};
