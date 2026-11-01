/**
 * Real-time Google SERP Snippet and Social Media Card Preview
 */
window.AuditorPreview = {
  viewMode: 'desktop', // desktop | mobile

  render(data) {
    this.renderSerp(data);
    this.renderSocial(data);
  },

  renderSerp(data) {
    const title = data.title || 'عنوان صفحه وب تعریف نشده است';
    const desc = data.description || 'توضیحات متای صفحه خالی است. موتورهای جستجو یک بخش تصادفی از متن صفحه را به عنوان توضیحات نمایش خواهند داد.';
    let url = data.sourceUrl || data.canonical || 'https://example.com/page';
    let domain = 'example.com';
    
    try {
      const u = new URL(url);
      domain = u.hostname;
    } catch (_) {}

    const titleEl = document.getElementById('serp-preview-title');
    const descEl = document.getElementById('serp-preview-desc');
    const domainEl = document.getElementById('serp-preview-domain');
    const urlEl = document.getElementById('serp-preview-url');

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (domainEl) domainEl.textContent = domain;
    if (urlEl) urlEl.textContent = url;

    // Character Counters
    const titleLenEl = document.getElementById('serp-title-length');
    const descLenEl = document.getElementById('serp-desc-length');

    if (titleLenEl) {
      titleLenEl.textContent = `${data.title.length} کاراکتر (مطلوب: ۳۰ تا ۶۵)`;
      titleLenEl.className = (data.title.length >= 30 && data.title.length <= 65) ? 'text-emerald-400' : 'text-amber-400';
    }

    if (descLenEl) {
      descLenEl.textContent = `${data.description.length} کاراکتر (مطلوب: ۸۰ تا ۱۶۵)`;
      descLenEl.className = (data.description.length >= 80 && data.description.length <= 165) ? 'text-emerald-400' : 'text-amber-400';
    }
  },

  renderSocial(data) {
    const og = data.openGraph || {};
    const title = og.title || data.title || 'پیش‌نمایش کارت شبکه‌های اجتماعی';
    const desc = og.desc || data.description || 'توضیحات برای کارت اشتراک‌گذاری در تلگرام و توییتر تنظیم نشده است.';
    const imgUrl = og.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=630&fit=crop';
    
    let domain = 'yourdomain.com';
    try {
      const u = new URL(og.url || data.sourceUrl || 'https://yourdomain.com');
      domain = u.hostname;
    } catch (_) {}

    const socTitle = document.getElementById('social-preview-title');
    const socDesc = document.getElementById('social-preview-desc');
    const socDomain = document.getElementById('social-preview-domain');
    const socImg = document.getElementById('social-preview-img');

    if (socTitle) socTitle.textContent = title;
    if (socDesc) socDesc.textContent = desc;
    if (socDomain) socDomain.textContent = domain;
    if (socImg) {
      socImg.src = imgUrl;
      socImg.onerror = () => {
        socImg.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=630&fit=crop';
      };
    }
  }
};
