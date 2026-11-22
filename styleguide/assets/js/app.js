/**
 * Style Guide Interactive Controller
 * Clean Modular Web Architecture
 */

(function () {
  'use strict';

  // 1. Toast Notification Utility
  var toastEl = null;
  var toastTimer = null;

  function showToast(message, icon) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'sg-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = '<span>' + (icon || '✅') + '</span><span>' + message + '</span>';
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2400);
  }

  // 2. Clipboard Copy Helper
  function copyTextToClipboard(text, successMessage) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(successMessage || 'در حافظه کپی شد');
      }).catch(function () {
        fallbackCopy(text, successMessage);
      });
    } else {
      fallbackCopy(text, successMessage);
    }
  }

  function fallbackCopy(text, successMessage) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(successMessage || 'در حافظه کپی شد');
    } catch (e) {
      showToast('خطا در کپی خودکار', '⚠️');
    }
    document.body.removeChild(ta);
  }

  // 3. Setup Code Block Copy Buttons
  function initCodeCopyButtons() {
    var copyButtons = document.querySelectorAll('.sg-code-copy-btn');
    copyButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pre = btn.closest('.sg-code-box').querySelector('pre');
        if (pre) {
          copyTextToClipboard(pre.innerText.trim(), 'کد کپی شد');
          var origText = btn.innerHTML;
          btn.innerHTML = '<span>✓</span><span>کپی شد</span>';
          setTimeout(function () {
            btn.innerHTML = origText;
          }, 1800);
        }
      });
    });
  }

  // 4. Setup Color Swatches Click-to-Copy
  function initColorSwatches() {
    var swatches = document.querySelectorAll('.sg-color-card');
    swatches.forEach(function (card) {
      card.addEventListener('click', function () {
        var code = card.getAttribute('data-copy') || card.querySelector('.sg-color-meta').innerText;
        copyTextToClipboard(code, 'مقدار ' + code + ' کپی شد');
      });
    });
  }

  // 5. Setup Interactive Release Checklist
  var CHECKLIST_STORAGE_KEY = 'hub_new_tool_checklist_state_v1';

  function initChecklist() {
    var checkboxes = document.querySelectorAll('.sg-check-item input[type="checkbox"]');
    var progressText = document.getElementById('sg-checklist-progress-text');
    var progressBar = document.getElementById('sg-checklist-progress-bar');
    var exportBtn = document.getElementById('sg-export-checklist-btn');
    var resetBtn = document.getElementById('sg-reset-checklist-btn');

    if (!checkboxes.length) return;

    // Load saved state
    var savedState = {};
    try {
      savedState = JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_KEY) || '{}');
    } catch (_) {}

    checkboxes.forEach(function (cb) {
      var id = cb.id;
      if (id && savedState[id] !== undefined) {
        cb.checked = savedState[id];
      }
    });

    function updateProgress() {
      var total = checkboxes.length;
      var checkedCount = 0;
      var currentState = {};

      checkboxes.forEach(function (cb) {
        if (cb.checked) checkedCount++;
        if (cb.id) currentState[cb.id] = cb.checked;
      });

      var percent = Math.round((checkedCount / total) * 100);
      if (progressText) {
        progressText.innerText = checkedCount + ' از ' + total + ' مورد (' + percent + '٪ تکمیل)';
      }
      if (progressBar) {
        progressBar.style.width = percent + '%';
      }

      try {
        localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(currentState));
      } catch (_) {}
    }

    checkboxes.forEach(function (cb) {
      cb.addEventListener('change', updateProgress);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (confirm('آیا مایلید تمام موارد چک‌لیست بازنشانی شوند؟')) {
          checkboxes.forEach(function (cb) { cb.checked = false; });
          localStorage.removeItem(CHECKLIST_STORAGE_KEY);
          updateProgress();
          showToast('چک‌لیست بازنشانی شد', '🔄');
        }
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        var report = ['# 🚀 گزارش بررسی و چک‌لیست ریلیز ابزار جدید\n'];
        var cards = document.querySelectorAll('.sg-checklist-card');
        cards.forEach(function (card) {
          var header = card.querySelector('h4');
          if (header) report.push('### ' + header.innerText.trim());
          var items = card.querySelectorAll('.sg-check-item');
          items.forEach(function (item) {
            var cb = item.querySelector('input[type="checkbox"]');
            var title = item.querySelector('.sg-check-title');
            var isDone = cb && cb.checked;
            if (title) {
              report.push('- [' + (isDone ? 'x' : ' ') + '] ' + title.innerText.trim());
            }
          });
          report.push('');
        });

        copyTextToClipboard(report.join('\n'), 'متن کامل گزارش چک‌لیست کپی شد');
      });
    }

    updateProgress();
  }

  // 6. Sticky Sidebar Scroll Spy
  function initScrollSpy() {
    var links = document.querySelectorAll('.sg-nav-link');
    var sections = [];

    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var target = document.querySelector(href);
        if (target) sections.push({ link: link, target: target });
      }
    });

    function onScroll() {
      var scrollPos = window.scrollY + 140;
      var current = null;

      sections.forEach(function (sec) {
        if (sec.target.offsetTop <= scrollPos) {
          current = sec.link;
        }
      });

      links.forEach(function (l) { l.classList.remove('active'); });
      if (current) current.classList.add('active');
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Initialize all on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initCodeCopyButtons();
    initColorSwatches();
    initChecklist();
    initScrollSpy();
  });

})();
