/**
 * Interactive Left-Side Scroll Rocket & Return-to-Top Component
 * Enhanced Aerodynamics, Mobile Header Clearance & Smooth Launch Physics
 */

window.HubUI = window.HubUI || {};

window.HubUI.initScrollRocket = function() {
  const container = document.createElement('div');
  container.className = 'scroll-rocket-container';

  const btn = document.createElement('button');
  btn.className = 'scroll-rocket-btn is-visible';
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-label', 'پرتاب به بالای صفحه');
  btn.setAttribute('title', 'پرتاب به بالای صفحه');

  const svgIcon = `<svg viewBox="0 0 48 54" fill="none" class="w-full h-full">
    <defs>
      <linearGradient id="rb" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fff"/><stop offset="60%" stop-color="#cbd5e1"/><stop offset="100%" stop-color="#64748b"/></linearGradient>
      <linearGradient id="rw" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ec4899"/><stop offset="100%" stop-color="#6366f1"/></linearGradient>
      <linearGradient id="rwin" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#0284c7"/></linearGradient>
      <linearGradient id="rf" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="#38bdf8"/><stop offset="35%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#ef4444"/></linearGradient>
    </defs>
    <g id="rocket-thruster">
      <path class="rocket-flame-outer" d="M20 42C18 47 22 53 24 54C26 53 30 47 28 42Z" fill="url(#rf)" opacity="0.85"/>
      <path class="rocket-flame-core" d="M21.5 42C20.5 45.5 23 50 24 51C25 50 27.5 45.5 26.5 42Z" fill="#fef08a"/>
    </g>
    <path d="M14 30L6 39C5.5 40 6.5 41.5 7.8 41L14 38V30Z" fill="url(#rw)"/>
    <path d="M34 30L42 39C42.5 40 41.5 41.5 40.2 41L34 38V30Z" fill="url(#rw)"/>
    <path d="M24 2C17 12 14 24 14 39C14 41 16 42 24 42C32 42 34 41 34 39C34 24 31 12 24 2Z" fill="url(#rb)" stroke="#0ea5e9" stroke-width="1.2"/>
    <path d="M24 2V12M19 36H29" stroke="#38bdf8" stroke-width="1" stroke-linecap="round"/>
    <circle cx="24" cy="20" r="5" fill="url(#rwin)" stroke="#e0f2fe" stroke-width="1.2"/>
    <circle cx="22.5" cy="18.5" r="1.5" fill="#fff" opacity="0.85"/>
    <rect x="20" y="40" width="8" height="3" rx="1.5" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
  </svg>`;

  btn.innerHTML = `
    <div class="rocket-svg-wrap">${svgIcon}</div>
    <div class="rocket-dock-tooltip"><span>پرتاب به بالا</span><span class="text-sm">🚀</span></div>
  `;

  container.appendChild(btn);
  document.body.appendChild(container);

  let isLaunching = false;
  let lastScrollY = window.scrollY;
  let ticking = false;

  function spawnSparks(x, y, count = 1) {
    for (let i = 0; i < count; i++) {
      if (Math.random() > 0.6) continue;
      const p = document.createElement('div');
      p.className = 'rocket-particle';
      const size = Math.floor(Math.random() * 5 + 3);
      const colors = ['#38bdf8', '#818cf8', '#f59e0b', '#ec4899', '#ffffff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const jitterX = (Math.random() - 0.5) * 12;
      p.style.cssText = `width:${size}px;height:${size}px;background:${color};box-shadow:0 0 10px ${color};left:${x + jitterX}px;top:${y}px;`;
      container.appendChild(p);
      setTimeout(() => p.remove(), 600);
    }
  }

  function spawnShockwave(x, y) {
    const sw = document.createElement('div');
    sw.className = 'rocket-shockwave';
    sw.style.cssText = `width:50px;height:50px;left:${x}px;top:${y}px;`;
    container.appendChild(sw);
    setTimeout(() => sw.remove(), 550);
  }

  function updateRocket() {
    ticking = false;
    if (isLaunching) return;

    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const winWidth = window.innerWidth;
    const isMobile = winWidth < 768;

    const maxScroll = Math.max(docHeight - winHeight, 1);
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // On mobile, keep rocket comfortably below the top navbar header (96px)
    const startX = isMobile ? 16 : 28;
    const startY = isMobile ? 96 : 34;
    const endX = isMobile ? 16 : 28;
    const endY = winHeight - (isMobile ? 80 : 92);

    const isScrollingDown = scrollY > lastScrollY;
    let curX = startX + Math.sin(progress * Math.PI) * (isMobile ? 8 : 16);
    let curY = startY + (endY - startY) * progress;
    let rotAngle = 0;

    if (progress < 0.04) {
      btn.classList.add('is-idle-top');
      btn.classList.remove('is-docked');
      rotAngle = isMobile ? -8 : -14;
    } else if (progress >= 0.88) {
      btn.classList.remove('is-idle-top');
      btn.classList.add('is-docked');
      curX = endX;
      curY = endY;
      rotAngle = 0;
    } else {
      btn.classList.remove('is-idle-top', 'is-docked');
      rotAngle = isScrollingDown ? 135 : -18;
    }

    btn.style.left = `${curX}px`;
    btn.style.top = `${curY}px`;
    btn.style.transform = `rotate(${rotAngle}deg)`;

    if (progress > 0.04) {
      spawnSparks(curX + (isMobile ? 22 : 28), curY + (isMobile ? 36 : 42), 1);
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateRocket);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateRocket, { passive: true });

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollToTop(duration, onComplete) {
    const startY = window.scrollY;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      window.scrollTo(0, Math.round(startY * (1 - ease)));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        if (onComplete) onComplete();
      }
    }
    window.requestAnimationFrame(step);
  }

  function launchRocket(e) {
    if (e) e.preventDefault();
    if (isLaunching) return;
    isLaunching = true;

    btn.classList.remove('is-docked', 'is-idle-top');
    btn.classList.add('is-rumbling');

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    spawnShockwave(centerX, centerY);

    // Short ignition rumble before blastoff
    setTimeout(() => {
      btn.classList.remove('is-rumbling');
      btn.classList.add('is-launching');

      // Continuous sparks along trajectory
      const sparkInterval = setInterval(() => {
        const curRect = btn.getBoundingClientRect();
        spawnSparks(curRect.left + curRect.width / 2, curRect.top + curRect.height - 4, 3);
      }, 40);

      const scrollDistance = window.scrollY;
      const duration = Math.min(Math.max(scrollDistance * 0.35, 750), 1050);

      smoothScrollToTop(duration, () => {
        clearInterval(sparkInterval);
        setTimeout(() => {
          btn.classList.remove('is-launching');
          isLaunching = false;
          updateRocket();
        }, 120);
      });
    }, 120);
  }

  btn.addEventListener('click', launchRocket);
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') launchRocket(e);
  });

  updateRocket();
};
