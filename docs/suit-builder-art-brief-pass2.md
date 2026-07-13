# Suit Builder — Art Brief, Pass 2 (collars + lining)

**For:** Rems · **From:** Sam's Menswear build · **Date:** 2026-07-13
**Decision (Rishon, 2026-07-13):** shirt **collars** and jacket **lining** were correctly left out of v1 — **add them this next pass.**

This extends the working suit-builder you delivered (front/buttons, lapel, trousers, neckwear, pocket square). Same layered system, two new parts. Read the honesty line + palette in [`art-direction.md`](art-direction.md) first — this brief is the technical spec for the new sprites only.

> This spec was pressure-tested against the live code before it reached you. Where a rule genuinely depends on the geometry in your source file, it's flagged as **a call for you** rather than guessed — see **Two decisions for you** at the end.

---

## 1. Registration — non-negotiable

Every new sprite drops onto the existing figure with **zero repositioning**:

- **Canvas:** your native **1684 × 2528 px** source, figure in the **identical position** as your existing layers (trace over your own layered file — you hold the master with the neck drawn, so self-register there). We scale to 842×1264 and convert to WebP on our end.
- **Format:** **transparent PNG, 16-bit grayscale.** 16-bit (not 8) so Ingrid's colour pass can multiply + relight dark silks without banding.
- **Tone:** grayscale **luminance only, no colour.** Sample the existing cloth mid-gray off `base-2btn` and key to it: draw collars **~one step lighter** (so a white shirt stays crisp) and lining **mid-gray, not crushed to black** (so oxblood/navy silk still reads after tint). Colour is added later underneath (Ingrid) — bake colour in and you kill that.

**Landmarks in the 1684×2528 frame** (measured from your existing sprites, so collar/lining land in the right place):

| Landmark | Coordinate | Use |
|---|---|---|
| Frame + neck centreline | **x = 842** | everything is symmetric about this |
| Shirt-neck opening | **x ≈ 742–948**, top at **y ≈ 206** | where the collar + shirt gap live (same region as `neck-tie`/`neck-open`) |
| Neckwear knot top | tie top ≈ **y 206**; bow spans **x 758–926** near **y 328** | so the collar band reads correctly *around* both |
| Breast pocket (global check) | **(1022, 606)** | far-field registration cross-check |

---

## 2. The composition principle (read this — it changed the collar plan)

The v1 parts each live in a fixed strip, so one sprite composes over every front. **Collars break that** — because the visible shirt gap changes size a lot with the front:

- 1-button → deep, wide V (lots of collar/shirt shows)
- 2-button → medium
- 3-button → buttons high, short shallow gap
- double-breasted → closes highest, almost no gap

Collar renders **above** the jacket, so a collar drawn to fill the 1-button V will **paint over the closed chest** of a 3-btn/DB, and a collar drawn for the small DB gap looks stubby on a 1-btn. **One sprite cannot stop at four different jacket lines.** So:

- **Band** registers to the fixed neck landmark (x 842, lower edge just above y≈206) — constant across all fronts.
- **Points** are sized to the **smallest** gap (double-breasted) so the collar never overpaints a closed chest; below the points, the baked shirt fills the deep V on 1-btn. Points **may extend laterally over the lapel's inner edge** (a real collar sits over the gorge) — that's how spread stays visibly wider than point. They just must never repaint lapel *cloth* incorrectly, only sit on top at the gorge.
- If small-gap points read too stubby on the 1-button, the fallback is **per-front collar crops** — **your call with the geometry in front of you** (see end).

Lining is a thin sliver, but its edge is **not** identical across fronts — see §4.

---

## 3. Part A — Shirt collars (4)

Draw the collar in the **worn-closed** position (band around the neck, points into the gap). Spread/point/button-down point **down**; **wing is the exception** — pressed tabs pointing **forward/outward**, flanking the neck opening.

| Variation | Sprite | Notes |
|---|---|---|
| Spread | `collar-spread.png` | default dress collar — points spread **wide** toward the lapels |
| Point | `collar-point.png` | narrower, longer points, sit closer to centre |
| Button-down | `collar-button-down.png` | soft roll; tiny buttons at the points — draw the **buttons a touch darker** (own small shadow) so they survive a light white-shirt tint |
| Wing | `collar-wing.png` | formal — **only worn with the bow.** Forward-facing tabs beside the bow |

**Couplings (how it plugs in — these are enforced in code, so you draw for exactly one case each):**
- **Wing ↔ bow is locked.** Integration mirrors the existing DB↔peak lock: choosing **Wing** forces neckwear to **Bow**, and choosing a non-bow neckwear hides Wing. So you only ever draw **wing beneath a bow** — you do *not* need a wing-with-long-tie drawing.
- **Open collar** (`neck-open`, no tie) already contains its own open collar, so when the user picks **Open** the collar overlay is **hidden**. The 4 above are for the tie/bow cases only.
- **Band under the knot:** the collar band front is covered by the tie knot / bow. **Check band coverage against BOTH `neck-tie` and `neck-bow`** — the bow is smaller and reveals more band; **spread is the worst case.** No exposed band should peek where it shouldn't under either.
- **Button-down** is a casual collar; it reads odd under a bow. Default is to allow it with tie/open only — confirm with Rishon (minor, non-blocking).

