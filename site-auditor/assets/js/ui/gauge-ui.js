/**
 * Interactive SVG circular gauge, letter grade, and category breakdown renderer
 */
window.AuditorGauge = {
  calculateScores(results) {
    const scores = { seo: 100, perf: 100, ux: 100, sec: 100 };
    
    // Deduct penalties per category (min 0)
    results.forEach(check => {
      if (check.category && scores[check.category] !== undefined) {
        scores[check.category] = Math.max(0, scores[check.category] - (check.penalty || 0));
      }
    });

    // Weighted Overall Score
    const overall = Math.round(
      (scores.seo * 0.35) +
      (scores.perf * 0.25) +
      (scores.ux * 0.20) +
      (scores.sec * 0.20)
    );

    // Letter Grade
    let grade = 'F';
    let gradeColor = '#f43f5e';
    if (overall >= 95) { grade = 'A+'; gradeColor = '#10b981'; }
    else if (overall >= 85) { grade = 'A'; gradeColor = '#34d399'; }
    else if (overall >= 70) { grade = 'B'; gradeColor = '#06b6d4'; }
    else if (overall >= 50) { grade = 'C'; gradeColor = '#f59e0b'; }

    return { overall, scores, grade, gradeColor };
  },

  render(scoreData, summaryCounts) {
    const { overall, scores, grade, gradeColor } = scoreData;

    // 1. Update Gauge Circle (circumference = 2 * PI * r = 2 * PI * 58 ≈ 364.4)
    const circle = document.getElementById('gauge-circle-progress');
    const valueEl = document.getElementById('gauge-overall-val');
    const gradeEl = document.getElementById('gauge-grade-badge');

    if (circle && valueEl) {
      const radius = 58;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (overall / 100) * circumference;
      
      circle.style.strokeDasharray = `${circumference}`;
      circle.style.strokeDashoffset = `${offset}`;
      circle.style.stroke = gradeColor;
      valueEl.textContent = overall;
      valueEl.style.color = gradeColor;
    }

    if (gradeEl) {
      gradeEl.textContent = `رتبه ${grade}`;
      gradeEl.style.color = gradeColor;
      gradeEl.style.borderColor = gradeColor;
      gradeEl.style.backgroundColor = `${gradeColor}1a`;
    }

    // 2. Sub-Category Bars
    const catMap = [
      { key: 'seo', bar: 'bar-seo', val: 'val-seo' },
      { key: 'perf', bar: 'bar-perf', val: 'val-perf' },
      { key: 'ux', bar: 'bar-ux', val: 'val-ux' },
      { key: 'sec', bar: 'bar-sec', val: 'val-sec' }
    ];

    catMap.forEach(({ key, bar, val }) => {
      const score = scores[key];
      const barEl = document.getElementById(bar);
      const valEl = document.getElementById(val);
      if (barEl) barEl.style.width = `${score}%`;
      if (valEl) valEl.textContent = `${score}%`;
    });

    // 3. Status Badges Counter
    const errCount = document.getElementById('count-errors');
    const warnCount = document.getElementById('count-warnings');
    const passCount = document.getElementById('count-passed');

    if (errCount) errCount.textContent = summaryCounts.errors;
    if (warnCount) warnCount.textContent = summaryCounts.warnings;
    if (passCount) passCount.textContent = summaryCounts.passed;
  }
};
