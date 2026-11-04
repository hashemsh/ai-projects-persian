/**
 * QR Code Studio Pro - Standard Protocol Payload Formatter
 * Generates ISO/IEC compliant strings for iOS & Android native cameras.
 */
window.QRPayload = (function() {
  function formatUrl(url) {
    if (!url) return 'https://';
    let clean = url.trim();
    if (!/^https?:\/\//i.test(clean)) {
      clean = 'https://' + clean;
    }
    return clean;
  }

  function formatWifi({ ssid, pass, type = 'WPA', hidden = false }) {
    const s = (ssid || '').replace(/([\\;,:"])/g, '\\$1');
    const p = (pass || '').replace(/([\\;,:"])/g, '\\$1');
    const t = type === 'nopass' ? 'nopass' : type;
    const h = hidden ? 'true' : 'false';
    return `WIFI:T:${t};S:${s};P:${p};H:${h};;`;
  }

  function formatWhatsApp({ phone = '', text = '' }) {
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '98' + cleanPhone.slice(1);
    }
    const txt = (text || '').trim();
    if (txt) {
      return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(txt)}`;
    }
    return `https://wa.me/${cleanPhone}`;
  }

  function formatTelegram({ mode = 'channel', target = '', text = '' }) {
    let cleanTarget = (target || '').trim().replace(/^@/, '');
    if (cleanTarget.startsWith('https://t.me/')) {
      return cleanTarget;
    }
    if (mode === 'share') {
      const shareUrl = cleanTarget ? formatUrl(cleanTarget) : 'https://tablighma.com/';
      const msg = (text || '').trim();
      return `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}${msg ? `&text=${encodeURIComponent(msg)}` : ''}`;
    }
    return `https://t.me/${cleanTarget}`;
  }

  function formatInstagram({ username = '' }) {
    let clean = (username || '').trim().replace(/^@/, '');
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      return clean;
    }
    return `https://instagram.com/${clean}`;
  }

  function buildPayload(type, data) {
    switch (type) {
      case 'url': return formatUrl(typeof data === 'string' ? data : data.url);
      case 'wifi': return formatWifi(data);
      case 'whatsapp': return formatWhatsApp(data);
      case 'telegram': return formatTelegram(data);
      case 'instagram': return formatInstagram(data);
      default:
        return typeof data === 'string' ? data : (data.url || '');
    }
  }

  return {
    buildPayload,
    formatUrl,
    formatWifi,
    formatWhatsApp,
    formatTelegram,
    formatInstagram
  };
})();
