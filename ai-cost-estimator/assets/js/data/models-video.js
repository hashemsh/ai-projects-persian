/**
 * AI Models Master Dataset - Video Models (< 200 lines)
 */
(function() {
  window.AI_DATA_STORE = window.AI_DATA_STORE || { models: [] };

  const videoModels = [
    {
      id: 'seedance-2-5',
      name: 'ByteDance Seedance 2.5',
      provider: 'ByteDance / Doubao',
      logo: 'assets/images/models/seedance.webp',
      category: 'video',
      billingType: 'per_unit',
      baseUSD: 0.080,
      unitDesc: '$0.080 / هر ثانیه 4K',
      hasFreeTier: true,
      freeQuota: 'سهمیه آزمایشی در سرویس‌های بایت‌دنس',
      badge: 'best-quality',
      badgeText: 'صداگذاری همزمان و رفرنس چندگانه',
      capability: 'تولید ویدیوهای حرکتی با صدای محلی، تطبیق حرکت دهان و ویدیوهای مرجع',
      source_url: 'https://www.volcengine.com/',
      monthlyUSD: 15,
      monthlyDesc: 'بسته‌های اعتباری استودیو و API',
      desc: 'مدل چندوجهی با قابلیت تولید صدای زمینه و شبیه‌سازی فیزیک حرکتی کاراکتر.'
    },
    {
      id: 'runway-gen4',
      name: 'Runway Gen-4 / Turbo',
      provider: 'Runway ML',
      logo: 'assets/images/models/runway.webp',
      category: 'video',
      billingType: 'per_unit',
      baseUSD: 0.025,
      unitDesc: '$0.025 / هر ثانیه Turbo',
      hasFreeTier: false,
      freeQuota: 'اعتبار محدود هنگام ثبت‌نام اولیه',
      badge: 'best-value',
      badgeText: 'سرعت بالا و اقتصادی',
      capability: 'کنترل حرکت دوربین، تبدیل تصویر به ویدیو و افکت‌های بصری',
      source_url: 'https://runwayml.com/pricing',
      monthlyUSD: 12,
      monthlyDesc: 'پلن Standard ۱۲$ با ۶۲۵ کردیت',
      desc: 'حرکات روان لنز و شبیه‌سازی زاویه‌های سینمایی با سرعت تولید بالا.'
    },
    {
      id: 'luma-ray2',
      name: 'Luma Dream Machine (Ray 2)',
      provider: 'Luma AI',
      logo: 'assets/images/models/luma.webp',
      category: 'video',
      billingType: 'per_unit',
      baseUSD: 0.064,
      unitDesc: '$0.064 / هر ثانیه',
      hasFreeTier: true,
      freeQuota: '۳۰ جنریشن رایگان ماهانه در وب',
      badge: '',
      badgeText: '',
      capability: 'متحرک‌سازی عکس‌های ثابت و حرکت‌های روان فضایی دوربین',
      source_url: 'https://lumalabs.ai/dream-machine/pricing',
      monthlyUSD: 24,
      monthlyDesc: 'پلن Lite ۲۴$ تا ۹۶$ ماهیانه',
      desc: 'نورپردازی سه‌بعدی و پیوستگی بافت در طول فریم‌های ویدیویی.'
    },
    {
      id: 'kling-2-0',
      name: 'Kling AI 2.0',
      provider: 'Kuaishou',
      logo: 'assets/images/models/kling.webp',
      category: 'video',
      billingType: 'per_unit',
      baseUSD: 0.035,
      unitDesc: '$0.035 / هر ثانیه معادل',
      hasFreeTier: true,
      freeQuota: '۶۶ کردیت رایگان روزانه',
      badge: 'free',
      badgeText: 'بهترین سهمیه رایگان روزانه',
      capability: 'تولید ویدیو تا ۱۵ ثانیه با فیزیک واقع‌گرایانه و کیفیت 1080p',
      source_url: 'https://klingai.com/',
      monthlyUSD: 10,
      monthlyDesc: 'پلن Standard ۱۰$ با ۶۶۰ کردیت',
      desc: 'پایداری خوب در حرکات پیچیده و امکان تست مستمر با سهمیه روزانه.'
    },
    {
      id: 'openai-sora-integrated',
      name: 'OpenAI Sora (درون ChatGPT Plus)',
      provider: 'OpenAI',
      logo: 'assets/images/models/openai.webp',
      category: 'video',
      billingType: 'subscription',
      baseUSD: 0.070,
      unitDesc: 'موجود در پلن اشتراکی Plus/Pro',
      hasFreeTier: false,
      freeQuota: 'فقط کاربران دارای اشتراک فعال',
      badge: '',
      badgeText: '',
      capability: 'شبیه‌سازی دنیای فیزیکی در فرمت ویدیو (اپ مستقل بازنشسته شده است)',
      source_url: 'https://openai.com/sora',
      monthlyUSD: 20,
      monthlyDesc: 'اشتراک ماهانه Plus ۲۰$ یا Pro ۲۰۰$',
      desc: 'سرویس تولید ویدیوی OpenAI، در دسترس برای کاربران طرح‌های Plus و Pro.'
    }
  ];

  window.AI_DATA_STORE.models.push(...videoModels);
})();
