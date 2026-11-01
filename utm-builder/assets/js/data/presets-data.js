/**
 * UTM Builder Pro | Presets, Ad Networks & Mediums Data
 */
window.UtmPresets = {
  networks: [
    {
      id: 'yektanet',
      name: 'یکتانت (Yektanet)',
      icon: '🎯',
      category: 'iran-ads',
      defaults: { source: 'yektanet', medium: 'banner', campaign: 'retargeting', content: 'v1' }
    },
    {
      id: 'mediaad',
      name: 'مدیااد (Mediaad)',
      icon: '📢',
      category: 'iran-ads',
      defaults: { source: 'mediaad', medium: 'native', campaign: 'traffic-boost', content: 'box-a' }
    },
    {
      id: 'tapsell',
      name: 'تپسل (Tapsell)',
      icon: '📱',
      category: 'iran-ads',
      defaults: { source: 'tapsell', medium: 'cpc', campaign: 'app-install', content: 'interstitial' }
    },
    {
      id: 'instagram-story',
      name: 'اینستاگرام استوری',
      icon: '📸',
      category: 'social',
      defaults: { source: 'instagram', medium: 'story', campaign: 'summer-sale', content: 'swipe-up' }
    },
    {
      id: 'instagram-bio',
      name: 'اینستاگرام بایو',
      icon: '🔗',
      category: 'social',
      defaults: { source: 'instagram', medium: 'bio', campaign: 'lead-magnet', content: 'profile-link' }
    },
    {
      id: 'telegram',
      name: 'کانال تلگرام',
      icon: '✈️',
      category: 'social',
      defaults: { source: 'telegram', medium: 'channel', campaign: 'flash-discount', content: 'post-pin' }
    },
    {
      id: 'google-ads',
      name: 'گوگل ادز (Google Ads)',
      icon: '🔍',
      category: 'search',
      defaults: { source: 'google', medium: 'cpc', campaign: 'search-exact', term: '{keyword}' }
    },
    {
      id: 'sms',
      name: 'پیامک تبلیغاتی (SMS)',
      icon: '💬',
      category: 'direct',
      defaults: { source: 'sms', medium: 'bulk-sms', campaign: 'club-members', content: 'vip-discount' }
    },
    {
      id: 'email',
      name: 'ایمیل مارکتینگ / خبرنامه',
      icon: '✉️',
      category: 'direct',
      defaults: { source: 'newsletter', medium: 'email', campaign: 'weekly-digest', content: 'header-cta' }
    },
    {
      id: 'linkedin',
      name: 'لینکدین (LinkedIn)',
      icon: '💼',
      category: 'social',
      defaults: { source: 'linkedin', medium: 'social-post', campaign: 'b2b-hiring', content: 'article-link' }
    }
  ],

  mediums: [
    { value: 'cpc', label: 'کلیکی (cpc / ppc)' },
    { value: 'banner', label: 'بنر نمایشی (banner / display)' },
    { value: 'native', label: 'همسان / نیتیو (native)' },
    { value: 'story', label: 'استوری سوشال (story)' },
    { value: 'bio', label: 'بایو اینستاگرام (bio)' },
    { value: 'channel', label: 'پست کانال (channel)' },
    { value: 'email', label: 'ایمیل / خبرنامه (email)' },
    { value: 'sms', label: 'پیامک متنی (sms)' },
    { value: 'social-post', label: 'پست شبکه‌های اجتماعی (post)' },
    { value: 'affiliate', label: 'همکاری در فروش (affiliate)' },
    { value: 'retargeting', label: 'ریتارگتینگ (retargeting)' }
  ],

  sampleData: {
    url: 'https://example.com/landing/norooz-festival',
    source: 'yektanet',
    medium: 'banner',
    campaign: 'norooz1405-special',
    term: 'خرید آنلاین با تخفیف',
    content: 'gif-banner-300x250-v2',
    autoLowercase: true,
    spaceFormat: 'hyphen'
  },

  batchChannels: [
    { id: 'insta-bio', name: 'اینستاگرام بایو', source: 'instagram', medium: 'bio' },
    { id: 'insta-story', name: 'اینستاگرام استوری', source: 'instagram', medium: 'story' },
    { id: 'tele-chan', name: 'کانال تلگرام', source: 'telegram', medium: 'channel' },
    { id: 'sms-club', name: 'پیامک اعضا', source: 'sms', medium: 'sms' },
    { id: 'email-news', name: 'ایمیل خبرنامه', source: 'newsletter', medium: 'email' },
    { id: 'yektanet-ban', name: 'بنر یکتانت', source: 'yektanet', medium: 'banner' }
  ]
};
