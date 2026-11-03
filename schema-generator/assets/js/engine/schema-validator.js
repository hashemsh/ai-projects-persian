/**
 * Schema Generator Pro - Advanced Schema.org & Google Rich Results Validator
 */
window.SchemaValidator = (function() {
  function validateJsonSyntax(rawString) {
    if (!rawString || !rawString.trim()) {
      return {
        isValid: false,
        error: 'کد ورودی خالی است. لطفاً قطعه کد JSON-LD یا تگ اسکریپت را وارد کنید.',
        parsed: null
      };
    }

    // Strip <script type="application/ld+json"> wrappers if pasted
    let clean = rawString.trim();
    if (clean.includes('<script')) {
      clean = clean.replace(/<script[^>]*>/gi, '').replace(/<\/script>/gi, '').trim();
    }

    try {
      const parsed = JSON.parse(clean);
      return {
        isValid: true,
        error: null,
        parsed: parsed
      };
    } catch (e) {
      // Find approximate line number and column
      const match = e.message.match(/at position (\d+)/);
      let lineInfo = '';
      if (match && match[1]) {
        const pos = parseInt(match[1], 10);
        const lines = clean.substring(0, pos).split('\n');
        lineInfo = ` (سطر ${lines.length}، ستون ${lines[lines.length - 1].length + 1})`;
      }
      return {
        isValid: false,
        error: `خطای نحوی در ساختار JSON: ${e.message}${lineInfo}`,
        parsed: null
      };
    }
  }

  function auditSchema(schemaObj) {
    const issues = [];
    let score = 100;

    if (!schemaObj || typeof schemaObj !== 'object') {
      return {
        score: 0,
        type: 'نامشخص',
        issues: [{ severity: 'error', text: 'ساختار اسکیما باید یک آبجکت معتبر JSON باشد.' }]
      };
    }

    // Support @graph or root object
    const target = Array.isArray(schemaObj['@graph']) ? schemaObj['@graph'][0] : schemaObj;
    if (!target) {
      return {
        score: 0,
        type: 'خالی',
        issues: [{ severity: 'error', text: 'هیچ موجودیت اسکیما در آرایه @graph یافت نشد.' }]
      };
    }

    // Check @context
    const context = target['@context'] || schemaObj['@context'];
    if (!context || !context.includes('schema.org')) {
      issues.push({
        severity: 'error',
        field: '@context',
        text: 'مقدار @context یافت نشد یا معتبر نیست. مقدار باید "https://schema.org" باشد.'
      });
      score -= 25;
    }

    // Check @type
    const type = target['@type'];
    if (!type) {
      issues.push({
        severity: 'error',
        field: '@type',
        text: 'فیلد ضروری @type تعریف نشده است. نوع داده (مثل Article، Product، FAQPage) مشخص نیست.'
      });
      score -= 30;
      return { score: Math.max(0, score), type: 'نامشخص', issues };
    }

    // Type-specific Google Rich Results Guidelines check
    switch (type) {
      case 'Article':
      case 'BlogPosting':
      case 'NewsArticle':
        if (!target.headline) {
          issues.push({ severity: 'error', field: 'headline', text: 'تیتر مقاله (headline) برای نمایش در Google News و Rich Results الزامی است.' });
          score -= 25;
        }
        if (!target.image) {
          issues.push({ severity: 'warning', field: 'image', text: 'تصویر شاخص (image) وجود ندارد؛ مقالات دارای عکس شانس بسیار بیشتری در نتایج تصویری دارند.' });
          score -= 10;
        }
        if (!target.datePublished) {
          issues.push({ severity: 'warning', field: 'datePublished', text: 'تاریخ انتشار (datePublished) توصیه می‌شود در فرمت ISO 8601 درج گردد.' });
          score -= 10;
        }
        if (!target.author) {
          issues.push({ severity: 'warning', field: 'author', text: 'مشخصات نویسنده (author) ثبت نشده است (E-E-A-T گوگل).' });
          score -= 10;
        }
        break;

      case 'Product':
        if (!target.name) {
          issues.push({ severity: 'error', field: 'name', text: 'نام محصول (name) در گوگل الزامی است.' });
          score -= 30;
        }
        if (!target.offers && !target.aggregateRating) {
          issues.push({ severity: 'error', field: 'offers / aggregateRating', text: 'گوگل برای نمایش ریچ اسنیپت محصول، حداقل ثبت یکی از دو فیلد قیمت (offers) یا امتیاز (aggregateRating) را اجباری می‌داند.' });
          score -= 30;
        }
        if (target.offers && !target.offers.price) {
          issues.push({ severity: 'error', field: 'offers.price', text: 'قیمت محصول (price) در آبجکت offers خالی است.' });
          score -= 15;
        }
        if (target.offers && !target.offers.priceCurrency) {
          issues.push({ severity: 'warning', field: 'offers.priceCurrency', text: 'واحد پول (priceCurrency) مانند IRR، IRT یا USD مشخص نشده است.' });
          score -= 10;
        }
        if (!target.image) {
          issues.push({ severity: 'warning', field: 'image', text: 'تصویر محصول برای نمایش کارت تصویری در سرچ گوگل توصیه می‌شود.' });
          score -= 10;
        }
        break;

      case 'FAQPage':
        if (!Array.isArray(target.mainEntity) || target.mainEntity.length === 0) {
          issues.push({ severity: 'error', field: 'mainEntity', text: 'لیست پرسش‌ها و پاسخ‌ها (mainEntity) باید حداقل دارای یک آیتم باشد.' });
          score -= 40;
        } else {
          target.mainEntity.forEach((item, idx) => {
            if (!item.name) {
              issues.push({ severity: 'error', field: `mainEntity[${idx}].name`, text: `عنوان پرسش شماره ${idx + 1} خالی است.` });
              score -= 15;
            }
            if (!item.acceptedAnswer || !item.acceptedAnswer.text) {
              issues.push({ severity: 'error', field: `mainEntity[${idx}].acceptedAnswer`, text: `پاسخ پرسش شماره ${idx + 1} خالی است.` });
              score -= 15;
            }
          });
        }
        break;

      case 'LocalBusiness':
      case 'Store':
      case 'Restaurant':
      case 'ProfessionalService':
      case 'MedicalBusiness':
        if (!target.name) {
          issues.push({ severity: 'error', field: 'name', text: 'نام کسب‌وکار (name) الزامی است.' });
          score -= 25;
        }
        if (!target.address) {
          issues.push({ severity: 'error', field: 'address', text: 'آدرس فیزیکی (address) برای کسب‌وکارهای محلی الزامی است.' });
          score -= 25;
        } else if (!target.address.streetAddress && !target.address.addressLocality) {
          issues.push({ severity: 'warning', field: 'address', text: 'خیابان یا شهر محل کسب‌وکار تکمیل نشده است.' });
          score -= 10;
        }
        if (!target.telephone) {
          issues.push({ severity: 'warning', field: 'telephone', text: 'شماره تلفن تماس ثبت نشده است.' });
          score -= 10;
        }
        break;

      case 'HowTo':
        if (!target.name) {
          issues.push({ severity: 'error', field: 'name', text: 'عنوان راهنما (name) الزامی است.' });
          score -= 30;
        }
        if (!Array.isArray(target.step) || target.step.length === 0) {
          issues.push({ severity: 'error', field: 'step', text: 'حداقل یک گام یا مرحله (step) باید تعریف شود.' });
          score -= 30;
        }
        break;

      case 'BreadcrumbList':
        if (!Array.isArray(target.itemListElement) || target.itemListElement.length === 0) {
          issues.push({ severity: 'error', field: 'itemListElement', text: 'لیست مسیرهای راهنما (itemListElement) باید حداقل یک آیتم داشته باشد.' });
          score -= 30;
        }
        break;

      case 'Recipe':
        if (!target.name) {
          issues.push({ severity: 'error', field: 'name', text: 'نام غذا یا دستور پخت الزامی است.' });
          score -= 30;
        }
        if (!target.image) {
          issues.push({ severity: 'warning', field: 'image', text: 'تصویر غذا برای کارت دستور پخت گوگل توصیه می‌شود.' });
          score -= 15;
        }
        if (!target.recipeIngredient || target.recipeIngredient.length === 0) {
          issues.push({ severity: 'warning', field: 'recipeIngredient', text: 'لیست مواد لازم (recipeIngredient) خالی است.' });
          score -= 15;
        }
        break;

      case 'Event':
        if (!target.name) {
          issues.push({ severity: 'error', field: 'name', text: 'نام رویداد الزامی است.' });
          score -= 30;
        }
        if (!target.startDate) {
          issues.push({ severity: 'error', field: 'startDate', text: 'تاریخ و زمان شروع رویداد الزامی است.' });
          score -= 25;
        }
        if (!target.location) {
          issues.push({ severity: 'warning', field: 'location', text: 'محل برگزاری یا لینک وبینار آنلاین ثبت نشده است.' });
          score -= 15;
        }
        break;

      case 'Course':
        if (!target.name) {
          issues.push({ severity: 'error', field: 'name', text: 'عنوان دوره آموزشی الزامی است.' });
          score -= 30;
        }
        if (!target.description) {
          issues.push({ severity: 'warning', field: 'description', text: 'توضیحات سرفصل‌های دوره برای نمایش در بخش آموزش گوگل توصیه می‌شود.' });
          score -= 15;
        }
        break;

      case 'SoftwareApplication':
      case 'WebApplication':
      case 'MobileApplication':
        if (!target.name) {
          issues.push({ severity: 'error', field: 'name', text: 'نام نرم‌افزار / اپلیکیشن الزامی است.' });
          score -= 30;
        }
        if (!target.operatingSystem) {
          issues.push({ severity: 'warning', field: 'operatingSystem', text: 'سیستم‌عامل‌های سازگار مشخص نشده است.' });
          score -= 15;
        }
        break;

      case 'Book':
        if (!target.name) {
          issues.push({ severity: 'error', field: 'name', text: 'عنوان کتاب الزامی است.' });
          score -= 30;
        }
        if (!target.author) {
          issues.push({ severity: 'warning', field: 'author', text: 'نام پدیدآورنده یا نویسنده کتاب درج نشده است.' });
          score -= 15;
        }
        break;

      case 'Person':
        if (!target.name) {
          issues.push({ severity: 'error', field: 'name', text: 'نام و هویت شخص الزامی است.' });
          score -= 35;
        }
        if (!target.sameAs || target.sameAs.length === 0) {
          issues.push({ severity: 'warning', field: 'sameAs', text: 'لینک به پروفایل‌های رسمی سوشال (sameAs) جهت تقویت E-E-A-T گوگل توصیه می‌شود.' });
          score -= 15;
        }
        break;

      case 'Organization':
      case 'Corporation':
        if (!target.name) {
          issues.push({ severity: 'error', field: 'name', text: 'نام رسمی سازمان یا شرکت الزامی است.' });
          score -= 35;
        }
        if (!target.logo) {
          issues.push({ severity: 'warning', field: 'logo', text: 'لوگوی سازمان جهت ثبت در گراف دانش گوگل پیشنهاد می‌شود.' });
          score -= 15;
        }
        break;

      case 'SpecialAnnouncement':
        if (!target.name) {
          issues.push({ severity: 'error', field: 'name', text: 'عنوان اطلاعیه الزامی است.' });
          score -= 30;
        }
        if (!target.text) {
          issues.push({ severity: 'error', field: 'text', text: 'متن اطلاعیه الزامی است.' });
          score -= 30;
        }
        break;

      default:
        // Generic checks
        break;
    }

    if (issues.length === 0) {
      issues.push({
        severity: 'success',
        text: 'عالی! تمام فیلدهای استاندارد و توصیه‌شده گوگل برای این اسکیما بدون نقص تکمیل شده‌اند.'
      });
    }

    return {
      score: Math.max(0, score),
      type: type,
      issues: issues
    };
  }

  return {
    validateJsonSyntax,
    auditSchema
  };
})();
