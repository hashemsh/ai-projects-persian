/**
 * Format and Utility Helpers for WebP Studio (< 200 lines)
 */

window.WebpUtils = (function() {
  function formatBytes(bytes, decimals = 1) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function getWebpFilename(originalName) {
    if (!originalName) return 'image.webp';
    const lastDot = originalName.lastIndexOf('.');
    const base = lastDot !== -1 ? originalName.substring(0, lastDot) : originalName;
    return `${base}.webp`;
  }

  function createSampleImage(type = 'gradient') {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 1200, 800);
    grad.addColorStop(0, '#0c0f1d');
    grad.addColorStop(0.5, '#6366f1');
    grad.addColorStop(1, '#06b6d4');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 800);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.arc(350, 400, 220, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(236, 72, 153, 0.35)';
    ctx.beginPath();
    ctx.arc(850, 450, 260, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('نمونه تصویر پرکیفیت جهت تست فشرده‌سازی WebP', 600, 380);
    ctx.font = '28px Courier New, monospace';
    ctx.fillText('1200 x 800 High Resolution Benchmark', 600, 450);

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        resolve(new File([blob], 'sample-benchmark.png', { type: 'image/png' }));
      }, 'image/png');
    });
  }

  async function fetchImageFromUrl(url) {
    if (!url || !url.trim()) throw new Error('لطفاً آدرس اینترنتی معتبر وارد کنید.');
    const cleanUrl = url.trim();

    try {
      const response = await fetch(cleanUrl, { mode: 'cors' });
      if (!response.ok) throw new Error('خطا در دریافت تصویر از سرور مبدا.');
      const blob = await response.blob();
      const filename = cleanUrl.split('/').pop().split('?')[0] || 'remote-image.jpg';
      return new File([blob], filename, { type: blob.type || 'image/jpeg' });
    } catch (corsErr) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(blob => {
            if (!blob) return reject(new Error('خطا در پردازش تصویر دریافتی.'));
            const filename = cleanUrl.split('/').pop().split('?')[0] || 'remote-image.jpg';
            resolve(new File([blob], filename, { type: 'image/jpeg' }));
          }, 'image/jpeg', 0.95);
        };
        img.onerror = () => {
          reject(new Error('دسترسی مستقیم CORS توسط سرور مبدا محدود شده است.'));
        };
        img.src = cleanUrl;
      });
    }
  }

  return { formatBytes, getWebpFilename, createSampleImage, fetchImageFromUrl };
})();
