/**
 * Main Application Bootstrap Script
 * Persian AI Projects Hub
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.HubUI) return;

  // 1. Render categorized project cards
  if (typeof window.HubUI.renderProjects === 'function') {
    window.HubUI.renderProjects('#projects-container');
  }

  // 2. Initialize 3D tilt and mouse spotlight on cards
  if (typeof window.HubUI.initCardInteractions === 'function') {
    window.HubUI.initCardInteractions();
  }

  // 3. Initialize FAQ questions and accordion
  if (typeof window.HubUI.initFAQ === 'function') {
    window.HubUI.initFAQ('#faq-list');
  }

  // 4. Initialize interactive custom cursor
  if (typeof window.HubUI.initCustomCursor === 'function') {
    window.HubUI.initCustomCursor();
  }

  // 5. Initialize interactive scroll rocket & return-to-top
  if (typeof window.HubUI.initScrollRocket === 'function') {
    window.HubUI.initScrollRocket();
  }

  // 6. Initialize live debounced search
  if (typeof window.HubUI.initSearch === 'function') {
    window.HubUI.initSearch();
  }
});
