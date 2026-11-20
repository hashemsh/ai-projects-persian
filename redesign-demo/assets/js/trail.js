/**
 * Ambient Mouse Glow Trail (Original soft lingering background halos)
 */
(function () {
  var isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouch) return;

  var canvas = document.createElement('canvas');
  canvas.className = 'ambient-trail-canvas';
  document.body.prepend(canvas);
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;

  function resizeCanvas() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  var particles = [];
  var lastX = -100, lastY = -100;

  window.addEventListener('mousemove', function (e) {
    var dx = e.clientX - lastX;
    var dy = e.clientY - lastY;
    if (Math.sqrt(dx * dx + dy * dy) > 12) {
      lastX = e.clientX;
      lastY = e.clientY;
      var isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      particles.push({
        x: e.clientX,
        y: e.clientY,
        radius: 40,
        alpha: isDark ? 0.22 : 0.12,
        decay: 0.007,
        color: isDark ? '99, 102, 241' : '14, 165, 233'
      });
    }
  }, { passive: true });

  function renderTrail() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.alpha -= p.decay;
      p.radius += 0.45;
      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }
      var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      g.addColorStop(0, 'rgba(' + p.color + ',' + p.alpha + ')');
      g.addColorStop(0.5, 'rgba(' + p.color + ',' + (p.alpha * 0.45) + ')');
      g.addColorStop(1, 'rgba(' + p.color + ',0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(renderTrail);
  }
  requestAnimationFrame(renderTrail);
})();
