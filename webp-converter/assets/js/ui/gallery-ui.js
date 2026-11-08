/**
 * Converted Images Gallery & Batch Downloader UI (< 200 lines)
 */

window.WebpGalleryUI = (function() {
  function renderGallery(items = []) {
    const galleryContainer = document.getElementById('galleryContainer');
    const emptyState = document.getElementById('emptyState');
    const statsBar = document.getElementById('statsBar');
    const totalCountEl = document.getElementById('totalCount');
    const totalSavedEl = document.getElementById('totalSaved');
    const totalOriginalSizeEl = document.getElementById('totalOriginalSize');
    const totalWebpSizeEl = document.getElementById('totalWebpSize');
    const btnDownloadAll = document.getElementById('btnDownloadAll');

    if (!galleryContainer) return;

    if (!items.length) {
      if (emptyState) emptyState.classList.remove('hidden');
      if (statsBar) statsBar.classList.add('hidden');
      galleryContainer.innerHTML = '';
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (statsBar) statsBar.classList.remove('hidden');

    // Calculate totals
    const totalOrig = items.reduce((acc, it) => acc + it.originalSize, 0);
    const totalWebp = items.reduce((acc, it) => acc + it.webpSize, 0);
    const totalSavedBytes = totalOrig - totalWebp;
    const overallPercent = totalOrig > 0 ? Math.round((totalSavedBytes / totalOrig) * 100) : 0;

    if (totalCountEl) totalCountEl.textContent = `${items.length} تصویر پردازش‌شده`;
    if (totalOriginalSizeEl) totalOriginalSizeEl.textContent = window.WebpUtils.formatBytes(totalOrig);
    if (totalWebpSizeEl) totalWebpSizeEl.textContent = window.WebpUtils.formatBytes(totalWebp);
    if (totalSavedEl) totalSavedEl.textContent = `${overallPercent}٪ صرفه‌جویی (${window.WebpUtils.formatBytes(totalSavedBytes)})`;

    galleryContainer.innerHTML = items.map(item => {
      const origFormatted = window.WebpUtils.formatBytes(item.originalSize);
      const webpFormatted = window.WebpUtils.formatBytes(item.webpSize);
      const outputFilename = window.WebpUtils.getWebpFilename(item.originalName);

      return `
        <div class="glass-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/40 transition">
          <div>
            <!-- Header Badges -->
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-xs font-bold text-white truncate max-w-[200px]" title="${item.originalName}">${item.originalName}</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${item.percentSaved >= 0 ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'}">
                ${item.percentSaved >= 0 ? `-${item.percentSaved}٪` : `+${Math.abs(item.percentSaved)}٪`}
              </span>
            </div>

            <!-- Image Comparison Thumbnail -->
            <div class="relative w-full h-44 rounded-xl overflow-hidden bg-dark-950 border border-white/5 mb-3.5 flex items-center justify-center">
              <img src="${item.webpUrl}" alt="${outputFilename}" class="max-w-full max-h-full object-contain" />
              <div class="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 text-[10px] text-slate-300 font-mono">
                ${item.targetWidth}×${item.targetHeight} px
              </div>
            </div>

            <!-- Stats Comparison -->
            <div class="grid grid-cols-2 gap-2 text-xs mb-4 p-2.5 rounded-xl bg-dark-950/70 border border-white/5">
              <div>
                <span class="text-[10px] text-slate-400 block">حجم اولیه:</span>
                <span class="font-mono text-slate-300 font-semibold">${origFormatted}</span>
              </div>
              <div class="border-r border-white/10 pr-2">
                <span class="text-[10px] text-emerald-400 block">حجم WebP:</span>
                <span class="font-mono text-emerald-300 font-bold">${webpFormatted}</span>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <a href="${item.webpUrl}" download="${outputFilename}" class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md transition transform group-hover:scale-[1.02]">
            <span>دانلود WebP</span>
            <svg class="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      `;
    }).join('');

    // Batch download all
    btnDownloadAll?.addEventListener('click', () => {
      items.forEach((item, index) => {
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = item.webpUrl;
          a.download = window.WebpUtils.getWebpFilename(item.originalName);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }, index * 250);
      });
      if (window.WebpDropzoneUI) {
        window.WebpDropzoneUI.showToast(`در حال دانلود دسته‌ای ${items.length} فایل WebP...`);
      }
    });
  }

  return { renderGallery };
})();
