/**
 * UTM Builder Pro | High-Performance Scannable QR Code Engine
 * Generates ISO/IEC 18004 compliant QR codes scannable by all mobile cameras
 */
window.UtmQr = {
  render(container, text, options = { size: 220 }) {
    if (!container || !text) return false;
    container.innerHTML = '';

    // Safe UTF-8 conversion for standard QR matrix
    let safeText = text;
    try {
      safeText = unescape(encodeURIComponent(text));
    } catch (_) {
      safeText = text;
    }

    // Priority 1: Official QRCode client library (Canvas & High-Res PNG)
    if (typeof window.QRCode === 'function') {
      try {
        new window.QRCode(container, {
          text: safeText,
          width: options.size,
          height: options.size,
          colorDark: '#0f172a',
          colorLight: '#ffffff',
          correctLevel: window.QRCode.CorrectLevel.M
        });
        return true;
      } catch (err) {
        console.warn('QRCode library render failed, switching to fallback', err);
      }
    }

    // Priority 2: Direct ISO-standard QR image fallback
    const enc = encodeURIComponent(text);
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${options.size}x${options.size}&margin=8&data=${enc}`;
    img.alt = 'Campaign UTM QR Code';
    img.className = 'w-[200px] h-[200px] mx-auto rounded-lg shadow-sm';
    container.appendChild(img);
    return true;
  },

  download(container, filename = 'campaign-utm-qr.png') {
    if (!container) return;
    const canvas = container.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.UtmExport?.showToast('دانلود انجام شد', 'تصویر بارکد با کیفیت بالا ذخیره شد.');
      return;
    }

    const img = container.querySelector('img');
    if (img && img.src) {
      const link = document.createElement('a');
      link.download = filename;
      link.href = img.src;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.UtmExport?.showToast('دانلود انجام شد', 'تصویر بارکد ذخیره شد.');
    }
  }
};
