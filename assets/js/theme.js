(function () {
  var root = document.documentElement;
  var btn = document.querySelector('[data-theme-toggle]');
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  function current() {
    return root.getAttribute('data-theme') ||
           localStorage.getItem('theme') ||
           localStorage.getItem('ai_hub_theme') ||
           (mq.matches ? 'dark' : 'light');
  }
  function sync() {
    if (btn) btn.setAttribute('aria-pressed', String(current() === 'dark'));
  }
  if (btn) btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
      localStorage.setItem('ai_hub_theme', next);
    } catch (e) {}
    sync();
  });
  sync();
})();
