// fabrics.js — Sam's cloth library.
// ~200 fabrics generated from a structured catalogue. Each entry carries a
// parametric CSS swatch (base colour + weave/pattern) so the library renders
// with zero images today; drop a real photo later and it replaces the swatch.
//
// Fields: id, name, category, colour (family), pattern, weightOz, composition,
// tier (I Entry / II Signature / III Luxury), popular (bool), css (background).

// ── colour helpers ──────────────────────────────────────────────────────
function hexToRgb(h) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lum(h) {
  const [r, g, b] = hexToRgb(h);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
// line colour for weave patterns — chalk on dark cloth, ink on light cloth
function line(h, strong = false) {
  return lum(h) < 0.5
    ? `rgba(255,255,255,${strong ? 0.6 : 0.42})`
    : `rgba(30,24,16,${strong ? 0.42 : 0.26})`;
}
function soft(h) {
  return lum(h) < 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
}

// ── pattern → CSS background ──────────────────────────────────────────────
function swatchCss(base, pattern, accent) {
  const L = line(base);
  const LS = line(base, true);
  const A = accent || L;
  switch (pattern) {
    case 'solid':
      return `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.06)), ${base}`;
    case 'twill':
      return `repeating-linear-gradient(60deg, ${soft(base)} 0 1px, transparent 1px 3px), ${base}`;
    case 'pinstripe':
      return `repeating-linear-gradient(90deg, ${LS} 0 1px, transparent 1px 9px), ${base}`;
    case 'chalkstripe':
      return `repeating-linear-gradient(90deg, ${LS} 0 2px, transparent 2px 16px), ${base}`;
    case 'herringbone':
      return `repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 2px, transparent 2px 6px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.14) 0 2px, transparent 2px 6px), ${base}`;
    case 'birdseye':
      return `radial-gradient(${L} 22%, transparent 24%) 0 0/6px 6px, ${base}`;
    case 'nailhead':
      return `radial-gradient(${LS} 30%, transparent 32%) 0 0/9px 9px, ${base}`;
    case 'sharkskin':
      return `repeating-linear-gradient(63deg, rgba(255,255,255,0.09) 0 1px, rgba(0,0,0,0.10) 1px 2px, transparent 2px 4px), ${base}`;
    case 'glen':
      return `repeating-linear-gradient(0deg, ${L} 0 1px, transparent 1px 7px), repeating-linear-gradient(90deg, ${L} 0 1px, transparent 1px 7px), ${base}`;
    case 'windowpane':
      return `repeating-linear-gradient(0deg, ${A} 0 1px, transparent 1px 34px), repeating-linear-gradient(90deg, ${A} 0 1px, transparent 1px 34px), ${base}`;
    case 'houndstooth':
      return `repeating-linear-gradient(45deg, ${L} 0 3px, transparent 3px 6px), repeating-linear-gradient(-45deg, ${L} 0 3px, transparent 3px 6px), ${base}`;
    case 'flannel':
      return `radial-gradient(rgba(255,255,255,0.05), transparent 70%), linear-gradient(rgba(0,0,0,0.04), rgba(0,0,0,0.04)), ${base}`;
    case 'linen':
      return `repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 3px), repeating-linear-gradient(0deg, rgba(0,0,0,0.045) 0 1px, transparent 1px 3px), ${base}`;
    case 'hopsack':
      return `repeating-linear-gradient(0deg, rgba(0,0,0,0.09) 0 2px, transparent 2px 5px), repeating-linear-gradient(90deg, rgba(0,0,0,0.09) 0 2px, transparent 2px 5px), ${base}`;
    case 'velvet':
      return `radial-gradient(ellipse at 38% 28%, rgba(255,255,255,0.16), transparent 62%), radial-gradient(ellipse at 70% 90%, rgba(0,0,0,0.25), transparent 60%), ${base}`;
    case 'barathea':
      return `repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 3px), ${base}`;
    case 'melton':
      return `linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), ${base}`;
    case 'donegal':
      return `radial-gradient(${A} 18%, transparent 20%) 0 0/11px 11px, radial-gradient(rgba(255,255,255,0.5) 14%, transparent 16%) 3px 5px/13px 13px, ${base}`;
    case 'oxford':
      return `repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 2px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 2px), ${base}`;
    case 'poplin':
      return `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0.04)), ${base}`;
    case 'end-on-end':
      return `repeating-linear-gradient(90deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 2px), ${base}`;
    case 'bengal':
      return `repeating-linear-gradient(90deg, ${accent} 0 5px, #f4efe4 5px 10px)`;
    case 'gingham':
      return `repeating-linear-gradient(0deg, ${accent}40 0 6px, transparent 6px 12px), repeating-linear-gradient(90deg, ${accent}40 0 6px, transparent 6px 12px), #f4efe4`;
    case 'tattersall':
      return `repeating-linear-gradient(0deg, ${accent} 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, ${accent} 0 1px, transparent 1px 16px), #f4efe4`;
    default:
      return base;
  }
}

// ── catalogue building blocks ──────────────────────────────────────────────
const C = {
  navy:      { name: 'Navy',           hex: '#20294d', family: 'Blue' },
  midnight:  { name: 'Midnight Blue',  hex: '#161d33', family: 'Blue' },
  airforce:  { name: 'Airforce Blue',  hex: '#37506d', family: 'Blue' },
  slate:     { name: 'Slate Blue',     hex: '#455066', family: 'Blue' },
  charcoal:  { name: 'Charcoal',       hex: '#333138', family: 'Grey' },
  grey:      { name: 'Slate Grey',     hex: '#5f636c', family: 'Grey' },
  silver:    { name: 'Silver Grey',    hex: '#9a9ba1', family: 'Grey' },
  black:     { name: 'Black',          hex: '#1b1b1f', family: 'Black' },
  brown:     { name: 'Chocolate',      hex: '#423125', family: 'Brown' },
  tobacco:   { name: 'Tobacco',        hex: '#6d4a2f', family: 'Brown' },
  camel:     { name: 'Camel',          hex: '#a67c4e', family: 'Brown' },
  tan:       { name: 'Tan',            hex: '#b6976b', family: 'Brown' },
  olive:     { name: 'Olive',          hex: '#4b4a30', family: 'Green' },
  hunter:    { name: 'Hunter Green',   hex: '#2c3d31', family: 'Green' },
  oxblood:   { name: 'Oxblood',        hex: '#5c2026', family: 'Red' },
  stone:     { name: 'Stone',          hex: '#8f8672', family: 'Neutral' },
  ivory:     { name: 'Ivory',          hex: '#e7dcc4', family: 'Neutral' },
  // shirting
  white:     { name: 'White',          hex: '#f3efe6', family: 'White' },
  skyblue:   { name: 'Sky Blue',       hex: '#b7cbe0', family: 'Blue' },
  pink:      { name: 'Pink',           hex: '#e2c3c4', family: 'Pink' },
  lavender:  { name: 'Lavender',       hex: '#c9c3da', family: 'Purple' },
};

const TIER = { I: 'Entry', II: 'Signature', III: 'Luxury' };

let _id = 0;
const rows = [];
function add(colourKey, pattern, category, opts = {}) {
  const c = C[colourKey];
  if (!c) return;
  _id += 1;
  const patName = {
    solid: '', twill: 'Twill', pinstripe: 'Pinstripe', chalkstripe: 'Chalkstripe',
    herringbone: 'Herringbone', birdseye: 'Birdseye', nailhead: 'Nailhead',
    sharkskin: 'Sharkskin', glen: 'Glen Check', windowpane: 'Windowpane',
    houndstooth: 'Houndstooth', flannel: 'Flannel', linen: 'Linen',
    hopsack: 'Hopsack', velvet: 'Velvet', barathea: 'Barathea', melton: 'Melton',
    donegal: 'Donegal', oxford: 'Oxford', poplin: 'Poplin', 'end-on-end': 'End-on-End',
    bengal: 'Bengal Stripe', gingham: 'Gingham', tattersall: 'Tattersall',
  }[pattern] || '';
  const name = opts.name || `${c.name}${patName ? ' ' + patName : ''}${opts.suffix ? ' ' + opts.suffix : ''}`.trim();
  rows.push({
    id: `f${String(_id).padStart(3, '0')}`,
    name,
    category,
    colour: c.family,
    hex: c.hex,
    pattern,
    weightOz: opts.weightOz,
    composition: opts.composition,
    tier: opts.tier || 'II',
    tierName: TIER[opts.tier || 'II'],
    popular: !!opts.popular,
    css: swatchCss(c.hex, pattern, opts.accent),
  });
}

// SUITING — worsted (the core library)
const suitingColours = ['navy', 'midnight', 'charcoal', 'grey', 'silver', 'airforce', 'slate', 'brown', 'black'];
const suitingPatterns = [
  ['solid', 'I'], ['twill', 'I'], ['pinstripe', 'II'], ['chalkstripe', 'II'],
  ['birdseye', 'II'], ['nailhead', 'II'], ['sharkskin', 'II'], ['herringbone', 'II'],
  ['glen', 'II'], ['windowpane', 'III'],
];
for (const col of suitingColours) {
  for (const [pat, tier] of suitingPatterns) {
    // skip a few combos that read poorly
    if (col === 'black' && ['windowpane', 'glen', 'chalkstripe'].includes(pat)) continue;
    if (col === 'silver' && ['pinstripe'].includes(pat)) continue;
    add(col, pat, 'Suiting', {
      tier,
      weightOz: pat === 'solid' ? 9 : 10,
      composition: tier === 'III' ? 'Super 130s wool' : 'Pure worsted wool',
      accent: pat === 'windowpane' ? line(C[col].hex, true) : undefined,
      popular: (col === 'navy' || col === 'charcoal') && ['solid', 'pinstripe', 'birdseye', 'sharkskin', 'chalkstripe'].includes(pat),
    });
  }
}

// FLANNEL
for (const col of ['charcoal', 'grey', 'navy', 'brown', 'midnight']) {
  for (const pat of ['flannel', 'herringbone', 'chalkstripe']) {
    add(col, pat, 'Flannel', {
      tier: 'II', weightOz: 12, composition: 'Brushed worsted flannel',
      popular: col === 'grey' && pat === 'flannel',
    });
  }
}

// SUMMER — fresco / linen / hopsack
for (const col of ['navy', 'stone', 'tan', 'olive', 'ivory', 'airforce', 'brown']) {
  for (const pat of ['linen', 'hopsack']) {
    add(col, pat, 'Summer', {
      tier: col === 'ivory' ? 'II' : 'I', weightOz: 8,
      composition: pat === 'linen' ? 'Irish linen' : 'Wool hopsack',
      popular: (col === 'navy' && pat === 'hopsack') || (col === 'stone' && pat === 'linen'),
    });
  }
}
add('grey', 'twill', 'Summer', { name: 'Grey Fresco', weightOz: 8, tier: 'II', composition: 'High-twist fresco wool' });
add('navy', 'twill', 'Summer', { name: 'Navy Fresco', weightOz: 8, tier: 'II', composition: 'High-twist fresco wool', popular: true });

// JACKETING / TWEED
for (const col of ['brown', 'olive', 'hunter', 'grey', 'tobacco', 'charcoal']) {
  for (const pat of ['herringbone', 'houndstooth', 'donegal']) {
    add(col, pat, 'Jacketing', {
      tier: 'II', weightOz: 13, composition: 'Shetland / Donegal tweed',
      accent: pat === 'donegal' ? '#b6482f' : undefined,
      popular: col === 'brown' && pat === 'herringbone',
    });
  }
}
add('camel', 'twill', 'Jacketing', { name: 'Camel Hair Blazer Cloth', weightOz: 12, tier: 'III', composition: 'Camel hair blend' });
add('hunter', 'windowpane', 'Jacketing', { weightOz: 12, tier: 'II', composition: 'Wool tweed', accent: '#c98a3a' });

// FORMAL / TUXEDO
add('black', 'barathea', 'Formal', { name: 'Black Barathea Dinner Cloth', weightOz: 11, tier: 'II', composition: 'Wool barathea', popular: true });
add('midnight', 'barathea', 'Formal', { name: 'Midnight Barathea Dinner Cloth', weightOz: 11, tier: 'III', composition: 'Wool barathea', popular: true });
add('black', 'twill', 'Formal', { name: 'Black Mohair-Blend Tuxedo', weightOz: 9, tier: 'III', composition: 'Wool / mohair' });
for (const [col, nm, tier] of [['black', 'Black', 'II'], ['oxblood', 'Oxblood', 'III'], ['hunter', 'Hunter', 'III'], ['midnight', 'Midnight', 'III']]) {
  add(col, 'velvet', 'Formal', { name: `${nm} Velvet Dinner Jacket`, weightOz: 12, tier, composition: 'Cotton velvet', popular: col === 'oxblood' });
}
add('ivory', 'barathea', 'Formal', { name: 'Ivory Dinner Jacket Cloth', weightOz: 10, tier: 'III', composition: 'Wool / silk' });

// COATING / OUTERWEAR
for (const col of ['navy', 'charcoal', 'camel', 'grey', 'brown']) {
  for (const pat of ['melton', 'herringbone']) {
    add(col, pat, 'Coating', {
      tier: col === 'camel' ? 'III' : 'II', weightOz: 20,
      composition: col === 'camel' ? 'Camel hair / wool' : 'Wool melton',
      suffix: 'Coating', popular: col === 'camel' && pat === 'herringbone',
    });
  }
}

// SHIRTING
const shirtColours = ['white', 'skyblue', 'pink', 'lavender', 'stone'];
for (const col of shirtColours) {
  for (const pat of ['poplin', 'twill', 'oxford', 'end-on-end', 'herringbone']) {
    add(col, pat, 'Shirting', {
      tier: pat === 'oxford' ? 'I' : 'II', weightOz: 3,
      composition: pat === 'oxford' ? 'Two-ply oxford cotton' : 'Two-ply Egyptian cotton',
      popular: col === 'white' && ['poplin', 'twill'].includes(pat),
    });
  }
}
// shirting patterns with an accent colour
for (const [accentKey, accentHex] of [['skyblue', '#3f6ea3'], ['pink', '#b8595c'], ['navy', '#20294d'], ['grey', '#5f636c']]) {
  add('white', 'bengal', 'Shirting', { name: `${C[accentKey].name} Bengal Stripe`, weightOz: 3, tier: 'II', composition: 'Two-ply cotton', accent: accentHex, popular: accentKey === 'skyblue' });
  add('white', 'gingham', 'Shirting', { name: `${C[accentKey].name} Gingham`, weightOz: 3, tier: 'I', composition: 'Two-ply cotton', accent: accentHex });
  add('white', 'tattersall', 'Shirting', { name: `${C[accentKey].name} Tattersall`, weightOz: 3, tier: 'II', composition: 'Two-ply cotton', accent: accentHex });
}

// VEGAN
add('navy', 'twill', 'Vegan', { name: 'Navy Vegan Wool-Free Twill', weightOz: 9, tier: 'II', composition: 'Recycled polyester / Tencel', popular: true });
add('charcoal', 'solid', 'Vegan', { name: 'Charcoal Vegan Suiting', weightOz: 9, tier: 'II', composition: 'Recycled polyester / Tencel' });
add('black', 'solid', 'Vegan', { name: 'Black Vegan Dinner Cloth', weightOz: 9, tier: 'II', composition: 'Recycled polyester' });
add('stone', 'linen', 'Vegan', { name: 'Stone Vegan Linen-Look', weightOz: 8, tier: 'I', composition: 'Tencel / hemp' });

export const fabrics = rows;

export const categories = ['Suiting', 'Flannel', 'Summer', 'Jacketing', 'Formal', 'Coating', 'Shirting', 'Vegan'];
export const colours = ['Blue', 'Grey', 'Black', 'Brown', 'Green', 'Red', 'Neutral', 'White', 'Pink', 'Purple'];
export const patternsList = [
  'solid', 'twill', 'pinstripe', 'chalkstripe', 'herringbone', 'birdseye',
  'nailhead', 'sharkskin', 'glen', 'windowpane', 'houndstooth', 'flannel',
  'linen', 'hopsack', 'velvet', 'barathea', 'melton', 'donegal', 'oxford',
  'poplin', 'end-on-end', 'bengal', 'gingham', 'tattersall',
];
export const tiers = [
  { key: 'I', name: 'Entry', price: '$' },
  { key: 'II', name: 'Signature', price: '$$' },
  { key: 'III', name: 'Luxury', price: '$$$' },
];

// A curated set of popular suiting swatches for the look generator.
export const popularSuiting = fabrics.filter(
  (f) => f.popular && ['Suiting', 'Flannel', 'Summer', 'Formal'].includes(f.category)
);
