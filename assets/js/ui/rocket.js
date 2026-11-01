/**
 * Interactive Scroll Rocket & Smooth Return-to-Top Component
 * Persian AI Projects Hub
 */

window.HubUI = window.HubUI || {};

window.HubUI.initScrollRocket = function() {
  const logoEl = document.getElementById('site-logo-container') || document.querySelector('nav img[src*="logo"]')?.parentElement;
  
  const container = document.createElement('div');
  container.className = 'scroll-rocket-container';

  const btn = document.createElement('button');
  btn.className = 'scroll-rocket-btn';
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
      <path class="rocket-flame-outer" d="M20 42C18 47 22 53 24 54C26 53 30 47 28 42Z" fill="url(#rf)" opacity="0.8"/>
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

  function spawnSparks(x, y) {
    if (Math.random() > 0.4) return;
    const p = document.createElement('div');
    p.className = 'rocket-particle';
    const size = Math.floor(Math.random() * 6 + 4);
    const colors = ['#38bdf8', '#818cf8', '#f59e0b', '#ec4899'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `width:${size}px;height:${size}px;background:${color};box-shadow:0 0 8px ${color};left:${x}px;top:${y}px;`;
    container.appendChild(p);
    setTimeout(() => p.remove(), 650);
  }

  function updateRocket() {
    ticking = false;
    if (isLaunching) return;

    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = Math.max(docHeight - winHeight, 1);
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    if (scrollY < 45) {
      btn.classList.remove('is-visible', 'is-docked');
      btn.style.transform = 'scale(0.3) rotate(0deg)';
      lastScrollY = scrollY;
      return;
    }

    btn.classList.add('is-visible');

    const logoRect = logoEl ? logoEl.getBoundingClientRect() : { left: window.innerWidth - 70, top: 25, width: 44, height: 44 };
    const startX = logoRect.left + (logoRect.width / 2) - 30;
    const startY = Math.max(logoRect.top, 25);
    const endX = 32;
    const endY = winHeight - 88;

    const isScrollingDown = scrollY >= lastScrollY;
    const isNearBottom = progress >= 0.88;
    let curX, curY, rotAngle;

    if (isNearBottom) {
      curX = endX;
      curY = endY;
      rotAngle = 0;
      btn.classList.add('is-docked');
    } else {
      btn.classList.remove('is-docked');
      const t = Math.min(Math.max((progress - 0.04) / 0.84, 0), 1);
      const easeT = t * t * (3 - 2 * t);

      curX = startX + (endX - startX) * easeT;
      curY = startY + (endY - startY) * t;
      rotAngle = isScrollingDown ? (145 - (easeT * 40)) : (-15 + (easeT * 15));
    }

    btn.style.left = `${curX}px`;
    btn.style.top = `${curY}px`;
    btn.style.transform = `rotate(${rotAngle}deg) scale(1)`;

    spawnSparks(curX + 30, curY + 45);
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateRocket);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => { updateRocket(); }, { passive: true });

  function launchRocket(e) {
    if (e) e.preventDefault();
    if (isLaunching) return;

    isLaunching = true;
    btn.classList.remove('is-docked');
    btn.classList.add('is-launching');

    const rect = btn.getBoundingClientRect();
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        spawnSparks(rect.left + 24 + (Math.random() * 20 - 10), rect.top + 50 + (Math.random() * 20));
      }, i * 30);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      btn.classList.remove('is-launching', 'is-visible');
      isLaunching = false;
      updateRocket();
    }, 1000);
  }

  btn.addEventListener('click', launchRocket);
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') launchRocket(e);
  });

  updateRocket();
};
