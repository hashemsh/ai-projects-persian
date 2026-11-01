/**
 * UTM Builder Pro | Export & Notification Controller (< 200 lines)
 */
window.UtmExport = {
  showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const toastTitle = document.getElementById('toastTitle');
    const toastMsg = document.getElementById('toastMessage');
    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    }, 2800);
  },

  async copyText(text, successTitle = 'کپی شد!', successMsg = 'لینک در کلیپ‌بورد ذخیره گردید.') {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      this.showToast(successTitle, successMsg, 'success');
    } catch (_) {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
      this.showToast(successTitle, successMsg, 'success');
    }
  },

  exportJson(data, filename = 'utm-campaign.json') {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    this.showToast('دانلود انجام شد', 'فایل JSON با موفقیت ذخیره گردید.');
  }
};
