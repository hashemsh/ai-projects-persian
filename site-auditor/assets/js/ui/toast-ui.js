/**
 * Custom Toast Notifications System
 */
window.AuditorToast = {
  containerId: 'toast-container',

  getContainer() {
    let container = document.getElementById(this.containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = this.containerId;
      document.body.appendChild(container);
    }
    return container;
  },

  show(message, type = 'info', duration = 3500) {
    const container = this.getContainer();
    const toast = document.createElement('div');

    const icons = {
      success: '✅',
      error: '🛑',
      warning: '⚠️',
      info: '✨'
    };

    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || '✨'}</span>
      <span class="font-medium flex-1">${message}</span>
      <button type="button" class="text-slate-400 hover:text-white mr-2 text-xs" aria-label="بستن">✕</button>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    const closeBtn = toast.querySelector('button');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.dismiss(toast));
    }

    // Auto dismiss
    setTimeout(() => {
      this.dismiss(toast);
    }, duration);
  },

  dismiss(toast) {
    if (!toast || !toast.parentElement) return;
    toast.classList.remove('show');
    toast.style.transform = 'translateY(15px)';
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  }
};
