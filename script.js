(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var panel = item.querySelector('.faq-panel');
      var sign = item.querySelector('.faq-sign');
      var isOpen = item.classList.contains('is-open');

      // close others
      document.querySelectorAll('.faq-item.is-open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('is-open');
          var p = other.querySelector('.faq-panel');
          var s = other.querySelector('.faq-sign');
          p.style.height = '0px';
          p.style.opacity = '0';
          if (s) s.textContent = '+';
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        panel.style.height = '0px';
        panel.style.opacity = '0';
        if (sign) sign.textContent = '+';
      } else {
        item.classList.add('is-open');
        panel.style.height = panel.scrollHeight + 'px';
        panel.style.opacity = '1';
        if (sign) sign.textContent = '+';
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  reveals.forEach(function (el) {
    el.classList.add('reveal');
    el.style.transition = 'opacity .6s cubic-bezier(.4,0,.2,1), transform .6s cubic-bezier(.4,0,.2,1)';
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.opacity = '1';
          el.style.transform = 'none';
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 6, 5) * 60) + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* ---------- Floating buttons show on scroll ---------- */
  var fab = document.getElementById('fab-stack');
  var toTop = document.getElementById('to-top');
  function onScroll() {
    if (!fab) return;
    if (window.scrollY > 300) {
      fab.classList.remove('opacity-0', 'translate-y-16', 'pointer-events-none');
    } else {
      fab.classList.add('opacity-0', 'translate-y-16', 'pointer-events-none');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
