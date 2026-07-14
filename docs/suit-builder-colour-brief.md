# Suit Builder — Colour Brief (for Ingrid)

**For:** Ingrid · **From:** Sam's Menswear build · **Date:** 2026-07-13

The suit builder works today in **grayscale** — real drawn tailoring (Rems), every cut composited live from stacked sprites. Your pass turns it into **colour**: the customer picks a cloth and the drawn suit takes on that fabric, live. This is the actual "draw one, make 200" payoff — 200+ fabrics × every cut, with no extra drawing.

Read the honesty line + palette in [`art-direction.md`](art-direction.md) first. This brief is the colour mechanic + your deliverables.

---

## 1. What already exists (so you build onto it, not from scratch)

- **Garment sprites** — `public/media/suit/*.webp`: grayscale, transparent PNG→WebP, one registered 842×1264 canvas. The garment silhouette **is** the sprite's alpha (transparent everywhere else). Parts: base (1/2/3-btn + DB), lapel, trousers, neckwear, pocket square. Pass 2 (Rems, in progress) adds collars + lining — you'll tint those too.
- **Fabric library** — `src/data/fabrics.js`: ~200 fabrics, each with `id`, `name`, `hex` base colour, `pattern` (solid / twill / pinstripe / chalkstripe / herringbone / birdseye / nailhead / sharkskin / glen / windowpane / houndstooth …), and a parametric **CSS weave** that renders with zero images today.
- **Real cloth tiles** — only **7 so far**: `public/media/cloth/f001, f003, f021, f024, f090, f104, f142 .webp` (seamless macro-weave photos). These are the pattern for the rest.

So every fabric already has a colour + a weave *recipe*; your job is to make the drawn suit **wear** it.

## 2. The colour mechanic (recommended — I wire it, you feed it)

Composite, per garment part, in canvas as **linear-light** over the fabric:

```
out_pixel = clamp( fabric_pixel + 2 × (gray_pixel − 0.5) )   // per RGB channel
```
where `gray` = the sprite's luminance (0–1) and `fabric` = the chosen cloth (a tiled weave photo, or the flat hex + CSS weave for solids), sampled only inside the sprite's silhouette (its alpha).

Why this and not plain multiply:
- flat cloth (**gray = 0.5**) → `out = fabric` → pure fabric colour, undistorted
- folds / seams / shadows (**gray < 0.5**) → darkens the fabric → drapes read
- seam sheen / lapel-roll highlights (**gray > 0.5**) → **lightens** the fabric → this is the built-in **dark-cloth fix**: navy, charcoal and black keep their drawn light instead of going to mud. Plain multiply can only darken and kills darks — linear-light doesn't.

**The one thing this needs from you: the sprites' flat-cloth areas must sit at mid-gray ≈ 0.5 (128/255).** Rems drew them for looks, not for a 0.5 pivot, so they likely sit lighter or darker. **Renormalising each sprite's flat-cloth value to ~0.5 (keeping the shadow/highlight range around it) is deliverable #1** — get that right and every fabric composites correctly for free.

*(Fallback if a part needs more control than one map gives: split it into a shadow map (multiply) + a highlight map (screen). More asset work; only reach for it where linear-light looks flat.)*

**Wiring notes (my side — so your tiles behave):**
- **Strength is tunable, ≤ 2×.** Pure 2× linear-light can blow highlights to white on bright or mid cloths (a vivid oxblood, a mid grey). I ease the coefficient and bias the sheen toward a warm off-white rather than pure white, so cloth reads worsted, not plastic — deliver tiles neutral and I tune.
- **Fabric is sampled in shared canvas coordinates, not per-part** — so a pinstripe / glen check / windowpane stays **continuous across the lapel↔base↔trouser seams** instead of jumping at each part. That means directional-pattern tiles must be truly seamless and drawn at the figure's real on-screen scale.
- **Untiled fabrics colour from their flat `hex`.** The parametric CSS weave in `fabrics.js` is swatch-only — a gradient string can't be sampled in a canvas composite — so I add a faint procedural weave for solids so they aren't dead-flat. Your photo tiles therefore only need to cover the **textured / patterned** cloths, not all ~200.
- Recompositing the ~5–7 small sprite layers on each pick is cheap (&lt;16 ms, only on change) — no performance worry across the full library.

