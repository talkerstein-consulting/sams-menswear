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

  // ── Shared scroll lock (coordinated between mobile menu + booking modal) ──
  // Counter-based so opening the modal from inside the drawer never leaves the
  // body double-locked or prematurely unlocked.
  let lockCount = 0;
  function lockScroll() { lockCount++; document.body.style.overflow = 'hidden'; }
  function unlockScroll() { lockCount = Math.max(0, lockCount - 1); if (lockCount === 0) document.body.style.overflow = ''; }
  window.SamsUI = { lockScroll, unlockScroll };

  // ── Mobile menu drawer ────────────────────────────────────────────────
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const close = document.querySelector('[data-menu-close]');
  if (toggle && menu) {
    let lastFocus = null;
    const isOpen = () => menu.classList.contains('is-open');

    const openMenu = () => {
      lastFocus = document.activeElement;
      menu.classList.add('is-open');
      lockScroll();
      toggle.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
      if (close) { try { close.focus(); } catch (e) {} }
    };
    const closeMenu = (restore) => {
      if (!isOpen()) return;
      menu.classList.remove('is-open');
      unlockScroll();
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      if (restore !== false) { try { (lastFocus || toggle).focus(); } catch (e) {} }
    };

    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    toggle.addEventListener('click', openMenu);
    close && close.addEventListener('click', () => closeMenu());

    menu.querySelectorAll('a').forEach((a) =>
      // Don't restore focus to the toggle when following a link (the target page
      // takes focus); booking links keep the scroll locked via the modal.
      a.addEventListener('click', () => closeMenu(false))
    );

    // Escape closes; basic focus trap keeps Tab inside the open drawer.
    document.addEventListener('keydown', (e) => {
      if (!isOpen()) return;
      if (e.key === 'Escape') { closeMenu(); return; }
      if (e.key === 'Tab') {
        const f = menu.querySelectorAll('a[href], button:not([disabled])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  // ── Explore mega menu ─────────────────────────────────────────────────
  const headerEl = document.querySelector('[data-site-header]');
  const megaTrigger = document.querySelector('[data-mega]');
  const megaBtn = megaTrigger ? megaTrigger.querySelector('.mega-btn') : null;
  const megaPanel = document.querySelector('[data-mega-panel]');
  if (headerEl && megaTrigger && megaBtn && megaPanel) {
    let hoverTimer = null;
    const openMega = () => {
      clearTimeout(hoverTimer);
      headerEl.classList.add('mega-open');
      megaBtn.setAttribute('aria-expanded', 'true');
      megaPanel.setAttribute('aria-hidden', 'false');
    };
    const closeMega = () => {
      headerEl.classList.remove('mega-open');
      megaBtn.setAttribute('aria-expanded', 'false');
      megaPanel.setAttribute('aria-hidden', 'true');
    };
    const scheduleClose = () => { clearTimeout(hoverTimer); hoverTimer = setTimeout(closeMega, 180); };

    // Hover (desktop)
    [megaTrigger, megaPanel].forEach((el) => {
      el.addEventListener('mouseenter', openMega);
      el.addEventListener('mouseleave', scheduleClose);
    });
    // Click / touch / keyboard toggle
    megaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      headerEl.classList.contains('mega-open') ? closeMega() : openMega();
    });
    // Escape + outside click
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMega(); });
    document.addEventListener('click', (e) => {
      if (headerEl.classList.contains('mega-open') && !megaTrigger.contains(e.target) && !megaPanel.contains(e.target)) closeMega();
    });
    // Following a link closes it
    megaPanel.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMega));
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
