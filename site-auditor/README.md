# 🔍 سایت آدیتور پرو (Site Auditor Pro)
> ابزار ممیزی و آنالیزور جامع سئو فنی، پرفورمنس، دسترسی‌پذیری و امنیت وبسایت

یک ابزار کلاینت‌ساید و Production-Grade برای تحلیل موشکافانه صفحات وب، مناسب سئوکاران، طراحان محصول و توسعه‌دهندگان فرانت‌اند.

---

## ✨ قابلیت‌های کلیدی

1. **موتور عمیق ممیزی در ۴ ستون حیاتی:**
   - **سئو فنی و درون‌صفحه‌ای (On-Page SEO):** ارزیابی طول و محتوای تگ Title، متاتگ Description، ساختار تگ‌های H1 تا H6، تگ Canonical، دایرکتیوهای Robots، متاتگ‌های OpenGraph و اسکیما مارک‌آپ JSON-LD.
   - **پرفورمنس و Core Web Vitals:** ردیابی اسکریپت‌های مسدودکننده رندر، صفت `loading="lazy"` روی تصاویر، تعیین ابعاد صریح (`width` و `height`) جهت جلوگیری از پرش چیدمان (CLS) و تعداد استایل‌شیت‌ها.
   - **تجربه کاربری و دسترسی‌پذیری (UI/UX & a11y):** بررسی متاتگ Viewport موبایل، صفت `lang` و جهت `dir`، متن جایگزین (`alt`) روی تک‌تک تصاویر و لینک‌های فاقد متن یا `aria-label`.
   - **امنیت و وب استاندارد (Security):** پیشگیری از آسیب‌پذیری Reverse Tabnabbing در لینک‌های خارجی با `rel="noopener noreferrer"`، کشف محتوای ناامن Mixed Content (`http://`)، انکودینگ UTF-8 و حذف تگ‌های منسوخ‌شده HTML5.

2. **شبیه‌ساز پیش‌نمایش در نتایج گوگل (SERP) و کارت‌های شبکه‌های اجتماعی:**
   - نمایش زنده اسنیپت دسکتاپ گوگل با شمارنده کاراکتر تایتل و دیسکریپشن.
   - نمایش کارت اشتراک تلگرام، لینکدین و توییتر بر اساس متاتگ‌های OpenGraph.

3. **چک‌لیست تعاملی اقدامات اصلاحی (Action Plan):**
   - تفکیک خطاها، هشدارها و موارد بهینه‌شده به همراه قطعه‌کدهای HTML آماده برای کپی با یک کلیک.
   - قابلیت تیک‌زدن چک‌باکس‌ها به عنوان موارد برطرف‌شده.

4. **خروجی‌های چندگانه و حرفه‌ای:**
   - **دانلود گزارش کامل HTML قابل چاپ (Printable/Save-as-PDF):** آماده برای تحویل به کارفرما یا مشتری سئو.
   - **دانلود فایل JSON:** برای آرشیو داده‌ها و تحلیل‌های خودکار.
   - **کپی خلاصه گزارش Markdown:** برای ایجاد ایشیو در گیت‌هاب یا ارسال در پیام‌رسان‌ها.

5. **تجربه کاربری روان (UX Polish):**
   - ذخیره خودکار وضعیت در `localStorage`.
   - بارگذاری نمونه‌های تست سریع (سایت دارای خطا / لندینگ‌پیج بهینه).
   - سیستم اعلانات Toast شیک.

---

## 🛠️ ساختار فنی و ماژولار

```plaintext
site-auditor/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   ├── variables.css
    │   ├── base.css
    │   ├── style.css
    │   └── components/
    │       ├── score-gauge.css
    │       ├── audit-cards.css
    │       ├── serp-preview.css
    │       └── modal-toast.css
    └── js/
        ├── data/
        │   ├── samples.js
        │   └── criteria.js
        ├── engine/
        │   ├── dom-parser.js
        │   ├── seo-evaluator.js
        │   ├── perf-evaluator.js
        │   ├── ux-evaluator.js
        │   └── sec-evaluator.js
        ├── ui/
        │   ├── gauge-ui.js
        │   ├── results-ui.js
        │   ├── preview-ui.js
        │   └── toast-ui.js
        ├── utils/
        │   ├── storage.js
        │   └── exporter.js
        └── app.js
```

---

## 👨‍💻 توسعه‌دهنده

**Designed & Developed by Hashem Sh | Powered by Antigravity & Gemini Pro**
- GitHub: [hashemsh](https://github.com/hashemsh)
- LinkedIn: [hashemsheikhypour](https://www.linkedin.com/in/hashemsheikhypour)
- Telegram: [@init10](https://t.me/init10)
