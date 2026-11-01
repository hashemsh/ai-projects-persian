/**
 * پرامپت پلاس | موتور هوشمند کامپایل و مهندسی پرامپت
 * CORS-safe for file:/// and HTTP
 */
window.PromptGenerator = {
  compile: async function(options) {
    const raw = (options.rawPrompt || '').trim();
    if (!raw) return '';

    const model = options.model || 'general';
    const personaId = options.persona || 'auto';
    const tone = options.tone || 'professional';
    const lang = options.language || 'bilingual';
    const cot = options.cot !== false;

    // Detect persona from Persian or English keywords
    let persona = (window.PromptData.personas || []).find(p => p.id === personaId);
    if (!persona || persona.id === 'auto') {
      persona = this.detectPersona(raw);
    }

    // Midjourney / Image prompt mode
    if (model === 'image') {
      const enSubject = await window.PromptTranslator.translateToEn(raw);
      return `/imagine prompt: Cinematic high-end visual of ${enSubject}, dramatic lighting, 8k resolution, photorealistic, 85mm lens, f/1.8, bokeh, award-winning composition --ar 16:9 --v 6.0 --style raw`;
    }

    const extracted = window.PromptTranslator.extractConstraints(raw);

    if (lang === 'bilingual') {
      const enTask = await window.PromptTranslator.translateToEn(raw);
      return this.buildBilingual(enTask, persona, tone, model, cot, extracted.en);
    } else if (lang === 'en') {
      const enTask = await window.PromptTranslator.translateToEn(raw);
      return this.buildEnglish(enTask, persona, tone, model, cot, extracted.en);
    } else {
      return this.buildPersian(raw, persona, tone, model, cot, extracted.fa);
    }
  },

  detectPersona: function(text) {
    const t = text.toLowerCase();
    const personas = window.PromptData.personas;
    if (/کد|پایتون|برنامه|اسکریپت|sql|html|css|js|react|باگ|تابع|python|code|developer/i.test(t)) {
      return personas.find(p => p.id === 'developer');
    }
    if (/سئو|رتبه|گوگل|کیورد|کلمات کلیدی|اسکیما|محتوا|سرچ|seo|ranking/i.test(t)) {
      return personas.find(p => p.id === 'seo_expert');
    }
    if (/فروش|تبلیغ|تیتر|کپشن|اینستاگرام|جذب|ایمیل|cta|copywriter|ad/i.test(t)) {
      return personas.find(p => p.id === 'copywriter');
    }
    if (/تحقیق|مقاله|دانشگاه|پایان‌نامه|روش تحقیق|علمی|academic|research/i.test(t)) {
      return personas.find(p => p.id === 'academic');
    }
    if (/کسب‌وکار|استارتاپ|درآمد|سود|swot|بیزینس|استراتژی|business/i.test(t)) {
      return personas.find(p => p.id === 'business_coach');
    }
    return personas.find(p => p.id === 'developer');
  },

  buildBilingual: function(taskEn, persona, tone, model, cot, customRules) {
    const cotText = cot ? '\n- **Reasoning Process**: Think step-by-step and outline your methodology prior to generating code or final solutions.' : '';
    const modelNote = this.getModelDirectives(model, 'en');
    const extraRules = (customRules && customRules.length > 0)
      ? '\n' + customRules.map(r => `- **Constraint**: ${r}`).join('\n')
      : '';

    return `### Role & Professional Persona
${persona.roleEn}

### Primary Objective & Task
Execute the following prompt with maximum domain precision and technical depth:
"${taskEn}"

### Communication Tone & Constraints
- **Tone**: ${tone}
- Deliver high-signal, production-grade output without unnecessary pleasantries or filler.${extraRules}${cotText}${modelNote}

### Output Language & Structure
- **CRITICAL**: Deliver your complete final response, explanations, and comments in fluent, natural **Persian (فارسی)**.
- Use structured Markdown formatting with clean headings, bullet points, and code blocks where relevant.`;
  },

  buildPersian: function(taskFa, persona, tone, model, cot, customRules) {
    const cotText = cot ? '\n- **تحلیل گام‌به‌گام**: ابتدا مسیر حل مسئله را ترسیم کرده و گام‌به‌گام پیش برو.' : '';
    const modelNote = this.getModelDirectives(model, 'fa');
    const extraRules = (customRules && customRules.length > 0)
      ? '\n' + customRules.map(r => `- **قید اجرایی**: ${r}`).join('\n')
      : '';

    return `### ۱. نقش و هویت هوش مصنوعی
${persona.roleFa}

### ۲. وظیفه اصلی (Objective)
درخواست زیر را با بالاترین کیفیت، دقت فنی و استانداردهای جهانی انجام بده:
«${taskFa}»

### ۳. لحن و قیود اجرایی
- **لحن**: ${tone}
- از تعارفات معمول و حاشیه‌پردازی خودداری کن؛ پاسخ باید مستقیماً عملیاتی باشد.${extraRules}${cotText}${modelNote}

### ۴. فرمت خروجی مطلوب
- ساختار خروجی با مارک‌داون استاندارد، تیترهای مشخص، بولت‌پوینت‌ها و بلوک‌های کد تفکیک‌شده باشد.`;
  },

  buildEnglish: function(taskEn, persona, tone, model, cot, customRules) {
    const cotText = cot ? '\n- **Reasoning**: Think step-by-step prior to producing the result.' : '';
    const modelNote = this.getModelDirectives(model, 'en');
    const extraRules = (customRules && customRules.length > 0)
      ? '\n' + customRules.map(r => `- **Constraint**: ${r}`).join('\n')
      : '';

    return `### Expert Persona
${persona.roleEn}

### User Goal & Scope
"${taskEn}"

### Instructions & Constraints
- Maintain a **${tone}** tone.
- High accuracy, production-ready quality with zero filler content.${extraRules}${cotText}${modelNote}

### Deliverable Format
- Structured Markdown, bold key takeaways, and complete clean code blocks.`;
  },

  getModelDirectives: function(model, lang) {
    if (model === 'claude') {
      return lang === 'en'
        ? '\n- **Claude Optimization**: Encapsulate primary data and logic within semantic XML tags.'
        : '\n- **بهینه‌سازی Claude**: ساختار داده‌ها را با تگ‌های معنایی تفکیک کن.';
    }
    if (model === 'deepseek') {
      return lang === 'en'
        ? '\n- **DeepSeek CoT**: Showcase thorough chain-of-thought analysis prior to the solution.'
        : '\n- **بهینه‌سازی DeepSeek**: ابتدا مسیر منطقی و فرضیات را تحلیل کن.';
    }
    return '';
  }
};
