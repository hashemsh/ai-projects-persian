/**
 * Schema Generator Pro - Live URL Schema Extractor & Multi-Engine Scanner
 */
window.UrlScanner = (function() {
  // Pre-baked real-world samples for instant zero-latency demonstration
  const liveSamples = [
    {
      id: 'sample-tablighma-home',
      title: 'صفحه اصلی سایت تبلیغ ما (TablighMa)',
      url: 'https://tablighma.com/',
      html: `
        <!DOCTYPE html>
        <html lang="fa-IR">
        <head>
          <title>تبلیغ ما - بهترین انتخاب برای تبلیغات رایگان - نیازمندی‌ های رایگان، آگهی‌های خرید، فروش نو و دست دوم</title>
          <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": "https://tablighma.com/",
                "url": "https://tablighma.com/",
                "name": "تبلیغ ما - بهترین انتخاب برای تبلیغات رایگان - نیازمندی‌ های رایگان، آگهی‌های خرید، فروش نو و دست دوم و کارکرده",
                "isPartOf": { "@id": "https://tablighma.com/#website" },
                "about": { "@id": "https://tablighma.com/#organization" },
                "description": "تبلیغات ویژه در تبلیغ ما | درج آگهی ویژه و ثبت کسب و کار شما برای بهتر دیده شدن",
                "breadcrumb": { "@id": "https://tablighma.com/#breadcrumb" },
                "inLanguage": "fa-IR"
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://tablighma.com/#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "خانه" }
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://tablighma.com/#website",
                "url": "https://tablighma.com/",
                "name": "تبلیغ ما - بهترین انتخاب برای تبلیغات رایگان",
                "description": "نیازمندی‌ های رایگان، آگهی‌های خرید، فروش نو و دست دوم و کارکرده",
                "publisher": { "@id": "https://tablighma.com/#organization" },
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": { "@type": "EntryPoint", "urlTemplate": "https://tablighma.com/?s={search_term_string}" },
                    "query-input": { "@type": "PropertyValueSpecification", "valueRequired": true, "valueName": "search_term_string" }
                  }
                ],
                "inLanguage": "fa-IR"
              },
              {
                "@type": "Organization",
                "@id": "https://tablighma.com/#organization",
                "name": "تبلیغ ما | درج آگهی",
                "url": "https://tablighma.com/",
                "logo": {
                  "@type": "ImageObject",
                  "inLanguage": "fa-IR",
                  "@id": "https://tablighma.com/#/schema/logo/image/",
                  "url": "https://tablighma.com/wp-content/uploads/2019/08/logo.png",
                  "contentUrl": "https://tablighma.com/wp-content/uploads/2019/08/logo.png",
                  "width": 130,
                  "height": 50,
                  "caption": "تبلیغ ما | درج آگهی"
                },
                "image": { "@id": "https://tablighma.com/#/schema/logo/image/" },
                "sameAs": [
                  "https://www.instagram.com/tablighma/",
                  "https://www.pinterest.com/tablighma/"
                ]
              }
            ]
          }
          </script>
        </head>
        <body></body>
        </html>
      `
    },
    {
      id: 'sample-tablighma-article',
      title: 'مقاله معرفی بهترین سایت‌های تبلیغاتی در ایران - تبلیغ ما',
      url: 'https://tablighma.com/the-best-advertising-sites-in-iran/',
      html: `
        <!DOCTYPE html>
        <html lang="fa-IR">
        <head>
          <title>بهترین سایت های تبلیغاتی در ایران - تبلیغ ما</title>
          <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": "https://tablighma.com/the-best-advertising-sites-in-iran/#article",
                "isPartOf": { "@id": "https://tablighma.com/the-best-advertising-sites-in-iran/" },
                "author": {
                  "@type": "Person",
                  "name": "پشتیبانی سایت تبلیغ ما",
                  "@id": "https://tablighma.com/#/schema/person/cb64682c387c1b8353ab8873af387ece"
                },
                "headline": "بهترین سایت های تبلیغاتی در ایران",
                "datePublished": "2022-11-09T09:33:41+00:00",
                "dateModified": "2026-09-30T20:18:01+00:00",
                "mainEntityOfPage": { "@id": "https://tablighma.com/the-best-advertising-sites-in-iran/" },
                "wordCount": 55,
                "commentCount": 22,
                "publisher": { "@id": "https://tablighma.com/#organization" },
                "image": { "@id": "https://tablighma.com/the-best-advertising-sites-in-iran/#primaryimage" },
                "thumbnailUrl": "https://tablighma.com/wp-content/uploads/2019/11/bestsiteforads.jpg",
                "keywords": ["تبلیغات", "تبلیغات اینترنتی", "انواع تبلیغات", "روش های تبلیغات", "سایت تبلیغاتی", "بهترین سایت های تبلیغاتی"],
                "articleSection": ["روش های تبلیغاتی", "وبلاگ", "تبلیغات"],
                "inLanguage": "fa-IR"
              },
              {
                "@type": "WebPage",
                "@id": "https://tablighma.com/the-best-advertising-sites-in-iran/",
                "url": "https://tablighma.com/the-best-advertising-sites-in-iran/",
                "name": "بهترین سایت های تبلیغاتی در ایران - تبلیغ ما - بهترین انتخاب برای تبلیغات رایگان",
                "isPartOf": { "@id": "https://tablighma.com/#website" },
                "primaryImageOfPage": { "@id": "https://tablighma.com/the-best-advertising-sites-in-iran/#primaryimage" },
                "image": { "@id": "https://tablighma.com/the-best-advertising-sites-in-iran/#primaryimage" },
                "thumbnailUrl": "https://tablighma.com/wp-content/uploads/2019/11/bestsiteforads.jpg",
                "datePublished": "2022-11-09T09:33:41+00:00",
                "dateModified": "2026-09-30T20:18:01+00:00",
                "description": "بهترین سایت های تبلیغاتی در ایران ، با توجه به مهم بودن نقش تبلیغات در این مقاله بهترین سایت های تبلیغاتی در ایران را معرفی کنیم",
                "breadcrumb": { "@id": "https://tablighma.com/the-best-advertising-sites-in-iran/#breadcrumb" },
                "inLanguage": "fa-IR"
              },
              {
                "@type": "ImageObject",
                "inLanguage": "fa-IR",
                "@id": "https://tablighma.com/the-best-advertising-sites-in-iran/#primaryimage",
                "url": "https://tablighma.com/wp-content/uploads/2019/11/bestsiteforads.jpg",
                "contentUrl": "https://tablighma.com/wp-content/uploads/2019/11/bestsiteforads.jpg",
                "width": 800,
                "height": 800,
                "caption": "بهترین سایت های تبلیغاتی در ایران"
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://tablighma.com/the-best-advertising-sites-in-iran/#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://tablighma.com/" },
                  { "@type": "ListItem", "position": 2, "name": "بهترین سایت های تبلیغاتی در ایران" }
                ]
              },
              {
                "@type": "Organization",
                "@id": "https://tablighma.com/#organization",
                "name": "تبلیغ ما | درج آگهی",
                "url": "https://tablighma.com/",
                "logo": {
                  "@type": "ImageObject",
                  "inLanguage": "fa-IR",
                  "@id": "https://tablighma.com/#/schema/logo/image/",
                  "url": "https://tablighma.com/wp-content/uploads/2019/08/logo.png",
                  "contentUrl": "https://tablighma.com/wp-content/uploads/2019/08/logo.png",
                  "width": 130,
                  "height": 50,
                  "caption": "تبلیغ ما | درج آگهی"
                }
              }
            ]
          }
          </script>
          <script type="application/ld+json">
          {
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "item": { "name": "خانه", "@id": "https://tablighma.com" } },
              { "@type": "ListItem", "position": 2, "item": { "name": "روش های تبلیغاتی", "@id": "https://tablighma.com/category/advertising-methods/" } },
              { "@type": "ListItem", "position": 3, "item": { "name": "بهترین سایت های تبلیغاتی در ایران", "@id": "https://tablighma.com/the-best-advertising-sites-in-iran/" } }
            ]
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

    // 2. Engine 1: Jina AI Reader (High-Trust Bot Bypass & Open CORS)
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 9000);
      const normalizedTarget = cleanUrl.replace(/^https?:\/\//, 'https://');
      const jinaUrl = `https://r.jina.ai/${normalizedTarget}`;

      const res = await fetch(jinaUrl, {
        headers: {
          'X-Return-Format': 'html'
        },
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (res.ok) {
        const text = await res.text();
        if (text && text.length > 200 && text.includes('<')) {
          return { html: text, source: 'jina' };
        }
      }
    } catch (_) {}

    // 3. Engine 2 & 3: Secondary CORS Gateways
    const backupProxies = [
      `https://corsproxy.io/?url=${encodeURIComponent(cleanUrl)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(cleanUrl)}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(cleanUrl)}`
    ];

    for (const proxyUrl of backupProxies) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000);
        const res = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timeout);

        if (res.ok) {
          const text = await res.text();
          if (text && text.length > 200 && text.includes('<')) {
            return { html: text, source: 'proxy' };
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
