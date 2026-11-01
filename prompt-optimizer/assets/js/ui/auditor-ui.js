import { auditPrompt } from '../utils/scorer.js';

/**
 * Auditor UI Controller
 */
export function renderAuditor(text, containerElement) {
  if (!containerElement) return;

  const result = auditPrompt(text);
  const badgeClass = result.level === 'high' ? 'high' : result.level === 'medium' ? 'medium' : 'low';
  const barColor = result.level === 'high' ? 'var(--success)' : result.level === 'medium' ? 'var(--warning)' : 'var(--danger)';

  containerElement.innerHTML = `
    <div class="auditor-box">
      <div class="score-overview">
        <div class="score-title-wrap">
          <span class="score-title">سنجش عیار و ساختار پرامپت</span>
          <span class="score-subtitle">آنالیز استانداردهای مهندسی پرامپت</span>
        </div>
        <div class="score-badge ${badgeClass}">
          <span>${result.score}</span>
          <span style="font-size: 0.75rem;">/ ۱۰۰</span>
        </div>
      </div>

      <div class="progress-track">
        <div class="progress-fill" style="width: ${result.score}%; background-color: ${barColor};"></div>
      </div>

      <div class="criteria-list">
        ${result.criteria.map(item => `
          <div class="criterion-item ${item.pass ? 'pass' : 'fail'}">
            <span class="criterion-icon">${item.pass ? '●' : '○'}</span>
            <span>${item.label}</span>
          </div>
        `).join('')}
      </div>

      ${result.tips.length > 0 ? `
        <div class="tips-container">
          ${result.tips.map(tip => `<div class="tip-pill">${tip}</div>`).join('')}
        </div>
      ` : ''}
    </div>
  `;
}
