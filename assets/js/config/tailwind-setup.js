/**
 * External Tailwind CSS Configuration
 */

// Suppress Play CDN production warning in console
const origWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('cdn.tailwindcss.com')) return;
  origWarn.apply(console, args);
};

window.tailwind = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
      },
      colors: {
        dark: {
          950: '#070913',
          900: '#0c0f1d',
          850: '#111528',
          800: '#171c34',
          700: '#232b4d',
        },
        accent: {
          cyan: '#06b6d4',
          indigo: '#6366f1',
          purple: '#a855f7',
          pink: '#ec4899',
          emerald: '#10b981',
          amber: '#f59e0b'
        }
      },
      boxShadow: {
        'glow-indigo': '0 0 35px -5px rgba(99, 102, 241, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    }
  }
};
