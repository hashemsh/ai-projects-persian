/**
 * Presets Library for Regex AI Studio (< 200 lines)
 */

window.RegexPresets = [
  {
    id: 'ir-mobile',
    title: 'شماره موبایل ایران',
    icon: '📱',
    category: 'iran',
    pattern: '^(?:(?:\\+?98|0098|0)?9\\d{9})$',
    flags: 'gm',
    testString: '09123456789\n+989351234567\n00989198765432\n9121112233\n09360000000\n02188776655\n091212345',
    desc: 'تشخیص و اعتبارسنجی کلیه شماره‌های موبایل اپراتورهای ایران (همراه اول، ایرانسل، رایتل و...) با یا بدون پیش‌شماره کشور.'
  },
  {
    id: 'ir-national-id',
    title: 'کد ملی ۱۰ رقمی ایران',
    icon: '🪪',
    category: 'iran',
    pattern: '^\\d{10}$',
    flags: 'gm',
    testString: '0012345678\n1234567890\n0441234567\n12345\n00123456789',
    desc: 'بررسی فرمت دقیق ۱۰ رقم عددی کد ملی اشخاص حقیقی ایرانی.'
  },
  {
    id: 'ir-postal-code',
    title: 'کد پستی ۱۰ رقمی ایران',
    icon: '📮',
    category: 'iran',
    pattern: '\\b[13-9]{5}-?[13-9]{5}\\b',
    flags: 'g',
    testString: '19876-54321\n1456789012\n0234567890\n11111-22222',
    desc: 'کد پستی معتبر ایران طبق استاندارد پست بدون ارقام صفر و دو در ابتدای هر بخش.'
  },
  {
    id: 'email',
    title: 'آدرس ایمیل معتبر',
    icon: '📧',
    category: 'web',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    flags: 'gm',
    testString: 'user@example.com\nfirstname.lastname@company.co.ir\ninvalid_email@\nhello+dev@antigravity.io\ntest@domain',
    desc: 'اعتبارسنجی ساختار استاندارد آدرس‌های ایمیل با دامنه عمومی یا کشوری.'
  },
  {
    id: 'url',
    title: 'نشانی اینترنتی وب (URL)',
    icon: '🌐',
    category: 'web',
    pattern: 'https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)',
    flags: 'gi',
    testString: 'https://github.com/hashemsh/ai-projects-persian\nhttp://example.com/test?id=123&sort=desc\nftp://invalid.link\nhttps://sub.domain.ir/path/to/page#section',
    desc: 'شناسایی و استخراج انواع لینک‌های پروتکل HTTP و HTTPS با کوئری و هش.'
  },
  {
    id: 'strong-pass',
    title: 'کلمه عبور امن و پیچیده',
    icon: '🔒',
    category: 'security',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    flags: 'gm',
    testString: 'Secret@2026\nweakpass\nPass12345\nAntigravity#99\nShort1!',
    desc: 'بررسی امنیت رمز عبور: حداقل ۸ کاراکتر، شامل حداقل یک حرف کوچک، یک حرف بزرگ، یک عدد و یک کاراکتر ویژه.'
  },
  {
    id: 'shetab-card',
    title: 'شماره کارت بانکی ۱۶ رقمی (شتاب)',
    icon: '💳',
    category: 'iran',
    pattern: '\\b(?:\\d{4}[ -]?){3}\\d{4}\\b',
    flags: 'g',
    testString: '6037-9971-1234-5678\n6104337890123456\n5892 1012 3456 7890\n1234-5678-9012',
    desc: 'شناسایی شماره کارت‌های بانکی ۱۶ رقمی عضو شتاب با یا بدون خط‌تیره و فاصله.'
  },
  {
    id: 'hex-color',
    title: 'کد رنگ هگزادسیمال (HEX)',
    icon: '🎨',
    category: 'web',
    pattern: '#(?:[0-9a-fA-F]{3,4}){1,2}\\b',
    flags: 'g',
    testString: '#ffffff\n#06b6d4\n#fff\n#111528ee\n#gggggg\ncolor: #ec4899',
    desc: 'تشخیص کدهای رنگی ۳، ۴، ۶ یا ۸ رقمی HEX با هشتگ.'
  },
  {
    id: 'ipv4',
    title: 'آدرس اینترنتی IPv4',
    icon: '🖥️',
    category: 'security',
    pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
    flags: 'g',
    testString: '192.168.1.1\n127.0.0.1\n10.0.0.254\n256.100.0.1\n8.8.8.8\n999.999.999.999',
    desc: 'اعتبارسنجی دقیق ۴ بخش آدرس IP از محدوده ۰ تا ۲۵۵.'
  },
  {
    id: 'jalali-date',
    title: 'تاریخ شمسی (Jalali Date)',
    icon: '📅',
    category: 'format',
    pattern: '\\b(1[34]\\d{2})[\\/\\-](0[1-9]|1[0-2])[\\/\\-](0[1-9]|[12]\\d|3[01])\\b',
    flags: 'g',
    testString: '1403/08/18\n1402-12-29\n1399/01/01\n1403/13/45\nتولید شده در تاریخ 1403/08/18 در تهران',
    desc: 'شناسایی فرمت تاریخ شمسی با ممیز یا خط تیره با تفکیک سال، ماه و روز.'
  },
  {
    id: 'html-tag',
    title: 'تگ‌های HTML و صفات',
    icon: '🏷️',
    category: 'web',
    pattern: '<\\/?([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>',
    flags: 'g',
    testString: '<div class="glass-card">\n<h1>تیتر نمونه</h1>\n<img src="pic.jpg" alt="عکس" />\n<p>متن معمولی</p>\n</div>',
    desc: 'استخراج تگ‌های بازشونده و بسته‌شونده HTML همراه با اتریبیوت‌ها.'
  }
];
