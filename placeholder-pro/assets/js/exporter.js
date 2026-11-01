/**
 * پلیس‌هولدر پرو | ماژول خروجی‌ها، دانلود فایل و کلیپ‌بورد
 * زیر ۲۰۰ سطر - سازگار با Clean Modular Web
 */

(function () {
  let toastTimeout;

  function showToast(title, message) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast) return;

    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    }, 2800);
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('دانلود آغاز شد', `فایل «${filename}» با موفقیت ذخیره گردید.`);
  }

  function downloadPng() {
    const { state } = window.PlaceholderState;
    const canvas = document.getElementById('placeholderCanvas');
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `placeholder-${state.width}x${state.height}.png`);
    }, 'image/png');
  }

  function downloadWebp() {
    const { state } = window.PlaceholderState;
    const canvas = document.getElementById('placeholderCanvas');
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `placeholder-${state.width}x${state.height}.webp`);
    }, 'image/webp', 0.92);
  }

  function downloadSvg() {
    const { state } = window.PlaceholderState;
    const svgContent = window.PlaceholderRenderer.generateSvgCode();
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    downloadBlob(blob, `placeholder-${state.width}x${state.height}.svg`);
  }

  function updateMetadata() {
    const { state, calculateAspectRatio } = window.PlaceholderState;
    const statRes = document.getElementById('statResolution');
    const statRatio = document.getElementById('statRatio');
    const statEst = document.getElementById('statEstSize');

    if (statRes) {
      statRes.textContent = `${state.width.toLocaleString('fa-IR')} × ${state.height.toLocaleString('fa-IR')} px`;
    }
    if (statRatio) {
      statRatio.textContent = calculateAspectRatio(state.width, state.height);
    }
    if (statEst) {
      const rawPixels = state.width * state.height;
      const estKb = Math.round((rawPixels * 3) / 1024 / 4);
      statEst.textContent = `~ ${estKb.toLocaleString('fa-IR')} KB`;
    }
  }

  function updateCodeView() {
    const { state } = window.PlaceholderState;
    const txtOutput = document.getElementById('txtOutput');
    const canvas = document.getElementById('placeholderCanvas');
    if (!txtOutput) return;

    if (state.activeTab === 'html') {
      const url = window.PlaceholderRenderer.getOnlineUrl();
      const alt = state.text.trim() || `Placeholder ${state.width}x${state.height}`;
      txtOutput.value = `<img \n  src="${url}" \n  alt="${alt}" \n  width="${state.width}" \n  height="${state.height}" \n  loading="lazy" \n  class="rounded-xl shadow-lg max-w-full h-auto" \n/>`;
    } else if (state.activeTab === 'svg') {
      txtOutput.value = window.PlaceholderRenderer.generateSvgCode();
    } else if (state.activeTab === 'url') {
      txtOutput.value = window.PlaceholderRenderer.getOnlineUrl();
    } else if (state.activeTab === 'base64') {
      try {
        txtOutput.value = canvas.toDataURL('image/png');
      } catch (e) {
        txtOutput.value = "Data URL در دسترس نیست.";
      }
    }
  }

  async function copyActiveCode() {
    const { state } = window.PlaceholderState;
    const canvas = document.getElementById('placeholderCanvas');
    let textToCopy = "";

    if (state.activeTab === 'preview' || state.activeTab === 'html') {
      const url = window.PlaceholderRenderer.getOnlineUrl();
      const alt = state.text.trim() || 'Placeholder';
      textToCopy = `<img src="${url}" alt="${alt}" width="${state.width}" height="${state.height}" />`;
    } else if (state.activeTab === 'svg') {
      textToCopy = window.PlaceholderRenderer.generateSvgCode();
    } else if (state.activeTab === 'url') {
      textToCopy = window.PlaceholderRenderer.getOnlineUrl();
    } else if (state.activeTab === 'base64') {
      textToCopy = canvas ? canvas.toDataURL('image/png') : "";
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast('کپی شد!', 'کد مورد نظر با موفقیت در کلیپ‌بورد ذخیره گردید.');
    } catch (e) {
      showToast('کپی شد!', textToCopy);
    }
  }

  window.PlaceholderExporter = {
    showToast,
    downloadBlob,
    downloadPng,
    downloadWebp,
    downloadSvg,
    updateMetadata,
    updateCodeView,
    copyActiveCode
  };
})();
