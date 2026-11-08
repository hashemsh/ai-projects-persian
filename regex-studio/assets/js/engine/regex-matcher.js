/**
 * Live Regex Engine & Match Highlighter (< 200 lines)
 */

window.RegexMatcher = (function() {
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function executeMatch(patternStr, flagsStr, testString, replaceStr = '') {
    const startTime = performance.now();

    if (!patternStr) {
      return {
        isValid: true,
        pattern: null,
        matches: [],
        highlightedHtml: escapeHtml(testString || '').replace(/\n/g, '<br>'),
        replacedText: testString || '',
        execTime: 0,
        error: null
      };
    }

    try {
      const regex = new RegExp(patternStr, flagsStr);
      const isGlobal = flagsStr.includes('g');
      const matches = [];
      const text = testString || '';

      if (isGlobal) {
        let match;
        let lastIndex = 0;
        let safetyCount = 0;

        while ((match = regex.exec(text)) !== null) {
          if (safetyCount++ > 2500) break; // Avoid infinite loop on zero-width matches

          matches.push({
            match: match[0],
            index: match.index,
            length: match[0].length,
            groups: match.slice(1)
          });

          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          lastIndex = regex.lastIndex;
        }
      } else {
        const singleMatch = regex.exec(text);
        if (singleMatch) {
          matches.push({
            match: singleMatch[0],
            index: singleMatch.index,
            length: singleMatch[0].length,
            groups: singleMatch.slice(1)
          });
        }
      }

      // Generate visual highlighted HTML
      let highlightedHtml = '';
      let cursor = 0;

      for (let i = 0; i < matches.length; i++) {
        const m = matches[i];
        if (m.index > cursor) {
          highlightedHtml += escapeHtml(text.substring(cursor, m.index));
        }
        const matchContent = escapeHtml(m.match || '·');
        const colorClass = (i % 2 === 0) ? 'match-highlight-a' : 'match-highlight-b';
        highlightedHtml += `<mark class="regex-match-mark ${colorClass}" data-match-index="${i}">${matchContent}</mark>`;
        cursor = m.index + m.length;
      }

      if (cursor < text.length) {
        highlightedHtml += escapeHtml(text.substring(cursor));
      }

      highlightedHtml = highlightedHtml.replace(/\n/g, '<br>');

      // Calculate replacement preview
      let replacedText = '';
      try {
        replacedText = text.replace(regex, replaceStr);
      } catch (err) {
        replacedText = text;
      }

      const execTime = (performance.now() - startTime).toFixed(2);

      return {
        isValid: true,
        pattern: regex,
        matches,
        highlightedHtml: highlightedHtml || '<span class="text-slate-600">متن تستی خالی است...</span>',
        replacedText,
        execTime,
        error: null
      };
    } catch (err) {
      return {
        isValid: false,
        pattern: null,
        matches: [],
        highlightedHtml: escapeHtml(testString || '').replace(/\n/g, '<br>'),
        replacedText: testString || '',
        execTime: 0,
        error: err.message
      };
    }
  }

  return { executeMatch, escapeHtml };
})();
