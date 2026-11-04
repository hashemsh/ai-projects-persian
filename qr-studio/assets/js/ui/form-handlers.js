/**
 * QR Code Studio Pro - Dynamic Input Forms & Data Binder
 */
window.QRFormHandlers = (function() {
  function renderForm(type, containerEl) {
    if (!containerEl || !window.QRFormTemplates) return;
    const tpl = window.QRFormTemplates.templates[type];
    if (!tpl) return;
    containerEl.innerHTML = tpl();

    // Auto format card number input
    const bankCard = containerEl.querySelector('#inpBankCard');
    if (bankCard) {
      bankCard.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 16);
        e.target.value = v.replace(/(.{4})/g, '$1-').replace(/-$/, '');
      });
    }

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
      case 'vcard':
        return {
          firstName: document.getElementById('inpVcFirst')?.value || '',
          lastName: document.getElementById('inpVcLast')?.value || '',
          org: document.getElementById('inpVcOrg')?.value || '',
          title: document.getElementById('inpVcTitle')?.value || '',
          phone: document.getElementById('inpVcPhone')?.value || '',
          email: document.getElementById('inpVcEmail')?.value || '',
          url: document.getElementById('inpVcUrl')?.value || ''
        };
      case 'bank':
        return {
          cardNumber: document.getElementById('inpBankCard')?.value || '',
          sheba: document.getElementById('inpBankSheba')?.value || '',
          ownerName: document.getElementById('inpBankOwner')?.value || '',
          bankName: document.getElementById('inpBankName')?.value || ''
        };
      case 'sms':
        return {
          phone: document.getElementById('inpSmsPhone')?.value || '',
          message: document.getElementById('inpSmsMsg')?.value || ''
        };
      case 'email':
        return {
          to: document.getElementById('inpMailTo')?.value || '',
          subject: document.getElementById('inpMailSub')?.value || '',
          body: document.getElementById('inpMailBody')?.value || ''
        };
      case 'geo':
        return {
          lat: document.getElementById('inpGeoLat')?.value || '',
          lng: document.getElementById('inpGeoLng')?.value || '',
          title: document.getElementById('inpGeoTitle')?.value || ''
        };
      case 'event':
        return {
          title: document.getElementById('inpEventTitle')?.value || '',
          startDate: document.getElementById('inpEventStart')?.value || '',
          endDate: document.getElementById('inpEventEnd')?.value || '',
          location: document.getElementById('inpEventLoc')?.value || ''
        };
      case 'text':
      default:
        return { text: document.getElementById('inpRawText')?.value || '' };
    }
  }

  return {
    renderForm,
    getFormData
  };
})();
