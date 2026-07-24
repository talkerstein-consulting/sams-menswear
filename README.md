# Sam's Menswear

Editorial marketing site for **Sam's Menswear** — a personal master tailor in Vaughan, Ontario (Vaughan · Thornhill · Toronto). Built from the Claude Design handoff bundle (the warm "Tailor's Notebook" aesthetic).

## Stack

- **Astro 5** — static site generation, file-based routing, content collections
- **React 18** — used only for the animated hero island ("The Tailor's Notebook")
- Vanilla CSS + JS from the design handoff, reused **verbatim** for pixel fidelity

No Tailwind, no runtime framework on content pages — pages ship as static HTML/CSS.

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output → dist/
npm run preview  # serve the built dist/
```

## Deploy

`npm run build` produces a fully static `dist/` folder. Deploy free on Cloudflare Pages, Netlify, Vercel, or any static host. Set the build command to `npm run build` and the output directory to `dist`.

## Structure

```
public/                     # served as-is (verbatim from the design handoff)
  site.css                  # shared design system (paper/ink/oxblood/gold tokens)
  transitions.css/.js       # themed page transitions (glass, pinstripe, tape, curtain, notebook, folio)
  booking.css/.js           # 5-step "Book a Fitting" wizard modal + quick callback
  site.js                   # scroll reveals, mobile menu, footer year
  site-extra.css            # additive styles for pages beyond the handoff (journal, locations, article, sr-only)
  favicon.svg

src/
  layouts/BaseLayout.astro  # <head>, fonts, header, mobile menu, booking modal, footer, script tags
  components/
    SiteHeader.astro        # sticky nav (pass `nav="wedding"` etc. to mark current)
    MobileMenu.astro        # full-screen drawer (primary houses + secondary links)
    BookingModal.astro      # modal shell; booking.js renders the steps
    SiteFooter.astro
    hero/                   # compiled React hero (replaces the handoff's in-browser Babel)
      anim.js               # timeline context + easing
      paper.jsx             # paper background + SVG filter/pattern defs
      scenes.jsx            # Stroke primitive + measuring tape, jacket, bow tie, cap, wordmark
      Hero.jsx              # island entry: rAF time loop, fit-to-container, palette
  pages/
    index.astro             # home (hero + services + process + lookbook + testimonials + visit + CTA)
    wedding / business / custom / traditional .astro   # the four "houses"
    book.astro              # Book a Fitting (path picker + callback + visit + FAQ teaser)
    about.astro process.astro faq.astro
    locations/index.astro + [city].astro               # 6 GTA locations
    journal/index.astro + [slug].astro                 # blog (content collection)
    404.astro
  content/journal/*.md      # blog posts (see below)
  content.config.ts         # journal collection schema
  data/locations.js         # location source of truth

_archive/                   # prior attempts (noir React app, WordPress theme, old index.html) — kept, unused
_handoff/                   # the original Claude Design bundle, for reference
```

## Clean URLs

`/`, `/wedding`, `/business`, `/custom`, `/traditional`, `/book`, `/about`, `/process`,
`/faq`, `/journal`, `/journal/<slug>`, `/locations`, `/locations/<city>`.

The themed page transitions in `public/transitions.js` map each destination's last URL
segment to a transition (e.g. `wedding` → glass "Mazel Tov", `book` → notebook).

## Add a blog post

Drop a Markdown file in `src/content/journal/` with frontmatter:

```md
---
title: "Your title"
eyebrow: "Weddings"          # small category label
excerpt: "One-line summary for the card."
date: 2026-04-01
location: "Optional place"   # optional
---

Body in Markdown…
```

It appears automatically on `/journal` (newest first) and at `/journal/<filename>`.

## Distribb SEO and Backlinks

Distribb slash commands are checked into `.claude/commands/` for this repo. Add `DISTRIBB_API_KEY` locally, optionally set `DISTRIBB_PROJECT_ID`, then run `/distribb-setup` and `/backlinks <keyword>` before publishing new SEO articles through the exchange. Project-specific notes live in `docs/distribb-backlinks.md`.

## Add / edit a location

Edit `src/data/locations.js`. Each entry generates `/locations/<slug>` automatically.

## Hero video

The homepage hero is a cinematic 7s loop generated with Higgsfield (`public/media/hero.mp4`
+ `hero.webm`, ~1 MB each, silent, autoplay/loop/muted) over a poster (`hero-poster.webp`).
It replaced an earlier in-browser SVG animation that was too heavy. To swap the film, drop a
new `hero.mp4`/`hero.webm`/`hero-poster.webp` into `public/media/` (16:9). The old React
animation is preserved in `_archive/hero-react-island/`.

## The Bespoke Journey (homepage scroll sequence)

The homepage `#journey` section is a scroll-driven dressing sequence: a recurring
customer character + the flat-cap tailor, illustrated across 5 stages (measure →
shirt → jacket → trousers → finished three-piece) in `public/media/journey/`.
On desktop a sticky visual crossfades between the frames as each copy step crosses
the viewport centre (IntersectionObserver, opacity-only — GPU-cheap). On mobile
(≤900px) it falls back to a simple stacked image+copy sequence. Character
consistency was achieved by generating frame 1, then re-dressing the *same* figure
with frame 1 passed as an image reference (nano_banana_pro image-to-image).

## Notes / things to tune later

- **Photography**: the home **lookbook** uses real photos pulled from the original site
  (`public/media/lookbook/`, the two largest tiles upscaled to 2K). The **service-card
  sketches** and the **wedding-page lookbook** still use the hand-drawn SVG / CSS placeholders
  — real photos can be dropped into those `.lb-tile` / `.service-card__sketch` slots the same way.
- **Booking form**: the wizard and callback form are front-end only (no backend submit yet).
  Wire `booking.js` / `#callback-form` to email/CRM when ready.
- **Scroll performance**: the paper-grain overlay was switched from `position:fixed` to
  `absolute` in `site-extra.css` to stop per-scroll re-compositing (the main lag fix).
- **Contact details** (phone 647·458·0711, samskosher@gmail.com, 318 Charlton Ave) live in
  `SiteHeader`/`SiteFooter`/`book.astro` — search & replace if they change.
```
