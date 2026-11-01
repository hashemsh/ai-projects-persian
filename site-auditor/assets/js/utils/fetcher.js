/**
 * Multi-Engine Web Fetcher (Jina AI Reader, Microlink & Optional API Key)
 */
window.AuditorFetcher = {
  getApiKey() {
    try {
      return localStorage.getItem('site_auditor_api_key') || '';
    } catch (_) {
      return '';
    }
  },

  setApiKey(key) {
    try {
      localStorage.setItem('site_auditor_api_key', (key || '').trim());
    } catch (_) {}
  },

  async fetch(url) {
    // 1. Return pre-baked sample if URL matches
    const sample = (window.AuditorSamples || []).find(s => s.url === url || (url.includes('example.com') && s.id === 'sample-perfect'));
    if (sample) return sample.html;

    const userKey = this.getApiKey();

    // 2. Engine A: ScraperAPI (If user provided a ScraperAPI key)
    if (userKey && userKey.length === 32 && !userKey.startsWith('jina_')) {
      try {
        const scraperUrl = `https://api.scraperapi.com?api_key=${userKey}&url=${encodeURIComponent(url)}`;
        const res = await fetch(scraperUrl);
        if (res.ok) return await res.text();
      } catch (_) {}
    }

    // 3. Engine B: Jina AI Reader (Official AI Web Scraper with full CORS)
    try {
      const headers = { 'X-Return-Format': 'html' };
      if (userKey && userKey.startsWith('jina_')) {
        headers['Authorization'] = `Bearer ${userKey}`;
      }
      const jinaUrl = `https://r.jina.ai/${url.replace(/^https?:\/\//, 'https://')}`;
      const res = await fetch(jinaUrl, { headers });
      if (res.ok) {
        const html = await res.text();
        if (html && html.includes('<') && html.length > 100) {
          return html;
        }
      }
    } catch (_) {}

    // 4. Engine C: Microlink Cloud Crawler (Universal Meta Fallback)
    try {
      const microUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&meta=true`;
      const res = await fetch(microUrl);
      if (res.ok) {
        const json = await res.json();
        if (json.status === 'success' && json.data) {
          return this.synthesizeHtmlFromMeta(json.data, url);
        }
      }
    } catch (_) {}

    throw new Error('CORS_OR_NETWORK_ERROR');
  },

  synthesizeHtmlFromMeta(data, url) {
    const title = data.title || '';
    const desc = data.description || '';
    const lang = data.lang || 'fa';
    const image = data.image?.url || '';
    const logo = data.logo?.url || '';
    const canonical = data.url || url;

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${canonical}">
  ${image ? `<meta property="og:image" content="${image}">` : ''}
  ${title ? `<meta property="og:title" content="${title}">` : ''}
  ${desc ? `<meta property="og:description" content="${desc}">` : ''}
  ${logo ? `<link rel="icon" href="${logo}">` : ''}
</head>
<body>
  <h1>${title}</h1>
  <p>${desc}</p>
  ${image ? `<img src="${image}" alt="${title}" loading="lazy">` : ''}
</body>
</html>`;
  }
};
