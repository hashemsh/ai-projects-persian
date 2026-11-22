/**
 * Log Analyzer & AI Debugger Logic
 * Clean Modular Web Architecture - Zero external dependencies
 */

(function () {
  'use strict';

  // DOM Elements
  var inputEl = document.getElementById('log-input');
  var formatSelect = document.getElementById('log-format-select');
  var anonymizeToggle = document.getElementById('anonymize-toggle');
  var aiModelSelect = document.getElementById('ai-model-select');
  var btnAnalyze = document.getElementById('btn-run-analysis');
  var btnClear = document.getElementById('btn-clear-log');
  var btnCopyPrompt = document.getElementById('btn-copy-prompt');
  var btnExportReport = document.getElementById('btn-export-report');
  
  // Sample buttons
  var btnSampleNginx = document.getElementById('btn-sample-nginx');
  var btnSamplePhp = document.getElementById('btn-sample-php');
  var btnSampleNode = document.getElementById('btn-sample-node');

  // Stats DOM
  var statTotalLines = document.getElementById('stat-total-lines');
  var statErrors = document.getElementById('stat-errors');
  var statWarnings = document.getElementById('stat-warnings');
  var statFatals = document.getElementById('stat-fatals');

  // Results Containers
  var parsedListEl = document.getElementById('parsed-entries-list');
  var aiPromptPre = document.getElementById('ai-prompt-output');
  var toastEl = null;
  var toastTimer = null;

  // Predefined Sample Logs
  var SAMPLES = {
    nginx: [
      '2026/11/23 02:14:05 [error] 14210#14210: *8451 connect() failed (111: Connection refused) while connecting to upstream, client: 178.252.14.92, server: api.myshop.ir, request: "POST /v1/checkout HTTP/2.0", upstream: "http://127.0.0.1:3000/v1/checkout", host: "api.myshop.ir"',
      '2026/11/23 02:15:20 [error] 14210#14210: *8460 open() "/var/www/html/assets/css/bundle.min.css" failed (2: No such file or directory), client: 85.185.122.10, server: myshop.ir, request: "GET /assets/css/bundle.min.css HTTP/2.0", host: "myshop.ir"',
      '2026/11/23 02:16:44 [warn] 14210#14210: *8472 client intended to send too large body: 25481920 bytes, client: 5.120.44.8, server: myshop.ir, request: "POST /upload/media HTTP/2.0", host: "myshop.ir"',
      '2026/11/23 02:18:11 [error] 14210#14210: *8485 upstream timed out (110: Connection timed out) while reading response header from upstream, client: 91.98.112.5, server: api.myshop.ir, request: "GET /reports/annual HTTP/2.0", upstream: "fastcgi://unix:/run/php/php8.2-fpm.sock:", host: "api.myshop.ir"'
    ].join('\n'),

    php: [
      '[23-Nov-2026 02:10:14 UTC] PHP Fatal error: Uncaught Error: Call to undefined function get_header() in /home/hashem/public_html/wp-content/themes/novin/index.php:14\nStack trace:\n#0 /home/hashem/public_html/index.php(17): require()\n#1 {main}\n  thrown in /home/hashem/public_html/wp-content/themes/novin/index.php on line 14',
      '[23-Nov-2026 02:12:30 UTC] PHP Fatal error: Allowed memory size of 134217728 bytes exhausted (tried to allocate 20480000 bytes) in /home/hashem/public_html/wp-includes/class-wp-query.php on line 3821',
      '[23-Nov-2026 02:15:02 UTC] PHP Warning: Undefined array key "user_role" in /home/hashem/public_html/wp-content/plugins/auth-guard/auth.php on line 88',
      '[23-Nov-2026 02:18:45 UTC] PHP Fatal error: Maximum execution time of 30 seconds exceeded in /home/hashem/public_html/scripts/sync-inventory.php on line 102'
    ].join('\n\n'),

    node: [
      'Error: listen EADDRINUSE: address already in use :::3000\n    at Server.setupListenHandle [as _listen2] (node:net:1800:16)\n    at listenInCluster (node:net:1848:12)\n    at Server.listen (node:net:1936:7)\n    at Object.<anonymous> (/var/www/api/server.js:42:8)',
      'UnhandledPromiseRejectionWarning: SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:5432\n    at Client._connectionCallback (/var/www/api/node_modules/pg/lib/client.js:290:19)\n    at Connection.connectingErrorHandler (/var/www/api/node_modules/pg/lib/connection.js:194:10)',
      'TypeError: Cannot read properties of undefined (reading \'map\')\n    at renderProductCatalog (/var/www/api/controllers/shop.js:76:24)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)',
      '<--- Last few GCs --->\nFATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory'
    ].join('\n\n')
  };

  // Toast Notification
  function showToast(msg, icon) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'la-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = '<span>' + (icon || '✅') + '</span><span>' + msg + '</span>';
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2400);
  }

  // Anonymize sensitive credentials, IPs, domains and home directories
  function sanitizeLog(text) {
    return text
      // Anonymize IPv4 addresses
      .replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, '192.168.1.xxx')
      // Anonymize home user directories
      .replace(/\/home\/[a-zA-Z0-9_\-]+/g, '/var/www')
      // Anonymize Bearer / Auth tokens
      .replace(/Bearer\s+[a-zA-Z0-9_\.\-]+/gi, 'Bearer [TOKEN_HIDDEN]')
      .replace(/api[-_]?key[=:]\s*['"]?[a-zA-Z0-9_\.\-]+['"]?/gi, 'api_key="[KEY_HIDDEN]"')
      // Anonymize specific domain TLDs
      .replace(/\b([a-zA-Z0-9_\-]+\.)+(ir|com|net|org|io)\b/gi, 'example.com');
  }

  // Intelligent Root Cause Explainer
  function explainError(msg) {
    var lower = msg.toLowerCase();
    if (lower.indexOf('111: connection refused') !== -1 || lower.indexOf('econnrefused') !== -1) {
      return 'سرویس Upstream مقصد (مانند Node.js، PHP-FPM یا PostgreSQL) متوقف است یا روی این پورت گوش نمی‌دهد.';
    }
    if (lower.indexOf('allowed memory size') !== -1 || lower.indexOf('heap out of memory') !== -1) {
      return 'حافظه مجاز RAM تخصیص‌داده‌شده پر شده است؛ افزایش مقدار memory_limit یا بازبینی Memory Leak الزامی است.';
    }
    if (lower.indexOf('eaddrinuse') !== -1) {
      return 'پورت مدنظر سرور از قبل توسط پروسه دیگری اشغال شده است (نیاز به kill کردن پروسه قبلی).';
    }
    if (lower.indexOf('maximum execution time') !== -1 || lower.indexOf('timed out') !== -1) {
      return 'عملیات به دلیل طولانی شدن زمان پردازش یا کندی کوئری دیتابیس Timeout خورده است.';
    }
    if (lower.indexOf('too large body') !== -1) {
      return 'حجم درخواست ارسالی از سقف client_max_body_size در Nginx فراتر رفته است.';
    }
    if (lower.indexOf('no such file or directory') !== -1) {
      return 'فایل یا دارایی استاتیک در مسیر روت وب‌سرور یافت نشد (خطای ۴۰۴ ریشه‌ای سرور).';
    }
    if (lower.indexOf('call to undefined function') !== -1) {
      return 'تابعی فراخوانی شده که وجود ندارد؛ احتمالاً افزونه وابسته غیرفعال است یا ناسازگاری نسخه PHP رخ داده است.';
    }
    if (lower.indexOf('cannot read properties of undefined') !== -1) {
      return 'تلاش برای دسترسی به مشخصه متغیری که مقدار null یا undefined دارد (نیاز به اعتبارسنجی ورودی یا Optional Chaining).';
    }
    return 'خطای سیستم یا پروسه داخلی سرور؛ نیاز به بررسی استک‌ترس و ورودی‌های تابع دارد.';
  }

  // Parse Raw Logs
  function parseLogs(rawText) {
    var lines = rawText.trim().split('\n');
    var entries = [];
    var currentEntry = null;

    lines.forEach(function (line) {
      var trimmed = line.trim();
      if (!trimmed) return;

      var isNewBlock = false;
      var severity = 'error';

      if (/\b(fatal|crash|uncaught|emerg|panic)\b/i.test(trimmed)) {
        severity = 'fatal';
        isNewBlock = true;
      } else if (/\b(error|failed|exception|err)\b/i.test(trimmed)) {
        severity = 'error';
        isNewBlock = true;
      } else if (/\b(warn|warning)\b/i.test(trimmed)) {
        severity = 'warning';
        isNewBlock = true;
      } else if (/\b(notice|info)\b/i.test(trimmed)) {
        severity = 'info';
        isNewBlock = true;
      } else if (/^(\d{4}[/-]\d{2}[/-]\d{2}|\[\w+\])/.test(trimmed)) {
        isNewBlock = true;
      }

      if (isNewBlock || !currentEntry) {
        if (currentEntry) entries.push(currentEntry);

        // Extract timestamp if available
        var timeMatch = trimmed.match(/^\[?(\d{4}[/-]\d{2}[/-]\d{2}[ T]\d{2}:\d{2}:\d{2}(?:\s*UTC|\s*\+\d{4})?)\]?/);
        var timestamp = timeMatch ? timeMatch[1] : 'زمان نامشخص';

        currentEntry = {
          severity: severity,
          timestamp: timestamp,
          message: trimmed,
          details: [],
          insight: explainError(trimmed)
        };
      } else {
        currentEntry.details.push(trimmed);
      }
    });

    if (currentEntry) entries.push(currentEntry);
    return {
      totalLines: lines.length,
      entries: entries
    };
  }

  // Render Analysis Dashboard
  function renderAnalysis(data) {
    var entries = data.entries;
    var totalLines = data.totalLines;

    var counts = { fatal: 0, error: 0, warning: 0, info: 0 };
    entries.forEach(function (e) {
      if (counts[e.severity] !== undefined) counts[e.severity]++;
    });

    // Update Counter Badges
    if (statTotalLines) statTotalLines.innerText = totalLines;
    if (statFatals) statFatals.innerText = counts.fatal;
    if (statErrors) statErrors.innerText = counts.error;
    if (statWarnings) statWarnings.innerText = counts.warning;

    // Render Parsed Cards
    if (parsedListEl) {
      if (!entries.length) {
        parsedListEl.innerHTML = '<div class="text-xs text-mut text-center py-8">هیچ خطایی در متن واردشده شناسایی نشد.</div>';
      } else {
        var html = [];
        entries.forEach(function (item, idx) {
          html.push(
            '<div class="la-entry-card ' + item.severity + '">' +
            '  <div class="la-entry-header">' +
            '    <span class="la-badge ' + item.severity + '">' + item.severity + '</span>' +
            '    <span class="la-entry-time">' + item.timestamp + '</span>' +
            '  </div>' +
            '  <div class="la-entry-msg">' + escapeHtml(item.message) + '</div>' +
            (item.details.length ? '<div class="text-[11px] text-slate-400 font-mono mt-1 mb-1 pl-2 border-l border-slate-700 max-h-24 overflow-y-auto">' + escapeHtml(item.details.join('\n')) + '</div>' : '') +
            '  <div class="la-entry-insight"><strong>💡 تحلیل ریشه‌ای:</strong> ' + item.insight + '</div>' +
            '</div>'
          );
        });
        parsedListEl.innerHTML = html.join('');
      }
    }

    // Generate AI Debugger Prompt
    generateAIPrompt(entries);
  }

  // Helper to escape HTML characters
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Build AI Prompt for ChatGPT / Claude / Gemini / DeepSeek
  function generateAIPrompt(entries) {
    if (!aiPromptPre) return;

    var model = aiModelSelect ? aiModelSelect.value : 'chatgpt';
    var isAnonymized = anonymizeToggle ? anonymizeToggle.checked : true;
    var rawText = inputEl ? inputEl.value.trim() : '';

    if (!rawText) {
      aiPromptPre.innerText = '// پس از درج لاگ‌ها و کلیک روی دکمه آنالیز، پرامپت مهندسی‌شده عیب‌یابی در اینجا آماده کپی خواهد شد...';
      return;
    }

    var logToInclude = isAnonymized ? sanitizeLog(rawText) : rawText;

    var modelGreetings = {
      chatgpt: 'You are a Senior DevOps and Full-Stack Systems Engineer specializing in server crash triage.',
      claude: 'You are an Expert Systems Architect. Please analyze the following production server logs with rigorous attention to detail.',
      gemini: 'You are a Google Cloud & Infrastructure specialist analyzing system tracebacks and error events.',
      deepseek: 'You are an Elite Backend Debugger and Systems Programmer. Inspect these critical logs and find the precise bug root cause.'
    };

    var prompt = [
      modelGreetings[model] || modelGreetings.chatgpt,
      '',
      '### وضعیت سرور و خلاصه لاگ‌های دارای خطا (Server Error Logs):',
      '```log',
      logToInclude.slice(0, 3200), // Protect against token overflow while retaining rich context
      '```',
      '',
      '### دستورالعمل پاسخگویی تخصصی (Requirements):',
      'لطفاً به عنوان مهندس ارشد سرور و دواپس، به زبان فارسی و با ساختار شفاف زیر پاسخ بده:',
      '۱. علت ریشه‌ای دقیق خطا (Root Cause): دقیقاً چه مشکلی در وب‌سرور، سرویس‌های وابسته یا کدنویسی رخ داده است؟',
      '۲. دستورات شل و کدهای اصلاحی فوری (Immediate Fix): دستورات لینوکس (Linux CLI)، تنظیمات وب‌سرور (Nginx/Apache) یا تغییرات کدی لازم برای حل فوری مشکل را ارائه بده.',
      '۳. راهکارهای پیشگیرانه (Prevention): چه تنظیماتی در کش، مانیتورینگ یا فایل کانفیگ برای جلوگیری دائمی از این خطا لازم است؟'
    ].join('\n');

    aiPromptPre.innerText = prompt;
  }

  // Event Listeners
  function initEvents() {
    if (btnAnalyze) {
      btnAnalyze.addEventListener('click', function () {
        var text = inputEl ? inputEl.value : '';
        if (!text.trim()) {
          showToast('لطفاً ابتدا لاگ‌های سرور را در کادر وارد کنید', '⚠️');
          return;
        }
        var parsed = parseLogs(text);
        renderAnalysis(parsed);
        showToast('آنالیز لاگ‌ها با موفقیت انجام شد', '⚡');
      });
    }

    if (btnClear) {
      btnClear.addEventListener('click', function () {
        if (inputEl) inputEl.value = '';
        if (parsedListEl) parsedListEl.innerHTML = '<div class="text-xs text-mut text-center py-8">لاگ‌ها پاکسازی شدند. لاگ جدید را الصاق کنید.</div>';
        if (statTotalLines) statTotalLines.innerText = '۰';
        if (statFatals) statFatals.innerText = '۰';
        if (statErrors) statErrors.innerText = '۰';
        if (statWarnings) statWarnings.innerText = '۰';
        if (aiPromptPre) aiPromptPre.innerText = '// لاگ‌های سرور پاکسازی شدند...';
        showToast('کادر لاگ‌ها خالی شد', '🗑️');
      });
    }

    // Sample buttons
    if (btnSampleNginx) {
      btnSampleNginx.addEventListener('click', function () {
        if (inputEl) inputEl.value = SAMPLES.nginx;
        if (formatSelect) formatSelect.value = 'nginx';
        btnAnalyze.click();
      });
    }

    if (btnSamplePhp) {
      btnSamplePhp.addEventListener('click', function () {
        if (inputEl) inputEl.value = SAMPLES.php;
        if (formatSelect) formatSelect.value = 'php';
        btnAnalyze.click();
      });
    }

    if (btnSampleNode) {
      btnSampleNode.addEventListener('click', function () {
        if (inputEl) inputEl.value = SAMPLES.node;
        if (formatSelect) formatSelect.value = 'node';
        btnAnalyze.click();
      });
    }

    // Copy Prompt Button
    if (btnCopyPrompt) {
      btnCopyPrompt.addEventListener('click', function () {
        var text = aiPromptPre ? aiPromptPre.innerText : '';
        if (!text || text.startsWith('//')) {
          showToast('ابتدا لاگ‌ها را آنالیز کنید', '⚠️');
          return;
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            showToast('پرامپت عیب‌یابی در کلیپ‌بورد کپی شد', '📋');
          });
        }
      });
    }

    // Export Report
    if (btnExportReport) {
      btnExportReport.addEventListener('click', function () {
        var text = inputEl ? inputEl.value : '';
        if (!text.trim()) {
          showToast('لاگی برای اکسپورت موجود نیست', '⚠️');
          return;
        }
        var parsed = parseLogs(text);
        var md = [
          '# 📋 گزارش ممیزی و آنالیز خطاهای سرور (Server Log Audit Report)\n',
          '- تاریخ گزارش: ' + new Date().toISOString(),
          '- تعداد خطوط لاگ: ' + parsed.totalLines,
          '- خطاهای بحرانی (Fatal): ' + (statFatals ? statFatals.innerText : '0'),
          '- خطاهای استاندارد (Error): ' + (statErrors ? statErrors.innerText : '0'),
          '- هشدارها (Warning): ' + (statWarnings ? statWarnings.innerText : '0'),
          '\n## 🔍 جزئیات خطاهای شناسایی‌شده:\n'
        ];
        parsed.entries.forEach(function (e, idx) {
          md.push('### ' + (idx + 1) + '. [' + e.severity.toUpperCase() + '] ' + e.timestamp);
          md.push('```log\n' + e.message + '\n```');
          md.push('**تحلیل علت ریشه‌ای:** ' + e.insight + '\n');
        });

        var blob = new Blob([md.join('\n')], { type: 'text/markdown;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'server-log-audit-report.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('فایل گزارش مارک‌داون دانلود شد', '📥');
      });
    }

    if (anonymizeToggle) {
      anonymizeToggle.addEventListener('change', function () {
        var text = inputEl ? inputEl.value : '';
        if (text.trim()) {
          var parsed = parseLogs(text);
          generateAIPrompt(parsed.entries);
        }
      });
    }

    if (aiModelSelect) {
      aiModelSelect.addEventListener('change', function () {
        var text = inputEl ? inputEl.value : '';
        if (text.trim()) {
          var parsed = parseLogs(text);
          generateAIPrompt(parsed.entries);
        }
      });
    }
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function () {
    initEvents();
    // Load default sample
    if (btnSampleNginx && inputEl && !inputEl.value) {
      btnSampleNginx.click();
    }
  });

})();
