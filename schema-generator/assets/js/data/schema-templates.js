/**
 * Schema Generator Pro - Schema Definitions, Types, and Preloaded Samples
 */
window.SchemaData = window.SchemaData || {};

window.SchemaData.types = [
  {
    id: 'Article',
    name: 'مقاله و وبلاگ (Article / BlogPosting)',
    icon: '📰',
    category: 'محتوا',
    description: 'افزایش شانس نمایش در بخش اخبار گوگل، مقالات پیشنهادی و اسنیپت ویژه با نویسنده و تاریخ انتشار.',
    subtypes: ['Article', 'BlogPosting', 'NewsArticle']
  },
  {
    id: 'Product',
    name: 'محصول فروشگاهی (Product)',
    icon: '🛍️',
    category: 'فروشگاهی',
    description: 'نمایش ستاره‌های امتیازدهی، قیمت به تومان/ریال، وضعیت موجودی انبار و برند در نتایج جستجو.',
    subtypes: ['Product']
  },
  {
    id: 'FAQPage',
    name: 'سوالات متداول (FAQPage)',
    icon: '❓',
    category: 'سئو فنی',
    description: 'نمایش آکاردئونی پرسش‌ها و پاسخ‌ها به صورت کشویی دقیقاً زیر لینک سایت شما در صفحه اول گوگل.',
    subtypes: ['FAQPage']
  },
  {
    id: 'LocalBusiness',
    name: 'کسب‌وکار محلی (LocalBusiness)',
    icon: '🏢',
    category: 'محلی',
    description: 'نمایش آدرس، ساعات کاری، شماره تماس، نقشه و محدوده قیمت جهت بهبود رتبه در سئوی محلی (Local SEO).',
    subtypes: ['LocalBusiness', 'Store', 'Restaurant', 'ProfessionalService', 'MedicalBusiness']
  },
  {
    id: 'HowTo',
    name: 'راهنمای مرحله‌به‌مرحله (HowTo)',
    icon: '🛠️',
    category: 'آموزش',
    description: 'نمایش گام‌های آموزش و مراحل انجام کار همراه با زمان مورد نیاز و ابزارها در نتایج گوگل.',
    subtypes: ['HowTo']
  },
  {
    id: 'BreadcrumbList',
    name: 'مسیر راهنما (Breadcrumbs)',
    icon: '🧭',
    category: 'ناوبری',
    description: 'نمایش شفاف معماری و سلسله‌مراتب دسته‌بندی‌های سایت در بالای عنوان نتیجه در گوگل.',
    subtypes: ['BreadcrumbList']
  },
  {
    id: 'Recipe',
    name: 'دستور پخت و آشپزی (Recipe)',
    icon: '🍳',
    category: 'سبک زندگی',
    description: 'نمایش زمان پخت، مواد لازم، عکس غذا، میزان کالری و امتیاز کاربران برای سایت‌های آشپزی.',
    subtypes: ['Recipe']
  },
  {
    id: 'Event',
    name: 'رویداد و وبینار (Event)',
    icon: '📅',
    category: 'رویدادها',
    description: 'نمایش تاریخ برگزاری، بلیت‌ها، مکان یا لینک آنلاین وبینار به شکل کارت ویژه رویدادهای گوگل.',
    subtypes: ['Event']
  },
  {
    id: 'VideoObject',
    name: 'ویدیو (VideoObject)',
    icon: '🎥',
    category: 'چندرسانه‌ای',
    description: 'ثبت متادیتا، تصویر بندانگشتی، مدت زمان و آدرس ویدیو جهت ایندکس در تب ویدیوهای گوگل.',
    subtypes: ['VideoObject']
  },
  {
    id: 'JobPosting',
    name: 'فرصت شغلی (JobPosting)',
    icon: '💼',
    category: 'استخدام',
    description: 'نمایش آگهی‌های استخدامی در سامانه اختصاصی Google for Jobs با حقوق، شهر و نوع همکاری.',
    subtypes: ['JobPosting']
  },
  {
    id: 'Course',
    name: 'دوره آموزشی (Course)',
    icon: '🎓',
    category: 'آموزش',
    description: 'نمایش سرفصل‌ها، مدرس، نام موسسه و مدرک دوره‌های آنلاین در نتایج غنی بخش آموزش گوگل.',
    subtypes: ['Course']
  },
  {
    id: 'SoftwareApplication',
    name: 'اپلیکیشن و نرم‌افزار (Software)',
    icon: '💻',
    category: 'نرم‌افزار',
    description: 'نمایش امتیاز اپلیکیشن، سیستم‌عامل سازگار و قیمت در نتایج جستجوی نرم‌افزاری گوگل.',
    subtypes: ['SoftwareApplication', 'WebApplication', 'MobileApplication']
  },
  {
    id: 'Book',
    name: 'کتاب و انتشارات (Book)',
    icon: '📚',
    category: 'کتاب',
    description: 'ثبت شابک (ISBN)، نویسنده، فرمت انتشار و ناشر برای سایت‌های نشر و کتابفروشی.',
    subtypes: ['Book']
  },
  {
    id: 'Person',
    name: 'پروفایل شخص و نویسنده (Person)',
    icon: '👤',
    category: 'هویت',
    description: 'تثبیت هویت فردی متخصصان، مولفان و پزشکان جهت تقویت سیگنال‌های E-E-A-T گوگل.',
    subtypes: ['Person']
  },
  {
    id: 'Organization',
    name: 'سازمان و برند تجاری (Organization)',
    icon: '🏢',
    category: 'برند',
    description: 'ثبت هویت رسمی شرکت، لوگوی معتبر، شماره‌های تماس و شبکه‌های اجتماعی در گراف دانش گوگل.',
    subtypes: ['Organization', 'Corporation']
  },
  {
    id: 'SpecialAnnouncement',
    name: 'اطلاعیه و خبر ویژه (Announcement)',
    icon: '📢',
    category: 'اطلاع‌رسانی',
    description: 'نمایش اطلاعیه‌های مهم سازمانی، هشدارهای عمومی و تغییرات ساعات کاری در نتایج فوری گوگل.',
    subtypes: ['SpecialAnnouncement']
  }
];

