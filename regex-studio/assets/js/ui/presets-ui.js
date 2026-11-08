/**
 * Presets UI and Category Filtering (< 200 lines)
 */

window.RegexPresetsUI = (function() {
  function renderPresets(containerId, onSelectCallback) {
    const container = document.getElementById(containerId);
    if (!container || !window.RegexPresets) return;

    function renderList(category = 'all') {
      const items = category === 'all'
        ? window.RegexPresets
        : window.RegexPresets.filter(p => p.category === category);

      container.innerHTML = items.map(p => `
        <button type="button" class="preset-chip group" data-preset-id="${p.id}" title="${p.desc}">
          <span class="text-base">${p.icon}</span>
          <span class="font-medium">${p.title}</span>
        </button>
      `).join('');

      container.querySelectorAll('.preset-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-preset-id');
          const preset = window.RegexPresets.find(p => p.id === id);
          if (preset && typeof onSelectCallback === 'function') {
            container.querySelectorAll('.preset-chip').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            onSelectCallback(preset);
          }
        });
      });
    }

    renderList('all');

    // Category filter tabs
    document.querySelectorAll('.preset-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.preset-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.getAttribute('data-cat') || 'all';
        renderList(cat);
      });
    });
  }

  return { renderPresets };
})();
