/**
 * پرامپت پلاس | تحلیل‌گر و امتیازدهی زنده به پرامپت
 * CORS-safe for file:/// and HTTP
 */
window.PromptScorer = {
  audit: function(text) {
    const clean = (text || '').trim();
    if (!clean) {
      return {
        score: 0,
        level: 'low',
        badgeColor: 'text-slate-500 bg-slate-800/80 border-slate-700',
        barColor: 'bg-slate-700',
        criteria: [
          { label: 'تعیین نقش تخصصی (Role)', pass: false },
          { label: 'وضوح وظیفه اصلی (Task)', pass: false },
          { label: 'قالب خروجی مشخص (Format)', pass: false },
          { label: 'قیود و خط‌قرمزها (Constraints)', pass: false }
        ],
        tips: ['دستور یا خواسته خود را در کادر ورودی وارد کنید تا عیارسنجی آغاز شود.']
      };
    }

    const words = clean.split(/\s+/).length;
    const hasRole = /نقش|به عنوان|تو یک|متخصص|مهندس|نویسنده|act as|you are|role/i.test(clean);
    const hasFormat = /قالب|فرمت|جدول|کد|مارک‌داون|لیست|bullet|format|json|markdown|table/i.test(clean);
    const hasConstraints = /نباید|محدود|تنها|فقط|جلوگیری|حداکثر|بدون|do not|never|avoid|limit/i.test(clean);
    const hasTaskClarity = words >= 5;
    const hasContext = words >= 15;

    let score = 0;
    if (hasTaskClarity) score += 25;
    if (hasRole) score += 25;
    if (hasFormat) score += 25;
    if (hasConstraints) score += 15;
    if (hasContext) score += 10;
    score = Math.min(score, 100);

    const tips = [];
    if (!hasRole) tips.push('💡 به هوش مصنوعی یک نقش خبره اختصاص دهید (مثلاً: «تو یک مهندس ارشد... هستی»).');
    if (!hasFormat) tips.push('💡 ساختار خروجی را تعیین کنید (مثلاً: به صورت جدول، بولت‌پوینت، یا کد مرتب).');
    if (!hasConstraints) tips.push('💡 خط‌قرمزها را مشخص کنید (مثلاً: بدون مقدمه‌چینی، زیر ۱۵۰ کلمه).');
    if (words < 8) tips.push('💡 هدف نهایی و کانتکست مخاطب هدف را برای هوش مصنوعی شفاف‌تر کنید.');

    let level = 'low';
    let badgeColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    let barColor = 'bg-rose-500';

    if (score >= 75) {
      level = 'high';
      badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      barColor = 'bg-emerald-500';
    } else if (score >= 40) {
      level = 'medium';
      badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      barColor = 'bg-amber-500';
    }

    return {
      score: score,
      level: level,
      badgeColor: badgeColor,
      barColor: barColor,
      criteria: [
        { label: 'تعیین نقش تخصصی (Role)', pass: hasRole },
        { label: 'وضوح وظیفه اصلی (Task)', pass: hasTaskClarity },
        { label: 'قالب خروجی مشخص (Format)', pass: hasFormat },
        { label: 'قیود و خط‌قرمزها (Constraints)', pass: hasConstraints }
      ],
      tips: tips.slice(0, 3)
    };
  }
};
