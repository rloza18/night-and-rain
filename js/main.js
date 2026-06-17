// Night & Rain — interactions: header state, scroll reveals, mobile nav
(function () {
  var header = document.getElementById('header');
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');

  // header solidifies after hero — but stay-detail pages (no dark hero) stay solid from the top
  var solidHeader = !!document.querySelector('.photo-collage');
  function onScroll() {
    if (solidHeader || window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile nav
  if (toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  // scroll reveals
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { io.observe(el); });

  // ---- photo collage + lightbox ----
  var gallery = document.querySelector('[data-gallery]');
  var lb = document.querySelector('[data-lightbox]');
  if (gallery && lb) {
    var images = [];
    try { images = JSON.parse(gallery.getAttribute('data-images')) || []; } catch (e) { images = []; }
    var total = images.length;
    var idx = 0;
    var lbImg = lb.querySelector('.lb-img');
    var lbCount = lb.querySelector('.lb-counter');

    function openLb(n) {
      idx = (n + total) % total;
      lbImg.src = images[idx];
      if (lbCount) lbCount.textContent = (idx + 1) + ' / ' + total;
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    function step(d) { openLb(idx + d); }
    function closeLb() { lb.hidden = true; document.body.style.overflow = ''; }

    gallery.querySelectorAll('[data-index]').forEach(function (el) {
      el.addEventListener('click', function () { openLb(+el.dataset.index); });
    });
    lb.querySelector('.lb-next').addEventListener('click', function () { step(1); });
    lb.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    });
  }

  // ---- guest reviews ----
  var rvGrid = document.querySelector('[data-review-grid]');
  if (rvGrid) {
    var rvTabs = document.querySelector('[data-review-tabs]');
    var rvMore = document.querySelector('[data-review-more]');
    var rvState = { filter: 'all', shown: 8, data: null };
    var PREVIEW = 150;

    fetch('/data/reviews.json').then(function (r) { return r.json(); }).then(function (d) {
      rvState.data = d; renderTabs(); renderCards();
    }).catch(function () { var s = document.getElementById('reviews'); if (s) s.style.display = 'none'; });

    function label(p) { return p === 'airbnb' ? 'Airbnb' : p === 'vrbo' ? 'Vrbo' : p; }
    function stars(n) { var s = ''; for (var i = 0; i < 5; i++) s += '<span class="star' + (i < n ? ' on' : '') + '">★</span>'; return s; }
    function filtered() { return rvState.data.reviews.filter(function (r) { return rvState.filter === 'all' || r.platform === rvState.filter; }); }

    function renderTabs() {
      var s = rvState.data.stats;
      var tabs = [{ k: 'all', l: 'All Reviews', s: s.all }];
      if (s.airbnb.count) tabs.push({ k: 'airbnb', l: 'Airbnb', s: s.airbnb });
      if (s.vrbo.count) tabs.push({ k: 'vrbo', l: 'Vrbo', s: s.vrbo });
      rvTabs.innerHTML = tabs.map(function (t) {
        return '<button class="rv-tab' + (t.k === rvState.filter ? ' is-active' : '') + '" data-filter="' + t.k + '">' + t.l + ' <strong>' + t.s.avg.toFixed(1) + '</strong></button>';
      }).join('');
      rvTabs.querySelectorAll('.rv-tab').forEach(function (b) {
        b.addEventListener('click', function () { rvState.filter = b.dataset.filter; rvState.shown = 8; renderTabs(); renderCards(); });
      });
    }

    function renderCards() {
      var list = filtered();
      rvGrid.innerHTML = list.slice(0, rvState.shown).map(function (r) {
        var long = r.text.length > PREVIEW;
        var txt = long ? r.text.slice(0, PREVIEW).trim() + '…' : r.text;
        return '<article class="rv-card">' +
          '<div class="rv-head"><span class="rv-avatar">' + r.name.charAt(0) + '</span><div><p class="rv-name">' + r.name + '</p><p class="rv-date">' + r.date + '</p></div></div>' +
          '<div class="rv-stars">' + stars(r.rating) + '</div>' +
          '<p class="rv-text"' + (long ? ' data-full="' + encodeURIComponent(r.text) + '"' : '') + '>' + txt + '</p>' +
          (long ? '<button class="rv-readmore" type="button">Read more</button>' : '') +
          '<div class="rv-foot"><span class="rv-badge rv-' + r.platform + '">' + label(r.platform) + '</span><span class="rv-stay">' + r.stay + '</span></div>' +
          '</article>';
      }).join('');
      rvGrid.querySelectorAll('.rv-readmore').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var p = btn.previousElementSibling, full = decodeURIComponent(p.dataset.full);
          if (btn.textContent === 'Read more') { p.textContent = full; btn.textContent = 'Show less'; }
          else { p.textContent = full.slice(0, PREVIEW).trim() + '…'; btn.textContent = 'Read more'; }
        });
      });
      rvMore.style.display = rvState.shown < list.length ? '' : 'none';
    }

    rvMore.addEventListener('click', function () { rvState.shown += 8; renderCards(); });
  }

  // ---- lead destination: GoHighLevel inbound webhook (shared by popup + signup) ----
  var LEAD_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/9dbh4VeKrcUaFQYmJTcz/webhook-trigger/3442e8a0-4a5c-46bf-aea8-b2b86a72ea42';
  function sendLead(data) {
    var body = new URLSearchParams(); // form-encoded = simple cross-origin POST, no preflight
    Object.keys(data).forEach(function (k) { if (data[k] != null) body.append(k, data[k]); });
    return fetch(LEAD_WEBHOOK, { method: 'POST', body: body }).catch(function () {});
  }

  // ---- lead-capture popup (fee-waiver offer) ----
  (function () {
    var POPUP_ENABLED = true;
    if (!POPUP_ENABLED) return;

    var SEEN_KEY = 'nr_lead_popup_seen';
    // The Hospitable Direct promo code that waives the service fee (4% = the direct service fee).
    var FEE_WAIVE_CODE = 'NOFEESHERE';
    var DELAY_MS = 9000;

    function submitLead(data) {
      return sendLead({ first_name: data.name, phone: data.phone, email: data.email, source: 'nightandrain.com', form: 'fee-waiver popup' });
    }

    if (localStorage.getItem(SEEN_KEY)) return;

    var pop = document.createElement('div');
    pop.className = 'lead-pop';
    pop.hidden = true;
    pop.innerHTML =
      '<div class="lp-card" role="dialog" aria-modal="true" aria-labelledby="lpTitle">' +
        '<button class="lp-close" aria-label="Close">&times;</button>' +
        '<div class="lp-body">' +
          '<p class="lp-eyebrow">Direct guests only</p>' +
          '<h3 id="lpTitle">We’ll waive your service fee.</h3>' +
          '<p class="lp-sub">Join the Night &amp; Rain list and we’ll cover the booking service fee on your first direct stay — plus first dibs on new desert homes.</p>' +
          '<form class="lp-form" novalidate>' +
            '<input type="text" name="name" placeholder="First name" autocomplete="given-name" required>' +
            '<input type="tel" name="phone" placeholder="Phone" autocomplete="tel" required>' +
            '<input type="email" name="email" placeholder="Email" autocomplete="email" required>' +
            '<p class="lp-error" hidden>Please fill in all three fields with a valid email.</p>' +
            '<button class="btn btn-solid" type="submit">Claim my fee waiver</button>' +
            '<p class="lp-fine">No spam — just desert deals. Unsubscribe anytime.</p>' +
          '</form>' +
        '</div>' +
        '<div class="lp-success" hidden>' +
          '<p class="lp-eyebrow">You’re in ✨</p>' +
          '<h3>Here’s your code.</h3>' +
          '<p class="lp-sub">Enter this at checkout to waive your service fee:</p>' +
          '<div class="lp-code"><span></span></div>' +
          '<a class="btn btn-solid" href="/#stays">Browse the stays</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(pop);

    var card = pop.querySelector('.lp-card');
    function open() { if (pop.hidden) { pop.hidden = false; requestAnimationFrame(function () { pop.classList.add('in'); }); } }
    function close() { pop.classList.remove('in'); localStorage.setItem(SEEN_KEY, '1'); setTimeout(function () { pop.hidden = true; }, 350); }

    pop.querySelector('.lp-close').addEventListener('click', close);
    pop.addEventListener('click', function (e) { if (e.target === pop) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) close(); });

    var form = pop.querySelector('.lp-form');
    var errEl = pop.querySelector('.lp-error');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = { name: form.name.value.trim(), phone: form.phone.value.trim(), email: form.email.value.trim() };
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      if (!data.name || !data.phone || !emailOk) { errEl.hidden = false; return; }
      errEl.hidden = true;
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true; btn.textContent = 'Sending…';
      submitLead(data).then(function () {
        pop.querySelector('.lp-code span').textContent = FEE_WAIVE_CODE;
        pop.querySelector('.lp-body').hidden = true;
        pop.querySelector('.lp-success').hidden = false;
        localStorage.setItem(SEEN_KEY, '1');
      });
    });

    var triggered = false;
    function trigger() { if (triggered) return; triggered = true; open(); }
    setTimeout(trigger, DELAY_MS);
    window.addEventListener('scroll', function () {
      var sc = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var h = document.body.scrollHeight - window.innerHeight;
      if (h > 0 && sc / h > 0.3) trigger();
    }, { passive: true });
  })();

  // ---- "Join the list" footer/CTA signup form ----
  var jl = document.querySelector('.email-capture');
  if (jl) {
    jl.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = jl.querySelector('input[type=email]');
      var email = (input.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { input.focus(); return; }
      var btn = jl.querySelector('button');
      btn.disabled = true; btn.textContent = 'Joining…';
      sendLead({ email: email, source: 'nightandrain.com', form: 'join the list' }).then(function () {
        jl.innerHTML = '<p style="margin:0;font-size:1.05rem;color:var(--ink);">You’re on the list — desert deals incoming. ✨</p>';
      });
    });
  }
})();
