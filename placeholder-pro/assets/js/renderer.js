/**
 * پلیس‌هولدر پرو | موتور رندر زنده Canvas و وکتور SVG
 * زیر ۲۰۰ سطر - سازگار با Clean Modular Web
 */

(function () {
  const { state, calculateAspectRatio } = window.PlaceholderState;

  function drawVectorIcon(ctx, iconType, cx, cy, size, color) {
    ctx.save();
    ctx.fillStyle = color; ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2, size * 0.08);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const s = size / 2;

    if (iconType === 'image') {
      ctx.strokeRect(cx - s, cy - s, size, size);
      ctx.beginPath(); ctx.arc(cx - s * 0.35, cy - s * 0.35, s * 0.2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx - s, cy + s * 0.5); ctx.lineTo(cx - s * 0.2, cy - s * 0.1);
      ctx.lineTo(cx + s * 0.3, cy + s * 0.3); ctx.lineTo(cx + s * 0.6, cy);
      ctx.lineTo(cx + s, cy + s * 0.4); ctx.stroke();
    } else if (iconType === 'shopping') {
      ctx.strokeRect(cx - s * 0.8, cy - s * 0.4, s * 1.6, s * 1.5);
      ctx.beginPath(); ctx.arc(cx, cy - s * 0.4, s * 0.45, Math.PI, 0); ctx.stroke();
    } else if (iconType === 'mobile') {
      ctx.strokeRect(cx - s * 0.5, cy - s * 0.9, s * 1.0, s * 1.8);
      ctx.beginPath(); ctx.arc(cx, cy + s * 0.6, s * 0.12, 0, Math.PI * 2); ctx.fill();
    } else if (iconType === 'user') {
      ctx.beginPath(); ctx.arc(cx, cy - s * 0.3, s * 0.4, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy + s * 0.9, s * 0.7, Math.PI, 0); ctx.stroke();
    } else if (iconType === 'code') {
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.4, cy - s * 0.5); ctx.lineTo(cx - s * 0.8, cy); ctx.lineTo(cx - s * 0.4, cy + s * 0.5);
      ctx.moveTo(cx + s * 0.4, cy - s * 0.5); ctx.lineTo(cx + s * 0.8, cy); ctx.lineTo(cx + s * 0.4, cy + s * 0.5);
      ctx.moveTo(cx + s * 0.15, cy - s * 0.6); ctx.lineTo(cx - s * 0.15, cy + s * 0.6); ctx.stroke();
    }
    ctx.restore();
  }

  function getOnlineUrl() {
    const w = state.width, h = state.height;
    const cleanBg = state.bgColor.replace('#', '');
    const cleanText = state.textColor.replace('#', '');
    const text = encodeURIComponent(state.text.trim() || `${w}x${h}`);
    return `https://placehold.co/${w}x${h}/${cleanBg}/${cleanText}?text=${text}`;
  }

  function generateSvgCode() {
    const w = state.width, h = state.height;
    const text = state.text.trim() || `${w} × ${h}`;
    const subText = state.subtitle.trim() || (state.showDimensions ? `${w} × ${h} px` : "");
    const minDim = Math.min(w, h);
    const mainFontSize = state.fontSize || Math.max(14, Math.min(Math.round(minDim * 0.08), 84));

    let defs = "", bgFill = state.bgColor;
    if (state.isGradient) {
      defs = `\n  <defs>\n    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">\n      <stop offset="0%" stop-color="${state.bgColor}" />\n      <stop offset="100%" stop-color="${state.gradientEnd}" />\n    </linearGradient>\n  </defs>`;
      bgFill = "url(#grad)";
    }

    const gridSvg = state.showGrid
      ? `\n  <line x1="0" y1="0" x2="${w}" y2="${h}" stroke="${state.textColor}" stroke-opacity="0.15" stroke-width="2" />\n  <line x1="${w}" y1="0" x2="0" y2="${h}" stroke="${state.textColor}" stroke-opacity="0.15" stroke-width="2" />`
      : "";

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  ${defs}
  <rect width="${w}" height="${h}" rx="${state.borderRadius}" fill="${bgFill}" />
  ${gridSvg}
  <text x="50%" y="${subText ? '48%' : '50%'}" dominant-baseline="middle" text-anchor="middle" font-family="${state.fontFamily}, sans-serif" font-size="${mainFontSize}" font-weight="bold" fill="${state.textColor}">${text}</text>
  ${subText ? `<text x="50%" y="${mainFontSize > 30 ? '58%' : '60%'}" dominant-baseline="middle" text-anchor="middle" font-family="${state.fontFamily}, sans-serif" font-size="${Math.round(mainFontSize * 0.42)}" fill="${state.textColor}" opacity="0.75">${subText}</text>` : ''}
</svg>`;
  }

  function renderCanvas() {
    const canvas = document.getElementById('placeholderCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = state.width, h = state.height;

    canvas.width = w; canvas.height = h;
    ctx.clearRect(0, 0, w, h);

    if (state.borderRadius > 0) {
      const r = Math.min(state.borderRadius, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(r, 0); ctx.lineTo(w - r, 0); ctx.quadraticCurveTo(w, 0, w, r);
      ctx.lineTo(w, h - r); ctx.quadraticCurveTo(w, h, w - r, h);
      ctx.lineTo(r, h); ctx.quadraticCurveTo(0, h, 0, h - r);
      ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath(); ctx.clip();
    }

    if (state.isGradient) {
      const rad = (state.gradientAngle * Math.PI) / 180;
      const x1 = w / 2 - (Math.cos(rad) * w) / 2, y1 = h / 2 - (Math.sin(rad) * h) / 2;
      const x2 = w / 2 + (Math.cos(rad) * w) / 2, y2 = h / 2 + (Math.sin(rad) * h) / 2;
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, state.bgColor); grad.addColorStop(1, state.gradientEnd);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = state.bgColor;
    }
    ctx.fillRect(0, 0, w, h);

    if (state.showGrid) {
      ctx.save();
      ctx.strokeStyle = state.textColor; ctx.globalAlpha = 0.15;
      ctx.lineWidth = Math.max(1, Math.min(w, h) * 0.003);
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(w, h); ctx.moveTo(w, 0); ctx.lineTo(0, h);
      ctx.stroke();
      ctx.restore();
    }

    const hasIcon = state.icon && state.icon !== 'none';
    const minDim = Math.min(w, h);
    let contentCenterY = h / 2;

    if (hasIcon) {
      const iconSize = Math.max(24, Math.round(minDim * 0.12));
      const iconY = contentCenterY - iconSize * 0.8;
      drawVectorIcon(ctx, state.icon, w / 2, iconY, iconSize, state.textColor);
      contentCenterY += iconSize * 0.45;
    }

    const mainFontSize = state.fontSize || Math.max(14, Math.min(Math.round(minDim * 0.08), 84));
    ctx.fillStyle = state.textColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `bold ${mainFontSize}px ${state.fontFamily}, sans-serif`;
    ctx.fillText(state.text.trim() || `${w} × ${h}`, w / 2, contentCenterY);

    let subText = state.subtitle.trim();
    if (!subText && state.showDimensions) subText = `${w} × ${h} px (${calculateAspectRatio(w, h)})`;
    if (subText) {
      const subFontSize = Math.max(11, Math.round(mainFontSize * 0.42));
      ctx.font = `500 ${subFontSize}px ${state.fontFamily}, sans-serif`;
      ctx.globalAlpha = 0.75;
      ctx.fillText(subText, w / 2, contentCenterY + mainFontSize * 0.85);
      ctx.globalAlpha = 1.0;
    }

    if (window.PlaceholderExporter) {
      window.PlaceholderExporter.updateMetadata();
      window.PlaceholderExporter.updateCodeView();
    }
  }

  window.PlaceholderRenderer = {
    renderCanvas,
    generateSvgCode,
    getOnlineUrl,
    drawVectorIcon
  };
})();