window.SchemaData.samples = {
  Article: {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': '۱۰ تکنیک حیاتی سئو فنی در سال ۲۰۲۶ برای رشد نجومی ترافیک ارگانیک',
    'description': 'راهنمای جامع بهینه‌سازی داده‌های ساختاریافته، بهبود نرخ کلیک با نتایج غنی (Rich Snippets) و کاهش زمان بارگذاری.',
    'image': 'https://example.com/images/seo-guide-2026.webp',
    'datePublished': '2026-03-15T08:30:00+03:30',
    'dateModified': '2026-04-10T14:15:00+03:30',
    'mainEntityOfPage': 'https://example.com/blog/technical-seo-guide-2026',
    'author': {
      '@type': 'Person',
      'name': 'هاشم شیخی پور',
      'url': 'https://github.com/hashemsh'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'آکادمی هوش مصنوعی و سئو',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://example.com/logo.png'
      }
    }
  },

  Product: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'گوشی موبایل مدل گلکسی اولترا - ظرفیت ۲۵۶ گیگابایت',
    'image': 'https://example.com/images/galaxy-ultra.jpg',
    'description': 'مجهز به پردازنده قدرتمند، دوربین شگفت‌انگیز ۲۰۰ مگاپیکسلی، نمایشگر امولد ۱۲۰ هرتزی و پشتیبانی از هوش مصنوعی مولد.',
    'brand': {
      '@type': 'Brand',
      'name': 'سامسونگ'
    },
    'sku': 'SM-S928B-256',
    'offers': {
      '@type': 'Offer',
      'url': 'https://example.com/product/galaxy-ultra-256',
      'priceCurrency': 'IRR',
      'price': '649000000',
      'priceValidUntil': '2026-12-30',
      'availability': 'https://schema.org/InStock',
      'itemCondition': 'https://schema.org/NewCondition'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'reviewCount': '142',
      'bestRating': '5',
      'worstRating': '1'
    }
  },

  FAQPage: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'داده‌های ساختاریافته (Schema Markup) چیست و چه کاربردی در سئو دارد؟',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'اسکیما کدهای استانداردی هستند که به موتورهای جستجو مانند گوگل کمک می‌کنند محتوای صفحه شما را دقیق متوجه شوند و نتایج غنی (Rich Snippets) مانند ستاره و قیمت را نمایش دهند.'
        }
      },
      {
        '@type': 'Question',
        'name': 'تفاوت JSON-LD با Microdata در چیست؟',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'فرمت JSON-LD فرمت رسمی توصیه‌شده توسط گوگل است زیرا به صورت یک تگ اسکریپت تمیز در هدر یا فوتر قرار می‌گیرد و کدهای HTML صفحه را شلوغ و درهم‌ریخته نمی‌کند.'
        }
      },
      {
        '@type': 'Question',
        'name': 'چقدر زمان می‌برد تا نتایج غنی اسکیما در گوگل ظاهر شوند؟',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'معمولاً بین ۲ روز تا چند هفته پس از بازبینی و خزش مجدد (Re-crawl) صفحه توسط ربات‌های گوگل نتایج ریچ فعال می‌شوند.'
        }
      }
    ]
  },

  LocalBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'کافه و رستوران روف‌گاردن بام تهران',
    'image': 'https://example.com/cafe-bam.jpg',
    'telephone': '+982188889900',
    'url': 'https://example.com',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'خیابان ولیعصر، بالاتر از پارک وی، کوچه سروستان',
      'addressLocality': 'تهران',
      'addressRegion': 'استان تهران',
      'postalCode': '1999912345',
      'addressCountry': 'IR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 35.7925,
      'longitude': 51.4211
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '23:30'
      }
    ]
  },

  HowTo: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'چگونه اسکیما JSON-LD را در سایت وردپرسی بدون افزونه نصب کنیم؟',
    'description': 'آموزش گام‌به‌گام تزریق کدهای ساختاریافته در قالب وردپرس جهت بهینه‌سازی سرعت و سئو.',
    'totalTime': 'PT10M',
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'تولید کد ساختاریافته',
        'text': 'ابتدا با استفاده از ابزار Schema Generator Pro کد استاندارد JSON-LD متناسب با صفحه خود را تولید کنید.'
      },
      {
        '@type': 'HowToStep',
        'name': 'ورود به فایل functions.php یا Header',
        'text': 'وارد پیشخوان وردپرس شده و کد را از طریق هوک wp_head یا فایل header.php پوسته فرزند اضافه نمایید.'
      },
      {
        '@type': 'HowToStep',
        'name': 'تست و اعتبارسنجی نهایی',
        'text': 'آدرس صفحه را در ابزار رسمی Rich Results Test گوگل وارد کرده و خطاهای احتمالی را رفع کنید.'
      }
    ]
  },

  BreadcrumbList: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'صفحه اصلی',
        'item': 'https://example.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'آموزش سئو',
        'item': 'https://example.com/seo-tutorials'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'داده‌های ساختاریافته (Schema)',
        'item': 'https://example.com/seo-tutorials/schema-markup'
      }
    ]
  },

  Recipe: {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    'name': 'دستور پخت اصیل قورمه‌سبزی مجلسی ایرانی با عطر شنبلیله',
    'image': 'https://example.com/ghormeh-sabzi.jpg',
    'author': {
      '@type': 'Person',
      'name': 'سرآشپز مریم رضایی'
    },
    'prepTime': 'PT30M',
    'cookTime': 'PT3H',
    'totalTime': 'PT3H30M',
    'recipeYield': '۶ نفر',
    'recipeCategory': 'غذای اصلی',
    'description': 'فوت‌وفن‌های جا افتادن و سیاه شدن خورش قورمه سبزی با لیمو عمانی و لوبیای چیتی اعلا.',
    'recipeIngredient': [
      'گوشت راسته یا ماهیچه گوسفندی: ۵۰۰ گرم',
      'سبزی قورمه سرخ‌شده مخصوص: ۷۰۰ گرم',
      'لوبیا چیتی یا قرمز: ۱ پیمانه',
      'لیمو عمانی اعلا: ۴ عدد',
      'پیاز متوسط نگینی: ۲ عدد',
      'روغن و ادویه زردچوبه و فلفل سیاه: به میزان لازم'
    ]
  },

  Event: {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': 'کنفرانس سالانه سئو و هوش مصنوعی ۲۰۲۶',
    'description': 'گردهمایی بزرگ مدیران دیجیتال مارکتینگ و توسعه‌دهندگان وب در زمینه تکنولوژی‌های نوین وب.',
    'startDate': '2026-11-20T09:00:00+03:30',
    'endDate': '2026-11-20T17:00:00+03:30',
    'eventAttendanceMode': 'https://schema.org/MixedEventAttendanceMode',
    'eventStatus': 'https://schema.org/EventScheduled',
    'location': {
      '@type': 'Place',
      'name': 'مرکز همایش‌های برج میلاد',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'بزرگراه شهید همت، برج میلاد تهران',
        'addressLocality': 'تهران',
        'addressCountry': 'IR'
      }
    },
    'organizer': {
      '@type': 'Organization',
      'name': 'آکادمی سئو پرو',
      'url': 'https://example.com'
    },
    'offers': {
      '@type': 'Offer',
      'url': 'https://example.com/tickets',
      'price': '1500000',
      'priceCurrency': 'IRR',
      'availability': 'https://schema.org/InStock'
    }
  },

  VideoObject: {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': 'آموزش ویدیویی گام‌به‌گام پیاده‌سازی اسکیما JSON-LD',
    'description': 'در این ویدیوی آموزشی با نحوه ساخت اسکیما برای انواع صفحات محصول، مقالات و سوالات متداول آشنا می‌شوید.',
    'thumbnailUrl': ['https://example.com/thumbnails/video-cover.jpg'],
    'uploadDate': '2026-05-12T10:00:00+03:30',
    'duration': 'PT18M45S',
    'contentUrl': 'https://example.com/videos/schema-mastery.mp4',
    'embedUrl': 'https://example.com/embed/schema-mastery'
  },

  JobPosting: {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    'title': 'متخصص ارشد سئو فنی و داده‌های ساختاریافته (Senior Technical SEO)',
    'description': 'دعوت به همکاری از کارشناسان خلاق و مسلط به آنالیز Core Web Vitals، ساختار JSON-LD و بهینه‌سازی معماری سایت.',
    'datePosted': '2026-08-01',
    'validThrough': '2026-10-30',
    'employmentType': 'FULL_TIME',
    'hiringOrganization': {
      '@type': 'Organization',
      'name': 'شرکت فناوری راهکارهای دیجیتال',
      'sameAs': 'https://example.com'
    },
    'jobLocation': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'تهران',
        'addressRegion': 'استان تهران',
        'addressCountry': 'IR'
      }
    },
    'baseSalary': {
      '@type': 'MonetaryAmount',
      'currency': 'IRR',
      'value': {
        '@type': 'QuantitativeValue',
        'value': 450000000,
        'unitText': 'MONTH'
      }
    }
  },

  Course: {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': 'دوره جامع مهندسی داده‌های ساختاریافته و سئو تکنیکال',
    'description': 'آموزش عمیق استانداردهای Schema.org، اعتبارسنجی JSON-LD، پیکربندی E-E-A-T و بهینه‌سازی برای خزنده‌های AI.',
    'provider': {
      '@type': 'Organization',
      'name': 'آکادمی هوش مصنوعی و وب',
      'sameAs': 'https://example.com'
    },
    'hasCourseInstance': {
      '@type': 'CourseInstance',
      'courseMode': 'Online',
      'instructor': {
        '@type': 'Person',
        'name': 'مهندس هاشم شیخی پور'
      }
    },
    'offers': {
      '@type': 'Offer',
      'price': '3500000',
      'priceCurrency': 'IRR',
      'category': 'پولی'
    }
  },

  SoftwareApplication: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Schema Generator Pro',
    'operatingSystem': 'تمام مرورگرهای مدرن (All Browsers)',
    'applicationCategory': 'DeveloperApplication',
    'description': 'ابزار آنلاین و ۱۰۰٪ کلاینت‌ساید تولید و اعتبارسنجی داده‌های ساختاریافته گوگل با شبیه‌ساز زنده سرپ.',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': '218'
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  },

  Book: {
    '@context': 'https://schema.org',
    '@type': 'Book',
    'name': 'اصول معماری وب و بهینه‌سازی موتورهای جستجو در عصر هوش مصنوعی',
    'author': {
      '@type': 'Person',
      'name': 'هاشم شیخی پور'
    },
    'isbn': '978-600-1234-56-7',
    'numberOfPages': 380,
    'bookFormat': 'https://schema.org/Hardcover',
    'inLanguage': 'fa',
    'publisher': {
      '@type': 'Organization',
      'name': 'انتشارات فناوری‌های نوین'
    }
  },

  Person: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'هاشم شیخی پور',
    'jobTitle': 'Senior Web Architect & AI Engineer',
    'url': 'https://github.com/hashemsh',
    'sameAs': [
      'https://github.com/hashemsh',
      'https://www.linkedin.com/in/hashemsheikhypour',
      'https://t.me/init10'
    ],
    'worksFor': {
      '@type': 'Organization',
      'name': 'AI Projects Persian'
    }
  },

  Organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'هاب پروژه‌های هوش مصنوعی فارسی',
    'url': 'https://hashemsh.github.io/ai-projects-persian/',
    'logo': 'https://hashemsh.github.io/ai-projects-persian/assets/images/logo.svg',
    'description': 'مرجع ابزارهای کاربردی، تخصصی و مدرن وب بر پایه هوش مصنوعی مولد',
    'sameAs': [
      'https://github.com/hashemsh/ai-projects-persian'
    ]
  },

  SpecialAnnouncement: {
    '@context': 'https://schema.org',
    '@type': 'SpecialAnnouncement',
    'name': 'انتشار رسمی نسخه پرو سازنده داده‌های ساختاریافته',
    'text': 'پروژه جدید اسکیما ژنراتور پرو با پشتیبانی از ۱۶ فرمت ریچ اسنیپت و اعتبارسنجی ۱۰۰٪ محلی منتشر شد.',
    'datePosted': '2026-11-04',
    'expires': '2026-12-31',
    'category': 'https://schema.org/GeneralNotice'
  }
};
