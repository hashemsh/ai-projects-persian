/**
 * پلیس‌هولدر پرو | مخزن داده‌ها، سایزهای استاندارد و پالت‌های رنگی
 * سازگار با اجرای محلی (file:///) و محیط‌های وب‌سرور
 */

const PLACEHOLDER_DATA = {
  // دسته‌بندی سایزهای استاندارد
  categories: {
    social: {
      title: "شبکه‌های اجتماعی",
      icon: "📱",
      presets: [
        { name: "اینستاگرام پست مربعی", w: 1080, h: 1080, ratio: "1:1" },
        { name: "اینستاگرام استوری / ریلز", w: 1080, h: 1920, ratio: "9:16" },
        { name: "توییتر (X) هدر و بنر", w: 1500, h: 500, ratio: "3:1" },
        { name: "یوتیوب تامبنیل (Thumbnail)", w: 1280, h: 720, ratio: "16:9" },
        { name: "لینکدین و Open Graph", w: 1200, h: 630, ratio: "1.91:1" },
        { name: "فیس‌بوک پست افقی", w: 1200, h: 630, ratio: "1.91:1" }
      ]
    },
    web: {
      title: "وب و صفحات فرود",
      icon: "💻",
      presets: [
        { name: "هیرو دسکتاپ عریض (Full HD)", w: 1920, h: 1080, ratio: "16:9" },
        { name: "هیرو لپ‌تاپ استاندارد", w: 1440, h: 900, ratio: "16:10" },
        { name: "تصویر شاخص مقاله وبلاگ", w: 1200, h: 800, ratio: "3:2" },
        { name: "کارت محتوا و سایدبار", w: 800, h: 600, ratio: "4:3" },
        { name: "کارت محصول متوسط", w: 600, h: 400, ratio: "3:2" },
        { name: "بنر افقی لیدربورد (Leaderboard)", w: 728, h: 90, ratio: "8:1" }
      ]
    },
    mobile: {
      title: "موبایل و اپلیکیشن",
      icon: "📲",
      presets: [
        { name: "آیفون استاندارد (Retina)", w: 1170, h: 2532, ratio: "19.5:9" },
        { name: "اندروید اسکرین شات", w: 1080, h: 2400, ratio: "20:9" },
        { name: "تبلت و آیپد (Tablet)", w: 1536, h: 2048, ratio: "3:4" },
        { name: "بنر موبایل استاندارد", w: 320, h: 100, ratio: "3.2:1" }
      ]
    },
    ecommerce: {
      title: "فروشگاهی و پروفایل",
      icon: "🛍️",
      presets: [
        { name: "عکس محصول باکیفیت", w: 1000, h: 1000, ratio: "1:1" },
        { name: "عکس محصول استاندارد", w: 800, h: 800, ratio: "1:1" },
        { name: "گالری لباس و مد عمودی", w: 800, h: 1200, ratio: "2:3" },
        { name: "آواتار پروفایل کاربر", w: 400, h: 400, ratio: "1:1" }
      ]
    }
  },

  // پالت‌های رنگی جذاب و مدرن
  colorPalettes: [
    { name: "دارک لوکس", bg: "#0f172a", text: "#38bdf8", isGradient: false },
    { name: "سایبرپانک نئونی", bg: "#180e29", text: "#ec4899", isGradient: false },
    { name: "زمردی عمیق", bg: "#062820", text: "#34d399", isGradient: false },
    { name: "آبی رویال", bg: "#0f172a", text: "#818cf8", isGradient: false },
    { name: "غروب آفتاب (گرادینت)", bgGradient: ["#4f46e5", "#ec4899"], text: "#ffffff", isGradient: true },
    { name: "اقیانوس کهکشانی (گرادینت)", bgGradient: ["#09203f", "#537895"], text: "#38bdf8", isGradient: true },
    { name: "سایبر اسکای (گرادینت)", bgGradient: ["#020617", "#1e1b4b"], text: "#a78bfa", isGradient: true },
    { name: "خاکستری مدرن و خنثی", bg: "#1e293b", text: "#94a3b8", isGradient: false }
  ],

  // آیکون‌های وکتوری قابل رسم روی ماکت
  icons: {
    none: { label: "بدون آیکون", path: null },
    image: { label: "تصویر (Image)", path: "image" },
    shopping: { label: "فروشگاه (Shopping)", path: "shopping" },
    mobile: { label: "موبایل (Mobile)", path: "mobile" },
    user: { label: "کاربر (User)", path: "user" },
    code: { label: "کدنویسی (Code)", path: "code" }
  }
};

// سازگاری با هر دو محیط مرورگر و ماژول‌ها
if (typeof window !== 'undefined') {
  window.PLACEHOLDER_DATA = PLACEHOLDER_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PLACEHOLDER_DATA };
}
