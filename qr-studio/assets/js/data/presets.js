/**
 * QR Code Studio Pro - Presets, Palettes & Brand Icons
 */
window.QRPresets = (function() {
  const colorPalettes = [
    { name: 'کلاسیک مشکی (استاندارد)', type: 'solid', color1: '#000000', color2: '#000000', bg: '#ffffff' },
    { name: 'اقیانوس لاجوردی', type: 'linear', color1: '#0284c7', color2: '#4f46e5', bg: '#ffffff' },
    { name: 'نئون سایبرپانک', type: 'linear', color1: '#06b6d4', color2: '#ec4899', bg: '#ffffff' },
    { name: 'زمرد ارگانیک', type: 'linear', color1: '#059669', color2: '#10b981', bg: '#ffffff' },
    { name: 'غروب پاییزی', type: 'linear', color1: '#d97706', color2: '#dc2626', bg: '#ffffff' },
    { name: 'دارک شیشه‌ای', type: 'linear', color1: '#6366f1', color2: '#a855f7', bg: '#0b0f19' },
    { name: 'طلایی لوکس', type: 'linear', color1: '#b45309', color2: '#f59e0b', bg: '#ffffff' },
    { name: 'سرخابی پرانرژی', type: 'radial', color1: '#f43f5e', color2: '#8b5cf6', bg: '#ffffff' }
  ];

  const brandIcons = [
    { id: 'none', name: 'بدون لوگو (ساده)', path: null },
    { id: 'whatsapp', name: 'واتساپ', path: './assets/images/icons/whatsapp.svg' },
    { id: 'telegram', name: 'تلگرام', path: './assets/images/icons/telegram.svg' },
    { id: 'instagram', name: 'اینستاگرام', path: './assets/images/icons/instagram.svg' },
    { id: 'wifi', name: 'وای‌فای', path: './assets/images/icons/wifi.svg' },
    { id: 'link', name: 'وب‌سایت', path: './assets/images/icons/link.svg' }
  ];

  const defaultValues = {
    url: 'https://tablighma.com/',
    wifi: { ssid: 'MyHomeWiFi', pass: 'FastInternet2026', type: 'WPA', hidden: false },
    whatsapp: { phone: '09123456789', text: 'سلام، در رابطه با خدمات وب‌سایت سوال داشتم.' },
    telegram: { mode: 'channel', target: 'tablighma', text: 'سلام، پیام جهت مشاوره' },
    instagram: { username: 'tablighma' }
  };

  return {
    colorPalettes,
    brandIcons,
    defaultValues
  };
})();
