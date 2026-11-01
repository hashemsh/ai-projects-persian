/**
 * پلیس‌هولدر پرو | ماژول مدیریت و رندر تصاویر استوک واقعی (Picsum Photos)
 * زیر ۲۰۰ سطر - سازگار با Clean Modular Web
 */

(function () {
  const { state } = window.PlaceholderState;

  // موضوعات و سیدهای مرتبط برای دسته‌بندی تصاویر واقعی
  const themeSeeds = {
    nature: ['nature', 'forest', 'mountain', 'ocean', 'landscape', 'waterfall', 'greenery'],
    arch: ['architecture', 'building', 'city', 'urban', 'facade', 'bridge', 'interior'],
    tech: ['technology', 'computer', 'code', 'minimal', 'workspace', 'circuit', 'dark'],
    business: ['business', 'office', 'meeting', 'desk', 'laptop', 'corporate', 'team'],
    people: ['person', 'portrait', 'people', 'face', 'smile', 'model', 'developer'],
    food: ['food', 'coffee', 'cafe', 'restaurant', 'fruit', 'breakfast', 'dish'],
    minimal: ['minimal', 'abstract', 'texture', 'pattern', 'geometry', 'clean', 'light'],
    random: ['pic', 'creative', 'moment', 'view', 'snap', 'art', 'daily']
  };

  function getThemeSeed() {
    const list = themeSeeds[state.photoTheme] || themeSeeds.nature;
    const idx = (state.photoRandomSeed - 1) % list.length;
    return `${list[idx]}-${state.photoRandomSeed}`;
  }

  function buildPhotoUrl() {
    const w = state.width;
    const h = state.height;
    const seed = getThemeSeed();
    let url = `https://picsum.photos/seed/${seed}/${w}/${h}`;
    const params = [];

    if (state.photoGrayscale) params.push('grayscale');
    if (state.photoBlur) params.push(`blur=${state.photoBlurAmount || 3}`);

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    return url;
  }

  function updatePhotoPreview() {
    const imgEl = document.getElementById('realPhotoImage');
    const spinner = document.getElementById('photoLoadingSpinner');
    if (!imgEl) return;

    if (spinner) spinner.classList.remove('hidden');
    imgEl.classList.add('opacity-40');

    const targetUrl = buildPhotoUrl();
    const tempImg = new Image();
    tempImg.onload = () => {
      imgEl.src = targetUrl;
      imgEl.classList.remove('opacity-40');
      if (spinner) spinner.classList.add('hidden');
      if (window.PlaceholderExporter) {
        window.PlaceholderExporter.updateMetadata();
        window.PlaceholderExporter.updateCodeView();
      }
    };
    tempImg.onerror = () => {
      imgEl.src = targetUrl;
      imgEl.classList.remove('opacity-40');
      if (spinner) spinner.classList.add('hidden');
    };
    tempImg.src = targetUrl;
  }

  function refreshRandomPhoto() {
    state.photoRandomSeed = Math.floor(Math.random() * 9999) + 1;
    updatePhotoPreview();
    if (window.PlaceholderExporter) {
      window.PlaceholderExporter.showToast('تصویر تصادفی جدید لود شد', `سید انتخابی: ${getThemeSeed()}`);
    }
  }

  async function downloadCurrentPhoto() {
    const url = buildPhotoUrl();
    try {
      if (window.PlaceholderExporter) {
        window.PlaceholderExporter.showToast('در حال آماده‌سازی دانلود...', 'لطفاً چند ثانیه صبر کنید.');
      }
      const resp = await fetch(url);
      const blob = await resp.blob();
      if (window.PlaceholderExporter) {
        window.PlaceholderExporter.downloadBlob(blob, `stock-photo-${state.width}x${state.height}.jpg`);
      }
    } catch (e) {
      // در صورت محدودیت CORS مرورگر، تب جدید را باز می‌کنیم
      window.open(url, '_blank');
    }
  }

  window.PlaceholderRealPhoto = {
    buildPhotoUrl,
    updatePhotoPreview,
    refreshRandomPhoto,
    downloadCurrentPhoto,
    getThemeSeed
  };
})();
