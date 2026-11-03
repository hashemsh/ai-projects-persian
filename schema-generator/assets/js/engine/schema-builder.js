/**
 * Schema Generator Pro - Schema Engine & JSON-LD Builder
 */
window.SchemaBuilder = (function() {
  function cleanString(str) {
    return str ? String(str).trim() : '';
  }

  function cleanNumber(num) {
    if (num === '' || num === null || num === undefined) return null;
    const n = Number(num);
    return isNaN(n) ? null : n;
  }

  function buildArticle(formData) {
    const article = {
      '@context': 'https://schema.org',
      '@type': formData.subType || 'BlogPosting',
      'headline': cleanString(formData.headline) || 'عنوان مقاله تستی',
      'description': cleanString(formData.description),
      'mainEntityOfPage': cleanString(formData.url) || undefined,
      'datePublished': cleanString(formData.datePublished) || undefined,
      'dateModified': cleanString(formData.dateModified) || undefined
    };

    if (formData.image) {
      article.image = cleanString(formData.image);
    }

    if (formData.authorName) {
      article.author = {
        '@type': formData.authorType || 'Person',
        'name': cleanString(formData.authorName),
        'url': cleanString(formData.authorUrl) || undefined
      };
    }

    if (formData.publisherName) {
      article.publisher = {
        '@type': 'Organization',
        'name': cleanString(formData.publisherName)
      };
      if (formData.publisherLogo) {
        article.publisher.logo = {
          '@type': 'ImageObject',
          'url': cleanString(formData.publisherLogo)
        };
      }
    }

    return article;
  }

  function buildProduct(formData) {
    const product = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': cleanString(formData.name) || 'نام محصول',
      'description': cleanString(formData.description),
      'image': cleanString(formData.image) || undefined,
      'sku': cleanString(formData.sku) || undefined
    };

    if (formData.brand) {
      product.brand = {
        '@type': 'Brand',
        'name': cleanString(formData.brand)
      };
    }

    if (formData.price || formData.priceCurrency) {
      product.offers = {
        '@type': 'Offer',
        'url': cleanString(formData.url) || undefined,
        'priceCurrency': cleanString(formData.priceCurrency) || 'IRR',
        'price': cleanString(formData.price) || '0',
        'availability': formData.availability || 'https://schema.org/InStock',
        'itemCondition': formData.condition || 'https://schema.org/NewCondition'
      };
      if (formData.priceValidUntil) {
        product.offers.priceValidUntil = formData.priceValidUntil;
      }
    }

    if (formData.ratingValue && formData.reviewCount) {
      product.aggregateRating = {
        '@type': 'AggregateRating',
        'ratingValue': String(formData.ratingValue),
        'reviewCount': String(formData.reviewCount),
        'bestRating': String(formData.bestRating || '5'),
        'worstRating': String(formData.worstRating || '1')
      };
    }

    return product;
  }

  function buildFAQPage(formData) {
    const questions = formData.items || [];
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': questions.map(q => ({
        '@type': 'Question',
        'name': cleanString(q.question) || 'پرسش بدون عنوان',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': cleanString(q.answer) || 'پاسخ پرسش'
        }
      }))
    };
  }

  function buildLocalBusiness(formData) {
    const biz = {
      '@context': 'https://schema.org',
      '@type': formData.subType || 'LocalBusiness',
      'name': cleanString(formData.name) || 'نام کسب‌وکار',
      'image': cleanString(formData.image) || undefined,
      'telephone': cleanString(formData.telephone) || undefined,
      'url': cleanString(formData.url) || undefined,
      'priceRange': cleanString(formData.priceRange) || undefined,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': cleanString(formData.streetAddress) || undefined,
        'addressLocality': cleanString(formData.city) || undefined,
        'addressRegion': cleanString(formData.state) || undefined,
        'postalCode': cleanString(formData.postalCode) || undefined,
        'addressCountry': cleanString(formData.country) || 'IR'
      }
    };

    if (formData.latitude && formData.longitude) {
      biz.geo = {
        '@type': 'GeoCoordinates',
        'latitude': cleanNumber(formData.latitude),
        'longitude': cleanNumber(formData.longitude)
      };
    }

    if (formData.opens && formData.closes) {
      biz.openingHoursSpecification = [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': formData.days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': cleanString(formData.opens),
          'closes': cleanString(formData.closes)
        }
      ];
    }

    return biz;
  }

  function buildHowTo(formData) {
    const steps = formData.steps || [];
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': cleanString(formData.name) || 'عنوان راهنما',
      'description': cleanString(formData.description) || undefined,
      'totalTime': cleanString(formData.totalTime) || undefined,
      'step': steps.map(s => {
        const stepObj = {
          '@type': 'HowToStep',
          'name': cleanString(s.name) || 'عنوان مرحله',
          'text': cleanString(s.text) || ''
        };
        if (s.image) stepObj.image = cleanString(s.image);
        return stepObj;
      })
    };
  }

  function buildBreadcrumbList(formData) {
    const crumbs = formData.crumbs || [];
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': crumbs.map((c, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': cleanString(c.name) || `مرحله ${idx + 1}`,
        'item': cleanString(c.url) || 'https://example.com'
      }))
    };
  }

  function buildRecipe(formData) {
    const ingredients = (formData.ingredients || '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    return {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      'name': cleanString(formData.name) || 'نام دستور پخت',
      'image': cleanString(formData.image) || undefined,
      'description': cleanString(formData.description) || undefined,
      'author': formData.authorName ? {
        '@type': 'Person',
        'name': cleanString(formData.authorName)
      } : undefined,
      'prepTime': cleanString(formData.prepTime) || undefined,
      'cookTime': cleanString(formData.cookTime) || undefined,
      'totalTime': cleanString(formData.totalTime) || undefined,
      'recipeYield': cleanString(formData.recipeYield) || undefined,
      'recipeCategory': cleanString(formData.recipeCategory) || undefined,
      'recipeIngredient': ingredients.length ? ingredients : undefined
    };
  }

  function buildEvent(formData) {
    const evt = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      'name': cleanString(formData.name) || 'نام رویداد',
      'description': cleanString(formData.description) || undefined,
      'startDate': cleanString(formData.startDate) || undefined,
      'endDate': cleanString(formData.endDate) || undefined,
      'eventAttendanceMode': formData.attendanceMode || 'https://schema.org/OfflineEventAttendanceMode',
      'eventStatus': formData.eventStatus || 'https://schema.org/EventScheduled'
    };

    if (formData.locationName || formData.locationAddress) {
      evt.location = {
        '@type': 'Place',
        'name': cleanString(formData.locationName) || 'محل برگزاری',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': cleanString(formData.locationAddress) || '',
          'addressLocality': cleanString(formData.locationCity) || 'تهران',
          'addressCountry': 'IR'
        }
      };
    } else if (formData.streamUrl) {
      evt.location = {
        '@type': 'VirtualLocation',
        'url': cleanString(formData.streamUrl)
      };
    }

    if (formData.organizerName) {
      evt.organizer = {
        '@type': 'Organization',
        'name': cleanString(formData.organizerName),
        'url': cleanString(formData.organizerUrl) || undefined
      };
    }

    if (formData.ticketPrice) {
      evt.offers = {
        '@type': 'Offer',
        'url': cleanString(formData.ticketUrl) || undefined,
        'price': cleanString(formData.ticketPrice),
        'priceCurrency': cleanString(formData.ticketCurrency) || 'IRR',
        'availability': 'https://schema.org/InStock'
      };
    }

    return evt;
  }

  function buildVideoObject(formData) {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      'name': cleanString(formData.name) || 'عنوان ویدیو',
      'description': cleanString(formData.description) || undefined,
      'thumbnailUrl': formData.thumbnailUrl ? [cleanString(formData.thumbnailUrl)] : undefined,
      'uploadDate': cleanString(formData.uploadDate) || undefined,
      'duration': cleanString(formData.duration) || undefined,
      'contentUrl': cleanString(formData.contentUrl) || undefined,
      'embedUrl': cleanString(formData.embedUrl) || undefined
    };
  }

  function buildJobPosting(formData) {
    const job = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      'title': cleanString(formData.title) || 'عنوان موقعیت شغلی',
      'description': cleanString(formData.description) || undefined,
      'datePosted': cleanString(formData.datePosted) || undefined,
      'validThrough': cleanString(formData.validThrough) || undefined,
      'employmentType': formData.employmentType || 'FULL_TIME'
    };

    if (formData.hiringOrg) {
      job.hiringOrganization = {
        '@type': 'Organization',
        'name': cleanString(formData.hiringOrg),
        'sameAs': cleanString(formData.hiringUrl) || undefined
      };
    }

    if (formData.city) {
      job.jobLocation = {
        '@type': 'Place',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': cleanString(formData.city),
          'addressRegion': cleanString(formData.state) || '',
          'addressCountry': 'IR'
        }
      };
    }

    if (formData.salary) {
      job.baseSalary = {
        '@type': 'MonetaryAmount',
        'currency': cleanString(formData.salaryCurrency) || 'IRR',
        'value': {
          '@type': 'QuantitativeValue',
          'value': cleanNumber(formData.salary),
          'unitText': formData.salaryUnit || 'MONTH'
        }
      };
    }

    return job;
  }

  function buildCourse(formData) {
    const course = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': cleanString(formData.name) || 'عنوان دوره آموزشی',
      'description': cleanString(formData.description) || undefined,
      'provider': formData.providerName ? {
        '@type': 'Organization',
        'name': cleanString(formData.providerName),
        'sameAs': cleanString(formData.providerUrl) || undefined
      } : undefined
    };

    if (formData.instructorName) {
      course.hasCourseInstance = {
        '@type': 'CourseInstance',
        'courseMode': formData.courseMode || 'Online',
        'instructor': {
          '@type': 'Person',
          'name': cleanString(formData.instructorName)
        }
      };
    }

    if (formData.price) {
      course.offers = {
        '@type': 'Offer',
        'price': cleanString(formData.price),
        'priceCurrency': cleanString(formData.priceCurrency) || 'IRR',
        'category': cleanString(formData.priceCategory) || 'پولی'
      };
    }

    return course;
  }

  function buildSoftwareApplication(formData) {
    const app = {
      '@context': 'https://schema.org',
      '@type': formData.subType || 'WebApplication',
      'name': cleanString(formData.name) || 'نام نرم‌افزار / اپلیکیشن',
      'operatingSystem': cleanString(formData.operatingSystem) || 'تمام پلتفرم‌ها (Web / Windows / Android / iOS)',
      'applicationCategory': formData.applicationCategory || 'BusinessApplication',
      'description': cleanString(formData.description) || undefined
    };

    if (formData.ratingValue && formData.reviewCount) {
      app.aggregateRating = {
        '@type': 'AggregateRating',
        'ratingValue': String(formData.ratingValue),
        'ratingCount': String(formData.reviewCount)
      };
    }

    if (formData.price !== undefined && formData.price !== '') {
      app.offers = {
        '@type': 'Offer',
        'price': cleanString(formData.price),
        'priceCurrency': cleanString(formData.priceCurrency) || 'USD'
      };
    }

    return app;
  }

  function buildBook(formData) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Book',
      'name': cleanString(formData.name) || 'عنوان کتاب',
      'author': formData.authorName ? {
        '@type': 'Person',
        'name': cleanString(formData.authorName)
      } : undefined,
      'isbn': cleanString(formData.isbn) || undefined,
      'numberOfPages': cleanNumber(formData.pages) || undefined,
      'bookFormat': formData.bookFormat || 'https://schema.org/Hardcover',
      'inLanguage': cleanString(formData.inLanguage) || 'fa',
      'publisher': formData.publisherName ? {
        '@type': 'Organization',
        'name': cleanString(formData.publisherName)
      } : undefined
    };
  }

  function buildPerson(formData) {
    const links = (formData.sameAs || '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': cleanString(formData.name) || 'نام شخص / متخصص',
      'jobTitle': cleanString(formData.jobTitle) || undefined,
      'url': cleanString(formData.url) || undefined,
      'image': cleanString(formData.image) || undefined,
      'sameAs': links.length ? links : undefined,
      'worksFor': formData.companyName ? {
        '@type': 'Organization',
        'name': cleanString(formData.companyName)
      } : undefined
    };
  }

  function buildOrganization(formData) {
    const links = (formData.sameAs || '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    return {
      '@context': 'https://schema.org',
      '@type': formData.subType || 'Organization',
      'name': cleanString(formData.name) || 'نام رسمی شرکت یا برند',
      'url': cleanString(formData.url) || undefined,
      'logo': cleanString(formData.logo) || undefined,
      'description': cleanString(formData.description) || undefined,
      'sameAs': links.length ? links : undefined
    };
  }

  function buildSpecialAnnouncement(formData) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SpecialAnnouncement',
      'name': cleanString(formData.name) || 'عنوان اطلاعیه مهم',
      'text': cleanString(formData.text) || cleanString(formData.description) || undefined,
      'datePosted': cleanString(formData.datePosted) || undefined,
      'expires': cleanString(formData.expires) || undefined,
      'category': formData.category || 'https://schema.org/GeneralNotice'
    };
  }

  function cleanObject(obj) {
    if (Array.isArray(obj)) {
      return obj
        .map(cleanObject)
        .filter(item => item !== undefined && item !== null && !(typeof item === 'object' && Object.keys(item).length === 0));
    }
    if (obj !== null && typeof obj === 'object') {
      const clean = {};
      Object.keys(obj).forEach(key => {
        const val = cleanObject(obj[key]);
        if (val !== undefined && val !== null && val !== '') {
          clean[key] = val;
        }
      });
      return clean;
    }
    return obj;
  }

  function buildSchema(type, formData) {
    let raw;
    switch (type) {
      case 'Article': raw = buildArticle(formData); break;
      case 'Product': raw = buildProduct(formData); break;
      case 'FAQPage': raw = buildFAQPage(formData); break;
      case 'LocalBusiness': raw = buildLocalBusiness(formData); break;
      case 'HowTo': raw = buildHowTo(formData); break;
      case 'BreadcrumbList': raw = buildBreadcrumbList(formData); break;
      case 'Recipe': raw = buildRecipe(formData); break;
      case 'Event': raw = buildEvent(formData); break;
      case 'VideoObject': raw = buildVideoObject(formData); break;
      case 'JobPosting': raw = buildJobPosting(formData); break;
      case 'Course': raw = buildCourse(formData); break;
      case 'SoftwareApplication': raw = buildSoftwareApplication(formData); break;
      case 'Book': raw = buildBook(formData); break;
      case 'Person': raw = buildPerson(formData); break;
      case 'Organization': raw = buildOrganization(formData); break;
      case 'SpecialAnnouncement': raw = buildSpecialAnnouncement(formData); break;
      default: raw = buildArticle(formData);
    }
    return cleanObject(raw);
  }

  function formatOutput(schemaObj, options = {}) {
    const isMinified = options.minified || false;
    const includeScriptTag = options.includeScriptTag !== false;
    const jsonStr = isMinified ? JSON.stringify(schemaObj) : JSON.stringify(schemaObj, null, 2);

    if (includeScriptTag) {
      return `<script type="application/ld+json">\n${jsonStr}\n</script>`;
    }
    return jsonStr;
  }

  return {
    buildSchema,
    formatOutput,
    cleanObject
  };
})();
