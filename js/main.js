// Night & Rain — interactions: header state, scroll reveals, mobile nav
(function () {
  var header = document.getElementById('header');
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');

  // header solidifies after hero
  function onScroll() {
    if (window.scrollY > 60) header.classList.add('scrolled');
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

  // ---- gallery slideshow + lightbox ----
  var ss = document.querySelector('[data-slideshow]');
  var lb = document.querySelector('[data-lightbox]');
  if (ss && lb) {
    var slides = Array.prototype.slice.call(ss.querySelectorAll('.ss-slide'));
    var thumbs = Array.prototype.slice.call(ss.querySelectorAll('.ss-thumb'));
    var curEl = ss.querySelector('.ss-cur');
    var thumbRow = ss.querySelector('.ss-thumbs');
    var total = slides.length;
    var idx = 0;
    var timer = null;
    var DELAY = 5000;

    function show(n) {
      idx = (n + total) % total;
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
      thumbs.forEach(function (t, i) { t.classList.toggle('is-active', i === idx); });
      if (curEl) curEl.textContent = idx + 1;
      var active = thumbs[idx];
      if (active && thumbRow) {
        thumbRow.scrollTo({ left: active.offsetLeft - thumbRow.clientWidth / 2 + active.clientWidth / 2, behavior: 'smooth' });
      }
    }
    function next() { show(idx + 1); }
    function prev() { show(idx - 1); }
    function start() { stop(); timer = setInterval(next, DELAY); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    ss.querySelector('.ss-next').addEventListener('click', function () { next(); start(); });
    ss.querySelector('.ss-prev').addEventListener('click', function () { prev(); start(); });
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () { show(+t.dataset.index); start(); });
    });
    ss.addEventListener('mouseenter', stop);
    ss.addEventListener('mouseleave', start);

    // lightbox
    var lbImg = lb.querySelector('.lb-img');
    var lbCount = lb.querySelector('.lb-counter');
    function openLb(n) {
      idx = (n + total) % total;
      lbImg.src = slides[idx].src;
      lbImg.alt = slides[idx].alt;
      if (lbCount) lbCount.textContent = (idx + 1) + ' / ' + total;
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      stop();
    }
    function lbStep(d) { idx = (idx + d + total) % total; openLb(idx); }
    function closeLb() { lb.hidden = true; document.body.style.overflow = ''; show(idx); start(); }

    slides.forEach(function (s) { s.addEventListener('click', function () { openLb(+s.dataset.index); }); });
    ss.querySelector('.ss-expand').addEventListener('click', function () { openLb(idx); });
    lb.querySelector('.lb-next').addEventListener('click', function () { lbStep(1); });
    lb.querySelector('.lb-prev').addEventListener('click', function () { lbStep(-1); });
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowRight') lbStep(1);
      else if (e.key === 'ArrowLeft') lbStep(-1);
    });

    show(0);
    start();
  }
})();
