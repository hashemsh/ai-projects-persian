import { PERSONAS } from '../data/personas.js';

/**
 * Intelligent Prompt Engine & Compiler
 */
export function compilePrompt({
  rawPrompt,
  targetModel = 'general',
  persona = 'auto',
  tone = 'professional',
  language = 'bilingual',
  cotEnabled = true
}) {
  const cleanInput = rawPrompt.trim();
  if (!cleanInput) return '';

  // 1. Resolve Persona
  let matchedPersona = PERSONAS.find(p => p.id === persona);
  if (!matchedPersona || matchedPersona.id === 'auto') {
    matchedPersona = detectBestPersona(cleanInput);
  }

  // 2. Special Image Generation Handling
  if (targetModel === 'image') {
    return buildImagePrompt(cleanInput, tone);
  }

  // 3. Bilingual vs Persian Generation
  if (language === 'bilingual') {
    return buildBilingualPrompt(cleanInput, matchedPersona, tone, targetModel, cotEnabled);
  } else if (language === 'en') {
    return buildEnglishPrompt(cleanInput, matchedPersona, tone, targetModel, cotEnabled);
  } else {
    return buildPersianPrompt(cleanInput, matchedPersona, tone, targetModel, cotEnabled);
  }
}

function detectBestPersona(input) {
  const lower = input.toLowerCase();
  if (/کد|پایتون|جاوا|برنامه|فرانت|بک‌اند|html|css|js|sql|bug|react|function/i.test(lower)) {
    return PERSONAS.find(p => p.id === 'developer');
  }
  if (/سئو|رتبه|گوگل|کیورد|کلمات کلیدی|بک لینک|rank/i.test(lower)) {
    return PERSONAS.find(p => p.id === 'seo_expert');
  }
  if (/فروش|کپشن|اینستاگرام|تبلیغ|تیتر|محصول|جذب|ایمیل/i.test(lower)) {
    return PERSONAS.find(p => p.id === 'copywriter');
  }
  if (/تحقیق|مقاله|دانشگاه|پایان‌نامه|استناد|علمی|پژوهش/i.test(lower)) {
    return PERSONAS.find(p => p.id === 'academic');
  }
  if (/کسب‌وکار|استارتاپ|استراتژی|درآمد|سود|swot|بیزنس/i.test(lower)) {
    return PERSONAS.find(p => p.id === 'business_coach');
  }
  return PERSONAS.find(p => p.id === 'developer');
}

function buildBilingualPrompt(task, persona, tone, model, cot) {
  let modelDirectives = getModelDirectives(model, 'en');
  let cotText = cot ? '\n- **Reasoning**: Think step-by-step before delivering the final output.' : '';

  return `### Role & Context
${persona.roleEn}

### Objective & Task
You must execute the following task with the highest standard of excellence:
"${task}"

### Tone & Communication Style
- Deliver the response with a **${tone}** tone.
- Avoid unnecessary conversational fluff, greetings, or filler sentences.
- Provide structured, practical, and in-depth explanations.${cotText}${modelDirectives}

### Output Language & Format
- **CRITICAL**: Respond completely in fluent, natural **Persian (فارسی)**.
- Format the response using clean Markdown with clear headings, bullet points, and code blocks (if applicable).`;
}

function buildPersianPrompt(task, persona, tone, model, cot) {
  let modelDirectives = getModelDirectives(model, 'fa');
  let cotText = cot ? '\n- **تحلیل گام‌به‌گام**: ابتدا مسئله را به بخش‌های کوچک تقسیم کرده و گام‌به‌گام استدلال کن.' : '';

  return `### ۱. نقش و هویت هوش مصنوعی
${persona.roleFa}

### ۲. وظیفه اصلی (Objective)
وظیفه تو انجام درخواست زیر با بالاترین دقت و کیفیت تخصصی است:
«${task}»

### ۳. لحن و خط‌مشی اجرایی
- **لحن**: ${tone}
- از تعارفات بیهوده، مقدمه‌چینی اضافی و نتیجه‌گیری‌های کلیشه‌ای خودداری کن.
- پاسخ باید عمیق، کاربردی و ساختاریافته باشد.${cotText}${modelDirectives}

### ۴. فرمت خروجی مطلوب
- خروجی را با مارک‌داون منظم (تیترها، لیست‌های نقطه‌ای و بخش‌های مجزا) ارائه بده.`;
}

function buildEnglishPrompt(task, persona, tone, model, cot) {
  let modelDirectives = getModelDirectives(model, 'en');
  let cotText = cot ? '\n- **Reasoning**: Think step-by-step prior to producing the result.' : '';

  return `### System Role
${persona.roleEn}

### User Goal
"${task}"

### Constraints & Instructions
- Maintain a **${tone}** tone throughout.
- Be concise, direct, and deliver high-signal insights with zero fluff.${cotText}${modelDirectives}

### Deliverable Format
- Structured Markdown, bullet points, and precise terminology.`;
}

function buildImagePrompt(subject, tone) {
  return `/imagine prompt: A high-end artistic visual of ${subject}, cinematic lighting, photorealistic textures, 8k resolution, shot on 85mm lens, f/1.8, intricate details, hyper-detailed, award-winning composition --ar 16:9 --v 6.0 --style raw`;
}

function getModelDirectives(model, lang) {
  if (model === 'claude') {
    return lang === 'en' 
      ? '\n- **Formatting Note**: Organize the output inside appropriate XML-style semantic tags when suitable.' 
      : '\n- **نکته**: خروجی را در تگ‌های ساختاریافته و منطقی کادربندی کن.';
  }
  if (model === 'deepseek') {
    return lang === 'en'
      ? '\n- **DeepSeek CoT**: Showcase thorough architectural and logical reasoning before final answer.'
      : '\n- **استدلال عمیق**: تمام فرضیات و استدلال‌های منطقی را شفاف شرح بده.';
  }
  return '';
}
