/**
 * Export report engine (Printable HTML, JSON, and Markdown summary)
 */
window.AuditorExporter = {
  exportJson(auditData) {
    const jsonStr = JSON.stringify(auditData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    this.downloadBlob(blob, `site-audit-report-${Date.now()}.json`);
  },

  exportMarkdown(auditData) {
    const { scores, overall, grade, results, source } = auditData;
    let md = `# 📊 گزارش جامع ممیزی وبسایت (Site Auditor Pro)\n\n`;
    md += `- **منبع/آدرس:** ${source || 'کد HTML ورودی'}\n`;
    md += `- **نمره کلی سلامت:** ${overall}/100 (رتبه کیفی: ${grade})\n`;
    md += `- **سئو درون‌صفحه‌ای:** ${scores.seo}/100\n`;
    md += `- **پرفورمنس و سرعت:** ${scores.perf}/100\n`;
    md += `- **تجربه کاربری و UX:** ${scores.ux}/100\n`;
    md += `- **امنیت و وب استاندار:** ${scores.sec}/100\n\n`;
    md += `## 🛠️ چک‌لیست اقدامات اصلاحی و بازرسی‌ها:\n\n`;

    results.forEach((r, idx) => {
      const icon = r.status === 'pass' ? '✅' : (r.status === 'warning' ? '⚠️' : '❌');
      md += `${idx + 1}. ${icon} **${r.title}**: ${r.message}\n`;
      if (r.fixSnippet) {
        md += `   \`\`\`html\n   ${r.fixSnippet}\n   \`\`\`\n`;
      }
    });

    md += `\n---\n*تهیه شده با سایت آدیتور پرو | توسعه‌دهنده: Hashem Sh*`;
    return md;
  },

  exportHtmlReport(auditData) {
    const { scores, overall, grade, results, source } = auditData;
    const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>گزارش رسمی ممیزی سئو و پرفورمنس سایت</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #1e293b; padding: 2.5rem; line-height: 1.6; }
    .report-card { max-width: 900px; margin: 0 auto; background: #fff; padding: 2.5rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; }
    .score-badge { font-size: 2.5rem; font-weight: 900; color: #0284c7; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0 2rem; }
    .grid-box { background: #f1f5f9; padding: 1rem; border-radius: 10px; text-align: center; }
    .grid-val { font-size: 1.4rem; font-weight: 800; color: #0f172a; }
    .item { border-bottom: 1px solid #f1f5f9; padding: 1rem 0; }
    .status-pass { color: #16a34a; font-weight: 700; }
    .status-warning { color: #d97706; font-weight: 700; }
    .status-error { color: #dc2626; font-weight: 700; }
    pre { background: #0f172a; color: #38bdf8; padding: 0.75rem; border-radius: 8px; direction: ltr; text-align: left; font-size: 0.85rem; overflow-x: auto; }
    @media print { body { background: #fff; padding: 0; } .report-card { box-shadow: none; padding: 0; } }
  </style>
</head>
<body>
  <div class="report-card">
    <div class="header">
      <div>
        <h1 style="margin: 0; font-size: 1.6rem;">گزارش رسمی ممیزی و آنالیز سایت</h1>
        <p style="margin: 0.3rem 0 0; color: #64748b; font-size: 0.9rem;">آدرس / سند بررسی‌شده: ${source || 'ورودی سفارشی'}</p>
      </div>
      <div class="score-badge">${overall}<span style="font-size: 1.1rem; color: #64748b;">/100 (رتبه ${grade})</span></div>
    </div>
    <div class="grid">
      <div class="grid-box"><div>سئو فنی</div><div class="grid-val">${scores.seo}%</div></div>
      <div class="grid-box"><div>پرفورمنس</div><div class="grid-val">${scores.perf}%</div></div>
      <div class="grid-box"><div>تجربه کاربری</div><div class="grid-val">${scores.ux}%</div></div>
      <div class="grid-box"><div>امنیت</div><div class="grid-val">${scores.sec}%</div></div>
    </div>
    <h2>ریز نتایج بازرسی</h2>
    ${results.map(r => `
      <div class="item">
        <div style="display: flex; justify-content: space-between;">
          <strong>${r.title}</strong>
          <span class="status-${r.status}">${r.status === 'pass' ? 'پاس‌شده' : (r.status === 'warning' ? 'هشدار' : 'خطا')}</span>
        </div>
        <p style="margin: 0.4rem 0; font-size: 0.9rem; color: #475569;">${r.message}</p>
        ${r.fixSnippet ? `<pre><code>${r.fixSnippet.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>` : ''}
      </div>
    `).join('')}
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    this.downloadBlob(blob, `site-audit-report-${Date.now()}.html`);
  },

  downloadBlob(blob, filename) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }
};