## 4. Part B — Jacket lining (per lapel)

Lining = the **flash of silk along the inner edge of the lapel** — the thin exposed sliver between the lapel edge and the shirt, **not** the whole jacket inside. Grayscale so Ingrid tints it any lining colour.

| Variation | Sprite | Follows |
|---|---|---|
| Notch | `lining-notch.png` | the notch-lapel inner edge |
| Peak | `lining-peak.png` | the peak-lapel inner edge |
| Shawl | `lining-shawl.png` | the shawl roll (see below) |

**The edge is NOT identical across fronts — verify before committing.** The lapel inner edge sits at a *different* position on:
1. the **overlay** lapels (`lapel-notch/peak/shawl`, used on 1/2-button),
2. the **baked** edges inside `base-3btn-notch/peak/shawl` (3-button buttons higher → shorter lapel → edge ends higher), and
3. the **baked** `jacket-db` edge (double-breasted crosses the body differently).

**Overlay each lining sliver against all the surfaces it must serve and confirm the inner-edge path matches.** If it doesn't (likely for DB, possibly for 3-btn), **split** the sprite (e.g. `lining-peak-db`) rather than let silk float off the edge. Worst case, draw the sliver **narrow enough to sit inside the overlap** of all versions.

- **Shawl sliver:** the shawl has no notch/peak — it's one continuous curve. Draw a **hairline near the neck that widens slightly toward the waist button**, following the roll. Mark it on a copy of `lapel-shawl` so the crescent doesn't read as piping or a second lapel.
- **Abutment with the collar:** the collar band bottom ends just above **y ≈ 200**; the lining sliver runs **below** that down the lapel edge. Keep a clean handoff at ~y 200 so the two new parts don't overlap or leave a gap.

---

## 5. Colour handoff — where the tint actually happens (important)

Right now **SuitBuilder is deliberately a grayscale *structure* tool** — it has no shirt-colour or lining-colour control (colour is "chosen with Sam at the fitting"). Grayscale is the **shipped intermediate**, not a mistake.

**Ingrid's pass adds a colour mode to SuitBuilder** — the fabric-weave multiplied under the suit **plus** a **Shirt colour** and **Lining colour** dial. *That* colour mode is what consumes these grayscale collar/lining sprites. So:
- **Rems:** deliver clean grayscale luminance; that's the deliverable.
- **Ingrid:** the collar tints to the shirt palette already used on `/design` — **white, sky, pink, ivory**; the lining tints to the lining palette — **matching, oxblood, hunter, gold, sky, silver**. Dark silks need a **screen-blend highlight** pass on top of the multiply, not multiply alone, or they go muddy — that's why the sliver must keep tonal range (don't crush to black).

## 6. Delivery checklist

- [ ] 1684 × 2528, transparent, **16-bit grayscale**, figure registered to existing layers
- [ ] grayscale luminance only, keyed to `base-2btn` cloth mid-gray
- [ ] 4 collars: `collar-spread` / `collar-point` / `collar-button-down` / `collar-wing`
- [ ] linings per lapel (+ any splits you find necessary): `lining-notch` / `lining-peak` / `lining-shawl`
- [ ] **QA screenshots of each collar stacked over `base-1btn`, `base-3btn-*`, AND a DB (`jacket-db`) base** — not just 2-btn (that stack can't catch the gap-size problem)
- [ ] lining stacked over the overlay lapel **and** the baked 3-btn / DB edge, to prove the sliver hugs both

## 7. Two decisions for you (you hold the source; you can see the geometry I can't)

1. **Collars:** one **small-gap** collar set (points sized to DB, jacket covers below) — or **per-front crops** if the small-gap points read too stubby on the 1-button? My default: try the single small-gap set first; escalate to per-front only if it looks weak.
2. **Lining:** does **one sliver per lapel** actually hug the overlay, baked-3btn, and DB edges — or do you need to **split** (e.g. `lining-peak-db`)? You'll know as soon as you overlay them.

Tell me which on each and I'll wire the layer logic to match.

---

### Integration (my side — for reference, no action needed)

Layer stack: `base → lapel → dbjacket → lining → collar → pants → neck → square` (collar renders **above the jacket, below the neckwear**; pants sit between but never reach the neck). New sprites → `public/media/suit/` (we WebP-optimise, ~84% smaller — you deliver PNG). Wiring: two new dials (**Shirt collar**, **Lining**); collar hidden when `neck==='open'`; **Wing forces Bow** (mirrors the DB↔peak lock); lining auto-selects by lapel with **DB forced to `peak`** in code (`state.front==='db' ? 'peak' : state.lapel`, same rule `specText()` already uses) — the sprite follows the *lapel shape*, while the *Lining colour* dial only drives Ingrid's tint.
