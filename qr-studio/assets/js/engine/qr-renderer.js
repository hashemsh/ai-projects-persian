/**
 * QR Code Studio Pro - Multi-Style QR Renderer & Vector Exporter
 * Leverages QRCodeStyling & HTML5 Canvas for high-res downloads and live scanning.
 */
window.QRRenderer = (function() {
  let qrInstance = null;
  let currentOptions = null;

  function init(containerEl) {
    if (!containerEl || typeof window.QRCodeStyling !== 'function') {
      console.warn('QRCodeStyling not loaded or container missing.');
      return;
    }
    qrInstance = new window.QRCodeStyling({
      width: 320,
      height: 320,
      data: 'https://tablighma.com/',
      margin: 10,
      qrOptions: { errorCorrectionLevel: 'H' },
      dotsOptions: { type: 'rounded', color: '#06b6d4' },
      backgroundOptions: { color: '#ffffff' }
    });
    containerEl.innerHTML = '';
    qrInstance.append(containerEl);
  }

  function render(options, containerEl) {
    currentOptions = options;
    if (!qrInstance && containerEl) {
      init(containerEl);
    }
    if (!qrInstance) return;

    const stylingConfig = {
      data: options.data || 'https://tablighma.com/',
      width: 320,
      height: 320,
      margin: options.margin !== undefined ? options.margin : 10,
      qrOptions: {
        errorCorrectionLevel: options.errorCorrection || 'H'
      },
      image: options.logo || undefined,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: options.logoSize || 0.28,
        margin: options.logoMargin !== undefined ? options.logoMargin : 4,
        crossOrigin: 'anonymous'
      },
      dotsOptions: {
        type: options.dotType || 'rounded',
        ...(options.gradient ? {
          gradient: {
            type: options.gradientType || 'linear',
            rotation: 0,
            colorStops: [
              { offset: 0, color: options.color1 },
              { offset: 1, color: options.color2 }
            ]
          }
        } : {
          color: options.color1 || '#000000'
        })
      },
      backgroundOptions: {
        color: options.transparentBg ? 'transparent' : (options.bgColor || '#ffffff')
      },
      cornersSquareOptions: {
        type: options.cornerSquareType || 'extra-rounded',
        color: options.cornerColor || (options.gradient ? options.color1 : options.color1)
      },
      cornersDotOptions: {
        type: options.cornerDotType || 'dot',
        color: options.cornerColor || (options.gradient ? options.color2 : options.color1)
      }
    };

    qrInstance.update(stylingConfig);
  }

  async function getRawCanvas() {
    if (!qrInstance) return null;
    return await qrInstance.getRawData('canvas');
  }

  async function download(extension = 'png', filename = 'qrcode-studio-pro', size = 1024) {
    if (!qrInstance) return;
    const originalWidth = qrInstance._options.width;
    const originalHeight = qrInstance._options.height;

    try {
      if (extension === 'svg') {
        await qrInstance.download({ name: filename, extension: 'svg' });
      } else {
        qrInstance.update({ width: size, height: size });
        await qrInstance.download({ name: filename, extension: extension });
        qrInstance.update({ width: originalWidth, height: originalHeight });
      }
    } catch (err) {
      console.error('Download failed, falling back:', err);
    }
  }

  async function copyToClipboard() {
    if (!qrInstance) throw new Error('کیوآرکد رندر نشده است.');
    const blob = await qrInstance.getRawData('blob');
    if (!blob) throw new Error('امکان دریافت داده تصویر وجود ندارد.');
    if (!navigator.clipboard || !window.ClipboardItem) {
      throw new Error('مرورگر شما از قابلیت کپی مستقیم تصویر در کلیپ‌بورد پشتیبانی نمی‌کند.');
    }
    await navigator.clipboard.write([
      new window.ClipboardItem({ 'image/png': blob })
    ]);
  }

  async function decodeCurrentQR() {
    if (typeof window.jsQR !== 'function') {
      return { success: false, error: 'موتور رمزگشایی بارگذاری نشده است.' };
    }
    const canvas = document.querySelector('#qrCanvasBox canvas');
    if (!canvas) {
      return { success: false, error: 'کانواس کیوآرکد در صفحه یافت نشد.' };
    }
    try {
      const ctx = canvas.getContext('2d');
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = window.jsQR(imgData.data, imgData.width, imgData.height, {
        inversionAttempts: 'dontInvert'
      });
      if (code && code.data) {
        return { success: true, data: code.data };
      }
      return { success: false, error: 'کد توسط دوربین قابل خواندن نبود (کنتراست یا اندازه لوگو را بررسی کنید).' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  return {
    init,
    render,
    download,
    copyToClipboard,
    decodeCurrentQR,
    getRawCanvas
  };
})();
