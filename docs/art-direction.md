# Sam's Menswear — Art Direction (locked 2026-07-05)

The visual identity is a **warm atelier sketchbook**. Every generated image must feel like it was drawn in the same book as the hero and the journey frames.

## The decision
- **Style:** sketchbook-forward — hand-drawn illustration is the hero language everywhere (hero, journey, configurator atmosphere, guide/blog headers, decorative).
- **Mood/palette:** keep warm sketchbook — ivory paper, ink, oxblood, gold, navy; muted, low-saturation, old-world craft, unhurried, masculine.
- **Honesty line (non-negotiable):** AI generates **illustration + generic materials/atmosphere only**. AI must NOT produce photos of Sam, fake "finished suits" passed as his portfolio, or fake clients. Sam's real portrait and real finished garments come from **real photos the owner supplies**.

## Style DNA (prompt spine for consistency)
- **Medium:** graphite + ink line drawing with loose watercolor washes; visible warm paper grain; sketchbook feel; crop marks; a few deliberately unfinished/open edges.
- **Palette:** paper `#f2ede1`, ink `#211c15`, oxblood `#6b2228`, gold `#9d7f42`, navy `#1c2540`. Low saturation. Ink linework does the drawing; wash adds restrained colour.
- **Recurring characters:** the older master tailor (flat cap, waistcoat, sleeves rolled — Sam-*inspired*, never a real likeness) and the younger customer from the journey. Keep them consistent via **image-to-image off the existing `/public/media/hero-still.png` + `journey/*.webp`** frames.
- **Composition:** editorial, off-centre, generous negative space (room for headline/label overlay). 3:2 or 4:5 for heroes, 16:9 for headers, 1:1 for tiles.
- **Avoid:** glossy 3D renders, photoreal human faces presented as real people, stock-photo gloss, neon, busy backgrounds, "AI sheen."

## Production
- **Model:** Nano Banana Pro (`nano_banana_pro`) in **image-to-image** mode, passing an existing frame as the `image` reference so the hand + character stay consistent. 2 credits/image. Upscale hero pieces to 2K (`upscale_image`, 2 credits).
- **Exception — fabric tiles:** the ~18 hero cloths for `/design` are **photoreal macro-weave textures** (generic material, within the honesty line), top-lit, shallow depth of field, seamless/tileable. These sit *under* the grayscale suit SVG via `mix-blend-mode: multiply` so the drawn suit takes on the real cloth. (Higgsfield Soul V2 @ 0.12cr or Nano Banana Pro @ 2cr.)
- **Video:** the hero video exists. Do NOT add more (Kling 10–30cr, Seedance 135cr) unless there's a clear reason — video is the only real cost.

## Batch plan (≈75 images ≈ 145 credits ≈ 3% of balance)
1. **`/design` unlock** — 18 fabric-weave macro tiles + 4 Commission Card frame/seal/paper assets. (~44cr) — highest ROI; powers the council's top /design moves.
2. **Weddings** — 8 sketchbook lookbook illustrations (groom in navy 3-piece, tuxedo/satin detail, father & son, boutonnière, groomsmen line) + 4 house hero illustrations. (~24cr)
3. **Content** — 8 guide/pillar headers + 8 journal/blog headers. (~32cr)
4. **Optional** — 6 traditional-garment illustrations to replace the SVG line drawings. (~12cr)

## Needs real photos from Sam (NOT AI)
- Sam's portrait — About page + `/design` trust band.
- 6–12 real finished suits / fittings — lookbook + review context.
- (Optional) the atelier interior.
