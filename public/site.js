// Sam's Menswear — shared site interactions.
// Vanilla JS, no framework. Loaded on every page.

(() => {
  // ── Scroll reveals via IntersectionObserver ───────────────────────────
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );

  document
    .querySelectorAll('[data-reveal], [data-reveal-stagger]')
    .forEach((el) => io.observe(el));

  // ── Mobile menu drawer ────────────────────────────────────────────────
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const close = document.querySelector('[data-menu-close]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
    close && close.addEventListener('click', () => {
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
    menu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      })
    );
  }

  // ── Sticky brand subtle shrink on scroll ──────────────────────────────
  const header = document.querySelector('[data-site-header]');
  if (header) {
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 60);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Year footer ───────────────────────────────────────────────────────
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
