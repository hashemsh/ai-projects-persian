/**
 * Custom Cursor & 3D Card Tilt Interaction
 */
(function () {
  var isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouch) return;

  // 1. Custom Spring Cursor
  var dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  var follower = document.createElement('div');
  follower.className = 'custom-cursor-follower';
  document.body.appendChild(dot);
  document.body.appendChild(follower);

  var mouseX = -100, mouseY = -100;
  var followerX = -100, followerY = -100;

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  }, { passive: true });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  var interactiveSelectors = 'a, button, input, select, .cd, .chip, .srch, .drawer-close, [role="button"]';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // 2. 3D Tilt and Mouse Spotlight Interaction on Tool Cards
  var cards = document.querySelectorAll('.cd');
  cards.forEach(function (card) {
    var bounds = null;

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      var leftX = e.clientX - bounds.left;
      var topY = e.clientY - bounds.top;

      card.style.setProperty('--mouse-x', leftX + 'px');
      card.style.setProperty('--mouse-y', topY + 'px');

      var centerX = leftX - bounds.width / 2;
      var centerY = topY - bounds.height / 2;
      var maxTilt = 6;
      var tiltX = -(centerY / (bounds.height / 2)) * maxTilt;
      var tiltY = (centerX / (bounds.width / 2)) * maxTilt;

      card.style.transform = 'perspective(900px) rotateX(' + tiltX.toFixed(2) + 'deg) rotateY(' + tiltY.toFixed(2) + 'deg) translateY(-8px) scale(1.02)';
    }

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.addEventListener('mousemove', onMouseMove);
    }

    function onMouseLeave() {
      card.removeEventListener('mousemove', onMouseMove);
      card.style.transform = '';
      bounds = null;
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mouseleave', onMouseLeave);
  });
})();
