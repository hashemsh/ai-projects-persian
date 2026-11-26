(function () {
  var input = document.getElementById('hero-search-input');
  var clearBtn = document.getElementById('hero-search-clear');
  var dropdown = document.getElementById('hero-search-suggestions');
  var navSrch = document.querySelector('.nav-srch-btn') || document.querySelector('.srch');
  var cards = Array.from(document.querySelectorAll('.cg .cd'));
  var chips = Array.from(document.querySelectorAll('.chip'));
  var grid = document.querySelector('.cg');
  if (!input) return;

  var toolsData = [
    {
      title: 'Prompt+ — استودیو پرامپت',
      url: './prompt-optimizer/',
      icon: 'assets/images/tools/prompt-optimizer.svg',
      tag: 'پرامپت',
      desc: 'مهندسی پرامپت فارسی، ترفند دوزبانه و عیارسنجی زنده برای دستورهای دقیق‌تر.',
      keywords: 'پرامپت هوش مصنوعی prompt چت جی پی تی gpt کلود claude بهینه‌سازی پرامپت نویسی'
    },
    {
      title: 'QR Studio Pro',
      url: './qr-studio/',
      icon: 'assets/images/tools/qr-studio.svg',
      tag: 'مارکتینگ',
      desc: '۵ فرمت کاربردی (لینک، وای‌فای، واتساپ، تلگرام)، لوگو و خروجی SVG و PNG.',
      keywords: 'کیوآر بارکد qr code کیو ار مارکتینگ کیوآرکد ساخت بارکد اسکن'
    },
    {
      title: 'WebP Studio Pro',
      url: './webp-converter/',
      icon: 'assets/images/tools/webp-converter.svg',
      tag: 'گرافیک',
      desc: 'تبدیل و فشرده‌سازی تصاویر تا ۸۵٪ کم‌حجم‌تر؛ ۱۰۰٪ محلی در مرورگر.',
      keywords: 'وب پی تصویر عکس فشرده سازی بهینه سازی عکس کاهش حجم png jpg webp وکتور'
    },
    {
      title: 'Regex AI Studio',
      url: './regex-studio/',
      icon: 'assets/images/tools/regex-studio.svg',
      tag: 'توسعه',
      desc: 'تست زنده، تشریح مرحله‌به‌مرحله الگوها و مولد خودکار کد برای ۸ زبان.',
      keywords: 'ریجکس عبارت منظم رگکس regex regular expression الگو تست کدنویسی اعتبارسنجی'
    },
    {
      title: 'Schema Generator Pro',
      url: './schema-generator/',
      icon: 'assets/images/tools/schema-generator.svg',
      tag: 'سئو',
      desc: 'ساخت و اعتبارسنجی JSON-LD برای ۱۶ نوع با شبیه‌ساز زنده‌ی نتایج گوگل.',
      keywords: 'اسکیما سئو داده ساختار یافته json ld گوگل ریچ اسنیپت schema seo'
    },
    {
      title: 'UTM Builder Pro',
      url: './utm-builder/',
      icon: 'assets/images/tools/utm-builder.svg',
      tag: 'مارکتینگ',
      desc: 'لینک کمپین، پریست ادنتورک‌های ایرانی، شبیه‌ساز GA4 و خروجی گروهی اکسل.',
      keywords: 'یو تی ام utm لینک ساز ترکر کمپین تبلیغات ادنتورک یکتانت مدیااد سنجاق آنالیتیکس'
    },
    {
      title: 'Lorem Plus — لورم پلاس',
      url: './lorem-plus/',
      icon: 'assets/images/tools/lorem-plus.svg',
      tag: 'سئو',
      desc: 'تولید محتوای هوشمند فارسی، مقاله‌ساز وبلاگ، میکروکپی UI و متون ساختاریافته.',
      keywords: 'لورم ایپسوم متن تستی تولید محتوا فارسی نگارش مقاله مقاله‌ساز lorem متون ساختگی'
    },
    {
      title: 'Placeholder Pro',
      url: './placeholder-pro/',
      icon: 'assets/images/tools/placeholder-pro.svg',
      tag: 'گرافیک',
      desc: 'ساخت تصاویر جایگزین و ماکت‌های گرافیکی وب با پالت‌های مدرن و ابعاد استاندارد.',
      keywords: 'پلیس هولدر تصویر تستی ماکت گرافیکی عکس ساختگی placeholder svg اندازه تصویر عکس ماکت'
    },
    {
      title: 'Site Auditor Pro',
      url: './site-auditor/',
      icon: 'assets/images/tools/site-auditor.svg',
      tag: 'سئو',
      desc: 'ممیزی عمیق سئو فنی صفحات وب، استانداردهای Core Web Vitals و امنیت.',
      keywords: 'سایت آدیتور آنالیز سئو ممیزی بررسی سرعت cwv کور وب وایتال امنیت رتبه بندی'
    },
    {
      title: 'AI Cost Estimator',
      url: './ai-cost-estimator/',
      icon: 'assets/images/tools/ai-cost-estimator.svg',
      tag: 'توسعه',
      desc: 'محاسبه و مقایسه هزینه تولید عکس، ویدیو، کد و چت مدل‌های هوش مصنوعی به دلار و تومان.',
      keywords: 'محاسبه هزینه هوش مصنوعی قیمت کلود دیپ سیک اوپن ای آی قیمت دلار تومان cost ai برآورد قیمت'
    },
    {
      title: 'Log Analyzer & AI Debugger',
      url: './log-analyzer/',
      icon: 'assets/images/tools/log-analyzer.svg',
      tag: 'سرور',
      desc: 'تحلیل خطاهای Nginx، PHP Fatal و Node.js همراه با تولید پرامپت عیب‌یابی در AI.',
      keywords: 'لاگ سرور آنالیزور خطا لاگ دیباگ دیباگر لاگها ارور php fatal nginx 502 500 apache nodejs crash traceback عیب یابی'
    },
    {
      title: 'AI Models Directory — دایرکتوری هوش مصنوعی',
      url: './ai-directory/',
      icon: 'assets/images/tools/ai-directory.svg',
      tag: 'هوش مصنوعی',
      desc: 'بانک جامع بیش از ۵۰ مدل هوش مصنوعی، عملکرد، کاربردهای هر مدل و لینک وب‌سایت رسمی.',
      keywords: 'دایرکتوری مدل هوش مصنوعی کاتالوگ لیست هوش مصنوعی ها chatgpt claude deepseek gemini midjourney flux suno cursor v0 bolt llm مدل ها'
    }
  ];

  function norm(s) {
    return (s || '').toLowerCase()
      .replace(/[ي]/g, 'ی').replace(/[ك]/g, 'ک').replace(/[ة]/g, 'ه')
      .replace(/[\u200C\u200B]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function escapeHtml(str) {
    return (str || '').replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  // Create grid no-res if grid exists
  var noRes = null;
  if (grid) {
    noRes = document.createElement('div');
    noRes.className = 'no-res';
    noRes.style.display = 'none';
    noRes.innerHTML = '<h3 style="margin:0;font-size:17px;font-weight:900">ابزاری با این عبارت پیدا نشد</h3><p style="margin:8px 0 0;font-size:13px;color:var(--mut)">می‌توانید کلماتی مثل سئو، پرامپت، QR، WebP، کد یا مارکتینگ را امتحان کنید.</p>';
    grid.appendChild(noRes);
  }

  var debounceTimer = null;
  var DEBOUNCE_DELAY = 280; // Delay to prevent request on single characters
  var currentMatches = [];
  var selectedIndex = -1;

  function filterGridCards(query) {
    if (!cards.length) return;
    var matches = 0;
    cards.forEach(function (card) {
      var text = norm(card.innerText + ' ' + (card.querySelector('img') ? card.querySelector('img').alt : ''));
      var match = !query || text.indexOf(query) !== -1;
      card.style.display = match ? 'flex' : 'none';
      if (match) matches++;
    });
    if (noRes) noRes.style.display = (matches === 0) ? 'block' : 'none';
  }

  function hideDropdown() {
    if (!dropdown) return;
    dropdown.style.display = 'none';
    dropdown.innerHTML = '';
    currentMatches = [];
    selectedIndex = -1;
  }

  function highlightMatch(text, q) {
    if (!q) return escapeHtml(text);
    var normT = norm(text);
    var normQ = norm(q);
    var idx = normT.indexOf(normQ);
    if (idx === -1) return escapeHtml(text);
    var start = text.substring(0, idx);
    var matched = text.substring(idx, idx + q.length);
    var end = text.substring(idx + q.length);
    return escapeHtml(start) + '<mark style="background:var(--hl);color:var(--bt);padding:0 2px;border-radius:4px">' + escapeHtml(matched) + '</mark>' + escapeHtml(end);
  }

  function renderSuggestions(rawQuery) {
    if (!dropdown) return;
    var query = norm(rawQuery);
    if (!query) {
      hideDropdown();
      return;
    }

    currentMatches = toolsData.filter(function (tool) {
      var fullText = norm(tool.title + ' ' + tool.desc + ' ' + tool.tag + ' ' + tool.keywords);
      return fullText.indexOf(query) !== -1;
    });

    selectedIndex = -1;
    dropdown.innerHTML = '';

    if (currentMatches.length === 0) {
      dropdown.innerHTML = [
        '<div class="suggestions-empty">',
        '  <p style="margin:0 0 6px;font-weight:700;color:var(--ink)">ابزاری با «' + escapeHtml(rawQuery) + '» پیدا نشد</p>',
        '  <span style="font-size:12px;color:var(--mut)">پیشنهادها: سئو، پرامپت، QR، WebP، کد، مارکتینگ</span>',
        '</div>'
      ].join('');
      dropdown.style.display = 'block';
      return;
    }

    var html = currentMatches.slice(0, 6).map(function (tool, idx) {
      return [
        '<a class="suggestion-item" href="' + tool.url + '" data-idx="' + idx + '">',
        '  <img src="' + tool.icon + '" alt="" class="suggestion-icon" width="32" height="32" loading="lazy">',
        '  <div class="suggestion-info">',
        '    <div class="suggestion-title">',
        '      <span>' + highlightMatch(tool.title, rawQuery) + '</span>',
        '      <span class="suggestion-tag">' + escapeHtml(tool.tag) + '</span>',
        '    </div>',
        '    <p class="suggestion-desc">' + escapeHtml(tool.desc) + '</p>',
        '  </div>',
        '  <span class="suggestion-arrow">←</span>',
        '</a>'
      ].join('');
    }).join('');

    html += [
      '<div class="suggestions-footer">',
      '  <span>یافت‌شده: <b>' + currentMatches.length + '</b> ابزار</span>',
      '  <a href="#tools" class="suggestions-view-all" id="suggestions-view-all">مشاهده در لیست ابزارها ↓</a>',
      '</div>'
    ].join('');

    dropdown.innerHTML = html;
    dropdown.style.display = 'block';

    var viewAllBtn = document.getElementById('suggestions-view-all');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', function (e) {
        e.preventDefault();
        hideDropdown();
        var toolsSec = document.getElementById('tools');
        if (toolsSec) toolsSec.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function updateActiveSuggestion() {
    if (!dropdown) return;
    var items = dropdown.querySelectorAll('.suggestion-item');
    items.forEach(function (item, idx) {
      if (idx === selectedIndex) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Live input with debounce delay
  input.addEventListener('input', function (e) {
    var val = e.target.value;
    chips.forEach(function (c) { c.classList.remove('active'); });
    if (clearBtn) clearBtn.style.display = val ? 'inline-block' : 'none';

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      var query = norm(val);
      filterGridCards(query);
      if (query.length > 0) {
        renderSuggestions(val);
      } else {
        hideDropdown();
      }
    }, DEBOUNCE_DELAY);
  });

  input.addEventListener('focus', function () {
    if (norm(input.value)) {
      renderSuggestions(input.value);
    }
  });

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      input.value = '';
      clearTimeout(debounceTimer);
      filterGridCards('');
      hideDropdown();
      chips.forEach(function (c) { c.classList.remove('active'); });
      input.focus();
    });
  }

  // Topic chips
  chips.forEach(function (chip) {
    chip.addEventListener('click', function (e) {
      e.preventDefault();
      var tag = chip.innerText.trim();
      var isActive = chip.classList.contains('active');
      chips.forEach(function (c) { c.classList.remove('active'); });
      clearTimeout(debounceTimer);
      if (isActive) {
        input.value = '';
        if (clearBtn) clearBtn.style.display = 'none';
        filterGridCards('');
        hideDropdown();
      } else {
        chip.classList.add('active');
        input.value = tag;
        if (clearBtn) clearBtn.style.display = 'inline-block';
        filterGridCards(norm(tag));
        renderSuggestions(tag);
        var toolsSec = document.getElementById('tools');
        if (toolsSec) toolsSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Click outside to close dropdown
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.hero-search-wrap')) {
      hideDropdown();
    }
  });

  // Nav search button trigger
  if (navSrch) {
    navSrch.addEventListener('click', function (e) {
      if (e && e.preventDefault) e.preventDefault();
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { input.focus(); }, 40);
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', function (e) {
    var tag = document.activeElement ? document.activeElement.tagName : '';

    if (e.target === input) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentMatches.length > 0) {
          selectedIndex = (selectedIndex + 1) % Math.min(currentMatches.length, 6);
          updateActiveSuggestion();
        }
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentMatches.length > 0) {
          selectedIndex = (selectedIndex - 1 + Math.min(currentMatches.length, 6)) % Math.min(currentMatches.length, 6);
          updateActiveSuggestion();
        }
        return;
      }
      if (e.key === 'Enter') {
        if (selectedIndex >= 0 && currentMatches[selectedIndex]) {
          e.preventDefault();
          window.location.href = currentMatches[selectedIndex].url;
        } else {
          hideDropdown();
          var toolsSec = document.getElementById('tools');
          if (toolsSec) toolsSec.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
      if (e.key === 'Escape') {
        hideDropdown();
        input.blur();
        return;
      }
    }

    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }

    if (e.key === '/' || e.code === 'Slash') {
      e.preventDefault();
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
})();
