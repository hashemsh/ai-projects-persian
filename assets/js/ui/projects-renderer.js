/**
 * Project Cards Renderer Module
 */

import { projects } from '../data/projects-data.js';

export function renderProjects(containerSelector = '#projects-grid') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = projects.map((p) => `
    <article class="project-card p-6 flex flex-col justify-between group">
      <div class="card-accent-bar bg-gradient-to-r ${p.accentGrad}"></div>

      <div class="card-content">
        <div class="flex items-center justify-between mb-3.5">
          <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            ${p.badge}
          </span>
          <span class="text-2xl card-icon">${p.emoji}</span>
        </div>

        <h3 class="text-xl font-black text-white group-hover:text-cyan-300 transition duration-300 mb-2.5">
          ${p.title}
        </h3>
        <p class="text-xs text-slate-300 leading-relaxed mb-5">
          ${p.description}
        </p>

        <!-- Tech Badges -->
        <div class="flex items-center gap-1.5 flex-wrap mb-6">
          ${p.techs.map(t => `
            <span class="text-[11px] px-2.5 py-0.5 rounded-md bg-dark-900/80 border border-white/10 text-slate-300 font-mono">
              ${t}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Action Button -->
      <a href="${p.url}" class="card-content w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r ${p.buttonGrad} text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 transform group-hover:scale-[1.02]">
        <span>مشاهده دمو زنده و استفاده آنلاین</span>
        <svg class="w-4 h-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </article>
  `).join('');
}
