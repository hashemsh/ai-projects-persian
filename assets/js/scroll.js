/**
 * Smooth Scroll-to-Top Rocket Button & Progress Ring (< 50 lines)
 */
(function () {
  var btn = document.getElementById('take-me-up');
  var ring = document.getElementById('scroll-progress-ring');
  if (!btn) return;

  var circumference = 2 * Math.PI * 18; // r=18 -> ~113.1
  if (ring) {
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;
  }

  function onScroll() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    var progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

    if (ring) {
      ring.style.strokeDashoffset = circumference - (circumference * progress);
    }

    if (scrollY > 260) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
      btn.classList.remove('launching');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    btn.classList.add('launching');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(function () {
      btn.classList.remove('launching');
    }, 900);
  });
})();
