/**
 * 3D Tilt and Mouse Spotlight Interaction for Project Cards
 */

export function initCardInteractions() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    let bounds;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      document.addEventListener('mousemove', onMouseMove);
    }

    function onMouseMove(e) {
      if (!bounds) return;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;

      // Set CSS variables for radial mouse spotlight
      card.style.setProperty('--mouse-x', `${leftX}px`);
      card.style.setProperty('--mouse-y', `${topY}px`);

      // Calculate subtle 3D tilt
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };

      const maxTilt = 7; // Max tilt degrees
      const tiltX = -(center.y / (bounds.height / 2)) * maxTilt;
      const tiltY = (center.x / (bounds.width / 2)) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-8px) scale(1.015)`;
    }

    function onMouseLeave() {
      document.removeEventListener('mousemove', onMouseMove);
      card.style.transform = '';
      bounds = null;
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}
