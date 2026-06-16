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
})();
