/**
 * Main Application Bootstrapper for WebP Studio Pro (< 200 lines)
 */

document.addEventListener('DOMContentLoaded', () => {
  let convertedList = [];

  async function handleFiles(files, options) {
    if (!files || !files.length) {
      convertedList = [];
      if (window.WebpGalleryUI) window.WebpGalleryUI.renderGallery([]);
      return;
    }

    const loader = document.getElementById('processingIndicator');
    if (loader) loader.classList.remove('hidden');

    try {
      convertedList = await window.WebpProcessor.processBatch(files, options);
      if (window.WebpGalleryUI) {
        window.WebpGalleryUI.renderGallery(convertedList);
      }
    } catch (err) {
      console.error('Batch conversion error:', err);
      if (window.WebpDropzoneUI) {
        window.WebpDropzoneUI.showToast('خطا در تبدیل تصاویر. لطفاً دوباره تلاش کنید.');
      }
    } finally {
      if (loader) loader.classList.add('hidden');
    }
  }

  // Initialize dropzone controller
  if (window.WebpDropzoneUI) {
    window.WebpDropzoneUI.init((files, options) => {
      handleFiles(files, options);
    });
  }
});
