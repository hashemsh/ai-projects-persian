/**
 * AI Cost Calculation Engine (< 200 lines)
 */
const AICalculator = (function() {
  function formatNumberFa(num) {
    return new Intl.NumberFormat('fa-IR').format(num);
  }

  function formatCurrencyFa(toman) {
    if (toman === 0) return '۰ تومان (رایگان)';
    if (toman < 1000) return `${formatNumberFa(toman)} تومان`;
    return `${formatNumberFa(toman)} تومان`;
  }

  function formatUsd(usd) {
    if (usd === 0) return '$0.00';
    if (usd < 0.01) return `$${usd.toFixed(4)}`;
    return `$${usd.toFixed(2)}`;
  }

  function calculateModelCost(model, category, params, usdRate) {
    let multiplier = 1;

    if (category === 'image') {
      const qty = Number(params.quantity) || 1;
      const isHd = params.quality === 'hd';
      multiplier = qty * (isHd ? 1.5 : 1.0);
    } else if (category === 'video') {
      const seconds = Number(params.seconds) || 10;
      const is1080p = params.resolution === '1080p';
      multiplier = seconds * (is1080p ? 1.25 : 1.0);
    } else if (category === 'code') {
      const scaleMultiplierMap = { script: 1, landing: 2.5, fullapp: 6 };
      multiplier = scaleMultiplierMap[params.scope] || 1;
    } else if (category === 'chat') {
      const prompts = Number(params.prompts) || 100;
      multiplier = prompts / 100;
    }

    const totalUSD = model.unitCostUSD * multiplier;
    const totalToman = Math.round(totalUSD * usdRate);

    return {
      model,
      totalUSD,
      totalToman,
      formattedUSD: formatUsd(totalUSD),
      formattedToman: formatCurrencyFa(totalToman),
      multiplier
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
