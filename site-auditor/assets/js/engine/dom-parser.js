/**
 * Safe client-side HTML DOM parser & raw asset extractor
 */
window.AuditorParser = {
  parse(htmlString, sourceUrl = '') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString || '', 'text/html');

    // Extract Basic Meta
    const titleEl = doc.querySelector('title');
    const title = titleEl ? titleEl.textContent.trim() : '';

    const metaDesc = doc.querySelector('meta[name="description" i]');
    const description = metaDesc ? metaDesc.getAttribute('content') || '' : '';

    const metaViewport = doc.querySelector('meta[name="viewport" i]');
    const viewport = metaViewport ? metaViewport.getAttribute('content') || '' : '';

    const metaRobots = doc.querySelector('meta[name="robots" i]');
    const robots = metaRobots ? metaRobots.getAttribute('content') || '' : '';

    const canonicalEl = doc.querySelector('link[rel="canonical" i]');
    const canonical = canonicalEl ? canonicalEl.getAttribute('href') || '' : '';

    const charsetEl = doc.querySelector('meta[charset]') || doc.querySelector('meta[http-equiv="Content-Type" i]');
    const charset = charsetEl ? (charsetEl.getAttribute('charset') || charsetEl.getAttribute('content') || '') : '';

    // OpenGraph & Twitter
    const ogTitle = doc.querySelector('meta[property="og:title" i]')?.getAttribute('content') || '';
    const ogDesc = doc.querySelector('meta[property="og:description" i]')?.getAttribute('content') || '';
    const ogImage = doc.querySelector('meta[property="og:image" i]')?.getAttribute('content') || '';
    const ogUrl = doc.querySelector('meta[property="og:url" i]')?.getAttribute('content') || '';
    const ogType = doc.querySelector('meta[property="og:type" i]')?.getAttribute('content') || '';

    // Headings
    const h1List = Array.from(doc.querySelectorAll('h1')).map(el => el.textContent.trim());
    const h2Count = doc.querySelectorAll('h2').length;
    const h3Count = doc.querySelectorAll('h3').length;

    // Images
    const rawImages = Array.from(doc.querySelectorAll('img')).map(img => ({
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt'),
      hasAlt: img.hasAttribute('alt') && img.getAttribute('alt').trim().length > 0,
      hasDimensions: img.hasAttribute('width') && img.hasAttribute('height'),
      isLazy: (img.getAttribute('loading') || '').toLowerCase() === 'lazy'
    }));

    // Scripts & Stylesheets
    const scripts = Array.from(doc.querySelectorAll('script')).map(s => ({
      src: s.getAttribute('src') || '',
      isAsync: s.hasAttribute('async'),
      isDefer: s.hasAttribute('defer'),
      isTypeModule: (s.getAttribute('type') || '').toLowerCase() === 'module',
      isInline: !s.hasAttribute('src'),
      isJsonLd: (s.getAttribute('type') || '').toLowerCase() === 'application/ld+json'
    }));

    const stylesheets = Array.from(doc.querySelectorAll('link[rel="stylesheet" i]')).map(l => ({
      href: l.getAttribute('href') || ''
    }));

    // Links
    const links = Array.from(doc.querySelectorAll('a')).map(a => ({
      href: a.getAttribute('href') || '',
      text: a.textContent.trim(),
      target: a.getAttribute('target') || '',
      rel: a.getAttribute('rel') || '',
      hasAria: a.hasAttribute('aria-label') || a.hasAttribute('title')
    }));

    // Document Attributes
    const htmlTag = doc.documentElement;
    const lang = htmlTag ? (htmlTag.getAttribute('lang') || '') : '';
    const dir = htmlTag ? (htmlTag.getAttribute('dir') || '') : '';

    return {
      doc,
      sourceUrl,
      title,
      description,
      viewport,
      robots,
      canonical,
      charset,
      openGraph: { title: ogTitle, desc: ogDesc, image: ogImage, url: ogUrl, type: ogType },
      headings: { h1: h1List, h2Count, h3Count },
      images: rawImages,
      scripts,
      stylesheets,
      links,
      lang,
      dir
    };
  }
};
