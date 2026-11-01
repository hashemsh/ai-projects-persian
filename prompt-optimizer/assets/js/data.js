/**
 * پرامپت پلاس | داده‌های پایه، نقش‌ها، مدل‌ها و ۱۰ الگوی آماده حرفه‌ای
 * CORS-safe for file:/// and HTTP
 */
window.PromptData = {
  models: [
    { id: 'general', name: 'عمومی (تمامی مدل‌ها)', tag: 'LLM' },
    { id: 'chatgpt', name: 'OpenAI ChatGPT (GPT-4o)', tag: 'GPT' },
    { id: 'claude', name: 'Anthropic Claude (3.5 Sonnet)', tag: 'Claude' },
    { id: 'gemini', name: 'Google Gemini (1.5 / 2.0)', tag: 'Gemini' },
    { id: 'deepseek', name: 'DeepSeek (V3 / R1)', tag: 'DeepSeek' },
    { id: 'image', name: 'میدجورنی / هوش مصنوعی تصویر', tag: 'Image' }
  ],

  personas: [
    { id: 'auto', name: 'تشخیص هوشمند بر اساس موضوع', roleFa: '', roleEn: '' },
    { 
      id: 'developer', 
      name: 'مهندس ارشد نرم‌افزار (Senior Engineer)', 
      roleFa: 'تو یک مهندس نرم‌افزار ارشد و معمار سیستم با بیش از ۱۰ سال سابقه هستی.', 
      roleEn: 'Act as an elite Senior Software Engineer and System Architect with 10+ years of experience.' 
    },
    { 
      id: 'copywriter', 
      name: 'کپی‌رایتر ارشد و متخصص تبلیغات', 
      roleFa: 'تو یک کپی‌رایتر سطح بالا و متخصص روانشناسی فروش و بازاریابی مستقیم هستی.', 
      roleEn: 'Act as a top-tier Direct-Response Copywriter and Conversion Rate Optimization specialist.' 
    },
    { 
      id: 'seo_expert', 
      name: 'استراتژیست ارشد سئو (SEO Expert)', 
      roleFa: 'تو یک متخصص ارشد سئو و استراتژیست رتبه‌گیری با تسلط بر الگوریتم‌های گوگل هستی.', 
      roleEn: 'Act as an expert SEO Strategist with deep understanding of Google ranking algorithms and search intent.' 
    },
    { 
      id: 'academic', 
      name: 'پژوهشگر دانشگاهی و استاد آکادمیک', 
      roleFa: 'تو یک محقق ارشد دانشگاهی، داور مقالات و متخصص متدولوژی تحقیق علمی هستی.', 
      roleEn: 'Act as a distinguished academic researcher, methodology expert, and peer-reviewer.' 
    },
    { 
      id: 'business_coach', 
      name: 'مشاور استراتژی کسب‌وکار و استارتاپ', 
      roleFa: 'تو یک مشاور ارشد کسب‌وکار با تخصص در مدل‌های درآمدی و ارتقای مقیاس‌پذیری هستی.', 
      roleEn: 'Act as an Executive Business Strategy Consultant and Startup Growth Advisor.' 
    }
  ],

  tones: [
    { id: 'professional', name: 'رسمی و تخصصی (Professional)' },
    { id: 'creative', name: 'خلاقانه و پرکشش (Creative)' },
    { id: 'educational', name: 'آموزشی و گام‌به‌گام (Educational)' },
    { id: 'concise', name: 'مستقیم و بدون حاشیه (Concise)' },
    { id: 'persuasive', name: 'متقاعدکننده و ترغیبی (Persuasive)' }
  ],

  languages: [
    { id: 'bilingual', name: 'ترفند دوزبانه (دستور انگلیسی + پاسخ فارسی - حداکثر دقت)' },
    { id: 'fa', name: 'کاملاً فارسی (دستور و پاسخ به فارسی)' },
    { id: 'en', name: 'کاملاً انگلیسی (دستور و خروجی انگلیسی)' }
  ],

  presets: [
    {
      id: 'code-review',
      category: 'برنامه‌نویسی',
      name: 'بازبینی کد و تحلیل امنیتی (Code Review)',
      desc: 'بررسی باگ‌ها، آسیب‌پذیری‌های امنیتی و بهینه‌سازی پرفورمنس.',
      prompt: 'کد زیر را بازبینی کن. مشکلات امنیتی، گلوگاه‌های کارایی (Performance)، و موارد عدم رعایت اصول کد تمیز را مشخص کرده و نسخه بهینه‌شده آن را ارائه بده:',
      persona: 'developer', model: 'claude', tone: 'professional'
    },
    {
      id: 'fullstack-feature',
      category: 'برنامه‌نویسی',
      name: 'معماری و پیاده‌سازی فیچر جدید فول‌استک',
      desc: 'طراحی ساختار دیتابیس، اندپوینت‌های RESTful و کامپوننت فرانت‌اند.',
      prompt: 'برای پیاده‌سازی قابلیت احراز هویت دومرحله‌ای (2FA) با ارسال پیامک و ایمیل، ساختار جداول دیتابیس، کنترلرها و کامپوننت فرانت‌اند را با کد کامل بنویس.',
      persona: 'developer', model: 'general', tone: 'professional'
    },
    {
      id: 'landing-hero',
      category: 'کپی‌رایتینگ',
      name: 'تیتر و متن جذاب صفحه فرود (Landing Hero)',
      desc: 'ایجاد ۳ تیتر برنده با فرمول‌های روانشناسی AIDA و CTA گیرا.',
      prompt: 'برای صفحه فرود محصول جدید ما، ۳ نسخه تیتر اصلی (H1)، زیرتیتر ارزش‌آفرین و دکمه فراخوان به اقدام (CTA) با تمرکز بر افزایش نرخ تبدیل بنویس.',
      persona: 'copywriter', model: 'chatgpt', tone: 'persuasive'
    },
    {
      id: 'seo-pillar',
      category: 'سئو و محتوا',
      name: 'ساختار جامع مقاله پیلار (Pillar Page)',
      desc: 'طراحی کلاستر محتوایی، کلمات کلیدی LSI و تیتربندی رتبه‌گیر گوگل.',
      prompt: 'یک ساختار سئو شده و تیتربندی کامل (H2 و H3) همراه با کلمات کلیدی مکمل LSI و سوالات متداول برای مقاله جامع سئو تهیه کن.',
      persona: 'seo_expert', model: 'general', tone: 'professional'
    },
    {
      id: 'schema-faq',
      category: 'سئو تکنیکال',
      name: 'تولید اسکیما مارک‌آپ FAQ استاندارد گوگل',
      desc: 'تولید اسکریپت JSON-LD معتبر با استانداردهای Schema.org.',
      prompt: 'برای ۵ سوال و پاسخ متداول زیر، کد ساختاریافته Schema Markup از نوع FAQPage در قالب تگ script استاندارد JSON-LD بنویس:',
      persona: 'seo_expert', model: 'claude', tone: 'concise'
    },
    {
      id: 'b2b-cold-email',
      category: 'بازاریابی و فروش',
      name: 'ایمیل مارکتینگ B2B سازمانی با نرخ پاسخ بالا',
      desc: 'متن شخصی‌سازی شده برای ارتباط با مدیران عامل و مدیران فنی.',
      prompt: 'یک ایمیل سرد (Cold Email) سازمانی ۳ پاراگرافی برای معرفی راهکار نرم‌افزاری خود به مدیران ارشد فناوری (CTO) بنویس که ارزش ملموس ایجاد کند.',
      persona: 'copywriter', model: 'chatgpt', tone: 'persuasive'
    },
    {
      id: 'ux-audit',
      category: 'طراحی محصول',
      name: 'تحلیل تجربه کاربری و آنالیز هیوریستیک UX',
      desc: 'بررسی جریان‌های کاربری، کاهش اصطکاک و پیشنهادهای بهبود UI.',
      prompt: 'جریان ثبت‌نام و آنبوردینگ کاربر در اپلیکیشن ما دارای نرخ ریزش بالاست. یک چک‌لیست عیب‌یابی ۱۰ مرحله‌ای بر اساس اصول نلسون نورمن ارائه بده.',
      persona: 'business_coach', model: 'claude', tone: 'professional'
    },
    {
      id: 'midjourney-cinematic',
      category: 'تصویرسازی',
      name: 'پرامپت عکاسی سینمایی میدجورنی',
      desc: 'نورپردازی حجمی، لنز پرتره 85mm و بافت فوق‌العاده واقع‌گرایانه.',
      prompt: 'پرتره دراماتیک سینمایی با نورپردازی طبیعی، عمق میدان باریک، جزئیات بافت پوست و کیفیت 8K.',
      persona: 'auto', model: 'image', tone: 'creative'
    },
    {
      id: 'business-swot',
      category: 'کسب‌وکار',
      name: 'تحلیل جامع استراتژیک SWOT',
      desc: 'تحلیل نقاط قوت، ضعف، فرصت‌ها و تهدیدها با راهکارهای عملی.',
      prompt: 'یک ماتریس SWOT کاربردی برای کسب‌وکار ما رسم کن و برای هر نقطه ضعف، یک راهکار اجرایی خنثی‌کننده ارائه بده.',
      persona: 'business_coach', model: 'gemini', tone: 'professional'
    },
    {
      id: 'academic-summary',
      category: 'پژوهش و تحلیل',
      name: 'تلخیص تحلیلی و استخراج متدولوژی مقاله علمی',
      desc: 'خلاصه‌سازی فرضیات، متغیرهای مستقل/وابسته و یافته‌های آماری.',
      prompt: 'متن مقاله علمی زیر را تحلیل کن و در ۴ بخش فرضیات، متدولوژی، نتایج آماری کلیدی و محدودیت‌های پژوهش دسته‌بندی کن:',
      persona: 'academic', model: 'claude', tone: 'educational'
    }
  ]
};
