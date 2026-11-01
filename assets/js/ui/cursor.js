/**
 * Interactive Custom Cursor & Spotlight Follower Module
 */

window.HubUI = window.HubUI || {};

window.HubUI.initCustomCursor = function() {
  // Disable on mobile / touch screen
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return;
  }

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';

  const follower = document.createElement('div');
  follower.className = 'custom-cursor-follower';

  document.body.appendChild(dot);
  document.body.appendChild(follower);

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  }, { passive: true });

  // Smooth spring loop for follower
  function renderFollower() {
    followerX += (mouseX - followerX) * 0.16;
    followerY += (mouseY - followerY) * 0.16;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  // Hover detection for interactive targets
  const interactiveSelectors = 'a, button, input, textarea, select, .project-card, .faq-trigger, [role="button"]';
  
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(interactiveSelectors);
    if (target) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(interactiveSelectors);
    if (target) {
      document.body.classList.remove('cursor-hover');
    }
  });
};
