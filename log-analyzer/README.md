# 🩺 آنالیزور لاگ سرور و سیستم عیب‌یابی با هوش مصنوعی (Log Analyzer & AI Debugger)

ابزار تخصصی، ۱۰۰٪ محلی و تحت مرورگر برای تحلیل، تفکیک و ریشه‌یابی خطاهای وب‌سرورهای Nginx و Apache، خطاهای بحرانی PHP Fatal Error، و کرش‌های Node.js و Python به همراه تولید خودکار پرامپت مهندسی‌شده برای عیب‌یابی سریع در هوش مصنوعی.

---

## 🌟 ویژگی‌های کلیدی

1. **تحلیل چندگانه خطاهای وب‌سرور:**
   - پشتیبانی از خطاهای Nginx (502 Bad Gateway، 504 Timeout، 413 Payload Too Large، 404 Not Found).
   - تحلیل خطاهای بحرانی PHP (Allowed Memory Size، Maximum Execution Time، Undefined Function).
   - رهگیری استک‌ترس‌های Node.js (EADDRINUSE، ECONNREFUSED، UnhandledPromiseRejection).
2. **تحلیل ریشه‌ای هوشمند (Root Cause Explainer):**
   - ارائه توضیح فارسی شفاف و کوتاه برای تک‌تک خطاهای شناسایی‌شده به زبان ساده.
3. **حفظ محرمانگی و حریم خصوصی (Data Anonymizer):**
   - ماسک کردن خودکار آدرس‌های IP کاربران، توکن‌های Bearer، کلیدهای API و مسیرهای دایرکتوری قبل از ساخت پرامپت.
4. **مولد پرامپت اختصاصی برای مدل‌های زبانی:**
   - خروجی بهینه‌شده متناسب با ChatGPT، Claude 3.5 Sonnet، Gemini 1.5 Pro و DeepSeek V3/R1.
5. **خروجی گزارش Markdown:**
   - امکان دانلود فایل گزارش ممیزی با فرمت `.md` با یک کلیک.

---

## 📂 ساختار فایل‌ها

```text
log-analyzer/
├── index.html                  # اینترفیس تعاملی ابزار
├── README.md                   # مستندات فنی و راهنما
└── assets/
    ├── css/
    │   └── style.css           # استایل‌های فضای کار ۲ ستونه و کارت‌های لاگ
    └── js/
        └── app.js              # پارسر لاگ، ماسک‌کننده داده‌های حساس و مولد پرامپت
```

---

## 🔗 دسترسی
- آدرس آنلاین: [https://hashemsh.github.io/ai-projects-persian/log-analyzer/](https://hashemsh.github.io/ai-projects-persian/log-analyzer/)
- آدرس لوکال: `http://localhost:8080/log-analyzer/`
