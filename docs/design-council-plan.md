# The Drawing Board (/design) — Council Verdict & Build Plan

_9-seat council (CRO, product designer, brand strategist, master tailor, client advocate, SEO, CTO, red-team, product-CEO). Current score: **4.8/10**. Held 2026-07-05._

## The verdict
Today /design is a clever recolor **toy with the lead pipe unplugged**: a flat-tinted mannequin, 10 stacked chip groups, a name+email form that silently fails, and a spec that evaporates on the way to /book. It must become **the only place in the GTA where a groom co-designs his actual suit — sees the real cloth, gets Sam's voice guiding the choices, walks away with a shareable "commission card," and lands as a qualified, dated lead the same second he hits send.**

Unanimous on four things: (a) wire the webhook + stop the "Saved" lie; (b) render the real fabric weave (`f.css`) on the garment, not a flat hex; (c) make the look shareable/linkable (URL state + downloadable card) — the whole SEO/backlink thesis; (d) qualify the lead with event date + phone (Sam closes on the phone).

## The 15000x concept — "The Commission Card"
Keep the configurator; reframe its output as a **named, shareable artifact — "Commission No. 0417, drawn for David"** — that shows the real cloth, carries Sam's hand and voice, lives at a permanent URL, exports as an image a groom texts his fiancée/groomsmen, and drops a date-scored lead into Sam's phone. That artifact is the trust-builder, the referral loop, and the linkable SEO asset in one. No competitor (Garrison, King & Bay, Made2Measure, Surmesur) has design → save → share-a-link → same-hour call scored by event date → walk into a fitting where the suit is already on the board. **That is the moat.**

## Build spec

### Phase 1 — stop the bleeding + make cloth real (all S) — ✅ mostly shipped 2026-07-05
- **Wire the lead pipe** — set `LEAD_WEBHOOK` in `public/lead.js`. ⏳ needs the GHL URL.
- **Stop the "Saved" lie** — ack only claims "Sam has your look" on `ok:true`; else honest email/call is primary. ✅ shipped.
- **Render the real weave** — fill the garment with the fabric's `f.css` pattern (blend-mode over grayscale SVG), not flat `f.hex`. ⏳ pending (needs the blend-mode layer — ~M).
- **Two money fields** — event/need-by date + phone; auto-tag urgency (event <6wk = HOT). ✅ shipped (+ honeypot).
- **Fix the /book handoff** — booking.js reads `localStorage('sams:look')` and pre-fills the note + name/phone/email. ✅ shipped.

### Phase 2 — the shareable artifact + guided flow (M)
- URL-encode full state (`?fabric=&lapel=&btn=…`) → every look is resumable/linkable/indexable.
- **Commission Card export** — branded sketchbook card (drawn suit over real cloth, fabric name + tier + "from $X", "Drawn for [Name]", Sam's seal); one-tap PNG via SVG→canvas (no server).
- **Occasion-first guided flow** — the 4 presets become the spine; show only the 3-4 choices that matter with a one-line "Sam's note" per choice; full configurator behind "Advanced."
- **Fix mobile** — pin a sticky mini-preview so the suit updates live as chips are tapped (today `.dz-stage` goes static <920px and scrolls off-screen).
- **Motion** — stroke draw-on for lapels, ~260ms cloth crossfade, `:active{scale(.97)}` on chips; respect reduced-motion. (Headline promises "watch it sketch in"; nothing moves today.)
- **Kill dead controls** — "Pleated" + "Double-breasted" change the label, not the drawing. Give real geometry or hide; guard so no spec value silently fails to draw.
- **Trust band** — real finished-suit photo beside the sketch, price band, "since 1987 · Vaughan," one groom quote, 3-step "what happens after you send."

### Phase 3 — depth, schema, SEO flood
- Page schema: `WebApplication` + `HowTo` + `FAQPage` + `BreadcrumbList`.
- Fabric-library flood: "Design a suit in this cloth →" deep-link on all ~196 `/fabrics` cards; add /design to the **primary header nav**.
- "The choices, explained" crawlable editorial beneath the canvas, each linking to its guide.
- Higgsfield real-cloth macro tiles for the **~12-20 hero cloths only** (SVG `<pattern>` fills).
- Optional: `@vercel/og` route so shared looks unfurl as a drawing of that exact suit.
- Add canvas construction (full/half/fused + vents) behind "Advanced" — the real justification for bespoke pricing.

## Top 5 to start
1. Wire `LEAD_WEBHOOK` + kill the "Saved" lie (S, high) — ✅ lie killed; webhook ⏳.
2. Render `f.css` weave instead of flat `f.hex` (S→M, high).
3. Event-date + phone + urgency scoring (S, high) — ✅.
4. URL-encode state + "Copy my look" + downloadable Commission Card (M, high).
5. Mobile sticky preview + close the /design→/book handoff (M, high) — ✅ handoff.

## Beyond /design — the site (to rank locally + be trusted)
1. **Reviews, embedded + schema'd** — ✅ homepage wall live; reviews on LocalBusiness schema.
2. **Google Business Profile** — the #1 local ranking engine: weekly posts, finished-suit photos, review velocity, exact NAP match. (Owner action.)
3. **NAP / entity consistency** everywhere — one brand, one domain, one email across site + schema + GBP.
4. **Keep shipping guides** and interlink guide ↔ fabric ↔ /design.
5. **Homepage E-E-A-T** — "Sam, master tailor since 1987, Vaughan," real bio + face.
6. **Backlinks via the Commission Card** — pitch wedding blogs / GTA groom subreddits an embeddable "design your groom's suit at Sam's."

## What NOT to do
No in-page AI image-gen, no 3D garment, no user accounts, no server-side live render (blow the static + solo-owner budget). Don't texture all 196 fabrics — hero cloths only. Don't replace the live configurator with a photo lookbook. Don't dump 10 tailor's decisions on a novice. Don't polish visuals before the lead pipe works. Add a honeypot the moment the webhook is live (✅ done). Don't guess the "Black tie"/"Traditional" preset correctness — 20 min with Sam.
