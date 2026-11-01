/**
 * پلیس‌هولدر پرو | ماژول وضعیت و محاسبات ابعاد
 * زیر ۲۰۰ سطر - سازگار با Clean Modular Web
 */

(function () {
  const defaultState = {
    mode: "graphic", // 'graphic' یا 'photo'
    width: 800,
    height: 600,
    ratioLock: false,
    lockedRatio: 800 / 600,
    text: "تصویر ماکت",
    subtitle: "",
    showDimensions: true,
    showGrid: false,
    fontFamily: "Vazirmatn",
    fontSize: 0, // 0 = محاسبه خودکار
    bgColor: "#0f172a",
    textColor: "#38bdf8",
    isGradient: false,
    gradientEnd: "#6366f1",
    gradientAngle: 135,
    icon: "image",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "#6366f1",
    activeCategory: "web",
    activeTab: "preview",
    // Real Photo Settings
    photoTheme: "nature",
    photoRandomSeed: 1,
    photoGrayscale: false,
    photoBlur: false,
    photoBlurAmount: 3
  };

  const state = { ...defaultState };

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  function calculateAspectRatio(w, h) {
    const divisor = gcd(w, h);
    const rW = w / divisor;
    const rH = h / divisor;
    if (rW > 50 || rH > 50) {
      return (w / h).toFixed(2) + ":1";
    }
    return `${rW}:${rH}`;
  }

  function resetState() {
    Object.assign(state, defaultState);
  }

  window.PlaceholderState = {
    state,
    resetState,
    calculateAspectRatio,
    gcd
  };
})();
