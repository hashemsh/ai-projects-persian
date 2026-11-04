/**
 * QR Code Studio Pro - Dynamic Input Forms & Data Binder
 */
window.QRFormHandlers = (function() {
  function renderForm(type, containerEl) {
    if (!containerEl || !window.QRFormTemplates) return;
    const tpl = window.QRFormTemplates.templates[type];
    if (!tpl) return;
    containerEl.innerHTML = tpl();

    // Toggle wifi password visibility
    const btnToggleWifi = containerEl.querySelector('#btnToggleWifiPass');
    const inpWifiPass = containerEl.querySelector('#inpWifiPass');
    if (btnToggleWifi && inpWifiPass) {
      btnToggleWifi.addEventListener('click', () => {
        const isPass = inpWifiPass.type === 'password';
        inpWifiPass.type = isPass ? 'text' : 'password';
        btnToggleWifi.textContent = isPass ? 'مخفی' : 'نمایش';
      });
    }
  }

  function getFormData(type) {
    switch (type) {
      case 'url':
        return { url: document.getElementById('inpUrl')?.value || '' };
      case 'wifi':
        return {
          ssid: document.getElementById('inpWifiSsid')?.value || '',
          pass: document.getElementById('inpWifiPass')?.value || '',
          type: document.getElementById('inpWifiType')?.value || 'WPA',
          hidden: document.getElementById('inpWifiHidden')?.checked || false
        };
      case 'whatsapp':
        return {
          phone: document.getElementById('inpWaPhone')?.value || '',
          text: document.getElementById('inpWaText')?.value || ''
        };
      case 'telegram':
        return {
          target: document.getElementById('inpTgTarget')?.value || '',
          text: document.getElementById('inpTgText')?.value || ''
        };
      case 'instagram':
        return {
          username: document.getElementById('inpIgUser')?.value || ''
        };
      default:
        return { url: document.getElementById('inpUrl')?.value || '' };
    }
  }

  return {
    renderForm,
    getFormData
  };
})();
