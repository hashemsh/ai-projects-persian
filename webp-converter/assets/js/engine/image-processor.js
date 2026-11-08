/**
 * 100% Client-Side WebP Conversion & Compression Engine (< 200 lines)
 */

window.WebpProcessor = (function() {
  function processFile(file, options = {}) {
    const quality = typeof options.quality === 'number' ? options.quality : 0.8;
    const scale = typeof options.scale === 'number' ? options.scale : 1.0;
    const startTime = performance.now();

    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        return reject(new Error('فایل انتخاب‌شده تصویر معتبر نیست.'));
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const targetWidth = Math.round(img.width * scale);
            const targetHeight = Math.round(img.height * scale);

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            const ctx = canvas.getContext('2d');
            // High quality image smoothing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            canvas.toBlob((blob) => {
              if (!blob) {
                return reject(new Error('مرورگر شما از تولید خروجی WebP پشتیبانی نمی‌کند.'));
              }

              const duration = (performance.now() - startTime).toFixed(1);
              const originalSize = file.size;
              const webpSize = blob.size;
              const savedBytes = originalSize - webpSize;
              const percentSaved = originalSize > 0
                ? Math.round((savedBytes / originalSize) * 100)
                : 0;

              const webpUrl = URL.createObjectURL(blob);
              const originalPreviewUrl = URL.createObjectURL(file);

              resolve({
                id: 'img_' + Math.random().toString(36).substring(2, 9),
                originalFile: file,
                originalName: file.name,
                originalSize,
                webpSize,
                percentSaved,
                savedBytes,
                targetWidth,
                targetHeight,
                originalWidth: img.width,
                originalHeight: img.height,
                blob,
                webpUrl,
                originalPreviewUrl,
                qualityPercent: Math.round(quality * 100),
                duration
              });
            }, 'image/webp', quality);
          } catch (err) {
            reject(err);
          }
        };

        img.onerror = () => reject(new Error('خطا در بارگذاری داده‌های تصویر.'));
        img.src = e.target.result;
      };

      reader.onerror = () => reject(new Error('خطا در خواندن فایل محلی.'));
      reader.readAsDataURL(file);
    });
  }

  async function processBatch(files, options = {}, onProgress) {
    const results = [];
    const total = files.length;

    for (let i = 0; i < total; i++) {
      try {
        const res = await processFile(files[i], options);
        results.push(res);
        if (typeof onProgress === 'function') {
          onProgress(i + 1, total, res);
        }
      } catch (err) {
        console.error('Error converting file:', files[i].name, err);
      }
    }

    return results;
  }

  return { processFile, processBatch };
})();
