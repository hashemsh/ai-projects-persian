/**
 * List of practical AI-powered web projects and categories
 */

window.HubData = window.HubData || {};

window.HubData.categories = [
  {
    id: 'seo-tools',
    key: 'seo',
    title: 'ابزارهای سئو و بهینه‌سازی وب',
    shortTitle: 'ابزارهای سئو',
    badge: 'SEO & Content',
    icon: '🔍',
    description: 'ابزارهای تخصصی بهینه‌سازی موتورهای جستجو، ممیزی فنی وب، تحلیل ساختار محتوا و تولید اسکیما مارک‌آپ گوگل.',
    accentColor: 'cyan'
  },
  {
    id: 'marketing-tools',
    key: 'marketing',
    title: 'ابزارهای دیجیتال مارکتینگ و کمپین',
    shortTitle: 'ابزارهای مارکتینگ',
    badge: 'Marketing & Growth',
    icon: '🎯',
    description: 'ابزارهای مدیریت ترافیک کمپین‌ها، ساخت پارامترهای رهگیری UTM، کدهای QR اختصاصی و شتاب‌دهنده نرخ تبدیل.',
    accentColor: 'emerald'
  },
  {
    id: 'dev-tools',
    key: 'dev',
    title: 'ابزارهای برنامه‌نویسی و هوش مصنوعی',
    shortTitle: 'ابزارهای برنامه‌نویسی',
    badge: 'Developer & AI',
    icon: '💻',
    description: 'ابزارهای تخصصی مهندسی پرامپت، تولید تصاویر و ماکت‌های آزمایشی فرانت‌اند و ابزارهای کمکی توسعه‌دهندگان.',
    accentColor: 'indigo'
  }
];

