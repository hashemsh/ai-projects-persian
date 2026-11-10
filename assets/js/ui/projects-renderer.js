/**
 * Categorized Project Cards Renderer Module (< 200 lines)
 */

window.HubUI = window.HubUI || {};

window.HubUI.renderProjects = function(targetSelector = '#projects-container') {
  const container = document.querySelector(targetSelector) || document.querySelector('#projects-grid');
  const projects = (window.HubData && window.HubData.projects) || [];
  const categories = (window.HubData && window.HubData.categories) || [];
  if (!container || !projects.length) return;

  window.HubUI.renderProjectCard = function(p) {
    return `
      <article class="project-card p-6 flex flex-col justify-between group">
        <div class="card-accent-bar bg-gradient-to-r ${p.accentGrad}"></div>

        <div class="card-content">
          <div class="flex items-center justify-between mb-3.5">
            <span class="px-2.5 py-1 rounded-lg text-xs font-bold ${p.badgeClass || 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'}">
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

          <div class="flex items-center gap-1.5 flex-wrap mb-6">
            ${p.techs.map(t => `
              <span class="text-[11px] px-2.5 py-0.5 rounded-md bg-dark-900/80 border border-white/10 text-slate-300 font-mono">
                ${t}
              </span>
            `).join('')}
          </div>
        </div>

        <a href="${p.url}" class="card-content w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r ${p.buttonGrad} text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 transform group-hover:scale-[1.02]">
          <span>مشاهده دمو زنده و استفاده آنلاین</span>
          <svg class="w-4 h-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </article>
    `;
  };

  const renderCard = window.HubUI.renderProjectCard;

  // Quick category navigation pills bar
  const navPillsHtml = `
    <div class="flex items-center gap-2 flex-wrap mb-10 pb-4 border-b border-white/5">
      <span class="text-xs text-slate-400 font-semibold ml-2">دسته‌بندی‌ها:</span>
      <a href="#tools" class="category-pill active" data-cat="all">
        <span>⚡ همه ابزارها</span>
        <span class="pill-count">(${projects.length})</span>
      </a>
      ${categories.map(cat => {
        const count = projects.filter(p => p.category === cat.key).length;
        return `
          <a href="#${cat.id}" class="category-pill" data-cat="${cat.key}">
            <span>${cat.icon} ${cat.shortTitle}</span>
            <span class="pill-count">(${count})</span>
          </a>
        `;
      }).join('')}
    </div>
  `;

  // Render each category section
  const sectionsHtml = categories.map(cat => {
    const catProjects = projects.filter(p => p.category === cat.key);
    if (!catProjects.length) return '';

    return `
      <section id="${cat.id}" class="category-section scroll-mt-28 mb-16">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-xl shadow-glow-indigo flex-shrink-0">
              ${cat.icon}
            </div>
            <div>
              <div class="flex items-center gap-2.5">
                <h2 class="text-xl sm:text-2xl font-black text-white">${cat.title}</h2>
                <span class="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 font-mono">${cat.badge}</span>
              </div>
              <p class="text-xs text-slate-400 mt-1">${cat.description}</p>
            </div>
          </div>
          <span class="text-xs text-slate-400 font-medium bg-white/5 px-3 py-1 rounded-full border border-white/5 self-start sm:self-auto whitespace-nowrap">
            ${catProjects.length} ابزار فعال
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${catProjects.map(renderCard).join('')}
        </div>
      </section>
    `;
  }).join('');

  container.innerHTML = navPillsHtml + sectionsHtml;

  // Active pill state on click
  container.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      container.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
};
