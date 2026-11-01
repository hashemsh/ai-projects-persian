/**
 * Evaluates Web Security and Modern HTML Best Practices
 */
window.AuditorSecurity = {
  evaluate(data) {
    const checks = [];
    const { fixTemplates } = window.AuditorCriteria;

    // 1. External Links rel="noopener noreferrer" (Tabnabbing protection)
    const blankLinks = data.links.filter(l => l.target === '_blank');
    if (blankLinks.length > 0) {
      const unsafeLinks = blankLinks.filter(l => {
        const rel = (l.rel || '').toLowerCase();
        return !rel.includes('noopener') && !rel.includes('noreferrer');
      });

      if (unsafeLinks.length > 0) {
        checks.push({
          id: 'sec-unsafe-blank',
          category: 'sec',
          title: 'حفره امنیتی لینک‌های خارجی (Tabnabbing)',
          status: 'error',
          message: `${unsafeLinks.length} لینک با target="_blank" فاقد rel="noopener noreferrer" هستند که مرورگر کاربر را در معرض سواستفاده قرار می‌دهد.`,
          fixSnippet: fixTemplates.safeExternalLink,
          penalty: 30
        });
      } else {
        checks.push({
          id: 'sec-blank-ok',
          category: 'sec',
          title: 'لینک‌های تب جدید ایمن هستند',
          status: 'pass',
          message: 'تمامی لینک‌های target="_blank" مجهز به صفت‌های حفاظتی noopener هستند.',
          penalty: 0
        });
      }
    }

    // 2. Mixed Content Links (http:// instead of https://)
    const httpLinks = data.links.filter(l => l.href.startsWith('http://'));
    if (httpLinks.length > 0) {
      checks.push({
        id: 'sec-mixed-content',
        category: 'sec',
        title: 'لینک‌های غیررمزنگاری‌شده (Mixed Content / HTTP)',
        status: 'warning',
        message: `${httpLinks.length} آدرس با پروتکل ناامن HTTP در صفحه وجود دارد که ممکن است خطای Mixed Content ایجاد کند.`,
        fixSnippet: `<!-- از پروتکل امن https:// برای تمام لینک‌ها استفاده فرمایید -->`,
        penalty: 15
      });
    } else {
      checks.push({
        id: 'sec-mixed-ok',
        category: 'sec',
        title: 'پروتکل امن پیوندها (HTTPS)',
        status: 'pass',
        message: 'پیوندهای خارجی از پروتکل‌های ناامن استفاده نمی‌کنند.',
        penalty: 0
      });
    }

    // 3. Obsolete HTML Tags Check
    const obsoleteTags = ['center', 'font', 'marquee', 'blink', 'frame', 'frameset', 'applet'];
    const foundObsolete = [];
    obsoleteTags.forEach(tag => {
      if (data.doc && data.doc.querySelector(tag)) {
        foundObsolete.push(`<${tag}>`);
      }
    });

    if (foundObsolete.length > 0) {
      checks.push({
        id: 'sec-obsolete-tags',
        category: 'sec',
        title: 'استفاده از تگ‌های منسوخ‌شده HTML5',
        status: 'warning',
        message: `تگ‌های غیراستاندارد ${foundObsolete.join(', ')} در صفحه یافت شدند. آنها را با استایل‌های مدرن CSS3 جایگزین کنید.`,
        fixSnippet: `/* به جای <center> یا <font> از کلاس‌های CSS مانند text-center و color استفاده فرمایید */`,
        penalty: 15
      });
    } else {
      checks.push({
        id: 'sec-tags-ok',
        category: 'sec',
        title: 'انطباق با استانداردهای مدرن HTML5',
        status: 'pass',
        message: 'هیچ تگ منسوخ‌شده یا غیراستانداردی در کدها دیده نشد.',
        penalty: 0
      });
    }

    // 4. Meta Charset
    if (!data.charset) {
      checks.push({
        id: 'sec-charset-missing',
        category: 'sec',
        title: 'کدگذاری کاراکترها (Charset)',
        status: 'warning',
        message: 'متاتگ charset="UTF-8" یافت نشد. این موضوع ممکن است باعث بهم‌ریختگی حروف فارسی در برخی مرورگرها شود.',
        fixSnippet: fixTemplates.missingCharset,
        penalty: 15
      });
    } else {
      checks.push({
        id: 'sec-charset-ok',
        category: 'sec',
        title: 'انکودینگ استاندارد UTF-8',
        status: 'pass',
        message: `کدگذاری صفحه به درستی با مقدار "${data.charset}" تعریف شده است.`,
        penalty: 0
      });
    }

    return checks;
  }
};
