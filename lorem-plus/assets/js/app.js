/**
 * لورم پلاس | منطق اصلی برنامه، مقاله‌ساز، میکروکپی‌های UI، اسکیما ساز، پیش‌نمایش چندفونته و ابزار تصویر ماکت
 * سازگار با اجرای محلی (file:///) و محیط‌های وب‌سرور
 */

// دریافت دیتاست از آبجکت سراسری
const getDataset = () => {
  if (typeof window !== 'undefined' && window.TEXT_DATA) {
    return window.TEXT_DATA;
  }
  return {};
};

// --- Application State ---
const state = {
  type: 'standard',          // standard | landing | blog | microcopy | about | cta
  subType: 'faq',            // faq | testimonials | pricing (when type === 'microcopy')
  unit: 'paragraphs',        // paragraphs | words
  count: 3,                  // integer
  keyword: '',               // SEO Keyword to inject
  htmlTags: false,           // boolean
  includeHeadings: false,    // boolean
  includeList: false,        // boolean
  activeTab: 'preview',      // preview | raw | json
  selectedFont: 'font-vazirmatn', // font class
  fontSize: 16,              // px
  generatedText: '',         // text version
  generatedHtml: '',         // html version
  generatedJson: '',         // json string version
  generatedFaqSchema: ''     // Google Schema JSON-LD
};

// --- DOM Cache ---
let DOM = {};

function initDOM() {
  DOM = {
    typeButtons: document.querySelectorAll('.type-btn'),
    microcopySubSelector: document.getElementById('microcopySubSelector'),
    subTypeButtons: document.querySelectorAll('.sub-type-btn'),
    quantityCard: document.getElementById('quantityCard'),

    seoKeywordInput: document.getElementById('seoKeyword'),
    btnClearKeyword: document.getElementById('btnClearKeyword'),

    unitParagraphsBtn: document.getElementById('unitParagraphs'),
    unitWordsBtn: document.getElementById('unitWords'),
    countRange: document.getElementById('countRange'),
    countInput: document.getElementById('countInput'),
    unitLabel: document.getElementById('unitLabel'),
    rangeMin: document.getElementById('rangeMin'),
    rangeQuarter: document.getElementById('rangeQuarter'),
    rangeMid: document.getElementById('rangeMid'),
    rangeMax: document.getElementById('rangeMax'),
    presetChipsContainer: document.getElementById('presetChips'),

    optHtmlTags: document.getElementById('optHtmlTags'),
    subHtmlOptions: document.getElementById('subHtmlOptions'),
    optIncludeHeadings: document.getElementById('optIncludeHeadings'),
    optIncludeList: document.getElementById('optIncludeList'),

    // Placeholder Image Tool
    imgWidth: document.getElementById('imgWidth'),
    imgHeight: document.getElementById('imgHeight'),
    imgText: document.getElementById('imgText'),
    imgChips: document.querySelectorAll('.img-chip'),
    btnCopyImgTag: document.getElementById('btnCopyImgTag'),
    btnCopyImgUrl: document.getElementById('btnCopyImgUrl'),

    // Font Preview & Size
    fontSelect: document.getElementById('fontSelect'),
    fontSizeButtons: document.querySelectorAll('.font-size-btn'),

    // Action Buttons
    btnGenerate: document.getElementById('btnGenerate'),
    generateIcon: document.getElementById('generateIcon'),
    btnCopy: document.getElementById('btnCopy'),
    copyText: document.getElementById('copyText'),
    btnCopyJson: document.getElementById('btnCopyJson'),
    btnCopyFaqSchema: document.getElementById('btnCopyFaqSchema'),
    btnDownload: document.getElementById('btnDownload'),
    btnClear: document.getElementById('btnClear'),

    // View Tabs & Viewports
    tabPreview: document.getElementById('tabPreview'),
    tabRaw: document.getElementById('tabRaw'),
    tabJson: document.getElementById('tabJson'),
    outputRendered: document.getElementById('outputRendered'),
    outputRaw: document.getElementById('outputRaw'),
    outputJson: document.getElementById('outputJson'),

    // Stats
    statParagraphs: document.getElementById('statParagraphs'),
    statWords: document.getElementById('statWords'),
    statChars: document.getElementById('statChars'),
    statReadingTime: document.getElementById('statReadingTime'),
    seoBadgeDot: document.getElementById('seoBadgeDot'),
    statSeoLength: document.getElementById('statSeoLength'),

    // Toast
    toast: document.getElementById('toast'),
    toastTitle: document.getElementById('toastTitle'),
    toastMessage: document.getElementById('toastMessage')
  };
}

