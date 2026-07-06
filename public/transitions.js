// transitions.js — themed page transitions for Sam's Menswear.
// Intercepts internal link clicks, plays a destination-themed exit overlay,
// then navigates. The destination page reads sessionStorage on load and
// plays a matching entry overlay.

(() => {
  // Mapping from clean-URL last-segment → transition kind + leaving caption.
  // Keys are the final path segment, lowercased, without extension.
  const ROUTES = {
    '':            { kind: 'folio',     label: 'Sam’s Menswear',       sub: 'The Atelier' },
    'index':       { kind: 'folio',     label: 'Sam’s Menswear',       sub: 'The Atelier' },
    'wedding':     { kind: 'glass',     label: 'Mazel Tov',                 sub: 'Wedding House' },
    'business':    { kind: 'pinstripe', label: 'On Bay Street',             sub: 'Business House' },
    'custom':      { kind: 'tape',      label: 'Measured Personally',       sub: 'Custom House' },
    'traditional': { kind: 'curtain',   label: 'For Shabbos',               sub: 'Traditional House' },
    'book':        { kind: 'notebook',  label: 'The Tailor’s Notebook', sub: 'Booking the visit' },
  };

  // Reduce any href / pathname to its final routing segment.
  function segOf(href) {
    let key = (href || '').split('?')[0].split('#')[0];
    key = key.replace(/\/+$/, '');          // trailing slash
    key = key.split('/').pop() || '';        // last segment
    try { key = decodeURIComponent(key); } catch {}
    return key.replace(/\.html$/i, '').toLowerCase();
  }

  const TRANSITION_DURATIONS = {
    glass:     1300,
    pinstripe: 1100,
    tape:      1000,
    curtain:    950,
    notebook:   950,
    folio:      800,
  };

  // ── helpers ──────────────────────────────────────────────────────────────
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };

  function getOverlay() {
    let ov = document.getElementById('page-transition');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'page-transition';
      ov.className = 'page-transition';
      ov.setAttribute('aria-hidden', 'true');
      document.body.appendChild(ov);
    }
    return ov;
  }

  // Route for a destination href (any page transition falls back to folio).
  function getRoute(href) {
    return ROUTES[segOf(href)] || ROUTES[''];
  }

  function currentRoute() {
    return ROUTES[segOf(location.pathname)] || ROUTES[''];
  }

  // ── Per-kind overlay constructors ────────────────────────────────────────

  function buildGlass(ov, label, sub) {
    ov.innerHTML = '';
    const stage = el('div', 'pt-stage');
    // Velvet bg first (behind everything)
    stage.appendChild(el('div', 'pt-glass-velvet'));
    // Glass plate
    stage.appendChild(el('div', 'pt-glass'));
    // Crack lines from centre (8 rays)
    for (let i = 0; i < 8; i++) {
      const c = el('div', 'pt-crack');
      const angle = (360 / 8) * i + (Math.random() * 30 - 15);
      const len = 30 + Math.random() * 35;
      c.style.transform = `rotate(${angle}deg)`;
      c.style.width = `${len}vmax`;
      c.style.animationDelay = `${300 + i * 30}ms`;
      stage.appendChild(c);
    }
    // Shards — irregular grid of clip-pathed pieces
    const rows = 5, cols = 7;
    const W = 100 / cols, H = 100 / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const sh = el('div', 'pt-shard');
        const left = c * W + (Math.random() - 0.5) * 6;
        const top  = r * H + (Math.random() - 0.5) * 6;
        const w    = W + (Math.random() - 0.5) * 6;
        const h    = H + (Math.random() - 0.5) * 6;
        sh.style.left = left + '%';
        sh.style.top  = top + '%';
        sh.style.width = w + '%';
        sh.style.height = h + '%';
        // irregular shard shape via clip-path
        const p1 = `${5 + Math.random()*20}% 0%`;
        const p2 = `${100 - Math.random()*15}% ${Math.random()*15}%`;
        const p3 = `${85 + Math.random()*15}% ${75 + Math.random()*25}%`;
        const p4 = `${Math.random()*25}% ${85 + Math.random()*15}%`;
        sh.style.clipPath = `polygon(${p1}, ${p2}, ${p3}, ${p4})`;
        // fly direction
        const cx = (c + 0.5) / cols - 0.5;
        const cy = (r + 0.5) / rows - 0.5;
        const dx = cx * (120 + Math.random() * 50);
        const dy = cy * (120 + Math.random() * 50);
        const rot = (Math.random() - 0.5) * 80;
        sh.style.setProperty('--shard-fly',
          `translate(${dx}vw, ${dy}vh) rotate(${rot}deg)`);
        sh.style.animationDelay = `${500 + r * 30 + c * 20}ms`;
        stage.appendChild(sh);
      }
    }
    const m = el('div', 'pt-mazel');
    m.innerHTML = `${label}<div style="font-size:0.4em;letter-spacing:0.32em;color:rgba(255,230,180,0.7);font-style:normal;margin-top:14px;">— ${sub} —</div>`;
    stage.appendChild(m);
    ov.appendChild(stage);
  }

  function buildPinstripe(ov, label, sub) {
    ov.innerHTML = '';
    const stage = el('div', 'pt-stage');
    stage.appendChild(el('div', 'pt-pinstripe-bg'));
    // Generate pinstripes — fine + occasional thicker accent
    const count = 64;
    for (let i = 0; i < count; i++) {
      const isThick = (i % 8 === 4);
      const line = el('div', isThick ? 'pt-pinstripe-thicker' : 'pt-pinstripe-line');
      const pct = (i / (count - 1)) * 100;
      line.style.left = pct + '%';
      // staggered draw, sweep left → right
      line.style.animationDelay = `${i * 18}ms`;
      stage.appendChild(line);
    }
    const lab = el('div', 'pt-pinstripe-label');
    lab.innerHTML = `${label}<div style="font-size:0.55em;letter-spacing:0.32em;opacity:0.7;margin-top:10px;font-style:normal;">— ${sub} —</div>`;
    stage.appendChild(lab);
    ov.appendChild(stage);
  }

  function buildTape(ov, label, sub) {
    ov.innerHTML = '';
    const stage = el('div', 'pt-stage');
    stage.appendChild(el('div', 'pt-tape-bg'));
    stage.appendChild(el('div', 'pt-tape-ticks'));
    // numbers
    const numWrap = el('div', 'pt-tape-numbers');
    const numCount = 14;
    for (let i = 1; i <= numCount; i++) {
      const span = document.createElement('span');
      span.textContent = (i * 10) + '';
      span.style.marginRight = 'auto';
      numWrap.appendChild(span);
    }
    stage.appendChild(numWrap);
    const lab = el('div', 'pt-tape-label');
    lab.innerHTML = `${label}<div style="font-size:0.5em;letter-spacing:0.32em;opacity:0.6;margin-top:10px;font-style:normal;">— ${sub} —</div>`;
    stage.appendChild(lab);
    ov.appendChild(stage);
  }

  function buildCurtain(ov, label, sub) {
    ov.innerHTML = '';
    const stage = el('div', 'pt-stage');
    stage.appendChild(el('div', 'pt-curtain'));
    stage.appendChild(el('div', 'pt-curtain-trim'));
    stage.appendChild(el('div', 'pt-curtain-tassels'));
    const lab = el('div', 'pt-curtain-label');
    lab.innerHTML = `${label}<div style="font-size:0.5em;letter-spacing:0.32em;opacity:0.65;margin-top:10px;font-style:normal;">— ${sub} —</div>`;
    stage.appendChild(lab);
    ov.appendChild(stage);
  }

  function buildNotebook(ov, label, sub) {
    ov.innerHTML = '';
    const stage = el('div', 'pt-stage');
    stage.appendChild(el('div', 'pt-notebook'));
    stage.appendChild(el('div', 'pt-notebook-spine'));
    stage.appendChild(el('div', 'pt-notebook-corner tl'));
    stage.appendChild(el('div', 'pt-notebook-corner tr'));
    stage.appendChild(el('div', 'pt-notebook-corner bl'));
    stage.appendChild(el('div', 'pt-notebook-corner br'));
    const st = el('div', 'pt-notebook-stamp');
    st.innerHTML = `${label}<span>${sub}</span>`;
    stage.appendChild(st);
    ov.appendChild(stage);
  }

  function buildFolio(ov, label, sub) {
    ov.innerHTML = '';
    const stage = el('div', 'pt-stage');
    stage.appendChild(el('div', 'pt-folio-left'));
    stage.appendChild(el('div', 'pt-folio-right'));
    const m = el('div', 'pt-folio-mark');
    m.innerHTML = `${label}<div style="font-size:0.55em;letter-spacing:0.32em;opacity:0.55;margin-top:10px;font-style:italic;">— ${sub} —</div>`;
    stage.appendChild(m);
    ov.appendChild(stage);
  }

  const BUILDERS = {
    glass: buildGlass,
    pinstripe: buildPinstripe,
    tape: buildTape,
    curtain: buildCurtain,
    notebook: buildNotebook,
    folio: buildFolio,
  };

  // ── Orchestration ────────────────────────────────────────────────────────

  function play(phase, kind, label, sub) {
    return new Promise((resolve) => {
      const ov = getOverlay();
      (BUILDERS[kind] || buildFolio)(ov, label, sub);
      // Reset classes
      ov.className = 'page-transition is-active theme-' + kind + ' phase-' + phase;
      // Force reflow for restart
      void ov.offsetHeight;
      const ms = TRANSITION_DURATIONS[kind] || 800;
      const buffer = phase === 'leaving' ? 0 : 120;
      setTimeout(() => resolve(), ms + buffer);
    });
  }

  function isInternalLink(a) {
    const href = a.getAttribute('href');
    if (!href) return false;
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (href.startsWith('#')) return false;
    if (a.target && a.target !== '_self') return false;
    if (a.hasAttribute('data-no-transition')) return false;
    return true;
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    // Reduce motion: skip transitions entirely
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Play entry if we're arriving from an internal navigation
    let incomingFlag = null;
    try { incomingFlag = sessionStorage.getItem('pt:incoming'); } catch {}

    if (!reduce && incomingFlag) {
      try { sessionStorage.removeItem('pt:incoming'); } catch {}
      let { kind, label, sub } = JSON.parse(incomingFlag);
      // Map to current route as fallback
      const cur = currentRoute();
      kind  = kind  || cur.kind;
      label = label || cur.label;
      sub   = sub   || cur.sub;
      // Phase: entering
      play('entering', kind, label, sub).then(() => {
        const ov = getOverlay();
        ov.classList.remove('is-active');
      });
    }

    // Intercept clicks
    document.addEventListener('click', (e) => {
      // Only left click without modifier
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a');
      if (!a || !isInternalLink(a)) return;
      const href = a.getAttribute('href');
      const route = getRoute(href);
      if (!route) return;
      // Same-page? Skip transition
      if (segOf(location.pathname) === segOf(href)) return;

      e.preventDefault();
      if (reduce) { location.href = href; return; }

      // Stash incoming flag so destination knows how to play entry
      try {
        sessionStorage.setItem('pt:incoming', JSON.stringify({
          kind: route.kind, label: route.label, sub: route.sub,
        }));
      } catch {}

      play('leaving', route.kind, route.label, route.sub).then(() => {
        location.href = href;
      });
    }, true);

    // Back/forward-cache fix: when a page is restored from bfcache (e.g. the
    // browser Back button), it comes back frozen with the "leaving" overlay
    // still active — a stuck covered screen. Clear it on restore, and reset any
    // menu/scroll-lock that was open when the page was cached.
    window.addEventListener('pageshow', (e) => {
      if (!e.persisted) return;
      const ov = document.getElementById('page-transition');
      if (ov) ov.classList.remove('is-active');
      try { sessionStorage.removeItem('pt:incoming'); } catch {}
      const menu = document.querySelector('[data-mobile-menu]');
      if (menu) menu.classList.remove('is-open');
      const modal = document.getElementById('booking-modal');
      if (modal) modal.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
