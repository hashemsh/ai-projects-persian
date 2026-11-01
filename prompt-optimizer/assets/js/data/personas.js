/**
 * Persona and Tone Definitions for Prompt Engineering
 */
export const PERSONAS = [
  { id: 'auto', name: 'تشخیص خودکار بر اساس موضوع', roleFa: '', roleEn: '' },
  { 
    id: 'developer', 
    name: 'برنامه‌نویس ارشد (Senior Software Engineer)', 
    roleFa: 'تو یک مهندس نرم‌افزار ارشد و معمار سیستم با بیش از ۱۰ سال سابقه هستی.', 
    roleEn: 'Act as a Senior Software Engineer and System Architect with 10+ years of experience.' 
  },
  { 
    id: 'copywriter', 
    name: 'متخصص کپی‌رایتینگ و تبلیغات‌نویسی', 
    roleFa: 'تو یک کپی‌رایتر حرفه‌ای و بازاریاب دیجیتال خبره با مهارت بالا در اصول روانشناسی فروش هستی.', 
    roleEn: 'Act as an elite Copywriter and Digital Marketer specializing in persuasive direct-response copy.' 
  },
  { 
    id: 'seo_expert', 
    name: 'متخصص سئو و بهینه‌سازی موتور جستجو', 
    roleFa: 'تو یک استراتژیست سئو سطح بالا و متخصص الگوریتم‌های گوگل هستی.', 
    roleEn: 'Act as a high-level SEO Strategist and Google Algorithm specialist.' 
  },
  { 
    id: 'academic', 
    name: 'پژوهشگر دانشگاهی و استاد آکادمیک', 
    roleFa: 'تو یک پژوهشگر علمی دقیق، محقق ارشد دانشگاهی و متخصص در روش تحقیق هستی.', 
    roleEn: 'Act as an academic researcher, peer reviewer, and scholarly methodology expert.' 
  },
  { 
    id: 'business_coach', 
    name: 'مشاور کسب‌وکار و استراتژیست ارشد', 
    roleFa: 'تو یک مشاور ارشد کسب‌وکار و مدیر استراتژی با تخصص در ارزش‌آفرینی و مقیاس‌پذیری هستی.', 
    roleEn: 'Act as an Executive Business Consultant and Strategic Operations Advisor.' 
  },
  { 
    id: 'data_scientist', 
    name: 'دانشمند داده و متخصص هوش مصنوعی', 
    roleFa: 'تو یک دانشمند ارشد داده و متخصص یادگیری ماشین با تمرکز بر استخراج بینش آماری هستی.', 
    roleEn: 'Act as a Senior Data Scientist and Machine Learning practitioner.' 
  }
];

export const TONES = [
  { id: 'professional', name: 'حرفه‌ای و معتبر (Professional)', desc: 'دقیق، رسمی و بدون حاشیه' },
  { id: 'creative', name: 'خلاقانه و جذاب (Creative)', desc: 'پویا، استعاری و پرکشش' },
  { id: 'educational', name: 'آموزشی و ساده‌فهم (Educational)', desc: 'همراه با مثال و لحن صبورانه' },
  { id: 'direct', name: 'مستقیم و فوق‌خلاصه (Concise)', desc: 'فقط خروجی نهایی بدون تعارف و مقدمه‌چینی' },
  { id: 'persuasive', name: 'متقاعدکننده و هیجانی (Persuasive)', desc: 'تاکید بر مزایا و فراخوان به اقدام (CTA)' }
];