// --- Utilities ---
function shuffleArray(arr) {
  if (!arr || !arr.length) return [];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// هوشمندسازی تزریق کلمه کلیدی سئو در متن
function injectKeyword(sentence, keyword, isHtml = false) {
  if (!keyword || !keyword.trim()) return sentence;
  const kw = keyword.trim();
  const highlighted = isHtml ? `<strong>${kw}</strong>` : `**${kw}**`;

  const words = sentence.split(' ');
  if (words.length <= 4) {
    return `${sentence} (${highlighted})`;
  }

  // تزریق طبیعی در یک سوم اول جمله
  const insertIndex = Math.min(Math.floor(words.length / 3) + 1, words.length - 2);
  words.splice(insertIndex, 0, `در زمینه ${highlighted}،`);
  return words.join(' ');
}

// ساخت ساختار اسکیما FAQ استاندارد گوگل
function generateFaqSchemaJson(faqs) {
  const schemaObj = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n<\/script>`;
}

// ساخت آدرس و کد تصویر ماکت (Placeholder)
function getPlaceholderData() {
  const w = parseInt(DOM.imgWidth.value, 10) || 600;
  const h = parseInt(DOM.imgHeight.value, 10) || 400;
  let text = DOM.imgText.value.trim();
  if (!text) text = `${w} × ${h}`;

  const encodedText = encodeURIComponent(text);
  const url = `https://placehold.co/${w}x${h}/1e293b/38bdf8?text=${encodedText}`;
  const tag = `<img src="${url}" alt="${text}" width="${w}" height="${h}" class="rounded-xl shadow-lg max-w-full h-auto" />`;

  return { w, h, text, url, tag };
}

// --- Content Generation Engine ---
function generateContent() {
  const allData = getDataset();
  const kw = state.keyword ? state.keyword.trim() : '';

  let outputHtml = '';
  let outputText = '';
  let jsonData = [];
  let currentFaqs = [];

  // ۱. حالت مقاله کامل وبلاگ (Blog Post Mode)
  if (state.type === 'blog') {
    const blogData = allData.blog;
    if (blogData) {
      const artTitle = kw ? `${blogData.articleTitle} (تمرکز بر ${kw})` : blogData.articleTitle;
      const lead = injectKeyword(blogData.lead, kw, true);
      const leadRaw = injectKeyword(blogData.lead, kw, false);

      let htmlParts = [
        `<h2>${artTitle}</h2>`,
        `<p class="text-base text-slate-200 font-medium leading-relaxed">${lead}</p>`
      ];
      let textParts = [
        `# ${artTitle}\n`,
        `${leadRaw}\n`
      ];

      jsonData.push({
        id: 1,
        type: "header",
        title: artTitle,
        lead: leadRaw
      });

      blogData.h2Sections.forEach((sec, idx) => {
        const secHeading = kw && idx === 0 ? injectKeyword(sec.heading, kw, true) : sec.heading;
        const secHeadingRaw = kw && idx === 0 ? injectKeyword(sec.heading, kw, false) : sec.heading;
        const secContent = injectKeyword(sec.content, kw, true);
        const secContentRaw = injectKeyword(sec.content, kw, false);

        htmlParts.push(`<h2>${secHeading}</h2>`);
        htmlParts.push(`<p>${secContent}</p>`);
        textParts.push(`\n## ${secHeadingRaw}\n${secContentRaw}`);

        if (sec.quote) {
          const quoteHtml = kw ? injectKeyword(sec.quote, kw, true) : sec.quote;
          const quoteRaw = kw ? injectKeyword(sec.quote, kw, false) : sec.quote;
          htmlParts.push(`<blockquote>« ${quoteHtml} »</blockquote>`);
          textParts.push(`\n> « ${quoteRaw} »`);
        }

        if (sec.subHeading) {
          htmlParts.push(`<h3>${sec.subHeading}</h3>`);
          htmlParts.push(`<p>${sec.subContent}</p>`);
          textParts.push(`\n### ${sec.subHeading}\n${sec.subContent}`);
        }

        if (sec.list && sec.list.length) {
          const listItemsHtml = sec.list.map(li => `  <li>${li}</li>`).join('\n');
          htmlParts.push(`<ul>\n${listItemsHtml}\n</ul>`);
          textParts.push('\n' + sec.list.map(li => `• ${li}`).join('\n'));
        }

        jsonData.push({
          id: idx + 2,
          type: "section",
          heading: secHeadingRaw,
          content: secContentRaw,
          subHeading: sec.subHeading || null,
          list: sec.list || []
        });
      });

      // Conclusion
      htmlParts.push(`<h3>${blogData.conclusionHeading}</h3>`);
      htmlParts.push(`<p>${blogData.conclusionText}</p>`);
      textParts.push(`\n### ${blogData.conclusionHeading}\n${blogData.conclusionText}`);

      jsonData.push({
        id: 99,
        type: "conclusion",
        heading: blogData.conclusionHeading,
        content: blogData.conclusionText
      });

      outputHtml = htmlParts.join('\n\n');
      outputText = textParts.join('\n\n');
    }

  // ۲. حالت میکروکپی‌های UI (Microcopy Presets)
  } else if (state.type === 'microcopy') {
    const microData = allData.microcopy;

    if (state.subType === 'faq') {
      const faqs = microData.faq || [];
      let htmlParts = [`<h2>سوالات متداول (FAQ)</h2>`];
      let textParts = [`## سوالات متداول (FAQ)\n`];

      faqs.forEach((item, i) => {
        const qHtml = kw ? injectKeyword(item.question, kw, true) : item.question;
        const qRaw = kw ? injectKeyword(item.question, kw, false) : item.question;
        const aHtml = kw && i === 0 ? injectKeyword(item.answer, kw, true) : item.answer;
        const aRaw = kw && i === 0 ? injectKeyword(item.answer, kw, false) : item.answer;

        htmlParts.push(`
<div class="faq-item">
  <div class="faq-question">❓ ${qHtml}</div>
  <p class="text-sm text-slate-300 mt-1">${aHtml}</p>
</div>`);
        textParts.push(`سؤال: ${qRaw}\nپاسخ: ${aRaw}\n`);

        jsonData.push({
          id: i + 1,
          question: qRaw,
          answer: aRaw
        });

        currentFaqs.push({
          question: qRaw,
          answer: aRaw
        });
      });

      outputHtml = htmlParts.join('\n');
      outputText = textParts.join('\n');

      // Generate Google Schema
      state.generatedFaqSchema = generateFaqSchemaJson(currentFaqs);

    } else if (state.subType === 'testimonials') {
      const testimonials = microData.testimonials || [];
      let htmlParts = [`<h2>دیدگاه‌ها و نظرات مشتریان</h2>`];
      let textParts = [`## نظرات مشتریان\n`];

      testimonials.forEach((item, i) => {
        const commentHtml = kw ? injectKeyword(item.comment, kw, true) : item.comment;
        const commentRaw = kw ? injectKeyword(item.comment, kw, false) : item.comment;

        htmlParts.push(`
<div class="testimonial-card">
  <div class="flex items-center justify-between mb-2">
    <div>
      <h4 class="font-bold text-white text-sm">${item.name}</h4>
      <p class="text-xs text-indigo-300">${item.role}</p>
    </div>
    <span class="text-amber-400 text-sm">★★★★★</span>
  </div>
  <p class="text-sm text-slate-300 italic leading-relaxed">« ${commentHtml} »</p>
</div>`);

        textParts.push(`نام: ${item.name} (${item.role})\nامتیاز: ۵ از ۵\nنظر: « ${commentRaw} »\n`);

        jsonData.push({
          id: i + 1,
          author: item.name,
          role: item.role,
          rating: item.rating,
          comment: commentRaw
        });
      });

      outputHtml = htmlParts.join('\n');
      outputText = textParts.join('\n');

    } else if (state.subType === 'pricing') {
      const pricing = microData.pricing || [];
      let htmlParts = [`<h2>کارتهای جدول قیمت‌گذاری</h2>`];
      let textParts = [`## جدول پلن‌های قیمت‌گذاری\n`];

      pricing.forEach((plan, i) => {
        htmlParts.push(`
<div class="pricing-card">
  <div class="flex items-center justify-between mb-2">
    <h3 class="text-base font-bold text-white">${plan.title}</h3>
    <span class="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">${plan.badge}</span>
  </div>
  <div class="text-xl font-black text-cyan-400 my-2">${plan.price} <span class="text-xs text-slate-400 font-normal">/ ${plan.period}</span></div>
  <p class="text-xs text-slate-400 mb-3">${plan.description}</p>
  <ul class="text-xs text-slate-300 space-y-1 mb-4">
    ${plan.features.map(f => `<li>✓ ${f}</li>`).join('')}
  </ul>
  <div class="cta-box text-center cursor-pointer font-bold text-xs">${plan.buttonText}</div>
</div>`);

        textParts.push(`پلن: ${plan.title} (${plan.badge})\nقیمت: ${plan.price} / ${plan.period}\nویژگی‌ها:\n` + plan.features.map(f => `- ${f}`).join('\n') + `\nاقدام: ${plan.buttonText}\n`);

        jsonData.push({
          id: i + 1,
          plan: plan.title,
          badge: plan.badge,
          price: plan.price,
          period: plan.period,
          description: plan.description,
          features: plan.features,
          cta: plan.buttonText
        });
      });

      outputHtml = htmlParts.join('\n');
      outputText = textParts.join('\n');
    }

  // ۳. حالت استاندارد، لندینگ، درباره ما و کال‌تواکشن
  } else {
    const dataset = allData[state.type] || allData.standard;
    const outputHtmlPieces = [];
    const outputTextPieces = [];

    if (state.unit === 'paragraphs') {
      const pPool = shuffleArray(dataset.paragraphs);
      const hPool = shuffleArray(dataset.headings);

      for (let i = 0; i < state.count; i++) {
        let pText = pPool[i % pPool.length];
        if (kw && (i === 0 || i === Math.floor(state.count / 2))) {
          pText = injectKeyword(pText, kw, false);
        }

        // Add Heading if requested
        if (state.htmlTags && state.includeHeadings && (i === 0 || i % 2 === 0)) {
          let hText = hPool[(Math.floor(i / 2)) % hPool.length];
          if (kw && i === 0) hText = `${hText} (${kw})`;
          outputHtmlPieces.push(`<h2>${hText}</h2>`);
          outputTextPieces.push(`## ${hText}\n`);

          jsonData.push({
            id: jsonData.length + 1,
            type: "heading",
            content: hText
          });
        }

        const pTextHtml = kw ? injectKeyword(pPool[i % pPool.length], kw, true) : pText;
        outputHtmlPieces.push(`<p>${pTextHtml}</p>`);
        outputTextPieces.push(pText);

        jsonData.push({
          id: jsonData.length + 1,
          type: "paragraph",
          content: pText
        });

        // Add list if requested
        if (state.htmlTags && state.includeList && i === 1 && dataset.listItems) {
          const listHtml = `<ul>\n` + dataset.listItems.map(item => `  <li>${item}</li>`).join('\n') + `\n</ul>`;
          outputHtmlPieces.push(listHtml);
          outputTextPieces.push(dataset.listItems.map(item => `• ${item}`).join('\n'));

          jsonData.push({
            id: jsonData.length + 1,
            type: "list",
            items: dataset.listItems
          });
        }
      }

      if (state.type === 'cta' && state.htmlTags && dataset.callout) {
        outputHtmlPieces.push(`<div class="cta-box">${dataset.callout}</div>`);
        outputTextPieces.push(`[ اقدام: ${dataset.callout} ]`);
      }

    } else {
      // Words Mode
      const allWords = (dataset.paragraphs || []).join(' ').replace(/[,.!؟;،]/g, '').split(/\s+/).filter(Boolean);
      const selectedWords = [];
      let wordIndex = 0;

      while (selectedWords.length < state.count && allWords.length > 0) {
        selectedWords.push(allWords[wordIndex % allWords.length]);
        wordIndex++;
      }

      let rawWordString = selectedWords.join(' ') + '...';
      if (kw) {
        rawWordString = injectKeyword(rawWordString, kw, false);
      }

      const wordHtml = kw ? injectKeyword(selectedWords.join(' ') + '...', kw, true) : rawWordString;

      outputHtmlPieces.push(`<p>${wordHtml}</p>`);
      outputTextPieces.push(rawWordString);

      jsonData.push({
        id: 1,
        type: "words",
        count: state.count,
        content: rawWordString
      });
    }

    outputHtml = outputHtmlPieces.join('\n\n');
    outputText = outputTextPieces.join('\n\n');
  }

  state.generatedHtml = outputHtml;
  state.generatedText = (state.htmlTags && state.type !== 'blog' && state.type !== 'microcopy') ? outputHtml : outputText;
  state.generatedJson = JSON.stringify(jsonData, null, 2);

  // Toggle FAQ Schema Button visibility
  if (state.type === 'microcopy' && state.subType === 'faq') {
    DOM.btnCopyFaqSchema.classList.remove('hidden');
  } else {
    DOM.btnCopyFaqSchema.classList.add('hidden');
  }

  updateDisplay();
}

// --- UI Display & Live SEO Statistics ---
function updateDisplay() {
  if (!DOM.outputRendered) return;

  // Render Visual with smooth animation
  DOM.outputRendered.classList.remove('content-enter-active');
  void DOM.outputRendered.offsetWidth; // trigger reflow
  DOM.outputRendered.classList.add('content-enter-active');

  DOM.outputRendered.innerHTML = state.generatedHtml || '<p class="text-slate-500 italic">هنوز محتوایی تولید نشده است...</p>';

  // Render Raw Code
  DOM.outputRaw.value = state.generatedText;

  // Render JSON
  DOM.outputJson.value = state.generatedJson;

  // Calculate live statistics
  const textForStats = DOM.outputRendered.innerText || '';
  const wordsCount = textForStats.trim() ? textForStats.trim().split(/\s+/).length : 0;
  const charsCount = textForStats.length;
  const paragraphsCount = DOM.outputRendered.querySelectorAll('p').length || 1;

  DOM.statParagraphs.textContent = paragraphsCount.toLocaleString('fa-IR');
  DOM.statWords.textContent = wordsCount.toLocaleString('fa-IR');
  DOM.statChars.textContent = charsCount.toLocaleString('fa-IR');

  // Estimate Reading Time (avg 180 words/min)
  const minutes = Math.ceil(wordsCount / 180);
  if (wordsCount === 0) {
    DOM.statReadingTime.textContent = '۰ دقیقه';
  } else if (minutes <= 1) {
    DOM.statReadingTime.textContent = 'کمتر از ۱ دقیقه';
  } else {
    DOM.statReadingTime.textContent = `حدود ${minutes.toLocaleString('fa-IR')} دقیقه`;
  }

  // SEO Text Length Assessment
  evaluateSeoLength(wordsCount);
}

// وضعیت هوشمند طول متن برای سئو
function evaluateSeoLength(words) {
  if (!DOM.statSeoLength || !DOM.seoBadgeDot) return;

  DOM.seoBadgeDot.className = "w-2.5 h-2.5 rounded-full";

  if (words < 300) {
    DOM.seoBadgeDot.classList.add('bg-amber-400');
    DOM.statSeoLength.className = 'font-bold text-amber-300 text-xs';
    DOM.statSeoLength.textContent = 'کوتاه (مناسب بنر و شبکه‌های اجتماعی)';
  } else if (words >= 300 && words <= 850) {
    DOM.seoBadgeDot.classList.add('bg-cyan-400');
    DOM.statSeoLength.className = 'font-bold text-cyan-300 text-xs';
    DOM.statSeoLength.textContent = 'متوسط (استاندارد لندینگ پیج و خدمات)';
  } else if (words > 850 && words <= 2200) {
    DOM.seoBadgeDot.classList.add('bg-emerald-400');
    DOM.statSeoLength.className = 'font-bold text-emerald-300 text-xs';
    DOM.statSeoLength.textContent = 'ایده‌آل (استاندارد مقاله وبلاگی سئومحور)';
  } else {
    DOM.seoBadgeDot.classList.add('bg-purple-400');
    DOM.statSeoLength.className = 'font-bold text-purple-300 text-xs';
    DOM.statSeoLength.textContent = 'جامع (راهنمای عمیق و Pillar Page)';
  }
}

// --- Toast System ---
let toastTimeout;
function showToast(title, message) {
  if (!DOM.toast) return;
  DOM.toastTitle.textContent = title;
  DOM.toastMessage.textContent = message;

  DOM.toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
  DOM.toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    DOM.toast.classList.remove('translate-y-0', 'opacity-100');
    DOM.toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
  }, 3000);
}

