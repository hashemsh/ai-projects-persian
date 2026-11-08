/**
 * Regex Breakdown and Persian Visual Explainer (< 200 lines)
 */

window.RegexExplainer = (function() {
  const tokenDescriptions = [
    { regex: /^\^/, token: '^', title: 'لنگر شروع رشته (Start Anchor)', desc: 'اطمینان می‌دهد تطابق دقیقاً از ابتدای متن یا خط آغاز شود.' },
    { regex: /^\$/, token: '$', title: 'لنگر پایان رشته (End Anchor)', desc: 'اطمینان می‌دهد تطابق دقیقاً در انتهای متن یا خط به پایان برسد.' },
    { regex: /^\\b/, token: '\\b', title: 'مرز کلمه (Word Boundary)', desc: 'تطابق با نقطه مرزی میان کاراکتر کلمه‌ای و فاصله.' },
    { regex: /^\\d/, token: '\\d', title: 'رقم عددی (Digit)', desc: 'تطابق با یک رقم عددی استاندارد معادل [0-9].' },
    { regex: /^\\D/, token: '\\D', title: 'غیررقم (Non-digit)', desc: 'تطابق با هر کاراکتری به جز اعداد عددی.' },
    { regex: /^\\w/, token: '\\w', title: 'کاراکتر کلمه‌ای (Word)', desc: 'تطابق با حروف الفبای لاتین، ارقام و خط زیر [a-zA-Z0-9_].' },
    { regex: /^\\W/, token: '\\W', title: 'غیرکلمه‌ای (Non-word)', desc: 'تطابق با هر کاراکتری جز کاراکترهای کلمه‌ای.' },
    { regex: /^\\s/, token: '\\s', title: 'فاصله خالی (Whitespace)', desc: 'تطابق با انواع فاصله‌ها، تب‌ها و اینتر سطر جدید.' },
    { regex: /^\\S/, token: '\\S', title: 'غیرفاصله (Non-whitespace)', desc: 'تطابق با هر کاراکتری به غیر از فضای خالی.' },
    { regex: /^\./, token: '.', title: 'نقطه عام (Any Character)', desc: 'تطابق با هر کاراکتر دلخواهی به جز سطر جدید.' },
    { regex: /^\+/, token: '+', title: 'تکرار یک یا بیشتر (+)', desc: 'المان قبلی باید حداقل ۱ بار یا بیشتر تکرار شود.' },
    { regex: /^\*/, token: '*', title: 'تکرار صفر یا بیشتر (*)', desc: 'المان قبلی می‌تواند صفر تا بی‌نهایت بار تکرار شود.' },
    { regex: /^\?/, token: '?', title: 'اختیاری یا تکرار صفر/یک (?)', desc: 'وجود المان قبلی اختیاری است (صفر یا یک بار).' },
    { regex: /^\{\d+\}/, token: '{n}', title: 'تکرار دقیق عددی', desc: 'المان قبلی دقیقاً به تعداد مشخص‌شده تکرار می‌شود.' },
    { regex: /^\{\d+,\d*\}/, token: '{n,m}', title: 'محدوده حداقل و حداکثر تکرار', desc: 'تکرار در بازه مشخص‌شده بین حداقل و حداکثر.' },
    { regex: /^\[\^?[^\]]+\]/, token: '[...]', title: 'مجموعه کاراکتر (Character Set)', desc: 'تطابق با یکی از کاراکترهای تعریف‌شده داخل قلاب.' },
    { regex: /^\(\?:[^\)]+\)/, token: '(?:...)', title: 'گروه غیراخذکننده (Non-capturing)', desc: 'گروه‌بندی عبارات بدون ذخیره در حافظه جهت افزایش پرفورمنس.' },
    { regex: /^\([^\)]+\)/, token: '(...)', title: 'گروه اخذکننده (Capturing Group)', desc: 'گروه‌بندی و جداسازی بخش خاصی از پترن جهت استخراج در $1.' },
    { regex: /^\|/, token: '|', title: 'شرط یا (OR Alternation)', desc: 'تطابق با عبارت قبل یا عبارت بعد از این علامت.' }
  ];

  function explain(patternStr) {
    if (!patternStr) return [];
    const steps = [];
    let remaining = patternStr;
    let safety = 0;

    while (remaining.length > 0 && safety++ < 150) {
      let matchedToken = null;

      for (const item of tokenDescriptions) {
        const m = remaining.match(item.regex);
        if (m) {
          matchedToken = {
            token: m[0],
            title: item.title,
            desc: item.desc
          };
          remaining = remaining.substring(m[0].length);
          break;
        }
      }

      if (matchedToken) {
        steps.push(matchedToken);
      } else {
        // Literal single character or escaped character
        const literal = remaining.startsWith('\\') ? remaining.substring(0, 2) : remaining[0];
        steps.push({
          token: literal,
          title: `کاراکتر مستقیم «${literal}» (Literal)`,
          desc: `جستجوی دقیق کاراکتر «${literal}» در رشته ورودی.`
        });
        remaining = remaining.substring(literal.length);
      }
    }

    return steps;
  }

  return { explain };
})();
