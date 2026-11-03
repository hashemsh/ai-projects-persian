/**
 * Schema Generator Pro - Live URL Schema Extractor & Multi-Engine Scanner
 */
window.UrlScanner = (function() {
  // Pre-baked real-world samples for instant zero-latency demonstration
  const liveSamples = [
    {
      id: 'sample-product',
      title: 'محصول فروشگاهی دیجی‌کالا',
      url: 'https://www.digikala.com/product/dkp-1425890/galaxy-ultra/',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>گوشی موبایل سامسونگ مدل Galaxy S24 Ultra</title>
          <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "گوشی موبایل سامسونگ مدل Galaxy S24 Ultra دو سیم کارت - ۲۵۶ گیگابایت",
            "image": "https://dkstatics-public.digikala.com/digikala-products/galaxy-s24.jpg",
            "description": "پرچمدار سامسونگ با هوش مصنوعی Galaxy AI، دوربین ۲۰۰ مگاپیکسلی و قلم S-Pen اختصاصی.",
            "sku": "DKP-1425890",
            "brand": {
              "@type": "Brand",
              "name": "سامسونگ"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://www.digikala.com/product/dkp-1425890/",
              "priceCurrency": "IRR",
              "price": "675000000",
              "priceValidUntil": "2026-12-31",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.7",
              "reviewCount": "320",
              "bestRating": "5"
            }
          }
          </script>
          <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "دیجی‌کالا", "item": "https://www.digikala.com" },
              { "@type": "ListItem", "position": 2, "name": "موبایل", "item": "https://www.digikala.com/search/category-mobile-phone/" },
              { "@type": "ListItem", "position": 3, "name": "گوشی سامسونگ", "item": "https://www.digikala.com/brand/samsung/" }
            ]
          }
          </script>
        </head>
        <body></body>
        </html>
      `
    },
    {
      id: 'sample-article',
      title: 'مقاله فناوری زومیت',
      url: 'https://www.zoomit.ir/mobile/415820-samsung-galaxy-s24-ultra-review/',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>بررسی گلکسی اس ۲۴ اولترا سامسونگ؛ شاهکار هوش مصنوعی</title>
          <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": "بررسی تخصصی گلکسی اس ۲۴ اولترا سامسونگ؛ ورود به عصر هوش مصنوعی",
            "image": "https://cdn01.zoomit.ir/2024/2/galaxy-s24-ultra-cover.jpg",
            "datePublished": "2026-02-10T12:00:00+03:30",
            "dateModified": "2026-03-01T15:30:00+03:30",
            "author": {
              "@type": "Person",
              "name": "مهرداد عیسی‌لو",
              "url": "https://www.zoomit.ir/author/mehrdad/"
            },
            "publisher": {
              "@type": "Organization",
              "name": "زومیت",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.zoomit.ir/assets/images/logo.png"
              }
            },
            "description": "گلکسی اس ۲۴ اولترا با تکیه بر ویژگی‌های هوش مصنوعی Galaxy AI و طراحی تیتانیومی آمده تا استانداردهای گوشی‌های پرچمدار را بازتعریف کند."
          }
          </script>
        </head>
        <body></body>
        </html>
      `
    },
    {
      id: 'sample-faq',
      title: 'صفحه سوالات متداول (FAQ)',
      url: 'https://example.com/support/faq',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>پرسش‌های متداول پشتیبانی و ضمانت خدمات</title>
          <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "چگونه می‌توانم وضعیت گارانتی و اصالت سفارش را بررسی کنم؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "کد ۱۶ رقمی درج‌شده روی کارت ضمانت را در سامانه جامع استعلام گارانتی وارد کنید تا تاریخ شروع و اتمام به صورت لحظه‌ای نمایش داده شود."
                }
              },
              {
                "@type": "Question",
                "name": "شرایط مرجوعی ۷ روزه کالا چیست؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "در صورتی که پلمپ کالا باز نشده باشد یا دستگاه دارای ایراد فنی تاییدشده توسط کارشناس باشد، بدون کسر هزینه تا ۷ روز قابل عودت است."
                }
              }
            ]
          }
          </script>
        </head>
        <body></body>
        </html>
      `
    }
  ];

  async function fetchHtml(url) {
    const cleanUrl = url.trim();

    // 1. Check local pre-baked samples
    const sample = liveSamples.find(s => s.url === cleanUrl || cleanUrl.includes(s.id));
    if (sample) {
      return { html: sample.html, source: 'sample' };
    }

    // 2. Multi-Engine Proxy Fetch
    const proxies = [
      `https://corsproxy.io/?url=${encodeURIComponent(cleanUrl)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(cleanUrl)}`
    ];

    for (const proxyUrl of proxies) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timeout);

        if (res.ok) {
          const text = await res.text();
          if (text && text.length > 200 && text.includes('<')) {
            return { html: text, source: 'network' };
          }
        }
      } catch (_) {}
    }

    throw new Error('NETWORK_FETCH_FAILED');
  }

  function extractSchemas(htmlContent) {
    if (!htmlContent) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const scriptTags = doc.querySelectorAll('script[type="application/ld+json"]');

    const results = [];
    let counter = 1;

    scriptTags.forEach((script) => {
      const rawText = script.textContent.trim();
      if (!rawText) return;

      try {
        const parsed = JSON.parse(rawText);

        // Handle @graph array
        if (Array.isArray(parsed['@graph'])) {
          parsed['@graph'].forEach((item) => {
            if (item && item['@type']) {
              results.push({
                id: `schema-${counter++}`,
                type: Array.isArray(item['@type']) ? item['@type'].join(' / ') : item['@type'],
                name: item.name || item.headline || item.title || `اسکیما ${item['@type']}`,
                rawJson: JSON.stringify(item, null, 2),
                parsed: item,
                context: item['@context'] || parsed['@context'] || 'https://schema.org',
                isGraph: true
              });
            }
          });
        } else if (Array.isArray(parsed)) {
          // Array of objects
          parsed.forEach((item) => {
            if (item && item['@type']) {
              results.push({
                id: `schema-${counter++}`,
                type: item['@type'],
                name: item.name || item.headline || item.title || `اسکیما ${item['@type']}`,
                rawJson: JSON.stringify(item, null, 2),
                parsed: item,
                context: item['@context'] || 'https://schema.org'
              });
            }
          });
        } else if (typeof parsed === 'object' && parsed !== null) {
          // Standard single object
          results.push({
            id: `schema-${counter++}`,
            type: parsed['@type'] || 'نامشخص',
            name: parsed.name || parsed.headline || parsed.title || `اسکیما ${parsed['@type'] || counter}`,
            rawJson: JSON.stringify(parsed, null, 2),
            parsed: parsed,
            context: parsed['@context'] || 'https://schema.org'
          });
        }
      } catch (err) {
        results.push({
          id: `schema-err-${counter++}`,
          type: 'خطای نحوی (JSON Syntax Error)',
          name: 'اسکریپت نامعتبر',
          rawJson: rawText,
          parsed: null,
          error: err.message
        });
      }
    });

    return results;
  }

  return {
    liveSamples,
    fetchHtml,
    extractSchemas
  };
})();
