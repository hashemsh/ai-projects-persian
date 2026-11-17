/**
 * Directory Data Bridge (< 200 lines)
 * Uses window.AI_DATA_STORE.models directly as a Single Source of Truth
 */
const AI_DIRECTORY_DATA = (function() {
  return window.AI_DATA_STORE?.models || [];
})();
