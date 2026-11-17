/**
 * AI Cost Calculation Engine (< 200 lines)
 * Formulated Token Math, Model-Specific Resolution Ratios & Subscription Isolation.
 */
const AICalculator = (function() {
  function formatNumberFa(num) {
    return new Intl.NumberFormat('fa-IR').format(num);
  }

  function formatCurrencyFa(toman) {
    if (!toman || toman === 0) return '۰ تومان (طرح رایگان)';
    return `${formatNumberFa(toman)} تومان`;
  }

  function formatUsd(usd) {
    if (!usd || usd === 0) return '$0.00';
    if (usd < 0.005) return `$${usd.toFixed(4)}`;
    return `$${usd.toFixed(2)}`;
  }

  function calculateModelCost(model, category, params, usdRate) {
    let totalUSD = 0;
    let billingNote = '';

    if (category === 'image') {
      const qty = Math.max(1, Number(params.quantity) || 1);
      const isHd = params.quality === 'hd';
      
      if (model.billingType === 'free') {
        totalUSD = 0;
      } else if (model.id === 'dall-e-3') {
        totalUSD = qty * (isHd ? 0.080 : 0.040);
      } else if (model.id === 'nano-banana-pro') {
        totalUSD = qty * (isHd ? 0.150 : 0.134);
      } else {
        totalUSD = qty * (model.baseUSD || 0.04) * (isHd ? 1.4 : 1.0);
      }
      billingNote = `${qty} تصویر ${isHd ? '(کیفیت HD/2K-4K)' : '(استاندارد)'}`;
    } 
    else if (category === 'video') {
      const seconds = Math.max(5, Number(params.seconds) || 10);
      const is1080p = params.resolution === '1080p';
      
      if (model.billingType === 'free') {
        totalUSD = 0;
      } else if (model.billingType === 'subscription') {
        totalUSD = model.monthlyUSD || 20;
        billingNote = 'پلن اشتراک ماهیانه';
      } else {
        const resMultiplier = is1080p ? 1.35 : 1.0;
        totalUSD = seconds * (model.baseUSD || 0.05) * resMultiplier;
        billingNote = `${seconds} ثانیه ویدیو (${is1080p ? '1080p FHD' : '720p HD'})`;
      }
    } 
    else if (category === 'code') {
      if (model.billingType === 'subscription' || model.billingType === 'subscription_or_credit') {
        totalUSD = model.monthlyUSD || 20;
        billingNote = 'اشتراک ثابت ۱ ماهه (استفاده تیمی/نامحدود)';
      } else if (model.billingType === 'token') {
        // Formula token based on project scope
        const scopePresets = {
          script: { inputTokens: 40000, outputTokens: 15000, label: 'اسکریپت و توابع' },
          landing: { inputTokens: 150000, outputTokens: 60000, label: 'صفحه فرود و UI' },
          fullapp: { inputTokens: 600000, outputTokens: 250000, label: 'اپلیکیشن کامل' }
        };
        const scope = scopePresets[params.scope] || scopePresets.script;
        const inCost = (scope.inputTokens / 1000000) * (model.inputPrice1M || 2.0);
        const outCost = (scope.outputTokens / 1000000) * (model.outputPrice1M || 8.0);
        totalUSD = inCost + outCost;
        billingNote = `تخمین مصرف ~${formatNumberFa(Math.round((scope.inputTokens + scope.outputTokens)/1000))}K توکن`;
      }
    } 
    else if (category === 'chat') {
      const prompts = Math.max(10, Number(params.prompts) || 100);
      const avgTokens = Math.max(200, Number(params.avgTokensPerMsg) || 800);
      
      if (model.billingType === 'free') {
        totalUSD = 0;
        billingNote = 'استفاده رایگان در رابط وب';
      } else if (model.billingType === 'token') {
        const totalTokens = prompts * avgTokens;
        const inTokens = totalTokens * 0.65;
        const outTokens = totalTokens * 0.35;
        const inCost = (inTokens / 1000000) * (model.inputPrice1M || 0.5);
        const outCost = (outTokens / 1000000) * (model.outputPrice1M || 2.0);
        totalUSD = inCost + outCost;
        billingNote = `${formatNumberFa(prompts)} پیام (~${formatNumberFa(Math.round(totalTokens/1000))}K توکن)`;
      }
    }

    const totalToman = Math.round(totalUSD * usdRate);

    return {
      model,
      totalUSD,
      totalToman,
      formattedUSD: formatUsd(totalUSD),
      formattedToman: formatCurrencyFa(totalToman),
      billingNote
    };
  }

  function evaluateCategory(models, category, params, usdRate) {
    return models.map(m => calculateModelCost(m, category, params, usdRate));
  }

  return {
    formatNumberFa,
    formatCurrencyFa,
    formatUsd,
    calculateModelCost,
    evaluateCategory
  };
})();
