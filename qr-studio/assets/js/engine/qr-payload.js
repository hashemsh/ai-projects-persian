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

  function formatVCard({ firstName = '', lastName = '', org = '', title = '', phone = '', email = '', url = '', note = '' }) {
    const fn = `${firstName} ${lastName}`.trim() || 'مخاطب جدید';
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${lastName};${firstName};;;`,
      `FN:${fn}`
    ];
    if (org) lines.push(`ORG:${org}`);
    if (title) lines.push(`TITLE:${title}`);
    if (phone) lines.push(`TEL;TYPE=CELL,VOICE:${phone}`);
    if (email) lines.push(`EMAIL;TYPE=INTERNET,WORK:${email}`);
    if (url) lines.push(`URL:${formatUrl(url)}`);
    if (note) lines.push(`NOTE:${note.replace(/\n/g, ' ')}`);
    lines.push('END:VCARD');
    return lines.join('\n');
  }

  function formatBank({ cardNumber = '', sheba = '', ownerName = '', bankName = '' }) {
    const cleanCard = cardNumber.replace(/\s+/g, '');
    const cleanSheba = sheba.replace(/\s+/g, '').toUpperCase();
    const parts = [];
    if (ownerName) parts.push(`نام صاحب حساب: ${ownerName}`);
    if (bankName) parts.push(`بانک: ${bankName}`);
    if (cleanCard) parts.push(`شماره کارت:\n${cleanCard}`);
    if (cleanSheba) parts.push(`شماره شبا:\n${cleanSheba}`);
    return parts.join('\n\n');
  }

  function formatSms({ phone = '', message = '' }) {
    const cleanPhone = phone.trim();
    return `SMSTO:${cleanPhone}:${message}`;
  }

  function formatEmail({ to = '', subject = '', body = '' }) {
    const cleanTo = to.trim();
    const params = [];
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    const query = params.length > 0 ? `?${params.join('&')}` : '';
    return `mailto:${cleanTo}${query}`;
  }

  function formatGeo({ lat = '', lng = '', title = '' }) {
    const l1 = lat.trim() || '0';
    const l2 = lng.trim() || '0';
    const q = title ? `?q=${encodeURIComponent(`${l1},${l2}(${title})`)}` : '';
    return `geo:${l1},${l2}${q}`;
  }

  function formatEvent({ title = '', location = '', description = '', startDate = '', endDate = '' }) {
    function toIcalDate(dtString) {
      if (!dtString) return '';
      const d = new Date(dtString);
      if (isNaN(d.getTime())) return '';
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    const s = toIcalDate(startDate);
    const e = toIcalDate(endDate) || s;
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${title || 'رویداد جدید'}`
    ];
    if (location) lines.push(`LOCATION:${location}`);
    if (description) lines.push(`DESCRIPTION:${description.replace(/\n/g, ' ')}`);
    if (s) lines.push(`DTSTART:${s}`);
    if (e) lines.push(`DTEND:${e}`);
    lines.push('END:VEVENT', 'END:VCALENDAR');
    return lines.join('\n');
  }

  function buildPayload(type, data) {
    switch (type) {
      case 'url': return formatUrl(typeof data === 'string' ? data : data.url);
      case 'wifi': return formatWifi(data);
      case 'vcard': return formatVCard(data);
      case 'bank': return formatBank(data);
      case 'sms': return formatSms(data);
      case 'email': return formatEmail(data);
      case 'geo': return formatGeo(data);
      case 'event': return formatEvent(data);
      case 'text':
      default:
        return typeof data === 'string' ? data : (data.text || '');
    }
  }

  return {
    buildPayload,
    formatUrl,
    formatWifi,
    formatVCard,
    formatBank,
    formatSms,
    formatEmail,
    formatGeo,
    formatEvent
  };
})();
