/**
 * Drag & Drop Zone and Control Panel UI Controller (< 200 lines)
 */

window.WebpDropzoneUI = (function() {
  let currentFiles = [];
  let currentQuality = 0.8;
  let currentScale = 1.0;

  function showToast(msg) {
    let toast = document.getElementById('webp-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'webp-toast';
      toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-xs shadow-2xl transition-all duration-300 opacity-0 pointer-events-none';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.remove('opacity-0', 'translate-y-2');
    setTimeout(() => toast.classList.add('opacity-0', 'translate-y-2'), 2200);
  }

  function init(onFilesChange) {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityVal = document.getElementById('qualityVal');
    const scaleBtns = document.querySelectorAll('.scale-btn');
    const btnSample = document.getElementById('btnLoadSample');
    const btnClear = document.getElementById('btnClearAll');

    // Drag and Drop
    if (dropzone) {
      ['dragenter', 'dragover'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
          e.preventDefault();
          dropzone.classList.add('drag-active');
        });
      });

      ['dragleave', 'drop'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
          e.preventDefault();
          dropzone.classList.remove('drag-active');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = Array.from(dt.files || []).filter(f => f.type.startsWith('image/'));
        if (files.length) {
          handleNewFiles(files, onFilesChange);
        } else {
          showToast('هیچ فایل تصویری معتبری پیدا نشد.');
        }
      });
    }

    // File Input
    fileInput?.addEventListener('change', (e) => {
      const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
      if (files.length) {
        handleNewFiles(files, onFilesChange);
      }
    });

    // Quality Slider
    qualitySlider?.addEventListener('input', (e) => {
      currentQuality = parseInt(e.target.value, 10) / 100;
      if (qualityVal) qualityVal.textContent = `${e.target.value}٪`;
      if (currentFiles.length && typeof onFilesChange === 'function') {
        onFilesChange(currentFiles, { quality: currentQuality, scale: currentScale });
      }
    });

    // Scale buttons
    scaleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        scaleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentScale = parseFloat(btn.getAttribute('data-scale') || '1.0');
        if (currentFiles.length && typeof onFilesChange === 'function') {
          onFilesChange(currentFiles, { quality: currentQuality, scale: currentScale });
        }
      });
    });

    // Sample image
    btnSample?.addEventListener('click', async () => {
      if (!window.WebpUtils) return;
      showToast('در حال ساخت تصویر نمونه بنچمارک...');
      const sampleFile = await window.WebpUtils.createSampleImage('gradient');
      handleNewFiles([sampleFile], onFilesChange);
    });

    // Clear
    btnClear?.addEventListener('click', () => {
      currentFiles = [];
      if (fileInput) fileInput.value = '';
      if (typeof onFilesChange === 'function') {
        onFilesChange([], { quality: currentQuality, scale: currentScale });
      }
      showToast('گالری با موفقیت پاکسازی شد.');
    });
  }

  function handleNewFiles(files, callback) {
    currentFiles = files;
    showToast(`${files.length} تصویر دریافت شد؛ در حال تبدیل به WebP...`);
    if (typeof callback === 'function') {
      callback(currentFiles, { quality: currentQuality, scale: currentScale });
    }
  }

  function getOptions() {
    return { quality: currentQuality, scale: currentScale };
  }

  return { init, getOptions, showToast };
})();
