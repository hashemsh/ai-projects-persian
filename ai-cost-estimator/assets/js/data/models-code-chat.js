/**
 * AI Code & Chat Models Dataset - Updated to Latest 2026 Models (< 200 lines)
 */
AI_MODELS_DATA.code = [
  {
    id: 'deepseek-v4-pro',
    name: 'DeepSeek-V4-Pro (کد و مهندسی)',
    provider: 'DeepSeek AI',
    logo: 'assets/images/models/deepseek.webp',
    badge: 'best-value',
    badgeText: '⚡ معجزه اقتصادی ۹۵٪ ارزان‌تر',
    type: 'paid',
    typeText: 'API ۱.۶ تریلیون پارامتری',
    unitCostUSD: 0.050,
    unitCostDesc: '$0.15 / 1M توکن ورودی',
    freeQuota: 'رایگان در چت وب deepseek.com',
    desc: 'معماری ۱.۶T پارامتری با کانتکست ۱ میلیون توکنی و توانایی خارق‌العاده در کدنویسی.'
  },
  {
    id: 'claude-sonnet-5-5',
    name: 'Claude Sonnet 5.5 (Hybrid Reasoning)',
    provider: 'Anthropic',
    logo: 'assets/images/models/claude.webp',
    badge: 'best-quality',
    badgeText: '🌟 شماره ۱ مهندسی نرم‌افزار',
    type: 'paid',
    typeText: 'API / Claude Pro',
    unitCostUSD: 0.650,
    unitCostDesc: '$3.00 / 1M ورودی - $15 / 1M خروجی',
    freeQuota: 'سهمیه روزانه محدود در وب',
    desc: 'پرچمدار نسل ۵ آنتروپیک با تفکر تطبیقی، معماری فول‌استک و رکورددار SWE-bench.'
  },
  {
    id: 'cursor-pro',
    name: 'Cursor IDE Pro (ادیتور هوشمند)',
    provider: 'Anysphere',
    logo: 'assets/images/models/cursor.webp',
    badge: 'best-quality',
    badgeText: '🌟 بهترین محیط توسعه',
    type: 'paid',
    typeText: 'اشتراک ماهیانه ۲۰ دلاری',
    unitCostUSD: 0.400,
    unitCostDesc: 'معادل درخواست‌های پریمیوم ماه',
    freeQuota: 'پلن Hobby رایگان با ۲۰۰۰ کامپلیشن',
    desc: 'محبوب‌ترین ادیتور AI برای دیباگ، بازنویسی معماری و کامپلیشن آنی کل پروژه.'
  },
  {
    id: 'v0-vercel',
    name: 'v0 by Vercel (تولید UI و سایت)',
    provider: 'Vercel',
    logo: 'assets/images/models/v0.webp',
    badge: 'free',
    badgeText: '🎁 پلن رایگان فعال ماهانه',
    type: 'free',
    typeText: 'Freemium / اشتراک ۲۰$',
    unitCostUSD: 0.350,
    unitCostDesc: 'رایگان یا $0.35 / کامپوننت پرمیوم',
    freeQuota: '۲۰۰ کردیت رایگان هر ماه',
    desc: 'تولید فوری صفحات تعاملی Next.js، React و استایل Tailwind با یک پرامپت.'
  },
  {
    id: 'bolt-new',
    name: 'Bolt.new (فول‌استک این-براوزر)',
    provider: 'StackBlitz',
    logo: 'assets/images/models/bolt.webp',
    badge: '',
    badgeText: '',
    type: 'paid',
    typeText: 'Freemium / پرو ۲۰$',
    unitCostUSD: 0.450,
    unitCostDesc: 'بر اساس مصرف توکن و کانتینر',
    freeQuota: 'توکن‌های روزانه برای تست و ساخت',
    desc: 'اجرای زنده نود، دیتابیس و دیپلوی مستقیم سرور در محیط مرورگر وب.'
  },
  {
    id: 'gpt-5-codex',
    name: 'OpenAI GPT-5 / GPT-4.5',
    provider: 'OpenAI',
    logo: 'assets/images/models/openai.webp',
    badge: '',
    badgeText: '',
    type: 'paid',
    typeText: 'API / ChatGPT Plus',
    unitCostUSD: 0.500,
    unitCostDesc: '$2.50 / 1M ورودی - $10 / 1M خروجی',
    freeQuota: 'چت متنی محدود در وب',
    desc: 'تحلیل عمیق منطق نرم‌افزار، امنیت کدهای کلود و تست خودکار میکروسرویس‌ها.'
  }
];

AI_MODELS_DATA.chat = [
  {
    id: 'deepseek-v4-reasoning',
    name: 'DeepSeek-V4.1 (Thinking Mode)',
    provider: 'DeepSeek AI',
    logo: 'assets/images/models/deepseek.webp',
    badge: 'best-value',
    badgeText: '⚡ استدلال قدرتمند و فوق ارزان',
    type: 'paid',
    typeText: 'API بسیار ارزان / وب رایگان',
    unitCostUSD: 0.001,
    unitCostDesc: '$0.25 / 1M ورودی - $0.80 / 1M خروجی',
    freeQuota: 'کاملاً رایگان در وب‌سایت رسمی',
    desc: 'استدلال زنجیره افکار (CoT) در سطح مدل‌های چند صد دلاری با هزینه‌ای ناچیز.'
  },
  {
    id: 'gemini-2-5-flash',
    name: 'Google Gemini 2.5 Flash',
    provider: 'Google',
    logo: 'assets/images/models/gemini.webp',
    badge: 'best-value',
    badgeText: '⚡ سریع‌ترین و با ارزش‌ترین',
    type: 'paid',
    typeText: 'API / Google AI Studio',
    unitCostUSD: 0.0005,
    unitCostDesc: '$0.075 / 1M ورودی - $0.30 / 1M خروجی',
    freeQuota: '۱۵ درخواست در دقیقه رایگان',
    desc: 'سرعت پردازش استثنایی با کانتکست ۱ میلیون توکنی، ایده‌آل برای خلاصه متون طولانی.'
  },
  {
    id: 'claude-haiku-5-5',
    name: 'Claude Haiku 5.5',
    provider: 'Anthropic',
    logo: 'assets/images/models/claude.webp',
    badge: 'best-quality',
    badgeText: '🌟 نگارش سلیس و انسانی',
    type: 'paid',
    typeText: 'API نسل ۵ آنتروپیک',
    unitCostUSD: 0.003,
    unitCostDesc: '$0.80 / 1M ورودی - $4.00 / 1M خروجی',
    freeQuota: 'سهمیه آزمایشی کنسول',
    desc: 'پاسخ‌گویی آنی با درک عمیق زمینه زبان فارسی و نگارش محتوای خلاقانه.'
  },
  {
    id: 'gpt-4o-mini',
    name: 'OpenAI GPT-4o mini',
    provider: 'OpenAI',
    logo: 'assets/images/models/openai.webp',
    badge: 'free',
    badgeText: '🎁 رایگان در چت‌جی‌پی‌تی',
    type: 'free',
    typeText: 'API ارزان / چت رایگان',
    unitCostUSD: 0.001,
    unitCostDesc: '$0.15 / 1M ورودی - $0.60 / 1M خروجی',
    freeQuota: 'رایگان در وب ChatGPT',
    desc: 'دستیار متنی همه‌منظوره و سریع برای پرسش و پاسخ‌های روزمره.'
  }
];
