(function () {
  var input = document.getElementById('hero-search-input');
  var clearBtn = document.getElementById('hero-search-clear');
  var navSrch = document.querySelector('.nav-srch-btn') || document.querySelector('.srch');
  var cards = Array.from(document.querySelectorAll('.cg .cd'));
  var chips = Array.from(document.querySelectorAll('.chip'));
  var grid = document.querySelector('.cg');
  if (!input || !grid) return;

  function norm(s) {
    return (s || '').toLowerCase()
      .replace(/[ي]/g, 'ی').replace(/[ك]/g, 'ک').replace(/[ة]/g, 'ه')
      .replace(/[\u200C\u200B]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  var noRes = document.createElement('div');
  noRes.className = 'no-res';
  noRes.style.display = 'none';
  noRes.innerHTML = '<h3 style="margin:0;font-size:17px;font-weight:900">ابزاری با این عبارت پیدا نشد</h3><p style="margin:8px 0 0;font-size:13px;color:var(--mut)">می‌توانید کلماتی مثل سئو، پرامپت، QR، WebP، کد یا مارکتینگ را امتحان کنید.</p>';
  grid.appendChild(noRes);

  function filter(q) {
    var query = norm(q);
    if (clearBtn) clearBtn.style.display = query ? 'inline-block' : 'none';
    var matches = 0;
    cards.forEach(function (card) {
      var text = norm(card.innerText + ' ' + (card.querySelector('img') ? card.querySelector('img').alt : ''));
      var match = !query || text.indexOf(query) !== -1;
      card.style.display = match ? 'flex' : 'none';
      if (match) matches++;
    });
    noRes.style.display = (matches === 0) ? 'block' : 'none';
  }

  input.addEventListener('input', function (e) {
    chips.forEach(function (c) { c.classList.remove('active'); });
    filter(e.target.value);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      input.value = '';
      filter('');
      chips.forEach(function (c) { c.classList.remove('active'); });
      input.focus();
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function (e) {
      e.preventDefault();
      var tag = chip.innerText.trim();
      var isActive = chip.classList.contains('active');
      chips.forEach(function (c) { c.classList.remove('active'); });
      if (isActive) {
        input.value = '';
        filter('');
      } else {
        chip.classList.add('active');
        input.value = tag;
        filter(tag);
        var toolsSec = document.getElementById('tools');
        if (toolsSec) toolsSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (navSrch) {
    navSrch.addEventListener('click', function (e) {
      if (e && e.preventDefault) e.preventDefault();
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { input.focus(); }, 40);
    });
  }

  window.addEventListener('keydown', function (e) {
    var tag = document.activeElement ? document.activeElement.tagName : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      if (e.key === 'Escape' && document.activeElement === input) {
        input.value = '';
        filter('');
        input.blur();
      }
      return;
    }
    if (e.key === '/' || e.code === 'Slash') {
      e.preventDefault();
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
})();