// --- Unit Switching ---
function setUnit(newUnit) {
  if (state.unit === newUnit) return;
  state.unit = newUnit;

  if (newUnit === 'paragraphs') {
    DOM.unitParagraphsBtn.classList.add('bg-indigo-600', 'text-white', 'font-bold');
    DOM.unitParagraphsBtn.classList.remove('text-slate-400');
    DOM.unitWordsBtn.classList.remove('bg-indigo-600', 'text-white', 'font-bold');
    DOM.unitWordsBtn.classList.add('text-slate-400');

    DOM.unitLabel.textContent = 'پاراگراف';
    DOM.countRange.min = 1;
    DOM.countRange.max = 25;
    DOM.rangeMin.textContent = '1';
    DOM.rangeQuarter.textContent = '6';
    DOM.rangeMid.textContent = '12';
    DOM.rangeMax.textContent = '25';

    DOM.presetChipsContainer.innerHTML = `
      <button type="button" data-val="1" class="preset-chip text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition">۱</button>
      <button type="button" data-val="3" class="preset-chip active-chip text-xs px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 transition">۳</button>
      <button type="button" data-val="5" class="preset-chip text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition">۵</button>
      <button type="button" data-val="10" class="preset-chip text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition">۱۰</button>
    `;

    state.count = 3;
    DOM.countRange.value = 3;
    DOM.countInput.value = 3;
  } else {
    DOM.unitWordsBtn.classList.add('bg-indigo-600', 'text-white', 'font-bold');
    DOM.unitWordsBtn.classList.remove('text-slate-400');
    DOM.unitParagraphsBtn.classList.remove('bg-indigo-600', 'text-white', 'font-bold');
    DOM.unitParagraphsBtn.classList.add('text-slate-400');

    DOM.unitLabel.textContent = 'کلمه';
    DOM.countRange.min = 15;
    DOM.countRange.max = 500;
    DOM.rangeMin.textContent = '15';
    DOM.rangeQuarter.textContent = '120';
    DOM.rangeMid.textContent = '250';
    DOM.rangeMax.textContent = '500';

    DOM.presetChipsContainer.innerHTML = `
      <button type="button" data-val="30" class="preset-chip text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition">۳۰</button>
      <button type="button" data-val="75" class="preset-chip text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition">۷۵</button>
      <button type="button" data-val="150" class="preset-chip active-chip text-xs px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 transition">۱۵۰</button>
      <button type="button" data-val="300" class="preset-chip text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition">۳۰۰</button>
    `;

    state.count = 150;
    DOM.countRange.value = 150;
    DOM.countInput.value = 150;
  }

  bindPresetChips();
  generateContent();
}

