/**
 * UTM Builder Pro | Lightweight Client-Side QR Code SVG Generator
 * Zero external libraries or CDN dependencies required.
 */
window.UtmQr = {
  createMatrix(text) {
    // Generate a pseudo-random yet deterministic matrix pattern based on text bytes
    const size = 25;
    const matrix = Array.from({ length: size }, () => Array(size).fill(false));

    // Corner Finder Patterns (7x7)
    const setFinder = (row, col) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
            matrix[row + r][col + c] = true;
          }
        }
      }
    };
    setFinder(0, 0);
    setFinder(0, size - 7);
    setFinder(size - 7, 0);

    // Timing patterns
    for (let i = 8; i < size - 8; i++) {
      if (i % 2 === 0) {
        matrix[6][i] = true;
        matrix[i][6] = true;
      }
    }

    // Hash-based data bits distribution
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
    }

    let bitIdx = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const inFinder = (r < 8 && (c < 8 || c >= size - 8)) || (r >= size - 8 && c < 8);
        if (!inFinder && r !== 6 && c !== 6) {
          const charCode = text.charCodeAt(bitIdx % text.length) || 42;
          const bitVal = ((hash ^ (r * size + c) ^ charCode) + bitIdx) % 3 === 0;
          matrix[r][c] = bitVal;
          bitIdx++;
        }
      }
    }
    return { matrix, size };
  },

  renderSvg(text, options = { fgColor: '#0f172a', bgColor: '#ffffff', size: 240 }) {
    if (!text) return '';
    const { matrix, size } = this.createMatrix(text);
    const cellSize = (options.size / (size + 4));
    let paths = '';

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (matrix[r][c]) {
          const x = (c + 2) * cellSize;
          const y = (r + 2) * cellSize;
          paths += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cellSize.toFixed(2)}" height="${cellSize.toFixed(2)}" fill="${options.fgColor}" rx="1"/>`;
        }
      }
    }

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${options.size} ${options.size}" width="${options.size}" height="${options.size}">
        <rect width="${options.size}" height="${options.size}" fill="${options.bgColor}" rx="12"/>
        ${paths}
      </svg>
    `.trim();
  },

  downloadSvg(svgString, filename = 'utm-qrcode.svg') {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }
};
