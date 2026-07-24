# Distribb Backlink Exchange

Use this when publishing new Sam's Menswear guides or journal posts through Distribb.

## Project context

- Site: https://customsuitandshirt.com
- Blog/index routes: `/journal` and `/guides`
- Astro content folders:
  - `src/content/journal/`
  - `src/content/guides/`
- Best-fit keywords: custom suits Toronto, custom tailor Vaughan, wedding suits Toronto, Thornhill tailor, bespoke suits, groomsmen suits, kapota, bekishe, kittel, suit gift certificate.

## Setup

1. Add `DISTRIBB_API_KEY` to your local `.env` or shell session. Do not commit it.
2. If known, add `DISTRIBB_PROJECT_ID` to `.env` so commands do not have to resolve it every run.
3. Run `/distribb-setup` to confirm:
   - the Distribb project exists
   - Search Console is connected
   - the website/CMS publishing target is connected
   - backlink network participation is enabled

## Backlink workflow

Before writing or publishing any new Distribb article:

1. Run `/backlinks <keyword>` for the target keyword.
2. Review the returned backlink targets.
3. Include 1-2 relevant network links only where they genuinely help the reader.
4. Keep the article anchored in Sam's voice and local intent.
5. Submit/publish through Distribb so the backlink scan can credit the project.

If Distribb returns a backlink warning after article creation, revise the draft with a relevant network target before publishing.

## Editorial rules

- Do not add hidden, footer, template-wide, or irrelevant links.
- Do not use keyword-stuffed anchor text.
- Do not fabricate claims about linked businesses.
- Prefer naturally helpful citations inside the body of an article.
- Keep the manual citation plan in `docs/backlink-targets.md`; it complements the Distribb exchange and should continue.

