/**
 * FAQ Renderer & Accordion Controller Module
 */

window.HubUI = window.HubUI || {};

window.HubUI.initFAQ = function(containerSelector = '#faq-list') {
  const container = document.querySelector(containerSelector);
  const faqList = (window.HubData && window.HubData.faqList) || [];
  if (!container || !faqList.length) return;

  container.innerHTML = faqList.map((item, index) => `
    <div class="faq-item">
      <button class="faq-trigger" type="button" aria-expanded="false" id="faq-btn-${index}">
        <span class="text-sm md:text-base">${item.question}</span>
        <svg class="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div class="faq-body" id="faq-body-${index}">
        <div class="faq-content">
          ${item.answer}
        </div>
      </div>
    </div>
  `).join('');

  const items = container.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Close all other items
      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherTrigger = other.querySelector('.faq-trigger');
          if (otherTrigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
          }
        }
      });

      // Toggle clicked item
      if (isAlreadyActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
};
