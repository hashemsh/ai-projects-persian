/**
 * Curated High-Performing Prompt Templates
 */
export const PRESETS = [
  {
    id: 'code-review',
    category: 'برنامه‌نویسی',
    name: 'بررسی کد و بهینه‌سازی حرفه‌ای (Code Review)',
    desc: 'کد را از نظر امنیت، پرفورمنس، اصول Clean Code و باگ‌ها بررسی می‌کند.',
    prompt: 'کد زیر را بازبینی کن. مشکلات امنیتی، گلوگاه‌های کارایی (Performance)، و موارد عدم رعایت اصول تمیزنویسی را مشخص کرده و نسخه بهینه‌شده آن را ارائه بده:',
    persona: 'developer',
    model: 'claude',
    tone: 'professional'
  },
  {
    id: 'landing-hero',
    category: 'کپی‌رایتینگ',
    name: 'تیتر و متن بنر لندینگ پیج (Landing Hero)',
    desc: 'تیترهای جذاب با نرخ کلیک بالا طبق متود فرمول‌های کپی‌رایتینگ AIDA.',
    prompt: 'برای صفحه فرود محصول جدیدمان ۳ نسخه تیتر اصلی (H1)، زیرتیتر جذاب (Subheadline)، و دکمه فراخوان به اقدام (CTA) بنویس که ارزش پیشنهادی را در نگاه اول منتقل کند.',
    persona: 'copywriter',
    model: 'chatgpt',
    tone: 'persuasive'
  },
  {
    id: 'seo-article-outline',
    category: 'سئو و محتوا',
    name: 'طرح کلی مقاله سئو شده (Article Outline)',
    desc: 'استخراج کلمات کلیدی LSI، سوالات متداول و ساختار H2/H3 رتبه‌گیر.',
    prompt: 'یک استراتژی جامع سئو و ساختار تیتربندی (H2, H3) برای مقاله‌ای با موضوع مشخص تهیه کن تا شانس رتبه ۱ گوگل را افزایش دهد.',
    persona: 'seo_expert',
    model: 'general',
    tone: 'professional'
  },
  {
    id: 'midjourney-cinematic',
    category: 'تولید تصویر',
    name: 'پرامپت سینمایی و فوتورئال میدجورنی',
    desc: 'تولید نورپردازی حجمی، زاویه لنز 85mm، سبک شات‌های آنامورفیک هالیوودی.',
    prompt: 'پرتره سینمایی واقع‌گرایانه از یک کاراکتر با نورپردازی دراماتیک، عمق میدان کم، کیفیت فوق‌العاده 8K و جزئیات بافت پوست.',
    persona: 'auto',
    model: 'image',
    tone: 'creative'
  },
  {
    id: 'business-swot',
    category: 'کسب‌وکار',
    name: 'تحلیل جامع استراتژیک SWOT',
    desc: 'بررسی نقاط قوت، ضعف، فرصت‌ها و تهدیدها همراه با راهکارهای اجرایی.',
    prompt: 'یک ماتریس تحلیل SWOT تفصیلی برای استارتاپ ما رسم کن و برای هر نقطه ضعف، یک راهکار خنثی‌کننده واقع‌بینانه پیشنهاد بده.',
    persona: 'business_coach',
    model: 'gemini',
    tone: 'professional'
  }
];
