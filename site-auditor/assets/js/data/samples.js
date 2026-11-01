/**
 * Real-world HTML sample presets for instant testing
 */
window.AuditorSamples = [
  {
    id: 'sample-ecommerce',
    title: 'فروشگاه اینترنتی با خطاهای رایج سئو و پرفورمنس (نیازمند اصلاح)',
    description: 'شامل تصاویر بدون Alt و ابعاد، متاتگ‌های تکراری، نبود متاتگ Viewport و تگ‌های مسدودکننده.',
    url: 'https://shop-sample.example.com/products/headphones',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>خرید آنلاین</title>
  <!-- تگ دیسکریپشن بسیار کوتاه و ناقص -->
  <meta name="description" content="فروشگاه هدفون">
  <!-- تگ ویوپورت جا افتاده است -->
  <link rel="stylesheet" href="https://cdn.example.com/huge-style.css">
  <script src="https://cdn.example.com/heavy-analytics.js"></script>
</head>
<body>
  <!-- دو تگ H1 و پرش به H4 -->
  <h1>فروشگاه بزرگ هدفون و لوازم صوتی</h1>
  <h1>بهترین هدفون‌های بی‌سیم سال</h1>
  <h4>محصولات ویژه تخفیف‌دار</h4>
  
  <p>هدفون بلوتوثی مدل Pro با نویز کنسلینگ فعال.</p>
  
  <!-- تصاویر بدون صفت alt و بدون width/height و بدون lazy -->
  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500">
  <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500">
  <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500" alt="">
  
  <!-- لینک خارجی بدون noopener -->
  <a href="http://unsecure-supplier.com/spec" target="_blank">مشاهده سایت سازنده</a>
  <!-- لینک خالی بدون متن -->
  <a href="/cart"><i class="fa fa-shopping-cart"></i></a>
  
  <center><font color="gray">تمامی حقوق محفوظ است.</font></center>
</body>
</html>`
  },
  {
    id: 'sample-perfect',
    title: 'لندینگ‌پیج استاندارد و بهینه‌شده (نمره بالا و سئو سبز)',
    description: 'دارای استانداردهای کامل OpenGraph، اسکیما JSON-LD، ویوپورت، صفت lazy، تایتل ۶۰ کاراکتری و تگ‌های امنیتی.',
    url: 'https://techcorp.example.com/landing',
    html: `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>طراحی رابط کاربری و توسعه نرم‌افزار حرفه‌ای | تک‌کورپ</title>
  <meta name="description" content="ارائه خدمات تخصصی طراحی UI/UX، سئو سایت و توسعه وب‌اپلیکیشن‌های مقیاس‌پذیر با جدیدترین استانداردهای بین‌المللی و گارانتی کیفیت.">
  <link rel="canonical" href="https://techcorp.example.com/landing">
  <meta name="robots" content="index, follow">
  <link rel="icon" href="https://techcorp.example.com/favicon.ico">
  
  <!-- Open Graph -->
  <meta property="og:title" content="طراحی رابط کاربری و توسعه نرم‌افزار حرفه‌ای | تک‌کورپ">
  <meta property="og:description" content="خدمات تخصصی طراحی محصول و سئو با استانداردهای مدرن وب.">
  <meta property="og:image" content="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630">
  <meta property="og:url" content="https://techcorp.example.com/landing">
  <meta property="og:type" content="website">

  <!-- JSON-LD Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "تک‌کورپ",
    "url": "https://techcorp.example.com"
  }
  </script>

  <link rel="stylesheet" href="./assets/css/style.css">
  <script src="./assets/js/app.js" defer></script>
</head>
<body>
  <header>
    <h1>طراحی رابط کاربری مدرن و مهندسی خلاق وب</h1>
  </header>
  <main>
    <h2>خدمات و راهکارهای جامع دیجیتال</h2>
    <p>توسعه وب‌اپلیکیشن‌های مقیاس‌پذیر و پایدار برای استارتاپ‌ها و سازمان‌ها.</p>
    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" alt="جلسه همفکری تیم فنی و مدیران محصول تک‌کورپ" width="800" height="500" loading="lazy">
    
    <h2>پروژه‌ها و نمونه‌کارهای موفق</h2>
    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="مشاهده مخزن کد در گیت‌هاب">مشاهده نمونه‌کارها در گیت‌هاب</a>
  </main>
</body>
</html>`
  }
];
