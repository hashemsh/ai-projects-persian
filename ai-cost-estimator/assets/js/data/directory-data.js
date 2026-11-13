/**
 * Comprehensive AI Models Directory & Monthly Subscription Plans Dataset - 2026 Updated (< 200 lines)
 */
const AI_DIRECTORY_DATA = [
  {
    name: 'ByteDance Seedance (2.5 / 2.0)',
    company: 'ByteDance / Doubao',
    logo: 'assets/images/models/seedance.webp',
    capability: 'تولید ویدیوی سینمایی 4K با صداگذاری محلی (Native Audio)، هماهنگی لب و دهان و تقلید حرکات پیچیده رقص',
    monthlyUSD: 15,
    monthlyDesc: 'پرداخت بر اساس مصرف توکن ویدیویی / اشتراک استودیو',
    freeTier: 'سهمیه تست اولیه در پلتفرم‌های همکار بایت‌دنس'
  },
  {
    name: 'Google Nano Banana (Pro / 2.1)',
    company: 'Google DeepMind',
    logo: 'assets/images/models/nanobanana.webp',
    capability: 'ادیت تعاملی چندمرحله‌ای تصویر 4K، رندر دقیق متن فارسی/انگلیسی و حفظ پرسونای کاراکتر',
    monthlyUSD: 0,
    monthlyDesc: 'پرداخت به میزان مصرف (Pay-as-you-go)',
    freeTier: 'سهمیه آزمایشی روزانه در Google AI Studio'
  },
  {
    name: 'Claude 5.5 (Sonnet & Haiku)',
    company: 'Anthropic',
    logo: 'assets/images/models/claude.webp',
    capability: 'برترین مدل جهان برای برنامه‌نویسی و مهندسی نرم‌افزار با قابلیت Hybrid Reasoning',
    monthlyUSD: 20,
    monthlyDesc: '۲۰ دلار ماهیانه (Claude Pro) با اولویت پردازش',
    freeTier: 'دسترسی با سهمیه روزانه در وب claude.ai'
  },
  {
    name: 'DeepSeek (V4-Pro & V4.1)',
    company: 'DeepSeek AI',
    logo: 'assets/images/models/deepseek.webp',
    capability: 'معماری ۱.۶T پارامتری، استدلال عمیق ریاضی، کدنویسی با ۹۵٪ هزینه ارزان‌تر از رقبا',
    monthlyUSD: 0,
    monthlyDesc: 'هزینه ناچیز API (سنت به ازای مگاتوکن) / وب رایگان',
    freeTier: '۱۰۰٪ رایگان و بدون محدودیت در سایت رسمی'
  },
  {
    name: 'Midjourney (v7)',
    company: 'Midjourney Inc.',
    logo: 'assets/images/models/midjourney.webp',
    capability: 'خلق تصاویر هنری فوق‌واقعی، رندر بافت زنده پوست و نورپردازی حرفه‌ای سینمایی',
    monthlyUSD: 10,
    monthlyDesc: '۱۰ دلار پایه (Basic) تا ۳۰ دلار نامحدود (Standard)',
    freeTier: 'فاقد پلن رایگان دائمی'
  },
  {
    name: 'FLUX.1.1 (Pro / Ultra / Schnell)',
    company: 'Black Forest Labs',
    logo: 'assets/images/models/flux.webp',
    capability: 'مدل متن‌باز و تجاری ۱۲B برای طراحی پوستر، آناتومی انسان و متن شفاف 2K',
    monthlyUSD: 0,
    monthlyDesc: 'مدل Schnell کاملاً رایگان / نسخه Pro بر حسب API',
    freeTier: 'نسخه Schnell رایگان در HuggingFace و Copilot'
  },
  {
    name: 'OpenAI ChatGPT / GPT-5 / Sora Pro',
    company: 'OpenAI',
    logo: 'assets/images/models/openai.webp',
    capability: 'چت هوشمند، استدلال صوتی، تحلیل اسناد، DALL-E 4 و تولید ویدیو Sora',
    monthlyUSD: 20,
    monthlyDesc: '۲۰ دلار ماهیانه (Plus) / ۲۰۰ دلار (Pro)',
    freeTier: 'نسخه پایه GPT-4o mini کاملاً رایگان'
  },
  {
    name: 'Runway (Gen-4 / Gen-3 Turbo)',
    company: 'Runway ML',
    logo: 'assets/images/models/runway.webp',
    capability: 'تولید ویدیوهای حرکتی با فیزیک واقع‌گرایانه، کنترل زاویه لنز و افکت‌های بصری',
    monthlyUSD: 12,
    monthlyDesc: '۱۲ دلار در ماه (Standard با ۶۲۵ کردیت)',
    freeTier: 'کردیت آزمایشی اولیه در ثبت‌نام'
  },
  {
    name: 'Luma Dream Machine (Ray 2)',
    company: 'Luma AI',
    logo: 'assets/images/models/luma.webp',
    capability: 'انیمیت تصاویر ثابت، رندرهای روان و زاویه دوربین سه‌بعدی پویا',
    monthlyUSD: 24,
    monthlyDesc: '۲۴ دلار در ماه (Lite) تا ۹۶ دلار (Plus)',
    freeTier: '۳۰ جنریشن رایگان ماهانه در وب'
  },
  {
    name: 'Kling AI 2.0',
    company: 'Kuaishou',
    logo: 'assets/images/models/kling.webp',
    capability: 'تولید ویدیو تا ۱۵ ثانیه، وفاداری بالا به پرامپت و شبیه‌سازی دقیق فیزیک اشیا',
    monthlyUSD: 10,
    monthlyDesc: '۱۰ دلار در ماه (Standard با ۶۶۰ کردیت)',
    freeTier: '۶۶ کردیت رایگان روزانه (معادل ۱ تا ۲ کلیپ رایگان روزانه)'
  },
  {
    name: 'Cursor IDE (کدنویسی هوشمند)',
    company: 'Anysphere',
    logo: 'assets/images/models/cursor.webp',
    capability: 'ادیتور تخصصی VS Code با دستیار همزمان در کل کدبیس، ساخت و ریفکتور پروژه',
    monthlyUSD: 20,
    monthlyDesc: '۲۰ دلار در ماه (Pro با ۵۰۰ درخواست پریمیوم)',
    freeTier: 'پلن رایگان دائمی با ۲۰۰۰ کامپلیشن هوشمند ماهانه'
  },
  {
    name: 'v0 by Vercel',
    company: 'Vercel',
    logo: 'assets/images/models/v0.webp',
    capability: 'طراحی آنی رابط کاربری، کد کامل کامپوننت‌های مدرن React، Tailwind و Next.js',
    monthlyUSD: 20,
    monthlyDesc: '۲۰ دلار در ماه (Premium)',
    freeTier: '۲۰۰ کردیت رایگان هر ماه برای تمام توسعه‌دهندگان'
  },
  {
    name: 'Bolt.new',
    company: 'StackBlitz',
    logo: 'assets/images/models/bolt.webp',
    capability: 'ساخت و اجرای فول‌استک نرم‌افزار در کانتینر مرورگر با دیتابیس و دیپلوی مستقیم',
    monthlyUSD: 20,
    monthlyDesc: '۲۰ دلار در ماه (Pro با ۱۰ میلیون توکن)',
    freeTier: 'سهمیه روزانه تست و ویرایش پروژه‌ها'
  }
];