function bindPresetChips() {
  const chips = document.querySelectorAll('.preset-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = parseInt(chip.dataset.val, 10);
      state.count = val;
      DOM.countRange.value = val;
      DOM.countInput.value = val;
      updateActivePresetChip(val);
      generateContent();
    });
  });
}

function updateActivePresetChip(currentVal) {
  const chips = document.querySelectorAll('.preset-chip');
  chips.forEach(chip => {
    if (parseInt(chip.dataset.val, 10) === currentVal) {
      chip.classList.add('bg-indigo-500/20', 'text-indigo-300', 'border', 'border-indigo-500/40');
      chip.classList.remove('bg-slate-800/80', 'text-slate-300');
    } else {
      chip.classList.remove('bg-indigo-500/20', 'text-indigo-300', 'border', 'border-indigo-500/40');
      chip.classList.add('bg-slate-800/80', 'text-slate-300');
    }
  });
}

// --- Event Listeners Initialization ---
function initEvents() {
  // Main Type Selection
  DOM.typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.typeButtons.forEach(b => {
        b.classList.remove('active', 'border-indigo-500/80', 'bg-indigo-500/15', 'shadow-glow-indigo');
        b.classList.add('border-white/5', 'bg-slate-800/40');
      });
      btn.classList.add('active', 'border-indigo-500/80', 'bg-indigo-500/15', 'shadow-glow-indigo');
      btn.classList.remove('border-white/5', 'bg-slate-800/40');

      state.type = btn.dataset.type;

      // Handle visibility of sub-selectors & length controls
      if (state.type === 'microcopy') {
        DOM.microcopySubSelector.classList.remove('hidden');
        DOM.quantityCard.classList.add('opacity-40', 'pointer-events-none');
      } else if (state.type === 'blog') {
        DOM.microcopySubSelector.classList.add('hidden');
        DOM.quantityCard.classList.add('opacity-40', 'pointer-events-none');
      } else {
        DOM.microcopySubSelector.classList.add('hidden');
        DOM.quantityCard.classList.remove('opacity-40', 'pointer-events-none');
      }

      generateContent();
    });
  });

  // Microcopy Sub-types (FAQ / Testimonials / Pricing)
  DOM.subTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.subTypeButtons.forEach(b => {
        b.classList.remove('active-sub', 'bg-indigo-600', 'text-white', 'font-bold');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });
      btn.classList.add('active-sub', 'bg-indigo-600', 'text-white', 'font-bold');
      btn.classList.remove('bg-slate-800', 'text-slate-300');

      state.subType = btn.dataset.subtype;
      generateContent();
    });
  });

  // Live Font Preview Selector
  DOM.fontSelect.addEventListener('change', (e) => {
    const newFont = e.target.value;
    DOM.outputRendered.classList.remove(state.selectedFont);
    DOM.outputRendered.classList.add(newFont);
    state.selectedFont = newFont;
  });

  // Live Font Size Buttons
  DOM.fontSizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.fontSizeButtons.forEach(b => {
        b.classList.remove('active-size', 'bg-indigo-600', 'text-white', 'font-bold');
        b.classList.add('text-slate-300');
      });
      btn.classList.add('active-size', 'bg-indigo-600', 'text-white', 'font-bold');
      btn.classList.remove('text-slate-300');

      const size = parseInt(btn.dataset.size, 10);
      state.fontSize = size;
      DOM.outputRendered.style.fontSize = `${size}px`;
    });
  });

  // Placeholder Image Tool Actions (if elements present)
  if (DOM.imgChips) {
    DOM.imgChips.forEach(chip => {
      chip.addEventListener('click', () => {
        if (DOM.imgWidth) DOM.imgWidth.value = chip.dataset.w;
        if (DOM.imgHeight) DOM.imgHeight.value = chip.dataset.h;
      });
    });
  }

  if (DOM.btnCopyImgTag) {
    DOM.btnCopyImgTag.addEventListener('click', async () => {
      const { tag } = getPlaceholderData();
      try {
        await navigator.clipboard.writeText(tag);
        showToast('تگ تصویر کپی شد!', 'تگ <img> آماده قرارگیری در کد HTML شماست.');
      } catch (e) {
        showToast('کپی شد!', tag);
      }
    });
  }

  if (DOM.btnCopyImgUrl) {
    DOM.btnCopyImgUrl.addEventListener('click', async () => {
      const { url } = getPlaceholderData();
      try {
        await navigator.clipboard.writeText(url);
        showToast('لینک تصویر کپی شد!', 'آدرس مستقیم تصویر ماکت در کلیپ‌بورد ذخیره شد.');
      } catch (e) {
        showToast('کپی شد!', url);
      }
    });
  }

  // SEO Keyword Input
  DOM.seoKeywordInput.addEventListener('input', (e) => {
    state.keyword = e.target.value;
    if (state.keyword.trim()) {
      DOM.btnClearKeyword.classList.remove('hidden');
    } else {
      DOM.btnClearKeyword.classList.add('hidden');
    }
    generateContent();
  });

  DOM.btnClearKeyword.addEventListener('click', () => {
    DOM.seoKeywordInput.value = '';
    state.keyword = '';
    DOM.btnClearKeyword.classList.add('hidden');
    generateContent();
  });

  // Units
  DOM.unitParagraphsBtn.addEventListener('click', () => setUnit('paragraphs'));
  DOM.unitWordsBtn.addEventListener('click', () => setUnit('words'));

  // Slider & Numeric Input Synchronized
  DOM.countRange.addEventListener('input', (e) => {
    state.count = parseInt(e.target.value, 10);
    DOM.countInput.value = state.count;
    updateActivePresetChip(state.count);
    generateContent();
  });

  DOM.countInput.addEventListener('change', (e) => {
    let val = parseInt(e.target.value, 10);
    const min = parseInt(DOM.countRange.min, 10);
    const max = parseInt(DOM.countRange.max, 10);
    if (isNaN(val) || val < min) val = min;
    if (val > max) val = max;
    state.count = val;
    DOM.countInput.value = val;
    DOM.countRange.value = val;
    updateActivePresetChip(val);
    generateContent();
  });

  bindPresetChips();

  // HTML Options
  DOM.optHtmlTags.addEventListener('change', (e) => {
    state.htmlTags = e.target.checked;
    if (state.htmlTags) {
      DOM.subHtmlOptions.classList.remove('opacity-40', 'pointer-events-none');
    } else {
      DOM.subHtmlOptions.classList.add('opacity-40', 'pointer-events-none');
    }
    generateContent();
  });

  DOM.optIncludeHeadings.addEventListener('change', (e) => {
    state.includeHeadings = e.target.checked;
    generateContent();
  });

  DOM.optIncludeList.addEventListener('change', (e) => {
    state.includeList = e.target.checked;
    generateContent();
  });

  // Tab Switching (Preview vs Raw vs JSON)
  DOM.tabPreview.addEventListener('click', () => switchTab('preview'));
  DOM.tabRaw.addEventListener('click', () => switchTab('raw'));
  DOM.tabJson.addEventListener('click', () => switchTab('json'));

  function switchTab(tabName) {
    state.activeTab = tabName;

    // Reset tab active states
    [DOM.tabPreview, DOM.tabRaw, DOM.tabJson].forEach(tab => {
      tab.classList.remove('bg-indigo-600', 'text-white');
      tab.classList.add('text-slate-400');
    });

    // Hide all viewports
    DOM.outputRendered.classList.add('hidden');
    DOM.outputRaw.classList.add('hidden');
    DOM.outputJson.classList.add('hidden');

    if (tabName === 'preview') {
      DOM.tabPreview.classList.add('bg-indigo-600', 'text-white');
      DOM.tabPreview.classList.remove('text-slate-400');
      DOM.outputRendered.classList.remove('hidden');
    } else if (tabName === 'raw') {
      DOM.tabRaw.classList.add('bg-indigo-600', 'text-white');
      DOM.tabRaw.classList.remove('text-slate-400');
      DOM.outputRaw.classList.remove('hidden');
    } else if (tabName === 'json') {
      DOM.tabJson.classList.add('bg-indigo-600', 'text-white');
      DOM.tabJson.classList.remove('text-slate-400');
      DOM.outputJson.classList.remove('hidden');
    }
  }

  // Generate Button
  DOM.btnGenerate.addEventListener('click', () => {
    DOM.generateIcon.classList.add('rotate-180');
    setTimeout(() => DOM.generateIcon.classList.remove('rotate-180'), 500);
    generateContent();
  });

  // Copy Text/HTML
  DOM.btnCopy.addEventListener('click', async () => {
    const textToCopy = (state.activeTab === 'preview' && state.htmlTags) 
      ? state.generatedHtml 
      : state.generatedText;

    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      const originalText = DOM.copyText.textContent;
      DOM.copyText.textContent = 'کپی شد!';
      DOM.btnCopy.classList.add('bg-emerald-600', 'text-white');
      DOM.btnCopy.classList.remove('bg-indigo-500/20', 'text-indigo-300');

      showToast('کپی شد!', 'محتوا با موفقیت به حافظه کلیپ‌بورد سیستم انتقال یافت.');

      setTimeout(() => {
        DOM.copyText.textContent = originalText;
        DOM.btnCopy.classList.remove('bg-emerald-600', 'text-white');
        DOM.btnCopy.classList.add('bg-indigo-500/20', 'text-indigo-300');
      }, 2200);

    } catch (err) {
      DOM.outputRaw.classList.remove('hidden');
      DOM.outputRaw.select();
      document.execCommand('copy');
      if (state.activeTab !== 'raw') DOM.outputRaw.classList.add('hidden');
      showToast('کپی شد!', 'متن به کلیپ‌بورد کپی گردید.');
    }
  });

  // Copy JSON
  DOM.btnCopyJson.addEventListener('click', async () => {
    const jsonToCopy = state.generatedJson;
    if (!jsonToCopy) return;

    try {
      await navigator.clipboard.writeText(jsonToCopy);
      DOM.btnCopyJson.classList.add('bg-emerald-600', 'text-white');
      DOM.btnCopyJson.classList.remove('bg-emerald-500/20', 'text-emerald-300');

      showToast('آبجکت JSON کپی شد!', 'داده‌های ساختاریافته JSON با موفقیت کپی گردید.');

      setTimeout(() => {
        DOM.btnCopyJson.classList.remove('bg-emerald-600', 'text-white');
        DOM.btnCopyJson.classList.add('bg-emerald-500/20', 'text-emerald-300');
      }, 2200);

    } catch (err) {
      DOM.outputJson.classList.remove('hidden');
      DOM.outputJson.select();
      document.execCommand('copy');
      if (state.activeTab !== 'json') DOM.outputJson.classList.add('hidden');
      showToast('کپی شد!', 'ساختار JSON به کلیپ‌بورد منتقل شد.');
    }
  });

  // Copy FAQ Schema (NEW)
  DOM.btnCopyFaqSchema.addEventListener('click', async () => {
    if (!state.generatedFaqSchema) return;

    try {
      await navigator.clipboard.writeText(state.generatedFaqSchema);
      showToast('کد اسکیما FAQ کپی شد!', 'کد اسکیما JSON-LD گوگل با موفقیت در کلیپ‌بورد ذخیره شد.');
    } catch (err) {
      showToast('کپی شد!', 'کد اسکیما کپی شد.');
    }
  });

  // Download File
  DOM.btnDownload.addEventListener('click', () => {
    let contentToDownload = state.generatedText;
    let extension = 'txt';
    let mimeType = 'text/plain;charset=utf-8';

    if (state.activeTab === 'json') {
      contentToDownload = state.generatedJson;
      extension = 'json';
      mimeType = 'application/json;charset=utf-8';
    } else if (state.htmlTags || state.type === 'blog' || state.type === 'microcopy') {
      contentToDownload = state.generatedHtml;
      extension = 'html';
      mimeType = 'text/html;charset=utf-8';
    }

    const filename = `lorem-plus-${state.type}-${Date.now()}.${extension}`;
    const blob = new Blob([contentToDownload], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('دانلود آغاز شد', `فایل «${filename}» با موفقیت ذخیره گردید.`);
  });

  // Clear Content
  DOM.btnClear.addEventListener('click', () => {
    state.generatedText = '';
    state.generatedHtml = '';
    state.generatedJson = '';
    state.generatedFaqSchema = '';
    DOM.outputRendered.innerHTML = '<p class="text-slate-500 italic text-center py-12">محتوا پاک شد. روی دکمه «تولید محتوای هوشمند جدید» کلیک کنید.</p>';
    DOM.outputRaw.value = '';
    DOM.outputJson.value = '';
    DOM.statParagraphs.textContent = '۰';
    DOM.statWords.textContent = '۰';
    DOM.statChars.textContent = '۰';
    DOM.statReadingTime.textContent = '۰ دقیقه';
    evaluateSeoLength(0);
    showToast('پاکسازی شد', 'محتوای صفحه بازنشانی گردید.');
  });
}

// --- App Bootstrap ---
function bootApp() {
  initDOM();
  initEvents();
  generateContent();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
