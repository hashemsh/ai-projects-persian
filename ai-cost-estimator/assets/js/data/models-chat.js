/**
 * AI Models Master Dataset - Chat & Reasoning (< 200 lines)
 */
(function() {
  window.AI_DATA_STORE = window.AI_DATA_STORE || { models: [] };

  const chatModels = [
    {
      id: 'deepseek-v4-chat',
      name: 'DeepSeek V4 (Thinking Mode)',
      provider: 'DeepSeek AI',
      logo: 'assets/images/models/deepseek.webp',
      category: 'chat',
      billingType: 'token',
      inputPrice1M: 0.55,
      outputPrice1M: 2.19,
      unitDesc: '$0.55 In / $2.19 Out (هر ۱M توکن)',
      hasFreeTier: true,
      freeQuota: 'کاملاً رایگان در وب‌سایت رسمی',
      badge: 'best-value',
      badgeText: 'استدلال منطقی اقتصادی',
      capability: 'زنجیره تفکر عمیق (CoT) برای تحلیل متن، استدلال و پرسش و پاسخ',
      source_url: 'https://api-docs.deepseek.com/quick_start/pricing',
      monthlyUSD: 0,
      monthlyDesc: 'پرداخت بر مبنای توکن مصرفی / وب رایگان',
      desc: 'مدل استدلال‌گر با هزینه کم برای تحلیل اسناد، ترجمه و مباحثه منطقی.'
    },
    {
      id: 'gemini-2-flash',
      name: 'Google Gemini 2.0 Flash',
      provider: 'Google',
      logo: 'assets/images/models/gemini.webp',
      category: 'chat',
      billingType: 'token',
      inputPrice1M: 0.10,
      outputPrice1M: 0.40,
      unitDesc: '$0.10 In / $0.40 Out (هر ۱M توکن)',
      hasFreeTier: true,
      freeQuota: '۱۵ درخواست در دقیقه رایگان در AI Studio',
      badge: 'best-value',
      badgeText: 'سرعت بالا و پنجره بزرگ',
      capability: 'پردازش متون بسیار طولانی با پنجره کانتکست ۱ میلیون توکنی',
      source_url: 'https://ai.google.dev/pricing',
      monthlyUSD: 0,
      monthlyDesc: 'پرداخت به میزان مصرف (Pay-as-you-go)',
      desc: 'سرعت بالا و حافظه متنی گسترده مناسب برای خلاصه کردن کتاب و فایل‌های حجیم.'
    },
    {
      id: 'claude-3-5-haiku',
      name: 'Claude 3.5 Haiku',
      provider: 'Anthropic',
      logo: 'assets/images/models/claude.webp',
      category: 'chat',
      billingType: 'token',
      inputPrice1M: 0.80,
      outputPrice1M: 4.00,
      unitDesc: '$0.80 In / $4.00 Out (هر ۱M توکن)',
      hasFreeTier: false,
      freeQuota: 'فاقد طرح رایگان پایدار API',
      badge: 'best-quality',
      badgeText: 'نگارش روان و طبیعی',
      capability: 'پاسخ‌گویی سریع با نگارش سلیس و درک اصطلاحات زبانی',
      source_url: 'https://www.anthropic.com/pricing',
      monthlyUSD: 0,
      monthlyDesc: 'پرداخت به ازای هر توکن API',
      desc: 'پاسخ سریع با لحن نگارشی یکنواخت برای چت‌بات‌ها و پشتیبانی مشتریان.'
    },
    {
      id: 'gpt-4o-mini',
      name: 'OpenAI GPT-4o mini',
      provider: 'OpenAI',
      logo: 'assets/images/models/openai.webp',
      category: 'chat',
      billingType: 'token',
      inputPrice1M: 0.15,
      outputPrice1M: 0.60,
      unitDesc: '$0.15 In / $0.60 Out (هر ۱M توکن)',
      hasFreeTier: true,
      freeQuota: 'رایگان در گفتگوی وب ChatGPT',
      badge: 'free',
      badgeText: 'رایگان در چت وب',
      capability: 'دستیار چندمنظوره برای پاسخ به سوالات روتین، خلاصه‌سازی و مکالمه',
      source_url: 'https://openai.com/api/pricing/',
      monthlyUSD: 0,
      monthlyDesc: 'API بسیار کم‌هزینه / وب رایگان',
      desc: 'گزینه سبک برای مکالمات عمومی با کمترین هزینه در اکوسیستم OpenAI.'
    }
  ];

  window.AI_DATA_STORE.models.push(...chatModels);
})();
