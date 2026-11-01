/**
 * Main Application Entry Point
 * Persian AI Projects Hub
 */

import { renderProjects } from './ui/projects-renderer.js';
import { initCardInteractions } from './ui/tilt.js';
import { initFAQ } from './ui/faq.js';
import { initCustomCursor } from './ui/cursor.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render project cards
  renderProjects('#projects-grid');

  // 2. Initialize 3D tilt and mouse spotlight on newly rendered cards
  initCardInteractions();

  // 3. Initialize FAQ questions and accordion
  initFAQ('#faq-list');

  // 4. Initialize interactive custom cursor
  initCustomCursor();
});
