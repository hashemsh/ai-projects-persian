/**
 * AI Models Master Dataset - Image Models (< 200 lines)
 * Single Source of Truth with official sources and last verification dates.
 */
window.AI_DATA_STORE = window.AI_DATA_STORE || {
  meta: {
    version: '2.4.0',
    lastVerified: '2026-11-14',
    lastVerifiedFa: '۲۴ آبان ۱۴۰۵ (نوامبر ۲۰۲۶)',
    defaultUsdToman: 270000
  },
  models: []
};

(function() {
  const imageModels = [
    {
      id: 'nano-banana-pro',
      name: 'Google Nano Banana Pro',
      provider: 'Google DeepMind',
      logo: 'assets/images/models/nanobanana.webp',
      category: 'image',
      billingType: 'per_unit',
      baseUSD: 0.134,
      unitDesc: '$0.134 / تصویر 4K',
      hasFreeTier: true,
      freeQuota: 'سهمیه آزمایشی در AI Studio',
      badge: 'best-quality',
      badgeText: 'کیفیت استودیویی 4K',
      capability: 'تولید و ویرایش تعاملی چندمرحله‌ای تصویر با کیفیت 4K و رندر دقیق متن',
      source_url: 'https://ai.google.dev/pricing',
      monthlyUSD: 0,
      monthlyDesc: 'پرداخت به میزان مصرف (Pay-as-you-go)',
      desc: 'مدل پرچمدار تصویرسازی جمینای با پشتیبانی از ویرایش تعاملی و پرسونای کاراکتر.'
    },
    {
      id: 'nano-banana-2',
      name: 'Google Nano Banana 2.1',
      provider: 'Google',
      logo: 'assets/images/models/nanobanana.webp',
      category: 'image',
      billingType: 'per_unit',
      baseUSD: 0.038,
      unitDesc: '$0.038 / تصویر استاندارد 1K',
      hasFreeTier: true,
      freeQuota: 'سهمیه روزانه رایگان در AI Studio',
      badge: 'best-value',
      badgeText: 'سریع و بهینه',
      capability: 'تولید سریع و کم‌هزینه تصاویر مناسب کاربردهای وب و شبکه‌های اجتماعی',
      source_url: 'https://ai.google.dev/pricing',
      monthlyUSD: 0,
      monthlyDesc: 'پرداخت به میزان مصرف (Pay-as-you-go)',
      desc: 'مدل سبک و پرسرعت برای پردازش‌های بلادرنگ و خروجی‌های استاندارد.'
    },
    {
      id: 'midjourney-v8-2',
      name: 'Midjourney v8.2',
      provider: 'Midjourney Inc.',
      logo: 'assets/images/models/midjourney.webp',
      category: 'image',
      billingType: 'subscription_or_unit',
      baseUSD: 0.050,
      unitDesc: '$0.050 / تصویر تخمینی',
      hasFreeTier: false,
      freeQuota: 'فاقد طرح رایگان دائمی',
      badge: 'best-quality',
      badgeText: 'رندر فوتورئال هنری',
      capability: 'خلق تصاویر هنری و فوتورئال با بافت واقعی و نورپردازی سینمایی',
      source_url: 'https://docs.midjourney.com/docs/plans',
      monthlyUSD: 10,
      monthlyDesc: 'پلن Basic ۱۰$، Standard ۳۰$، Pro ۶۰$، Mega ۱۲۰$',
      desc: 'استاندارد صنعت در بازنمایی بافت، فوتورئالیسم و کارهای گرافیکی پیچیده.'
    },
    {
      id: 'flux-1-1-ultra',
      name: 'FLUX.1.1 Pro / Ultra',
      provider: 'Black Forest Labs',
      logo: 'assets/images/models/flux.webp',
      category: 'image',
      billingType: 'per_unit',
      baseUSD: 0.040,
      unitDesc: '$0.040 / تصویر 2K',
      hasFreeTier: true,
      freeQuota: 'نسخه Schnell رایگان در HuggingFace',
      badge: 'best-value',
      badgeText: 'ارزش خرید بالا',
      capability: 'تولید تصویر با آناتومی واقع‌گرایانه و تایپوگرافی شفاف ۲ هزار پیکسلی',
      source_url: 'https://blackforestlabs.ai/',
      monthlyUSD: 0,
      monthlyDesc: 'پرداخت بر مبنای API',
      desc: 'مدل نسل جدید مبتنی بر معماری دگرگون‌ساز، با درک فضایی قوی.'
    },
    {
      id: 'flux-schnell',
      name: 'FLUX.1 [schnell] / Copilot',
      provider: 'BFL / Microsoft',
      logo: 'assets/images/models/flux.webp',
      category: 'image',
      billingType: 'free',
      baseUSD: 0.000,
      unitDesc: '$0.00 (طرح رایگان)',
      hasFreeTier: true,
      freeQuota: 'رایگان در HuggingFace و Copilot',
      badge: 'free',
      badgeText: 'گزینه رایگان',
      capability: 'تولید فوری در ۴ مرحله بدون نیاز به اشتراک یا پرداخت',
      source_url: 'https://huggingface.co/black-forest-labs',
      monthlyUSD: 0,
      monthlyDesc: 'کاملاً رایگان در پلتفرم‌های همکار',
      desc: 'تولید سریع با کیفیت مناسب برای سناریوهای رایگان و دانشجویی.'
    },
    {
      id: 'dall-e-3',
      name: 'OpenAI DALL-E 3',
      provider: 'OpenAI',
      logo: 'assets/images/models/openai.webp',
      category: 'image',
      billingType: 'per_unit',
      baseUSD: 0.040,
      unitDesc: '$0.040 استاندارد / $0.080 HD',
      hasFreeTier: true,
      freeQuota: 'سهمیه هفتگی در مایکروسافت Designer',
      badge: '',
      badgeText: '',
      capability: 'تفسیر دقیق پرامپت‌های مفهومی و متون توصیفی چندلایه',
      source_url: 'https://openai.com/api/pricing/',
      monthlyUSD: 20,
      monthlyDesc: 'موجود در اشتراک ChatGPT Plus (۲۰$)',
      desc: 'دقت بالا در درک توصیفات جزئی و صحنه‌های چندعنصری.'
    },
    {
      id: 'ideogram-2-5',
      name: 'Ideogram 2.5',
      provider: 'Ideogram AI',
      logo: 'assets/images/models/ideogram.webp',
      category: 'image',
      billingType: 'per_unit',
      baseUSD: 0.080,
      unitDesc: '$0.080 / رندر تجاری',
      hasFreeTier: true,
      freeQuota: '۱۰ پرامپت رایگان در هر روز',
      badge: '',
      badgeText: '',
      capability: 'طراحی پوستر، کارت ویزیت و متون فارسی/انگلیسی در داخل تصویر',
      source_url: 'https://ideogram.ai/pricing',
      monthlyUSD: 8,
      monthlyDesc: 'طرح ماهانه پایه از ۸ دلار',
      desc: 'بهترین عملکرد در گنجاندن کلمات و عبارات خوانا درون اثر گرافیکی.'
    }
  ];

  window.AI_DATA_STORE.models.push(...imageModels);
})();
