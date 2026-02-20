(function () {
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  const updateHeader = () => {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add('is-solid');
    else header.classList.remove('is-solid');
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const next = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', next);
      navToggle.setAttribute('aria-expanded', next ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  }

  const parallaxItems = document.querySelectorAll('[data-parallax]');
  if (parallaxItems.length) {
    const handleParallax = function () {
      const y = Math.min(window.scrollY, 700);
      parallaxItems.forEach(function (el) {
        const speed = Number(el.getAttribute('data-parallax')) || 0.06;
        el.style.transform = 'translateY(' + Math.round(y * speed) + 'px)';
      });
    };
    handleParallax();
    window.addEventListener('scroll', handleParallax, { passive: true });
  }
})();
