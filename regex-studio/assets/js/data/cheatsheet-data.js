/**
 * Comprehensive Persian Regex Cheat Sheet Data (< 200 lines)
 */

window.RegexCheatSheet = [
  {
    category: 'لنگرها (Anchors)',
    items: [
      { token: '^', name: 'شروع رشته یا خط', example: '^Start', desc: 'تطابق با ابتدای متن یا ابتدای خط در حالت Multiline' },
      { token: '$', name: 'پایان رشته یا خط', example: 'End$', desc: 'تطابق با انتهای متن یا انتهای خط' },
      { token: '\\b', name: 'مرز کلمه (Word Boundary)', example: '\\bcat\\b', desc: 'مرز میان کاراکتر کلمه‌ای و غیرکلمه‌ای' },
      { token: '\\B', name: 'غیرمرز کلمه', example: '\\Bcat', desc: 'عدم تطابق با مرز ابتدای کلمه' }
    ]
  },
  {
    category: 'کلاس‌های کاراکتر (Character Classes)',
    items: [
      { token: '.', name: 'هر کاراکتری جز سطر جدید', example: 'c.t', desc: 'تطابق با هر حرف یا رقم دلخواه' },
      { token: '\\d', name: 'ارقام عددی (Digit)', example: '\\d{4}', desc: 'معادل [0-9]' },
      { token: '\\D', name: 'هر چیزی جز رقم', example: '\\D+', desc: 'معادل [^0-9]' },
      { token: '\\w', name: 'کاراکتر کلمه‌ای (Word)', example: '\\w+', desc: 'حروف الفبای لاتین، ارقام و خط زیر [a-zA-Z0-9_]' },
      { token: '\\W', name: 'غیرکلمه‌ای (Non-word)', example: '\\W', desc: 'معادل [^a-zA-Z0-9_]' },
      { token: '\\s', name: 'فضای خالی (Whitespace)', example: '\\s+', desc: 'فاصله، تب (Tab)، سطر جدید (Newline)' },
      { token: '\\S', name: 'غیرفضای خالی', example: '\\S+', desc: 'هر کاراکتری جز فاصله' },
      { token: '[abc]', name: 'مجموعه کاراکتر دلخواه', example: '[aeiou]', desc: 'یکی از کاراکترهای داخل قلاب' },
      { token: '[^abc]', name: 'نقیض مجموعه کاراکتر', example: '[^0-9]', desc: 'هر کاراکتری جز کاراکترهای داخل قلاب' }
    ]
  },
  {
    category: 'تکرارکننده‌ها (Quantifiers)',
    items: [
      { token: '*', name: 'صفر یا چند بار', example: 'a*', desc: 'از صفر تا بی‌نهایت تکرار' },
      { token: '+', name: 'یک یا چند بار', example: 'a+', desc: 'حداقل یک بار تکرار اجباری' },
      { token: '?', name: 'صفر یا یک بار (اختیاری)', example: 'colou?r', desc: 'وجود کاراکتر اختیاری است' },
      { token: '{n}', name: 'دقیقاً n بار', example: '\\d{10}', desc: 'دقیقاً به تعداد مشخص‌شده' },
      { token: '{n,}', name: 'حداقل n بار', example: '\\w{8,}', desc: 'حداقل n تا بی‌نهایت' },
      { token: '{n,m}', name: 'بین n تا m بار', example: '\\d{2,4}', desc: 'محدوده حداقل و حداکثر تکرار' },
      { token: '*?', name: 'تکرار غیرازمند (Lazy)', example: '<.*?>', desc: 'کوتاه‌ترین تطابق ممکن به جای طولانی‌ترین' }
    ]
  },
  {
    category: 'گروه‌ها و عبارات شرطی (Groups & Sets)',
    items: [
      { token: '(abc)', name: 'گروه اخذکننده (Capturing)', example: '(\\d{4})-(\\d{2})', desc: 'گروه‌بندی و ذخیره در متغیرهای $1 و $2' },
      { token: '(?:abc)', name: 'گروه غیراخذکننده (Non-capturing)', example: '(?:https?|ftp)', desc: 'گروه‌بندی بدون ذخیره در حافظه جهت پرفورمنس' },
      { token: 'a|b', name: 'شرط یا (Alternation)', example: 'yes|no', desc: 'تطابق با عبارت سمت چپ یا سمت راست' },
      { token: '(?=abc)', name: 'نگاه مثبت به جلو (Positive Lookahead)', example: '\\d+(?=px)', desc: 'تطابق با شرطی که در جلو وجود دارد بدون مصرف آن' },
      { token: '(?!abc)', name: 'نگاه منفی به جلو (Negative Lookahead)', example: '\\d+(?!px)', desc: 'تطابق با شرطی که در جلو وجود ندارد' }
    ]
  },
  {
    category: 'پرچم‌ها (Flags)',
    items: [
      { token: 'g', name: 'سراسری (Global)', example: '/pattern/g', desc: 'پیدا کردن تمامی تطابق‌ها نه فقط اولین مورد' },
      { token: 'i', name: 'نادیده‌گرفتن بزرگ/کوچک (Case Insensitive)', example: '/cat/i', desc: 'تطابق بدون تمایز میان حروف کوچک و بزرگ' },
      { token: 'm', name: 'چندخطی (Multiline)', example: '/^cat$/m', desc: 'اعمال ^ و $ به ابتدای هر خط نه کل رشته' },
      { token: 's', name: 'دات برای همه (DotAll)', example: '/a.b/s', desc: 'نقطه (.) با کاراکتر سطر جدید (\n) نیز منطبق می‌شود' },
      { token: 'u', name: 'پشتیبانی یونیکد (Unicode)', example: '/\\p{L}/u', desc: 'پردازش دقیق کاراکترهای چندبایتی و زبان فارسی' }
    ]
  }
];
