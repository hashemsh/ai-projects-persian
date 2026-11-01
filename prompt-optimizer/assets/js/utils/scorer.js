/**
 * Prompt Quality Auditor & Scorer
 */
export function auditPrompt(text = '') {
  const clean = text.trim();
  if (!clean) {
    return {
      score: 0,
      level: 'low',
      criteria: [
        { id: 'role', label: 'تعیین نقش (Role)', pass: false },
        { id: 'task', label: 'وضوح وظیفه (Task)', pass: false },
        { id: 'format', label: 'تعیین قالب خروجی (Format)', pass: false },
        { id: 'constraints', label: 'محدودیت‌ها (Constraints)', pass: false }
      ],
      tips: ['برای شروع، دستور یا خواسته خود را در کادر بالا بنویسید.']
    };
  }

  const wordCount = clean.split(/\s+/).length;
  const lower = clean.toLowerCase();

  // Criteria checks
  const hasRole = /نقش|به عنوان|تو یک|متخصص|مهندس|نویسنده|act as|you are|role/i.test(clean);
  const hasFormat = /قالب|فرمت|جدول|کد|مارک‌داون|لیست|bullet|format|json|markdown|table/i.test(clean);
  const hasConstraints = /نباید|محدود|تنها|فقط|جلوگیری|حداکثر|بدون|do not|never|avoid|limit/i.test(clean);
  const hasTaskClarity = wordCount >= 6;
  const hasContext = wordCount >= 18;

  let score = 0;
  if (hasTaskClarity) score += 25;
  if (hasRole) score += 25;
  if (hasFormat) score += 25;
  if (hasConstraints) score += 15;
  if (hasContext) score += 10;

  score = Math.min(score, 100);

  const tips = [];
  if (!hasRole) tips.push('💡 به هوش مصنوعی نقش بدهید (مثلاً: «تو یک مهندس ارشد نرم‌افزار هستی...»).');
  if (!hasFormat) tips.push('💡 فرمت خروجی را مشخص کنید (مثلاً: در قالب جدول، کدهای خوانا، یا بولت‌پوینت).');
  if (!hasConstraints) tips.push('💡 خط قرمزها را اضافه کنید (مثلاً: بدون مقدمه‌چینی، زیر ۲۰۰ کلمه).');
  if (wordCount < 10) tips.push('💡 جزئیات بیشتری درباره هدف و مخاطب نهایی به پرامپت اضافه کنید.');

  let level = 'low';
  if (score >= 80) level = 'high';
  else if (score >= 45) level = 'medium';

  return {
    score,
    level,
    criteria: [
      { id: 'role', label: 'تعیین نقش (Role)', pass: hasRole },
      { id: 'task', label: 'وضوح وظیفه (Task)', pass: hasTaskClarity },
      { id: 'format', label: 'تعیین قالب خروجی (Format)', pass: hasFormat },
      { id: 'constraints', label: 'محدودیت‌ها (Constraints)', pass: hasConstraints }
    ],
    tips: tips.slice(0, 3)
  };
}
