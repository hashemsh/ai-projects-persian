/**
 * Natural Language to Regex Rule Engine (< 200 lines)
 */

window.RegexNLP = (function() {
  const rules = [
    {
      keywords: ['موبایل', 'تلفن همراه', 'همراه اول', 'ایرانسل', 'phone', 'mobile'],
      pattern: '^(?:(?:\\+?98|0098|0)?9\\d{9})$',
      flags: 'gm',
      test: '09123456789\n+989351234567\n00989198765432\n02188776655',
      name: 'شماره موبایل ایران'
    },
    {
      keywords: ['کد ملی', 'کدملی', 'شناسه ملی', 'national code', 'national id'],
      pattern: '^\\d{10}$',
      flags: 'gm',
      test: '0012345678\n1234567890\n0441234567\n12345',
      name: 'کد ملی ۱۰ رقمی ایران'
    },
    {
      keywords: ['کد پستی', 'کدپستی', 'postal code', 'zip code'],
      pattern: '\\b[13-9]{5}-?[13-9]{5}\\b',
      flags: 'g',
      test: '19876-54321\n1456789012\n0234567890',
      name: 'کد پستی ۱۰ رقمی ایران'
    },
    {
      keywords: ['ایمیل', 'پست الکترونیک', 'email', 'mail'],
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      flags: 'gm',
      test: 'hashem@example.com\ninfo@domain.ir\ninvalid_address@',
      name: 'آدرس ایمیل معتبر'
    },
    {
      keywords: ['سایت', 'لینک', 'نشانی وب', 'آدرس اینترنتی', 'url', 'link', 'http'],
      pattern: 'https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)',
      flags: 'gi',
      test: 'https://github.com/hashemsh\nhttp://site.ir/blog?p=1\nftp://invalid',
      name: 'آدرس اینترنتی (URL)'
    },
    {
      keywords: ['رمز', 'پسورد', 'گذرواژه', 'password', 'pass'],
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
      flags: 'gm',
      test: 'Secret@2026\nweak123\nSuper#Admin99',
      name: 'رمز عبور قوی و ایمن'
    },
    {
      keywords: ['کارت', 'شتاب', 'بانک', 'card', 'shetab'],
      pattern: '\\b(?:\\d{4}[ -]?){3}\\d{4}\\b',
      flags: 'g',
      test: '6037-9971-1234-5678\n6104337890123456',
      name: 'شماره کارت بانکی ۱۶ رقمی'
    },
    {
      keywords: ['تاریخ', 'شمسی', 'جلالی', 'date', 'shamsi'],
      pattern: '\\b(1[34]\\d{2})[\\/\\-](0[1-9]|1[0-2])[\\/\\-](0[1-9]|[12]\\d|3[01])\\b',
      flags: 'g',
      test: '1403/08/18\n1402-12-29\n1403/13/45',
      name: 'تاریخ شمسی'
    },
    {
      keywords: ['عدد', 'ارقام', 'فقط عدد', 'digits', 'numbers'],
      pattern: '\\b\\d+\\b',
      flags: 'g',
      test: 'قیمت 45000 تومان در سال 1403 با تخفیف 20 درصد',
      name: 'اعداد و ارقام صحیح'
    },
    {
      keywords: ['فارسی', 'حروف فارسی', 'کلمات فارسی', 'persian'],
      pattern: '[\\u0600-\\u06FF\\s]+',
      flags: 'gu',
      test: 'متن تستی به زبان فارسی Hello World 12345',
      name: 'حروف و کلمات زبان فارسی'
    },
    {
      keywords: ['تگ', 'اچ تی ام ال', 'html', 'tag'],
      pattern: '<\\/?([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>',
      flags: 'g',
      test: '<div class="box"><a href="#">لینک</a><span>متن</span></div>',
      name: 'تگ‌های زبان HTML'
    },
    {
      keywords: ['آی پی', 'ای پی', 'ip', 'ipv4'],
      pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
      flags: 'g',
      test: '192.168.1.1\n10.0.0.254\n999.1.1.1',
      name: 'آدرس اینترنتی IPv4'
    },
    {
      keywords: ['رنگ', 'هگز', 'hex', 'color'],
      pattern: '#(?:[0-9a-fA-F]{3,4}){1,2}\\b',
      flags: 'g',
      test: '#ffffff #06b6d4 #111528 #zzzz',
      name: 'کد رنگ هگزادسیمال'
    }
  ];

  function convertPrompt(promptText) {
    if (!promptText || !promptText.trim()) return null;
    const clean = promptText.toLowerCase().trim();

    for (const r of rules) {
      if (r.keywords.some(k => clean.includes(k.toLowerCase()))) {
        return {
          pattern: r.pattern,
          flags: r.flags,
          testString: r.test,
          name: r.name
        };
      }
    }

    // Fallback: search for words inside string
    return {
      pattern: clean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      flags: 'gi',
      testString: `نمونه متن آزمایشی حاوی عبارت ${clean} برای بررسی تطابق`,
      name: `جستجوی دقیق کلمه «${clean}»`
    };
  }

  return { convertPrompt };
})();
