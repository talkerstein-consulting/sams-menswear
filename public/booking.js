// booking.js — multi-step booking wizard for Sam's Menswear

(() => {
  // ── State ────────────────────────────────────────────────────────────
  const state = {
    step: 0,                       // 0..5 (5 = confirmation)
    house: null,                   // wedding | business | custom | traditional | exploring
    where: null,                   // atelier | home | video
    date:  null,                   // Date object
    time:  null,                   // "10:00 AM"
    name:  '',
    phone: '',
    email: '',
    contact: 'phone',              // phone | email | text
    note:  '',
    calMonth: new Date(),          // currently shown month
  };

  const HOUSES = [
    { id: 'wedding',     tag: 'House № 01', title: 'Wedding',      copy: 'Tuxedo, three-piece, groomsmen — coordinated from one tape.' },
    { id: 'business',    tag: 'House № 02', title: 'Business',     copy: 'Navy, charcoal, glen check — a working wardrobe.' },
    { id: 'custom',      tag: 'House № 03', title: 'Custom',       copy: 'Shirts, trousers, jackets — drawn from one pattern.' },
    { id: 'traditional', tag: 'House № 04', title: 'Traditional',  copy: 'Bekishe, kapota, kittel, Shabbos suit, simcha tailoring.' },
    { id: 'exploring',   tag: 'No house yet', title: 'Just exploring', copy: 'Bring a jacket you love. We\u2019ll figure out the rest together.' },
  ];

  const WHERES = [
    {
      id: 'atelier',
      tag: 'Most popular',
      title: 'Visit the atelier',
      copy: '90 minutes in the Vaughan workshop. Coffee in winter, pellegrino in summer.',
      icon: 'M5 8 Q5 7 6 7 L11 7 Q12 7 12 8 L14 14 Q14 15 13 16 L11 17 Q14 23 21 26 L22 24 Q23 23 24 23 L30 25 Q31 25 31 26 L31 31 Q31 32 30 32 Q15 32 6 23 Q5 16 5 8 Z',
      iconStroke: true,
    },
    {
      id: 'home',
      tag: 'For wedding parties',
      title: 'Have Sam come to you',
      copy: 'Sam brings tape, cloths and notebook. GTA-wide; minimum two garments.',
      icon: 'M20 36 C 28 26, 32 20, 32 14 A 12 12 0 1 0 8 14 C 8 20, 12 26, 20 36 Z|M20 14 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0',
      iconStroke: true,
    },
    {
      id: 'video',
      tag: 'No travel required',
      title: 'A video consultation',
      copy: '30 minutes on the phone or video. Best for first-time clients on the fence.',
      icon: 'M4 10 Q4 8 6 8 L22 8 Q24 8 24 10 L24 26 Q24 28 22 28 L6 28 Q4 28 4 26 Z|M24 14 L34 10 L34 26 L24 22 Z',
      iconStroke: true,
    },
  ];

  // 30-minute slots, 10am to 7pm
  const SLOTS_BASE = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM',             '12:30 PM',
    '1:00 PM',  '1:30 PM',  '2:00 PM',  '2:30 PM',
    '3:00 PM',  '3:30 PM',  '4:00 PM',  '4:30 PM',
    '5:00 PM',  '5:30 PM',  '6:00 PM',  '6:30 PM',  '7:00 PM',
  ];
  // Fictional unavailable slots (different per day for realism)
  function unavailableSlots(d) {
    const seed = d.getDate() * 7 + d.getMonth() * 3;
    const skip = new Set();
    for (let i = 0; i < 5; i++) skip.add((seed + i * 5) % SLOTS_BASE.length);
    return skip;
  }
  function isClosed(d) {
    const dow = d.getDay();
    // Saturday: closed all day
    if (dow === 6) return true;
    return false;
  }
  function isFridayShort(d) { return d.getDay() === 5; }

  function slotsFor(d) {
    if (isClosed(d)) return [];
    if (isFridayShort(d)) {
      // Friday: close at 3pm (so end at 2:30pm last slot, summer-ish hours)
      return SLOTS_BASE.slice(0, SLOTS_BASE.findIndex(s => s === '3:00 PM'));
    }
    return SLOTS_BASE;
  }

  // ── DOM helpers ──────────────────────────────────────────────────────
  const $ = (s, r = document) => r.querySelector(s);

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function fmtDate(d) {
    if (!d) return '';
    const opts = { weekday: 'long', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('en-CA', opts);
  }
  function fmtMonth(d) {
    return d.toLocaleDateString('en-CA', { month: 'long', year: 'numeric' });
  }
  function sameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  // ── Open / close modal ──────────────────────────────────────────────
  function openModal(preset = {}) {
    const modal = $('#booking-modal');
    if (!modal) return;
    // reset
    state.step = 0;
    state.house = preset.house || null;
    state.where = preset.where || null;
    state.date  = null;
    state.time  = null;
    state.note  = '';
    state.calMonth = new Date();
    state.calMonth.setDate(1);

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    render();
  }
  function closeModal() {
    const modal = $('#booking-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // ── Step navigation ──────────────────────────────────────────────────
  function next() {
    if (!canAdvance()) return;
    state.step = Math.min(state.step + 1, 5);
    render();
  }
  function back() {
    state.step = Math.max(state.step - 1, 0);
    render();
  }
  function canAdvance() {
    switch (state.step) {
      case 0: return !!state.house;
      case 1: return !!state.where;
      case 2: return !!(state.date && (state.where === 'video' ? state.time : state.time));
      case 3: return state.name.trim().length >= 2 && (state.phone.trim() || state.email.trim());
      case 4: return true; // note is optional
      default: return false;
    }
  }

  // ── Rendering each step ──────────────────────────────────────────────
  function render() {
    const body = $('#booking-modal .bm-body');
    const back$ = $('#booking-modal .bm-back');
    const next$ = $('#booking-modal .bm-next');
    const dotsEl = $('#booking-modal .bm-progress .dots');
    const summary$ = $('#booking-modal .bm-summary');

    if (!body || !back$ || !next$ || !dotsEl) return;

    // Build dots
    dotsEl.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const d = document.createElement('span');
      d.className = 'dot' + (i === state.step ? ' is-active' : '') + (i < state.step ? ' is-done' : '');
      dotsEl.appendChild(d);
    }
    const labels = ['House', 'Where', 'When', 'Who', 'Note'];
    const labelEl = $('#booking-modal .bm-progress .label');
    if (labelEl) {
      if (state.step < 5) labelEl.textContent = `Step ${state.step + 1} of 5 · ${labels[state.step]}`;
      else labelEl.textContent = 'Confirmed';
    }

    // Update summary mini
    if (summary$) {
      const parts = [];
      if (state.house) {
        const h = HOUSES.find(h => h.id === state.house);
        parts.push(h && h.title);
      }
      if (state.where) {
        const w = WHERES.find(w => w.id === state.where);
        parts.push(w && w.title.replace(/^Visit |Have Sam come to you|A video consultation/, m => ({
          'Visit the atelier': 'the atelier',
          'Have Sam come to you': 'Sam comes to you',
          'A video consultation': 'video call',
        })[m] || m));
      }
      if (state.date) parts.push(fmtDate(state.date));
      if (state.time) parts.push(state.time);
      summary$.textContent = parts.filter(Boolean).join(' · ');
    }

    // Render step
    body.innerHTML = '';
    if (state.step === 0)      body.appendChild(renderHouseStep());
    else if (state.step === 1) body.appendChild(renderWhereStep());
    else if (state.step === 2) body.appendChild(renderWhenStep());
    else if (state.step === 3) body.appendChild(renderWhoStep());
    else if (state.step === 4) body.appendChild(renderNoteStep());
    else                       body.appendChild(renderConfirm());

    // Button states
    back$.disabled = state.step === 0 || state.step === 5;
    if (state.step === 5) {
      next$.style.display = 'none';
    } else {
      next$.style.display = '';
      next$.disabled = !canAdvance();
      next$.classList.toggle('is-primary', state.step === 4);
      next$.firstChild && (next$.firstChild.textContent = state.step === 4 ? 'Confirm booking' : 'Continue');
    }
  }

  // Step 0: house
  function renderHouseStep() {
    const w = el('div', 'bm-step is-active');
    w.innerHTML = `
      <div class="chapter-no">№ 01 · Begin</div>
      <h2>What brings you <em>through the door?</em></h2>
      <p class="step-prompt">Pick whichever feels closest. We can change it later — what matters now is the conversation Sam will prepare for.</p>
    `;
    const grid = el('div', 'opt-grid opt-grid--3');
    for (const h of HOUSES) {
      const c = el('button', 'opt-card' + (state.house === h.id ? ' is-selected' : ''));
      c.type = 'button';
      c.innerHTML = `
        <div class="oc-tag">${h.tag}</div>
        <div class="oc-title">${h.title}</div>
        <div class="oc-copy">${h.copy}</div>
      `;
      c.addEventListener('click', () => { state.house = h.id; render(); });
      grid.appendChild(c);
    }
    w.appendChild(grid);
    return w;
  }

  // Step 1: where
  function renderWhereStep() {
    const w = el('div', 'bm-step is-active');
    w.innerHTML = `
      <div class="chapter-no">№ 02 · Where</div>
      <h2>Where shall <em>we meet?</em></h2>
      <p class="step-prompt">Most first conversations happen at the Vaughan atelier. For wedding parties of 6+, Sam comes to you. Video calls work well for first-timers across town.</p>
    `;
    const grid = el('div', 'opt-grid opt-grid--3');
    for (const opt of WHERES) {
      const c = el('button', 'opt-card' + (state.where === opt.id ? ' is-selected' : ''));
      c.type = 'button';
      const iconPaths = opt.icon.split('|').map(p =>
        `<path d="${p}" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
      ).join('');
      c.innerHTML = `
        <svg class="oc-icon" viewBox="0 0 36 36">${iconPaths}</svg>
        <div class="oc-tag">${opt.tag}</div>
        <div class="oc-title">${opt.title}</div>
        <div class="oc-copy">${opt.copy}</div>
      `;
      c.addEventListener('click', () => { state.where = opt.id; render(); });
      grid.appendChild(c);
    }
    w.appendChild(grid);
    return w;
  }

  // Step 2: when (calendar)
  function renderWhenStep() {
    const w = el('div', 'bm-step is-active');
    w.innerHTML = `
      <div class="chapter-no">№ 03 · When</div>
      <h2>Pick a <em>quiet hour.</em></h2>
      <p class="step-prompt">Appointments are private — one client at a time. Mid-morning and evening slots run long-est; lunchtime is brisker.</p>
    `;
    const cal = el('div', 'cal');
    cal.appendChild(renderCalendar());
    cal.appendChild(renderTimes());
    w.appendChild(cal);
    return w;
  }

  function renderCalendar() {
    const wrap = el('div', '');
    const head = el('div', 'cal-head');
    const month = state.calMonth;
    const today = new Date(); today.setHours(0,0,0,0);

    // Build navigation
    const prev = el('button', '', '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M10 3 L 5 8 L 10 13"/></svg>');
    const ne   = el('button', '', '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 3 L 11 8 L 6 13"/></svg>');
    prev.addEventListener('click', () => {
      const cur = new Date(state.calMonth);
      cur.setMonth(cur.getMonth() - 1);
      // Don't let prev go before the current month
      const minMonth = new Date(); minMonth.setDate(1); minMonth.setHours(0,0,0,0);
      if (cur < minMonth) return;
      state.calMonth = cur; render();
    });
    ne.addEventListener('click', () => {
      const cur = new Date(state.calMonth);
      cur.setMonth(cur.getMonth() + 1);
      // Cap at 6 months ahead
      const maxMonth = new Date(); maxMonth.setMonth(maxMonth.getMonth() + 6); maxMonth.setDate(1);
      if (cur > maxMonth) return;
      state.calMonth = cur; render();
    });
    const monthLabel = el('div', 'cal-month');
    monthLabel.innerHTML = `${fmtMonth(month).split(' ')[0]} <em>${month.getFullYear()}</em>`;

    const nav = el('div', 'cal-nav');
    nav.appendChild(prev);
    nav.appendChild(ne);
    head.appendChild(monthLabel);
    head.appendChild(nav);
    wrap.appendChild(head);

    const grid = el('div', 'cal-grid');
    // DOW headers
    for (const dow of ['S','M','T','W','T','F','S']) {
      const c = el('div', 'cal-dow', dow);
      grid.appendChild(c);
    }
    // First day of month
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const dowOffset = first.getDay();
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

    // Pad with previous month's tail
    const prevMonthDays = new Date(month.getFullYear(), month.getMonth(), 0).getDate();
    for (let i = dowOffset - 1; i >= 0; i--) {
      const dnum = prevMonthDays - i;
      const c = el('div', 'cal-day is-other', dnum);
      grid.appendChild(c);
    }
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(month.getFullYear(), month.getMonth(), d);
      const isToday = sameDay(date, today);
      const isPast = date < today;
      const closed = isClosed(date);
      const cls = ['cal-day'];
      if (isPast) cls.push('is-past');
      if (closed && !isPast) cls.push('is-closed');
      if (isToday) cls.push('is-today');
      if (state.date && sameDay(state.date, date)) cls.push('is-selected');
      const c = el('button', cls.join(' '));
      c.type = 'button';
      c.textContent = d;
      c.addEventListener('click', () => {
        if (isPast || closed) return;
        state.date = date;
        state.time = null;
        render();
      });
      grid.appendChild(c);
    }
    // Pad with next month's head
    const remaining = (7 - ((dowOffset + daysInMonth) % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const c = el('div', 'cal-day is-other', i);
      grid.appendChild(c);
    }

    wrap.appendChild(grid);

    // Legend
    const legend = el('div', '');
    legend.style.cssText = 'margin-top:14px;font-family:var(--serif);font-style:italic;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:var(--ink-mute);display:flex;gap:18px;flex-wrap:wrap';
    legend.innerHTML = `
      <span><span style="display:inline-block;width:10px;height:10px;border:1px solid var(--gold);border-radius:50%;vertical-align:middle;margin-right:6px"></span>Today</span>
      <span><span style="display:inline-block;width:10px;height:10px;background:var(--ink);vertical-align:middle;margin-right:6px"></span>Selected</span>
      <span><span style="display:inline-block;width:10px;height:2px;background:var(--ink-mute);vertical-align:middle;margin-right:6px"></span>Closed Shabbos</span>
    `;
    wrap.appendChild(legend);
    return wrap;
  }

  function renderTimes() {
    const wrap = el('div', 'cal-times');
    wrap.innerHTML = `<h4>${state.date ? fmtDate(state.date) : 'Pick a day to see times'}</h4>`;
    if (!state.date) {
      const empty = el('div', 'empty', 'Available hours will appear here once you pick a day.');
      wrap.appendChild(empty);
      return wrap;
    }
    const slots = slotsFor(state.date);
    if (slots.length === 0) {
      const empty = el('div', 'empty', 'The atelier is closed this day.');
      wrap.appendChild(empty);
      return wrap;
    }
    const skipSet = unavailableSlots(state.date);
    const slotsWrap = el('div', 'slots');
    slots.forEach((s, i) => {
      const b = el('button', 'slot' + (state.time === s ? ' is-selected' : ''));
      b.type = 'button';
      b.textContent = s;
      if (skipSet.has(i)) b.disabled = true;
      b.addEventListener('click', () => {
        if (b.disabled) return;
        state.time = s;
        render();
      });
      slotsWrap.appendChild(b);
    });
    wrap.appendChild(slotsWrap);
    if (isFridayShort(state.date)) {
      const note = el('div', '');
      note.style.cssText = 'margin-top:14px;font-family:var(--serif);font-style:italic;font-size:13px;color:var(--ink-mute);line-height:1.4';
      note.textContent = 'Friday — closing two hours before sundown for Shabbos.';
      wrap.appendChild(note);
    }
    return wrap;
  }

  // Step 3: who
  function renderWhoStep() {
    const w = el('div', 'bm-step is-active');
    w.innerHTML = `
      <div class="chapter-no">№ 04 · Who</div>
      <h2>Who is <em>walking in?</em></h2>
      <p class="step-prompt">Sam will only ever use this to contact you about the appointment. Nothing else.</p>
    `;
    const form = el('div', 'bm-form');
    form.innerHTML = `
      <div class="row">
        <label for="bk-name">Your name</label>
        <input id="bk-name" type="text" placeholder="As you'd like to be addressed" value="${state.name.replace(/"/g, '&quot;')}"/>
      </div>
      <div class="row2">
        <div class="row">
          <label for="bk-phone">Telephone</label>
          <input id="bk-phone" type="tel" placeholder="+1 (000) 000-0000" value="${state.phone.replace(/"/g, '&quot;')}"/>
        </div>
        <div class="row">
          <label for="bk-email">Email</label>
          <input id="bk-email" type="email" placeholder="hello@example.com" value="${state.email.replace(/"/g, '&quot;')}"/>
        </div>
      </div>
      <div class="row">
        <label>Best way to confirm</label>
        <div style="display:flex;gap:24px;padding-top:8px;flex-wrap:wrap;font-family:var(--serif-body);color:var(--ink-soft);">
          <label style="display:inline-flex;align-items:center;gap:8px;text-transform:none;letter-spacing:0;font-style:normal;font-size:16px;color:var(--ink-soft);">
            <input type="radio" name="bk-contact" value="phone" ${state.contact === 'phone' ? 'checked' : ''} style="accent-color:var(--oxblood);"/> A phone call
          </label>
          <label style="display:inline-flex;align-items:center;gap:8px;text-transform:none;letter-spacing:0;font-style:normal;font-size:16px;color:var(--ink-soft);">
            <input type="radio" name="bk-contact" value="email" ${state.contact === 'email' ? 'checked' : ''} style="accent-color:var(--oxblood);"/> An email
          </label>
          <label style="display:inline-flex;align-items:center;gap:8px;text-transform:none;letter-spacing:0;font-style:normal;font-size:16px;color:var(--ink-soft);">
            <input type="radio" name="bk-contact" value="text" ${state.contact === 'text' ? 'checked' : ''} style="accent-color:var(--oxblood);"/> A text message
          </label>
        </div>
      </div>
    `;
    w.appendChild(form);
    // wire updates
    const nm = form.querySelector('#bk-name');
    const ph = form.querySelector('#bk-phone');
    const em = form.querySelector('#bk-email');
    nm.addEventListener('input', e => { state.name = e.target.value; updateNextBtn(); });
    ph.addEventListener('input', e => { state.phone = e.target.value; updateNextBtn(); });
    em.addEventListener('input', e => { state.email = e.target.value; updateNextBtn(); });
    form.querySelectorAll('input[name="bk-contact"]').forEach(r =>
      r.addEventListener('change', e => { state.contact = e.target.value; })
    );
    requestAnimationFrame(() => { try { nm.focus(); } catch {} });
    return w;
  }

  // Step 4: note
  function renderNoteStep() {
    const w = el('div', 'bm-step is-active');
    w.innerHTML = `
      <div class="chapter-no">№ 05 · The note</div>
      <h2>Anything else <em>Sam should know?</em></h2>
      <p class="step-prompt">A wedding date, a tricky fit, a fabric you fell in love with, a son's bar mitzvah, a body that's changed. Optional, but useful.</p>
    `;
    const form = el('div', 'bm-form');
    form.innerHTML = `
      <div class="row">
        <label for="bk-note">A note for Sam</label>
        <textarea id="bk-note" placeholder="Tell Sam about the occasion, the cloth, the people, the timing — anything you'd say in the first five minutes of the meeting.">${state.note.replace(/</g, '&lt;')}</textarea>
      </div>
    `;
    w.appendChild(form);
    const t = form.querySelector('#bk-note');
    t.addEventListener('input', e => { state.note = e.target.value; });
    requestAnimationFrame(() => { try { t.focus(); } catch {} });
    return w;
  }

  // Step 5: confirm
  function renderConfirm() {
    const w = el('div', 'bm-step is-active bm-confirm');
    const house = HOUSES.find(h => h.id === state.house);
    const where = WHERES.find(w => w.id === state.where);
    const phoneEmail = [state.phone, state.email].filter(Boolean).join(' · ');
    w.innerHTML = `
      <div class="seal">
        <svg viewBox="0 0 40 40" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 20 L 18 28 L 32 12"/>
        </svg>
      </div>
      <div class="chapter-no">Confirmed</div>
      <h2>The atelier <em>has you on the page.</em></h2>
      <p class="body-prose">Sam will personally confirm by ${state.contact === 'phone' ? 'phone' : state.contact === 'email' ? 'email' : 'text'} within one business day. If anything changes before then, simply reply.</p>
      <dl class="summary">
        <dt>House</dt><dd>${house ? house.title : '\u2014'}</dd>
        <dt>Location</dt><dd>${where ? where.title : '\u2014'}</dd>
        <dt>When</dt><dd>${fmtDate(state.date)}${state.time ? ' &middot; ' + state.time : ''}</dd>
        <dt>Name</dt><dd>${(state.name || '\u2014').replace(/</g, '&lt;')}</dd>
        <dt colspan="2" style="grid-column: 1 / -1;">Contact</dt><dd style="grid-column: 1 / -1;">${phoneEmail || '\u2014'}</dd>
      </dl>
      <div class="actions">
        <button class="btn is-dark" type="button" data-action="another" style="color:var(--ink);border-color:var(--ink);">Book another</button>
        <button class="bm-next" type="button" data-action="close">Done</button>
      </div>
    `;
    w.querySelector('[data-action="another"]').addEventListener('click', () => {
      // Reset for a new booking
      state.step = 0; state.house = null; state.where = null;
      state.date = null; state.time = null; state.note = '';
      render();
    });
    w.querySelector('[data-action="close"]').addEventListener('click', () => closeModal());
    return w;
  }

  function updateNextBtn() {
    const next$ = $('#booking-modal .bm-next');
    if (!next$) return;
    next$.disabled = !canAdvance();
  }

  // ── Wire up DOM on load ──────────────────────────────────────────────
  function init() {
    // Modal buttons
    document.querySelectorAll('[data-open-booking]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const preset = {
          house: el.getAttribute('data-house') || null,
          where: el.getAttribute('data-where') || null,
        };
        openModal(preset);
      });
    });

    const modal = $('#booking-modal');
    if (modal) {
      // Close
      modal.querySelector('.bm-close')?.addEventListener('click', closeModal);
      // Clicks outside the panel close
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      // Buttons
      modal.querySelector('.bm-back')?.addEventListener('click', back);
      modal.querySelector('.bm-next')?.addEventListener('click', next);
    }

    // Quick callback form
    const cb = $('#callback-form');
    if (cb) {
      cb.addEventListener('submit', (e) => {
        e.preventDefault();
        const ack = $('#callback-confirm');
        if (ack) {
          ack.hidden = false;
          cb.style.opacity = '0.5';
          cb.style.pointerEvents = 'none';
        }
      });
    }

    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
