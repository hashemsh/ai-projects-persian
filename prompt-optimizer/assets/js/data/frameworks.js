/**
 * Prompt Engineering Frameworks configuration
 */
export const FRAMEWORKS = {
  RTFC: {
    id: 'RTFC',
    name: 'RTFC (نقش، وظیفه، فرمت، قیود)',
    description: 'بهترین فریم‌ورک استاندارد برای کارهای روزمره و دقیق',
    structure: ['Role', 'Task', 'Format', 'Constraints'],
    labels: {
      role: 'نقش هوش مصنوعی',
      task: 'شرح دقیق وظیفه',
      format: 'فرمت خروجی مطلوب',
      constraints: 'محدودیت‌ها و خط قرمزها'
    }
  },
  CRISPE: {
    id: 'CRISPE',
    name: 'CRISPE (کانتکست، نقش، ورودی، تخصص، پیش‌نمایش)',
    description: 'برای پروژه‌ها و گزارش‌های عمیق تحلیلی یا سازمانی',
    structure: ['Capacity', 'Role', 'Insight', 'Statement', 'Personality', 'Experiment']
  },
  COT: {
    id: 'COT',
    name: 'Chain-of-Thought (استدلال گام‌به‌گام)',
    description: 'ویژه مسائل منطقی، ریاضی، معماری کد و تصمیم‌گیری تحلیلی',
    triggerPhrase: 'Let’s think step by step. لطفاً ابتدا مسئله را تحلیل کرده و گام‌به‌گام پیش بروید.'
  },
  FEW_SHOT: {
    id: 'FEW_SHOT',
    name: 'Few-Shot (همراه با نمونه‌های ورودی/خروجی)',
    description: 'تثبیت خروجی با دادن حداقل ۲ نمونه برای تطابق کامل ساختار'
  }
};

export const TARGET_MODELS = [
  { id: 'general', name: 'عمومی (همه مدل‌ها)', tag: 'LLM' },
  { id: 'chatgpt', name: 'OpenAI ChatGPT (GPT-4o)', tag: 'GPT' },
  { id: 'claude', name: 'Anthropic Claude (3.5 Sonnet)', tag: 'Claude' },
  { id: 'gemini', name: 'Google Gemini (1.5/2.0)', tag: 'Gemini' },
  { id: 'deepseek', name: 'DeepSeek (V3/R1)', tag: 'DeepSeek' },
  { id: 'image', name: 'تولید تصویر (Midjourney / Flux / DALL-E)', tag: 'Image' }
];

export const OUTPUT_LANGUAGES = [
  { id: 'fa', name: 'فارسی (دستور و خروجی فارسی)' },
  { id: 'bilingual', name: 'ترفند دوزبانه (دستور انگلیسی + پاسخ فارسی)' },
  { id: 'en', name: 'انگلیسی (دستور و خروجی انگلیسی)' }
];
