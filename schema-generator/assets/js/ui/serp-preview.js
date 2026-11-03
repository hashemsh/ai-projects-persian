/**
 * Schema Generator Pro - Live Google SERP Rich Snippet Preview Simulator
 */
window.SerpPreview = (function() {
  let isMobile = false;

  function setMode(mobile) {
    isMobile = mobile;
  }

  function getStars(ratingVal) {
    const r = parseFloat(ratingVal) || 5;
    const rounded = Math.round(r);
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= rounded ? '★' : '☆';
    }
    return stars;
  }

  function formatPrice(price, currency) {
    if (!price) return '';
    const num = Number(price);
    const formatted = isNaN(num) ? price : num.toLocaleString('fa-IR');
    let currText = 'تومان';
    if (currency === 'IRR') currText = 'ریال';
    else if (currency === 'USD') currText = '$';
    else if (currency === 'EUR') currText = '€';
    return `${formatted} ${currText}`;
  }

  function render(schemaObj, options = {}) {
    const container = document.getElementById('serpPreviewContent');
    if (!container) return;

    if (!schemaObj || Object.keys(schemaObj).length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-slate-500 text-xs">
          اطلاعاتی برای پیش‌نمایش وجود ندارد. لطفاً فرم را تکمیل کنید یا نمونه آماده را بارگذاری نمایید.
        </div>
      `;
      return;
    }

    const type = schemaObj['@type'] || 'Article';
    const siteDomain = 'example.com';
    let title = schemaObj.headline || schemaObj.name || schemaObj.title || 'عنوان صفحه در گوگل';
    let snippet = schemaObj.description || 'توضیحات متای صفحه و چکیده محتوا در نتایج جستجوی گوگل برای جذب کلیک کاربران ارگانیک نمایش داده می‌شود.';
    let imageUrl = schemaObj.image || (Array.isArray(schemaObj.thumbnailUrl) ? schemaObj.thumbnailUrl[0] : null);
    if (typeof imageUrl === 'object' && imageUrl !== null) imageUrl = imageUrl.url;

    // Breadcrumb text
    let breadcrumbText = `${siteDomain} › وبلاگ`;
    if (type === 'BreadcrumbList' && Array.isArray(schemaObj.itemListElement)) {
      breadcrumbText = schemaObj.itemListElement.map(b => b.name).join(' › ');
    } else if (type === 'Product') {
      breadcrumbText = `${siteDomain} › محصولات › ${schemaObj.brand ? schemaObj.brand.name || '' : 'کالا'}`;
    }

    // Rich Result Specifics
    let richMetaHtml = '';

    // Ratings
    if (schemaObj.aggregateRating) {
      const rat = schemaObj.aggregateRating;
      const stars = getStars(rat.ratingValue);
      richMetaHtml += `
        <div class="flex items-center gap-1.5 text-xs text-slate-300 mt-1 mb-1 font-medium">
          <span class="serp-rating-stars text-amber-400 font-bold">${stars}</span>
          <span class="text-amber-400 font-bold text-[11px]">امتیاز ${rat.ratingValue || '۵'}</span>
          <span class="text-slate-400 text-[10px]">(${Number(rat.reviewCount || 10).toLocaleString('fa-IR')} رای)</span>
        </div>
      `;
    }

    // Price & Availability
    if (schemaObj.offers) {
      const off = schemaObj.offers;
      const priceStr = formatPrice(off.price, off.priceCurrency);
      const inStock = off.availability && off.availability.includes('InStock');
      richMetaHtml += `
        <div class="flex items-center gap-2 text-xs mt-1 mb-1">
          <span class="font-bold text-emerald-400">${priceStr}</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded ${inStock ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}">
            ${inStock ? '✓ موجود در انبار' : 'ناموجود'}
          </span>
        </div>
      `;
    }

    // Recipe Info
    if (type === 'Recipe') {
      richMetaHtml += `
        <div class="flex items-center gap-3 text-[11px] text-slate-400 mt-1 mb-1">
          ${schemaObj.totalTime ? `<span>⏱️ زمان: ${schemaObj.totalTime.replace('PT', '').replace('H', ' ساعت ').replace('M', ' دقیقه')}</span>` : ''}
          ${schemaObj.recipeYield ? `<span>👥 تعداد: ${schemaObj.recipeYield}</span>` : ''}
        </div>
      `;
    }

    // FAQ Accordion
    let faqSectionHtml = '';
    if (type === 'FAQPage' && Array.isArray(schemaObj.mainEntity) && schemaObj.mainEntity.length > 0) {
      faqSectionHtml = `
        <div class="mt-3 pt-2 border-t border-white/10 space-y-2">
          ${schemaObj.mainEntity.slice(0, 3).map((item, idx) => `
            <details class="serp-faq-item group">
              <summary class="serp-faq-q list-none cursor-pointer flex items-center justify-between py-1 text-xs text-sky-400 hover:text-sky-300">
                <span>${item.name || 'پرسش بدون عنوان'}</span>
                <span class="text-xs transition-transform group-open:rotate-180">▾</span>
              </summary>
              <div class="serp-faq-a text-[11px] text-slate-400 mt-1 pr-2 border-r-2 border-indigo-500/40">
                ${item.acceptedAnswer ? item.acceptedAnswer.text || '' : ''}
              </div>
            </details>
          `).join('')}
          ${schemaObj.mainEntity.length > 3 ? `<div class="text-[10px] text-slate-500">+ ${schemaObj.mainEntity.length - 3} سوال متداول دیگر در صفحه اول گوگل</div>` : ''}
        </div>
      `;
    }

    // HowTo Steps
    let howToSectionHtml = '';
    if (type === 'HowTo' && Array.isArray(schemaObj.step) && schemaObj.step.length > 0) {
      howToSectionHtml = `
        <div class="mt-3 pt-2 border-t border-white/10">
          <div class="text-[11px] font-semibold text-slate-300 mb-1.5">مراحل انجام کار:</div>
          <ol class="list-decimal list-inside text-xs text-slate-400 space-y-1">
            ${schemaObj.step.slice(0, 3).map(s => `<li><span class="font-medium text-slate-200">${s.name}:</span> ${s.text || ''}</li>`).join('')}
          </ol>
        </div>
      `;
    }

    // Container Wrap
    const containerClass = isMobile ? 'serp-mobile mx-auto shadow-2xl' : 'serp-desktop w-full';

    container.innerHTML = `
      <div class="serp-card ${containerClass}">
        <!-- URL & Favicon Row -->
        <div class="serp-url-box">
          <div class="w-5 h-5 rounded-full bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-[10px] font-bold text-indigo-300 shrink-0">
            G
          </div>
          <div class="flex flex-col text-right truncate">
            <span class="text-xs font-semibold text-slate-200 leading-none">${siteDomain}</span>
            <span class="text-[11px] text-slate-400 truncate leading-tight">${breadcrumbText}</span>
          </div>
        </div>

        <!-- Title Row -->
        <h3 class="serp-title text-base sm:text-lg font-medium text-sky-400 hover:underline mt-1 cursor-pointer">
          ${title}
        </h3>

        <!-- Rich Meta (Ratings, Price) -->
        ${richMetaHtml}

        <!-- Snippet & Thumbnail Row -->
        <div class="flex items-start gap-3 mt-1.5">
          <p class="serp-snippet text-xs text-slate-400 flex-1 leading-relaxed text-justify">
            ${snippet}
          </p>
          ${imageUrl ? `
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-800 border border-white/10 shrink-0 shadow-md">
              <img src="${imageUrl}" alt="Preview" class="w-full h-full object-cover" onerror="this.parentElement.style.display='none'">
            </div>
          ` : ''}
        </div>

        <!-- Dynamic FAQ or HowTo -->
        ${faqSectionHtml}
        ${howToSectionHtml}
      </div>
    `;
  }

  return {
    render,
    setMode
  };
})();