## 3. Your deliverables

1. **Pivot-normalised garment sprites** — each `public/media/suit/*.webp` regraded so flat cloth = mid-gray 0.5, shadows/highlights preserved around it. This makes the composite fabric-agnostic. (Do this for Rems's pass-2 collar/lining sprites too when they land.)
2. **Fabric tile library** — decide which fabrics get a **real woven photo tile** (the textured / hero / signature cloths — glen checks, herringbones, flannels, tweeds) vs. which stay **flat hex** (plain solids read fine on the procedural weave, no photo needed). Produce seamless, tileable, neutral-lit macro tiles for the textured set, named `public/media/cloth/{id}.webp` to match `fabrics.js` ids. Prioritise the `popular` fabrics + the navy/charcoal/black core first.
3. **Shirt + lining tint** — tint Rems's grayscale collar/lining sprites via the palettes already on `/design`:
   - shirt: **white, sky, pink, ivory**
   - lining: **matching, oxblood, hunter, gold, sky, silver** — where *matching* = tint the lining with the suit's own selected cloth (I pass you the chosen fabric); the rest are flat lining colours.
   Same linear-light idea; the collar sits light so white stays crisp, the lining keeps range so oxblood/navy silk reads.
4. **Dark-cloth QA** — prove navy, charcoal and black still show seams, lapel roll and drape (this is where colour tools usually fail). If linear-light isn't enough on the darkest cloths, that's where a screen-highlight boost goes.

## 4. Colour guardrails (keep it Sam, not a paint chip)

- Muted, low-saturation, old-world — match the site palette (paper `#f2ede1`, ink `#211c15`, oxblood `#6b2228`, gold `#9d7f42`, navy `#1c2540`). Cloth colours are worsted-wool real, never neon.
- Weave texture is **subtle** — a hint of the cloth, not a loud pattern. At the figure's on-screen size the weave should read as tone first, texture second.
- Honesty line holds: these are **generic material textures**, not photos of Sam's actual finished suits.

## 5. Format + how it plugs in

- Deliver tiles as **seamless WebP** (or PNG, we convert), ~512–768px square, tileable, even lighting (no baked highlight/shadow — the sprite provides the light).
- Deliver renormalised sprites as 16-bit grayscale PNG (headroom), same 1684×2528 registration as the originals.
- **I do all the wiring** — canvas composite, the fabric picker (reads `fabrics.js`, the same ~200 already on `/fabrics` and `/design`), the Shirt-colour + Lining-colour dials, deep-linking. You provide the tiles + normalised sprites + the tint values; I build the colour mode into `SuitBuilder.astro`. That colour mode is what promotes `/suit-builder` over the SVG on `/design`.

## 6. Two calls for you

1. **Pivot approach:** single normalised mid-gray sprite + linear-light (my default, least asset work) — or do you want to author split shadow/highlight maps for the hero parts (base jacket especially) for finer control?
2. **Tile coverage:** how many fabrics get real photo tiles vs. flat hex + CSS weave? My default: real tiles for the textured/signature cloths + the navy/charcoal/black core (~20–40), flat for plain solids. Tell me the cut and I'll wire the fallback so untiled fabrics still colour cleanly.

---

### Handoff chain (so nothing waits on the wrong person)
Rems draws structure (grayscale) → **you** normalise + colourise (tiles, tint, dark-cloth) → I wire the colour mode → `/suit-builder` replaces the SVG configurator on `/design`. Rems's pass-2 collar/lining sprites feed straight into your shirt/lining tint — see [`suit-builder-art-brief-pass2.md`](suit-builder-art-brief-pass2.md).
