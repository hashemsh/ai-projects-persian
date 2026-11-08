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

    if (type === 'gradient') {
      const grad = ctx.createLinearGradient(0, 0, 1200, 800);
      grad.addColorStop(0, '#0c0f1d');
      grad.addColorStop(0.5, '#6366f1');
      grad.addColorStop(1, '#06b6d4');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 800);

      // Add modern geometric circles
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
    }

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        resolve(new File([blob], 'sample-wallpaper.png', { type: 'image/png' }));
      }, 'image/png');
    });
  }

  return { formatBytes, getWebpFilename, createSampleImage };
})();
