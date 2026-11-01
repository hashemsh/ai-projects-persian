/**
 * Resilient multi-proxy fetcher with timeout and CORS fallback
 */
window.AuditorFetcher = {
  async fetch(url) {
    // 1. Check if URL matches any pre-baked sample
    const sample = (window.AuditorSamples || []).find(s => s.url === url || (url.includes('example.com') && s.id === 'sample-perfect'));
    if (sample) {
      return sample.html;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    // Proxy 1: allorigins JSON endpoint (reliable CORS headers)
    try {
      const p1 = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const res = await fetch(p1, { signal: controller.signal });
      if (res.ok) {
        const data = await res.json();
        clearTimeout(timeoutId);
        if (data.contents) return data.contents;
      }
    } catch (_) {}

    // Proxy 2: corsproxy.io fallback
    try {
      const p2 = `https://corsproxy.io/?url=${encodeURIComponent(url)}`;
      const res2 = await fetch(p2);
      if (res2.ok) {
        clearTimeout(timeoutId);
        return await res2.text();
      }
    } catch (_) {}

    // Proxy 3: codetabs fallback
    try {
      const p3 = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;
      const res3 = await fetch(p3);
      if (res3.ok) {
        clearTimeout(timeoutId);
        return await res3.text();
      }
    } catch (_) {}

    clearTimeout(timeoutId);
    throw new Error('CORS_OR_NETWORK_ERROR');
  }
};
