/**
 * AI Models Cost Dataset - Updated to Latest 2026 Models (< 200 lines)
 */
const AI_MODELS_DATA = {
  image: [
    {
      id: 'nano-banana-pro',
      name: 'Google Nano Banana Pro',
      provider: 'Google DeepMind',
      logo: 'assets/images/models/nanobanana.webp',
      badge: 'best-quality',
      badgeText: '🌟 برترین کیفیت ادیت و 4K',
      type: 'paid',
      typeText: 'API / Google AI Studio',
      unitCostUSD: 0.134,
      unitCostDesc: '$0.134 / رندر استودیویی 4K',
      freeQuota: 'سهمیه آزمایشی در AI Studio',
      desc: 'مدل پرچمدار بومی جمینای؛ ادیت تعاملی چندمرحله‌ای، نگارش دقیق متن و پرسونای کاراکتر.'
    },
    {
      id: 'nano-banana-2',
      name: 'Google Nano Banana 2.1',
      provider: 'Google',
      logo: 'assets/images/models/nanobanana.webp',
      badge: 'best-value',
      badgeText: '⚡ سریع و اقتصادی',
      type: 'paid',
      typeText: 'API / Gemini Flash Image',
      unitCostUSD: 0.038,
      unitCostDesc: '$0.038 / رندر استاندارد 1K',
      freeQuota: 'تست رایگان روزانه در AI Studio',
      desc: 'سرعت پردازش زیر ۲ ثانیه، کیفیت عالی و مصرف بهینه مناسب تولید انبوه.'
    },
    {
      id: 'midjourney-v7',
      name: 'Midjourney v7',
      provider: 'Midjourney Inc.',
      logo: 'assets/images/models/midjourney.webp',
      badge: 'best-quality',
      badgeText: '🌟 فوتورئالیسم سینمایی',
      type: 'paid',
      typeText: 'اشتراک ماهانه / Fast Hours',
      unitCostUSD: 0.050,
      unitCostDesc: '$0.050 / عکس معادل',
      freeQuota: 'فاقد پلن رایگان دائمی',
      desc: 'استاندارد طلایی رندرینگ هنری، نورپردازی طبیعی و کنترل عمق میدان.'
    },
    {
      id: 'flux-1-1-ultra',
      name: 'FLUX.1.1 Pro / Ultra',
      provider: 'Black Forest Labs',
      logo: 'assets/images/models/flux.webp',
      badge: 'best-value',
      badgeText: '⚡ وضوح فوق‌العاده و ارزش خرید',
      type: 'paid',
      typeText: 'API تجاری BFL',
      unitCostUSD: 0.040,
      unitCostDesc: '$0.040 / تصویر 2K',
      freeQuota: 'مدل دانلودی رایگان روی سیستم شخصی',
      desc: 'نسخه نسل جدید فلکس با جزئیات آناتومی بی‌نقص و دقت تایپوگرافی.'
    },
    {
      id: 'flux-schnell',
      name: 'FLUX.1 [schnell] / Copilot',
      provider: 'BFL / Microsoft',
      logo: 'assets/images/models/flux.webp',
      badge: 'free',
      badgeText: '🎁 بهترین گزینه رایگان',
      type: 'free',
      typeText: 'کاملاً رایگان / وب',
      unitCostUSD: 0.000,
      unitCostDesc: '$0.00 (کاملاً رایگان)',
      freeQuota: 'رایگان در HuggingFace و Copilot',
      desc: 'تولید برق‌آسا در ۴ استپ با کیفیتی فراتر از انتظار.'
    },
    {
      id: 'dall-e-3-5',
      name: 'OpenAI DALL-E 3.5 / DALL-E 4',
      provider: 'OpenAI',
      logo: 'assets/images/models/openai.webp',
      badge: '',
      badgeText: '',
      type: 'paid',
      typeText: 'API / ChatGPT Plus',
      unitCostUSD: 0.040,
      unitCostDesc: '$0.040 / تصویر استاندارد',
      freeQuota: 'سهمیه روزانه در وب مایکروسافت',
      desc: 'بالاترین میزان درک دستورات پرامپت و سناریوهای فانتزی چندلایه.'
    },
    {
      id: 'ideogram-2-5',
      name: 'Ideogram 2.5',
      provider: 'Ideogram AI',
      logo: 'assets/images/models/ideogram.webp',
      badge: '',
      badgeText: '',
      type: 'paid',
      typeText: 'Freemium / API',
      unitCostUSD: 0.080,
      unitCostDesc: '$0.080 / رندر گرافیکی',
      freeQuota: '۱۰ پرامپت رایگان روزانه',
      desc: 'قهرمان تایپوگرافی حروف فارسی و انگلیسی، طراحی پوستر و لوگو.'
    }
  ],

  video: [
    {
      id: 'seedance-2-5',
      name: 'Seedance 2.5 (ByteDance)',
      provider: 'ByteDance / Doubao',
      logo: 'assets/images/models/seedance.webp',
      badge: 'best-quality',
      badgeText: '🌟 پیشگام سینمایی با صدای بومی',
      type: 'paid',
      typeText: 'API بایت‌دنس / Volcano',
      unitCostUSD: 0.080,
      unitCostDesc: '$0.080 / هر ثانیه 4K با صدا',
      freeQuota: 'سهمیه روزانه در اپلیکیشن‌های بایت‌دنس',
      desc: 'انقلاب در تولید ویدیو؛ پشتیبانی از Lip-Sync طبیعی، شبیه‌سازی رقص و حرکت با رفرنس ویدیو.'
    },
    {
      id: 'runway-gen4-turbo',
      name: 'Runway Gen-4 / Turbo',
      provider: 'Runway ML',
      logo: 'assets/images/models/runway.webp',
      badge: 'best-value',
      badgeText: '⚡ سریع‌ترین و اقتصادی',
      type: 'paid',
      typeText: 'پلن کردیت / API',
      unitCostUSD: 0.025,
      unitCostDesc: '$0.025 / هر ثانیه',
      freeQuota: 'کردیت آزمایشی اولیه',
      desc: 'فیزیک طبیعی، حرکات سیال دوربین و تولید ویدیوهای ۱۰ تا ۳۰ ثانیه‌ای.'
    },
    {
      id: 'luma-dream-ray2',
      name: 'Luma Dream Machine (Ray 2)',
      provider: 'Luma AI',
      logo: 'assets/images/models/luma.webp',
      badge: '',
      badgeText: '',
      type: 'paid',
      typeText: 'API / اشتراک وب',
      unitCostUSD: 0.064,
      unitCostDesc: '$0.064 / هر ثانیه',
      freeQuota: '۳۰ جنریشن رایگان اولیه در ماه',
      desc: 'روشنایی دراماتیک، جزئیات بافت و حرکات پیچیده کاراکتر.'
    },
    {
      id: 'kling-2-0',
      name: 'Kling AI 2.0',
      provider: 'Kuaishou',
      logo: 'assets/images/models/kling.webp',
      badge: 'free',
      badgeText: '🎁 بهترین با کردیت روزانه',
      type: 'free',
      typeText: 'Freemium با سهمیه روزانه',
      unitCostUSD: 0.035,
      unitCostDesc: '$0.035 / هر ثانیه معادل',
      freeQuota: '۶۶ کردیت رایگان هر روز',
      desc: 'حرکت خارق‌العاده، ویدیوهای طولانی تا ۱۵ ثانیه با کیفیت عالی 1080p.'
    },
    {
      id: 'openai-sora-pro',
      name: 'OpenAI Sora Pro',
      provider: 'OpenAI',
      logo: 'assets/images/models/openai.webp',
      badge: '',
      badgeText: '',
      type: 'paid',
      typeText: 'ChatGPT Plus / Pro',
      unitCostUSD: 0.080,
      unitCostDesc: '$0.080 / هر ثانیه تخمینی',
      freeQuota: 'مخصوص مشترکین پلاس و پرو',
      desc: 'شبیه‌ساز سه‌بعدی دنیای فیزیکی و رندرهای یکپارچه ۶۰ ثانیه‌ای.'
    }
  ]
};
