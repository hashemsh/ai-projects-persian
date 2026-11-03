/**
 * Schema Generator Pro - Dynamic Form Renderer & Data Binder
 */
window.FormRenderer = (function() {
  let currentType = 'Article';

  function renderForm(type, initialData = null) {
    currentType = type;
    const container = document.getElementById('schemaFormContainer');
    if (!container) return;

    let html = '';
    switch (type) {
      case 'Article': html = getArticleForm(); break;
      case 'Product': html = getProductForm(); break;
      case 'FAQPage': html = getFAQForm(); break;
      case 'LocalBusiness': html = getLocalBusinessForm(); break;
      case 'HowTo': html = getHowToForm(); break;
      case 'BreadcrumbList': html = getBreadcrumbsForm(); break;
      case 'Recipe': html = getRecipeForm(); break;
      case 'Event': html = getEventForm(); break;
      case 'VideoObject': html = getVideoForm(); break;
      case 'JobPosting': html = getJobForm(); break;
      case 'Course': html = getCourseForm(); break;
      case 'SoftwareApplication': html = getSoftwareForm(); break;
      case 'Book': html = getBookForm(); break;
      case 'Person': html = getPersonForm(); break;
      case 'Organization': html = getOrgForm(); break;
      case 'SpecialAnnouncement': html = getAnnouncementForm(); break;
      default: html = getArticleForm();
    }

    container.innerHTML = html;

    // Attach dynamic list event listeners
    initRepeatableListeners();

    // Populate initial data if provided
    if (initialData) {
      populateData(initialData);
    }
  }

  function getArticleForm() {
    return `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نوع مقاله (Subtype)</label>
            <select name="subType" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
              <option value="BlogPosting">BlogPosting (پست وبلاگی - عمومی)</option>
              <option value="Article">Article (مقاله استاندارد)</option>
              <option value="NewsArticle">NewsArticle (مقاله خبری روز)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">آدرس رسمی صفحه (URL)</label>
            <input type="url" name="url" placeholder="https://example.com/blog/article-slug" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">تیتر و عنوان اصلی مقاله (Headline) <span class="text-rose-400">*</span></label>
          <input type="text" name="headline" placeholder="۱۰ تکنیک حیاتی سئو فنی در سال ۲۰۲۶..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">چکیده و توضیحات محتوا (Description)</label>
          <textarea name="description" rows="2" placeholder="خلاصه ۲ خطی از مقاله برای جذب کاربر در نتایج جستجو..." class="schema-input w-full px-3 py-2 rounded-xl text-xs"></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">آدرس تصویر شاخص (Image URL)</label>
            <input type="url" name="image" placeholder="https://example.com/cover.jpg" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام نویسنده (Author Name)</label>
            <input type="text" name="authorName" placeholder="نام نویسنده مقاله..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تاریخ انتشار (Date Published)</label>
            <input type="datetime-local" name="datePublished" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تاریخ آخرین بروزرسانی (Date Modified)</label>
            <input type="datetime-local" name="dateModified" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام ناشر / رسانه (Publisher)</label>
            <input type="text" name="publisherName" placeholder="نام سایت یا شرکت..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">لوگوی ناشر (Publisher Logo URL)</label>
            <input type="url" name="publisherLogo" placeholder="https://example.com/logo.png" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>
      </div>
    `;
  }

  function getProductForm() {
    return `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">نام کامل محصول (Product Name) <span class="text-rose-400">*</span></label>
          <input type="text" name="name" placeholder="گوشی موبایل مدل گلکسی اولترا - ظرفیت ۲۵۶ گیگابایت" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">برند (Brand)</label>
            <input type="text" name="brand" placeholder="سامسونگ، اپل، شیائومی..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">کد محصول (SKU / GTIN)</label>
            <input type="text" name="sku" placeholder="SM-S928B-256" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تصویر محصول (Image URL)</label>
            <input type="url" name="image" placeholder="https://example.com/product.jpg" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">توضیحات محصول (Description)</label>
          <textarea name="description" rows="2" placeholder="مشخصات و ویژگی‌های اصلی محصول..." class="schema-input w-full px-3 py-2 rounded-xl text-xs"></textarea>
        </div>

        <!-- Offers Block -->
        <div class="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-3">
          <div class="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <span>🏷️</span><span>قیمت و موجودی کالا (Offers)</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] text-slate-400 mb-1">قیمت به عدد</label>
              <input type="number" name="price" placeholder="64900000" class="schema-input w-full px-3 py-1.5 rounded-xl text-xs font-mono" dir="ltr">
            </div>
            <div>
              <label class="block text-[11px] text-slate-400 mb-1">واحد پول (Currency)</label>
              <select name="priceCurrency" class="schema-input w-full px-3 py-1.5 rounded-xl text-xs font-mono" dir="ltr">
                <option value="IRR">IRR (ریال)</option>
                <option value="IRT">IRT (تومان)</option>
                <option value="USD">USD (دلار)</option>
                <option value="EUR">EUR (یورو)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] text-slate-400 mb-1">وضعیت موجودی</label>
              <select name="availability" class="schema-input w-full px-3 py-1.5 rounded-xl text-xs">
                <option value="https://schema.org/InStock">موجود در انبار (InStock)</option>
                <option value="https://schema.org/OutOfStock">ناموجود (OutOfStock)</option>
                <option value="https://schema.org/PreOrder">پیش‌خرید (PreOrder)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Rating Block -->
        <div class="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-3">
          <div class="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <span>⭐</span><span>امتیاز کاربران (AggregateRating)</span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] text-slate-400 mb-1">میانگین امتیاز (از ۵)</label>
              <input type="number" step="0.1" name="ratingValue" placeholder="4.8" class="schema-input w-full px-3 py-1.5 rounded-xl text-xs font-mono" dir="ltr">
            </div>
            <div>
              <label class="block text-[11px] text-slate-400 mb-1">تعداد آرا و نظرات</label>
              <input type="number" name="reviewCount" placeholder="142" class="schema-input w-full px-3 py-1.5 rounded-xl text-xs font-mono" dir="ltr">
            </div>
            <div>
              <label class="block text-[11px] text-slate-400 mb-1">حداکثر امتیاز</label>
              <input type="number" name="bestRating" value="5" class="schema-input w-full px-3 py-1.5 rounded-xl text-xs font-mono" dir="ltr">
            </div>
            <div>
              <label class="block text-[11px] text-slate-400 mb-1">حداقل امتیاز</label>
              <input type="number" name="worstRating" value="1" class="schema-input w-full px-3 py-1.5 rounded-xl text-xs font-mono" dir="ltr">
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function getFAQForm() {
    return `
      <div class="space-y-4">
        <div class="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span class="text-xs text-slate-300">پرسش‌ها و پاسخ‌های متداول (نمایش کشویی در گوگل):</span>
          <button type="button" id="btnAddFaqItem" class="px-3 py-1 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/30 text-cyan-300 text-xs font-bold transition flex items-center gap-1">
            <span>+</span><span>افزودن پرسش جدید</span>
          </button>
        </div>
        <div id="faqItemsContainer" class="space-y-3">
          <!-- Rendered via JS -->
        </div>
      </div>
    `;
  }

  function getLocalBusinessForm() {
    return `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نوع کسب‌وکار (Type)</label>
            <select name="subType" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
              <option value="LocalBusiness">LocalBusiness (عمومی)</option>
              <option value="Restaurant">Restaurant (رستوران / کافه)</option>
              <option value="Store">Store (فروشگاه حضوری)</option>
              <option value="ProfessionalService">ProfessionalService (خدمات تخصصی / شرکتی)</option>
              <option value="MedicalBusiness">MedicalBusiness (پزشکی و کلینیک)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام کسب‌وکار (Business Name) <span class="text-rose-400">*</span></label>
            <input type="text" name="name" placeholder="کافه و رستوران روف‌گاردن بام تهران" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تلفن تماس (Phone)</label>
            <input type="tel" name="telephone" placeholder="+982188889900" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">محدوده قیمت (Price Range)</label>
            <input type="text" name="priceRange" placeholder="$$ یا ۲۰۰,۰۰۰ الی ۵۰۰,۰۰۰ تومان" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">آدرس وب‌سایت</label>
            <input type="url" name="url" placeholder="https://example.com" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>

        <div class="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-3">
          <div class="text-xs font-bold text-sky-400">📍 نشانی پستی (Postal Address)</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] text-slate-400 mb-1">شهر (City)</label>
              <input type="text" name="city" placeholder="تهران" class="schema-input w-full px-3 py-1.5 rounded-xl text-xs">
            </div>
            <div>
              <label class="block text-[11px] text-slate-400 mb-1">استان / منطقه (State)</label>
              <input type="text" name="state" placeholder="استان تهران" class="schema-input w-full px-3 py-1.5 rounded-xl text-xs">
            </div>
          </div>
          <div>
            <label class="block text-[11px] text-slate-400 mb-1">آدرس خیابان و پلاک</label>
            <input type="text" name="streetAddress" placeholder="خیابان ولیعصر، بالاتر از پارک وی..." class="schema-input w-full px-3 py-1.5 rounded-xl text-xs">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] text-slate-400 mb-1">کد پستی (Postal Code)</label>
              <input type="text" name="postalCode" placeholder="1999912345" class="schema-input w-full px-3 py-1.5 rounded-xl text-xs font-mono" dir="ltr">
            </div>
            <div>
              <label class="block text-[11px] text-slate-400 mb-1">کشور</label>
              <input type="text" name="country" value="IR" class="schema-input w-full px-3 py-1.5 rounded-xl text-xs font-mono" dir="ltr">
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">عرض جغرافیایی (Latitude)</label>
            <input type="number" step="0.0001" name="latitude" placeholder="35.7925" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">طول جغرافیایی (Longitude)</label>
            <input type="number" step="0.0001" name="longitude" placeholder="51.4211" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">ساعت بازگشایی</label>
            <input type="time" name="opens" value="09:00" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">ساعت بسته شدن</label>
            <input type="time" name="closes" value="23:30" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>
      </div>
    `;
  }

  function getHowToForm() {
    return `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">عنوان آموزش (HowTo Name) <span class="text-rose-400">*</span></label>
          <input type="text" name="name" placeholder="چگونه اسکیما JSON-LD را در سایت وردپرسی بدون افزونه نصب کنیم؟" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">توضیح کوتاه</label>
            <input type="text" name="description" placeholder="آموزش گام‌به‌گام تزریق کدهای ساختاریافته..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">کل زمان مورد نیاز (مانند PT15M)</label>
            <input type="text" name="totalTime" placeholder="PT15M" value="PT15M" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>

        <div class="border-t border-white/10 pt-3">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-slate-300">مراحل انجام کار (Steps):</span>
            <button type="button" id="btnAddStepItem" class="px-3 py-1 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/30 text-indigo-300 text-xs font-bold transition flex items-center gap-1">
              <span>+</span><span>افزودن مرحله جدید</span>
            </button>
          </div>
          <div id="stepItemsContainer" class="space-y-3"></div>
        </div>
      </div>
    `;
  }

  function getBreadcrumbsForm() {
    return `
      <div class="space-y-4">
        <div class="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span class="text-xs text-slate-300">سلسله‌مراتب مسیر ناوبری (از ریشه به سمت صفحه جاری):</span>
          <button type="button" id="btnAddCrumbItem" class="px-3 py-1 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-purple-300 text-xs font-bold transition flex items-center gap-1">
            <span>+</span><span>افزودن سطح جدید</span>
          </button>
        </div>
        <div id="crumbItemsContainer" class="space-y-3"></div>
      </div>
    `;
  }

  function getRecipeForm() {
    return `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">نام دستور پخت (Recipe Name) <span class="text-rose-400">*</span></label>
          <input type="text" name="name" placeholder="دستور پخت اصیل قورمه‌سبزی مجلسی..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام سرآشپز</label>
            <input type="text" name="authorName" placeholder="نام آشپز یا سایت..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">دسته‌بندی (Category)</label>
            <input type="text" name="recipeCategory" placeholder="غذای اصلی، دسر، پیش‌غذا..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تعداد وعده (Yield)</label>
            <input type="text" name="recipeYield" placeholder="۴ نفر" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">زمان آماده‌سازی</label>
            <input type="text" name="prepTime" placeholder="PT30M" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">زمان پخت</label>
            <input type="text" name="cookTime" placeholder="PT2H" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">مجموع کل زمان</label>
            <input type="text" name="totalTime" placeholder="PT2H30M" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">عکس غذا (Image URL)</label>
          <input type="url" name="image" placeholder="https://example.com/recipe.jpg" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">مواد لازم (هر مورد در یک سطر)</label>
          <textarea name="ingredients" rows="4" placeholder="گوشت گوسفندی: ۵۰۰ گرم&#10;سبزی قورمه سرخ‌شده: ۷۰۰ گرم&#10;لوبیا چیتی: ۱ پیمانه" class="schema-input w-full px-3 py-2 rounded-xl text-xs"></textarea>
        </div>
      </div>
    `;
  }

  function getEventForm() {
    return `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">نام رویداد (Event Name) <span class="text-rose-400">*</span></label>
          <input type="text" name="name" placeholder="کنفرانس سالانه سئو و هوش مصنوعی ۲۰۲۶" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تاریخ و ساعت شروع <span class="text-rose-400">*</span></label>
            <input type="datetime-local" name="startDate" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تاریخ و ساعت پایان</label>
            <input type="datetime-local" name="endDate" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نوع برگزاری (Attendance Mode)</label>
            <select name="attendanceMode" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
              <option value="https://schema.org/OfflineEventAttendanceMode">حضوری (Offline)</option>
              <option value="https://schema.org/OnlineEventAttendanceMode">آنلاین و وبینار (Online)</option>
              <option value="https://schema.org/MixedEventAttendanceMode">ترکیبی (حضوری + آنلاین)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام محل یا سالن برگزاری</label>
            <input type="text" name="locationName" placeholder="مرکز همایش‌های برج میلاد" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">قیمت بلیت (ریال / تومان)</label>
            <input type="number" name="ticketPrice" placeholder="1500000" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام سازمان یا برگزارکننده</label>
            <input type="text" name="organizerName" placeholder="آکادمی سئو پرو" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
        </div>
      </div>
    `;
  }

  function getVideoForm() {
    return `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">عنوان ویدیو (Video Title) <span class="text-rose-400">*</span></label>
          <input type="text" name="name" placeholder="آموزش ویدیویی گام‌به‌گام پیاده‌سازی اسکیما..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">توضیحات ویدیو</label>
          <textarea name="description" rows="2" placeholder="مباحث مطرح‌شده در ویدیو..." class="schema-input w-full px-3 py-2 rounded-xl text-xs"></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تصویر بندانگشتی (Thumbnail URL) <span class="text-rose-400">*</span></label>
            <input type="url" name="thumbnailUrl" placeholder="https://example.com/thumb.jpg" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">مدت زمان (مانند PT18M45S)</label>
            <input type="text" name="duration" placeholder="PT18M45S" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">آدرس فایل ویدیو یا صفحه (Content URL)</label>
            <input type="url" name="contentUrl" placeholder="https://example.com/video.mp4" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">کد یا لینک Embed</label>
            <input type="url" name="embedUrl" placeholder="https://example.com/embed/123" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>
      </div>
    `;
  }

  function getJobForm() {
    return `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">عنوان فرصت شغلی (Job Title) <span class="text-rose-400">*</span></label>
          <input type="text" name="title" placeholder="متخصص ارشد سئو فنی (Senior Technical SEO)" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام شرکت / سازمان</label>
            <input type="text" name="hiringOrg" placeholder="شرکت فناوری..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">شهر محل خدمت</label>
            <input type="text" name="city" placeholder="تهران" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نوع همکاری</label>
            <select name="employmentType" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
              <option value="FULL_TIME">تمام وقت (Full-Time)</option>
              <option value="PART_TIME">پاره وقت (Part-Time)</option>
              <option value="REMOTE">دورکاری / ریموت (Remote)</option>
              <option value="CONTRACT">پروژه‌ای / قراردادی (Contract)</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تاریخ انتشار آگهی</label>
            <input type="date" name="datePosted" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">مهلت ارسال رزومه</label>
            <input type="date" name="validThrough" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>
      </div>
    `;
  }

  function getCourseForm() {
    return `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">عنوان دوره آموزشی (Course Name) <span class="text-rose-400">*</span></label>
          <input type="text" name="name" placeholder="دوره جامع مهندسی داده‌های ساختاریافته و سئو" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">توضیحات و سرفصل‌های دوره</label>
          <textarea name="description" rows="2" placeholder="آموزش عمیق استانداردهای Schema.org..." class="schema-input w-full px-3 py-2 rounded-xl text-xs"></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام مدرس (Instructor)</label>
            <input type="text" name="instructorName" placeholder="نام استاد یا مدرس دوره..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">شیوه برگزاری</label>
            <select name="courseMode" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
              <option value="Online">آنلاین (Online)</option>
              <option value="InPerson">حضوری (In-Person)</option>
              <option value="Blended">ترکیبی (Blended)</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام آکادمی / ارائه‌دهنده (Provider)</label>
            <input type="text" name="providerName" placeholder="آکادمی هوش مصنوعی..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">شهریه یا قیمت دوره (ریال)</label>
            <input type="number" name="price" placeholder="3500000" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>
      </div>
    `;
  }

  function getSoftwareForm() {
    return `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نوع نرم‌افزار</label>
            <select name="subType" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
              <option value="WebApplication">تحت وب (WebApplication)</option>
              <option value="MobileApplication">موبایل (MobileApplication)</option>
              <option value="SoftwareApplication">دسکتاپ / عمومی (SoftwareApplication)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام نرم‌افزار (Software Name) <span class="text-rose-400">*</span></label>
            <input type="text" name="name" placeholder="Schema Generator Pro" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">سیستم عامل‌های سازگار</label>
            <input type="text" name="operatingSystem" placeholder="تمام مرورگرها، Windows, Android, iOS..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">دسته‌بندی (Application Category)</label>
            <input type="text" name="applicationCategory" placeholder="DeveloperApplication, UtilitiesApplication..." class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">توضیح کوتاه نرم‌افزار</label>
          <textarea name="description" rows="2" placeholder="توضیحات و قابلیت‌های نرم‌افزار..." class="schema-input w-full px-3 py-2 rounded-xl text-xs"></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">امتیاز (از ۵)</label>
            <input type="number" step="0.1" name="ratingValue" placeholder="4.9" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تعداد آرا</label>
            <input type="number" name="reviewCount" placeholder="218" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">قیمت (صفر یعنی رایگان)</label>
            <input type="number" name="price" placeholder="0" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>
      </div>
    `;
  }

  function getBookForm() {
    return `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">عنوان کتاب (Book Title) <span class="text-rose-400">*</span></label>
          <input type="text" name="name" placeholder="اصول معماری وب و بهینه‌سازی موتورهای جستجو..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام نویسنده (Author)</label>
            <input type="text" name="authorName" placeholder="نام پدیدآورنده..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">شابک (ISBN)</label>
            <input type="text" name="isbn" placeholder="978-600-1234-56-7" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تعداد صفحات</label>
            <input type="number" name="pages" placeholder="380" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">زبان اثر</label>
            <input type="text" name="inLanguage" value="fa" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام ناشر</label>
            <input type="text" name="publisherName" placeholder="انتشارات..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
        </div>
      </div>
    `;
  }

  function getPersonForm() {
    return `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام و نام خانوادگی (Full Name) <span class="text-rose-400">*</span></label>
            <input type="text" name="name" placeholder="هاشم شیخی پور" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">عنوان شغلی و تخصص (Job Title)</label>
            <input type="text" name="jobTitle" placeholder="Senior Web Architect" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">آدرس وب‌سایت شخصی (URL)</label>
            <input type="url" name="url" placeholder="https://example.com" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">شرکت یا سازمان متبوع (Works For)</label>
            <input type="text" name="companyName" placeholder="نام شرکت یا کسب‌وکار..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">پروفایل‌های رسمی و سوشال (هر مورد در یک سطر)</label>
          <textarea name="sameAs" rows="3" placeholder="https://github.com/username&#10;https://linkedin.com/in/username&#10;https://twitter.com/username" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr"></textarea>
        </div>
      </div>
    `;
  }

  function getOrgForm() {
    return `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">نام سازمان / برند (Org Name) <span class="text-rose-400">*</span></label>
            <input type="text" name="name" placeholder="هاب پروژه‌های هوش مصنوعی فارسی" class="schema-input w-full px-3 py-2 rounded-xl text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">آدرس رسمی وب‌سایت (URL)</label>
            <input type="url" name="url" placeholder="https://example.com" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">آدرس لوگوی باکیفیت (Logo URL)</label>
          <input type="url" name="logo" placeholder="https://example.com/logo.svg" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">توضیح ماموریت و فعالیت شرکت</label>
          <textarea name="description" rows="2" placeholder="توضیحات سازمان..." class="schema-input w-full px-3 py-2 rounded-xl text-xs"></textarea>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">شبکه‌های اجتماعی و لینک‌های رسمی (sameAs)</label>
          <textarea name="sameAs" rows="3" placeholder="https://github.com/org&#10;https://linkedin.com/company/org" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr"></textarea>
        </div>
      </div>
    `;
  }

  function getAnnouncementForm() {
    return `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">عنوان اطلاعیه مهم (Announcement Name) <span class="text-rose-400">*</span></label>
          <input type="text" name="name" placeholder="انتشار نسخه جدید..." class="schema-input w-full px-3 py-2 rounded-xl text-xs">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">متن کامل اطلاعیه</label>
          <textarea name="text" rows="3" placeholder="متن کامل اطلاعیه عمومی..." class="schema-input w-full px-3 py-2 rounded-xl text-xs"></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تاریخ انتشار اطلاعیه</label>
            <input type="date" name="datePosted" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">تاریخ انقضا</label>
            <input type="date" name="expires" class="schema-input w-full px-3 py-2 rounded-xl text-xs font-mono" dir="ltr">
          </div>
        </div>
      </div>
    `;
  }

  function addFaqItem(q = '', a = '') {
    const container = document.getElementById('faqItemsContainer');
    if (!container) return;
    const count = container.children.length + 1;
    const div = document.createElement('div');
    div.className = 'faq-item-row p-3 rounded-xl bg-dark-900/80 border border-white/5 space-y-2';
    div.innerHTML = `
      <div class="flex items-center justify-between text-[11px] text-slate-400">
        <span class="font-bold text-cyan-300">پرسش شماره ${count}</span>
        <button type="button" class="btn-remove-faq text-rose-400 hover:text-rose-300 px-2 py-0.5 rounded text-xs">&times; حذف</button>
      </div>
      <input type="text" placeholder="متن پرسش..." value="${q}" class="faq-q-input schema-input w-full px-3 py-1.5 rounded-xl text-xs">
      <textarea rows="2" placeholder="متن پاسخ رسمی..." class="faq-a-input schema-input w-full px-3 py-1.5 rounded-xl text-xs">${a}</textarea>
    `;
    div.querySelector('.btn-remove-faq').addEventListener('click', () => {
      div.remove();
      window.App && window.App.triggerUpdate();
    });
    container.appendChild(div);
  }

  function addStepItem(name = '', text = '', img = '') {
    const container = document.getElementById('stepItemsContainer');
    if (!container) return;
    const count = container.children.length + 1;
    const div = document.createElement('div');
    div.className = 'step-item-row p-3 rounded-xl bg-dark-900/80 border border-white/5 space-y-2';
    div.innerHTML = `
      <div class="flex items-center justify-between text-[11px] text-slate-400">
        <span class="font-bold text-indigo-300">مرحله شماره ${count}</span>
        <button type="button" class="btn-remove-step text-rose-400 hover:text-rose-300 px-2 py-0.5 rounded text-xs">&times; حذف</button>
      </div>
      <input type="text" placeholder="عنوان گام..." value="${name}" class="step-name-input schema-input w-full px-3 py-1.5 rounded-xl text-xs">
      <textarea rows="2" placeholder="توضیحات انجام این مرحله..." class="step-text-input schema-input w-full px-3 py-1.5 rounded-xl text-xs">${text}</textarea>
    `;
    div.querySelector('.btn-remove-step').addEventListener('click', () => {
      div.remove();
      window.App && window.App.triggerUpdate();
    });
    container.appendChild(div);
  }

  function addCrumbItem(name = '', url = '') {
    const container = document.getElementById('crumbItemsContainer');
    if (!container) return;
    const count = container.children.length + 1;
    const div = document.createElement('div');
    div.className = 'crumb-item-row p-3 rounded-xl bg-dark-900/80 border border-white/5 flex items-center gap-2 flex-wrap sm:flex-nowrap';
    div.innerHTML = `
      <span class="text-xs font-bold text-purple-300 shrink-0">سطح ${count}:</span>
      <input type="text" placeholder="نام عنوان (مثل صفحه اصلی)" value="${name}" class="crumb-name-input schema-input flex-1 px-3 py-1.5 rounded-xl text-xs min-w-[120px]">
      <input type="url" placeholder="https://example.com" value="${url}" class="crumb-url-input schema-input flex-1 px-3 py-1.5 rounded-xl text-xs font-mono min-w-[150px]" dir="ltr">
      <button type="button" class="btn-remove-crumb text-rose-400 hover:text-rose-300 px-2 py-1 rounded text-xs">&times;</button>
    `;
    div.querySelector('.btn-remove-crumb').addEventListener('click', () => {
      div.remove();
      window.App && window.App.triggerUpdate();
    });
    container.appendChild(div);
  }

  function initRepeatableListeners() {
    const btnAddFaq = document.getElementById('btnAddFaqItem');
    if (btnAddFaq) {
      btnAddFaq.addEventListener('click', () => {
        addFaqItem();
        window.App && window.App.triggerUpdate();
      });
    }

    const btnAddStep = document.getElementById('btnAddStepItem');
    if (btnAddStep) {
      btnAddStep.addEventListener('click', () => {
        addStepItem();
        window.App && window.App.triggerUpdate();
      });
    }

    const btnAddCrumb = document.getElementById('btnAddCrumbItem');
    if (btnAddCrumb) {
      btnAddCrumb.addEventListener('click', () => {
        addCrumbItem();
        window.App && window.App.triggerUpdate();
      });
    }
  }

  function getFormData() {
    const container = document.getElementById('schemaFormContainer');
    if (!container) return {};

    const data = {};
    const inputs = container.querySelectorAll('input, select, textarea');
    inputs.forEach(inp => {
      if (!inp.name) return;
      data[inp.name] = inp.value;
    });

    // Handle Repeatables
    if (currentType === 'FAQPage') {
      const rows = container.querySelectorAll('.faq-item-row');
      data.items = [];
      rows.forEach(r => {
        const q = r.querySelector('.faq-q-input')?.value || '';
        const a = r.querySelector('.faq-a-input')?.value || '';
        if (q || a) data.items.push({ question: q, answer: a });
      });
    } else if (currentType === 'HowTo') {
      const rows = container.querySelectorAll('.step-item-row');
      data.steps = [];
      rows.forEach(r => {
        const name = r.querySelector('.step-name-input')?.value || '';
        const text = r.querySelector('.step-text-input')?.value || '';
        if (name || text) data.steps.push({ name, text });
      });
    } else if (currentType === 'BreadcrumbList') {
      const rows = container.querySelectorAll('.crumb-item-row');
      data.crumbs = [];
      rows.forEach(r => {
        const name = r.querySelector('.crumb-name-input')?.value || '';
        const url = r.querySelector('.crumb-url-input')?.value || '';
        if (name || url) data.crumbs.push({ name, url });
      });
    }

    return data;
  }

  function populateData(dataObj) {
    if (!dataObj) return;
    const container = document.getElementById('schemaFormContainer');
    if (!container) return;

    // Standard fields
    Object.keys(dataObj).forEach(key => {
      const inp = container.querySelector(`[name="${key}"]`);
      if (inp) {
        inp.value = dataObj[key];
      }
    });

    // Nested Article author/publisher
    if (dataObj.author && dataObj.author.name) {
      const a = container.querySelector('[name="authorName"]');
      if (a) a.value = dataObj.author.name;
    }
    if (dataObj.publisher && dataObj.publisher.name) {
      const p = container.querySelector('[name="publisherName"]');
      if (p) p.value = dataObj.publisher.name;
      if (dataObj.publisher.logo && dataObj.publisher.logo.url) {
        const pl = container.querySelector('[name="publisherLogo"]');
        if (pl) pl.value = dataObj.publisher.logo.url;
      }
    }

    // Product offers & rating
    if (dataObj.offers) {
      const o = dataObj.offers;
      const p = container.querySelector('[name="price"]');
      if (p && o.price) p.value = o.price;
      const cur = container.querySelector('[name="priceCurrency"]');
      if (cur && o.priceCurrency) cur.value = o.priceCurrency;
      const av = container.querySelector('[name="availability"]');
      if (av && o.availability) av.value = o.availability;
    }
    if (dataObj.brand && dataObj.brand.name) {
      const b = container.querySelector('[name="brand"]');
      if (b) b.value = dataObj.brand.name;
    }
    if (dataObj.aggregateRating) {
      const r = dataObj.aggregateRating;
      const rv = container.querySelector('[name="ratingValue"]');
      if (rv && r.ratingValue) rv.value = r.ratingValue;
      const rc = container.querySelector('[name="reviewCount"]');
      if (rc && r.reviewCount) rc.value = r.reviewCount;
    }

    // LocalBusiness Address
    if (dataObj.address) {
      const ad = dataObj.address;
      const c = container.querySelector('[name="city"]');
      if (c && ad.addressLocality) c.value = ad.addressLocality;
      const s = container.querySelector('[name="state"]');
      if (s && ad.addressRegion) s.value = ad.addressRegion;
      const st = container.querySelector('[name="streetAddress"]');
      if (st && ad.streetAddress) st.value = ad.streetAddress;
      const pc = container.querySelector('[name="postalCode"]');
      if (pc && ad.postalCode) pc.value = ad.postalCode;
    }
    if (dataObj.geo) {
      const lat = container.querySelector('[name="latitude"]');
      if (lat && dataObj.geo.latitude) lat.value = dataObj.geo.latitude;
      const lng = container.querySelector('[name="longitude"]');
      if (lng && dataObj.geo.longitude) lng.value = dataObj.geo.longitude;
    }

    // Repeatable FAQs
    if (Array.isArray(dataObj.mainEntity) && currentType === 'FAQPage') {
      const c = document.getElementById('faqItemsContainer');
      if (c) c.innerHTML = '';
      dataObj.mainEntity.forEach(item => {
        addFaqItem(item.name || '', (item.acceptedAnswer && item.acceptedAnswer.text) || '');
      });
    }

    // Repeatable HowTo Steps
    if (Array.isArray(dataObj.step) && currentType === 'HowTo') {
      const c = document.getElementById('stepItemsContainer');
      if (c) c.innerHTML = '';
      dataObj.step.forEach(s => {
        addStepItem(s.name || '', s.text || '');
      });
    }

    // Repeatable Breadcrumbs
    if (Array.isArray(dataObj.itemListElement) && currentType === 'BreadcrumbList') {
      const c = document.getElementById('crumbItemsContainer');
      if (c) c.innerHTML = '';
      dataObj.itemListElement.forEach(b => {
        addCrumbItem(b.name || '', b.item || '');
      });
    }

    // Recipe Ingredients
    if (Array.isArray(dataObj.recipeIngredient) && currentType === 'Recipe') {
      const ing = container.querySelector('[name="ingredients"]');
      if (ing) ing.value = dataObj.recipeIngredient.join('\n');
    }

    // Course
    if (dataObj.provider && dataObj.provider.name) {
      const prov = container.querySelector('[name="providerName"]');
      if (prov) prov.value = dataObj.provider.name;
    }
    if (dataObj.hasCourseInstance && dataObj.hasCourseInstance.instructor) {
      const inst = container.querySelector('[name="instructorName"]');
      if (inst) inst.value = dataObj.hasCourseInstance.instructor.name;
    }

    // Book
    if (dataObj.numberOfPages) {
      const pg = container.querySelector('[name="pages"]');
      if (pg) pg.value = dataObj.numberOfPages;
    }

    // Person & Organization sameAs array
    if (Array.isArray(dataObj.sameAs)) {
      const sa = container.querySelector('[name="sameAs"]');
      if (sa) sa.value = dataObj.sameAs.join('\n');
    }
    if (dataObj.worksFor && dataObj.worksFor.name) {
      const wf = container.querySelector('[name="companyName"]');
      if (wf) wf.value = dataObj.worksFor.name;
    }
  }

  return {
    renderForm,
    getFormData,
    populateData,
    addFaqItem,
    addStepItem,
    addCrumbItem
  };
})();