window.HubData.projects = [
  {
    id: 6,
    category: 'seo',
    title: 'اسکیما ژنراتور پرو (Schema Generator Pro)',
    badge: 'پروژه شماره ۶ • کاربردی و فعال',
    emoji: '⚡',
    description: 'ابزار هوشمند تولید و اعتبارسنجی داده‌های ساختاریافته (JSON-LD) برای ۱۶ نوع محتوای استاندارد گوگل با شبیه‌ساز زنده نتایج گوگل و عیب‌یاب سئو فنی.',
    techs: ['JSON-LD', 'Google Rich Results', 'SERP Simulator', 'Schema Validator'],
    url: './schema-generator/',
    accentGrad: 'from-emerald-400 via-cyan-500 to-indigo-500',
    buttonGrad: 'from-emerald-600 via-cyan-600 to-indigo-600 hover:from-emerald-500 hover:to-cyan-500'
  },
  {
    id: 4,
    category: 'seo',
    title: 'سایت آدیتور پرو (Site Auditor Pro)',
    badge: 'پروژه شماره ۴ • در حال توسعه ⏳',
    badgeClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    emoji: '🔍',
    description: 'ابزار تخصصی و عمیق ممیزی صفحات وب؛ ارزیابی سئو فنی، استانداردهای Core Web Vitals، امنیت و دسترسی‌پذیری با دانلود گزارش چاپی HTML و JSON.',
    techs: ['SEO Engine', 'Core Web Vitals', 'SERP Preview', 'Audit Report'],
    url: './site-auditor/',
    accentGrad: 'from-amber-400 via-orange-500 to-indigo-500',
    buttonGrad: 'from-amber-600 via-orange-600 to-indigo-600 hover:from-amber-500 hover:to-orange-500'
  },
  {
    id: 1,
    category: 'seo',
    title: 'لورم پلاس (Lorem Plus)',
    badge: 'پروژه شماره ۱ • کاربردی و فعال',
    emoji: '✨',
    description: 'تولید محتوای هوشمند تخصصی، مقاله‌ساز کامل وبلاگی، میکروکپی‌های UI (سوالات متداول، تعرفه‌ها)، اسکیما مارک‌آپ گوگل و تزریق کلمات کلیدی سئو.',
    techs: ['Tailwind CSS', 'Vanilla JS', 'SEO Schema', 'JSON Export'],
    url: './lorem-plus/',
    accentGrad: 'from-cyan-400 via-indigo-500 to-pink-500',
    buttonGrad: 'from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400'
  },
  {
    id: 5,
    category: 'marketing',
    title: 'یو‌تی‌ام بیلدر پرو (UTM Builder Pro)',
    badge: 'پروژه شماره ۵ • کاربردی و فعال',
    emoji: '🎯',
    description: 'تولید و اعتبارسنجی لینک‌های کمپین بازاریابی برای GA4 با پریست‌های اختصاصی ادنتورک‌های ایرانی (یکتانت، تپسل)، شبیه‌ساز گزارش‌ها و خروجی گروهی اکسل.',
    techs: ['UTM Engine', 'GA4 Simulator', 'Client-side QR', 'Batch Export CSV'],
    url: './utm-builder/',
    accentGrad: 'from-cyan-400 via-indigo-500 to-emerald-400',
    buttonGrad: 'from-indigo-600 via-cyan-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500'
  },
  {
    id: 7,
    category: 'marketing',
    title: 'استودیو کیوآرکد پرو (QR Studio Pro)',
    badge: 'پروژه شماره ۷ • کاربردی و فعال',
    emoji: '📱',
    description: 'استودیوی آنلاین ساخت کدهای QR برای ۵ فرمت کاربردی (لینک وب، وای‌فای، واتساپ، تلگرام، پیج اینستاگرام) با آپلود لوگو، گرادینت و خروجی SVG و PNG.',
    techs: ['Canvas API', 'Vector SVG', 'QR Styling', 'jsQR Scanner'],
    url: './qr-studio/',
    accentGrad: 'from-cyan-400 via-indigo-500 to-pink-500',
    buttonGrad: 'from-cyan-600 via-indigo-600 to-pink-600 hover:from-cyan-500 hover:to-pink-500'
  },
  {
    id: 2,
    category: 'dev',
    title: 'پرامپت پلاس (Prompt+)',
    badge: 'پروژه شماره ۲ • کاربردی و فعال',
    emoji: '⚡',
    description: 'مهندسی پرامپت فارسی برای تبدیل دستورات معمولی به پرامپت‌های سطح بالا برای ChatGPT، Claude، Gemini و DeepSeek به همراه آنالیزور زنده عیار پرامپت.',
    techs: ['Prompt Engineering', 'LLM Auditor', 'Bilingual Trick', 'Presets Engine'],
    url: './prompt-optimizer/',
    accentGrad: 'from-purple-400 via-indigo-500 to-cyan-400',
    buttonGrad: 'from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-indigo-500'
  },
  {
    id: 3,
    category: 'dev',
    title: 'پلیس‌هولدر پرو (Placeholder Pro)',
    badge: 'پروژه شماره ۳ • کاربردی و فعال',
    emoji: '🖼️',
    description: 'استودیوی ساخت آنلاین تصاویر جایگزین و ماکت‌های گرافیکی وب؛ با ابعاد استاندارد سوشال و وب، پالت‌های مدرن، تایپوگرافی فارسی و خروجی باکیفیت WebP و SVG.',
    techs: ['Canvas 2D API', 'SVG Vector', 'WebP / PNG', 'Responsive Grid'],
    url: './placeholder-pro/',
    accentGrad: 'from-pink-500 via-purple-500 to-indigo-500',
    buttonGrad: 'from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-purple-500'
  },
  {
    id: 8,
    category: 'dev',
    title: 'سازنده و تحلیل‌گر عبارات منظم (Regex AI Studio)',
    badge: 'پروژه شماره ۸ • کاربردی و فعال',
    emoji: '⚡',
    description: 'ابزار تخصصی ساخت، تست زنده، اعتبارسنجی و تشریح مرحله‌به‌مرحله الگوهای Regex با پریست‌های بومی ایران، تبدیل زبان طبیعی به Regex و تولید خودکار کد برای ۸ زبان.',
    techs: ['Regex Engine', 'Visual Explainer', 'Multi-Lang Code', 'Persian NLP'],
    url: './regex-studio/',
    accentGrad: 'from-indigo-400 via-cyan-400 to-pink-500',
    buttonGrad: 'from-indigo-600 via-cyan-600 to-pink-600 hover:from-indigo-500 hover:to-cyan-500'
  }
];
