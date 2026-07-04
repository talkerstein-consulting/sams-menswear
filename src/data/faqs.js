// faqs.js — Sam's answer bank, written to answer the questions real buyers ask
// (mined from search + reviews). First person, ≤~45 words, lead with the answer.
// Powers the /faq hub, per-topic FAQ blocks, and FAQPage JSON-LD (AEO/GEO).

export const faqCategories = [
  'Cost & value',
  'Bespoke, made-to-measure & off-the-rack',
  'Timeline & fittings',
  'Your first fitting',
  'Fit',
  'Weddings',
  'Cloth',
  'Visiting & the traveling tailor',
  'Traditional & Jewish menswear',
  'Care & the long run',
  'Trust',
];

export const faqs = [
  // ── Cost & value ──────────────────────────────────────────────
  { cat: 'Cost & value', q: 'How much does a custom suit cost in Toronto?', a: "It depends entirely on the cloth and construction. As a market guide: off-the-rack runs $150–500, made-to-measure $500–2,500, and full bespoke $3,000 and up. I show you options across every one of those shelves on your first visit and quote your garment honestly before a thread is cut." },
  { cat: 'Cost & value', q: 'Why does a custom suit cost more than one off the rack?', a: "You're paying for a pattern cut to your body, better cloth, hand-work, and fittings — not a factory average plus a brand markup. A good custom suit also lasts and re-fits for years, so the cost per wear is often lower than chasing cheap suits that never quite fit." },
  { cat: 'Cost & value', q: 'Is a bespoke suit actually worth it?', a: "For a hard-to-fit body, a wedding, or a man who wears a suit weekly — yes. For a suit you'll wear twice a year, made-to-measure is the smarter spend, and I'll tell you so. I'd rather you buy the right tier once than overspend to impress me." },
  { cat: 'Cost & value', q: 'Do you have options for smaller budgets?', a: "Always. I keep cloth across three price shelves and I never push the top one. My reviews say it plainly — I don't upsell. Tell me the number you're comfortable with and we'll build the best suit inside it." },
  { cat: 'Cost & value', q: 'What makes one suit more expensive than another?', a: "Three things: the cloth (a Super 150s or a mohair costs more than a house worsted), the construction (full canvas and hand-work over fused), and the detail (working cuffs, hand-finished buttonholes, bespoke lining). We decide together where the money is worth it for you." },
  { cat: 'Cost & value', q: 'Do you take a deposit?', a: "Yes — a deposit covers the cloth, which I cut to you and can't resell, with the balance due on delivery. We settle the exact terms honestly at the consultation, before anything is ordered." },

  // ── Bespoke vs MTM vs OTR ─────────────────────────────────────
  { cat: 'Bespoke, made-to-measure & off-the-rack', q: "What's the difference between bespoke, made-to-measure and off-the-rack?", a: "Off-the-rack is cut to an average and altered toward you. Made-to-measure adjusts a factory's existing pattern to your numbers. Bespoke starts with no pattern at all — I draft one from your body and cut the cloth by hand. Different price, different fit, different life." },
  { cat: 'Bespoke, made-to-measure & off-the-rack', q: 'Which one do I actually need?', a: "Most men don't need the most expensive option — they need the right one for the occasion and budget. A weekly-worn wardrobe or a tricky fit leans bespoke; an occasional suit leans made-to-measure. That's the first conversation we have, before any cloth." },
  { cat: 'Bespoke, made-to-measure & off-the-rack', q: 'Do you make bespoke or made-to-measure?', a: "Both, so I can meet your budget honestly. I'll draft a full bespoke pattern when the fit or occasion calls for it, and do made-to-measure when that's the smarter spend. You get the truth about which suits you, not a hard sell." },
  { cat: 'Bespoke, made-to-measure & off-the-rack', q: 'Can you just fix a suit I already own?', a: "Often, yes — sleeves, hems, waist, and trouser work are straightforward, especially for existing clients. Some suits are worth altering; some are cheaper to replace than to rescue. Bring it in and I'll tell you honestly which one you've got." },

  // ── Timeline & fittings ───────────────────────────────────────
  { cat: 'Timeline & fittings', q: 'How long does a custom suit take?', a: "A first bespoke suit takes about 8–12 weeks across two or three fittings. Made-to-measure is quicker — roughly 4–8 weeks. Once your pattern is on file, repeat orders come faster because we're not starting from zero." },
  { cat: 'Timeline & fittings', q: 'How far ahead should I order a wedding suit?', a: "Start 9–12 months out for a wedding. That's not construction time — it's breathing room for cloth choices, coordinating a party, and two or three unhurried fittings so nothing is rushed near the date." },
  { cat: 'Timeline & fittings', q: 'Can you do a rush order?', a: "Sometimes, in 3–4 weeks, depending on the cloth and my bench that month. Call me — I'll tell you straight whether I can do it justice in the time, rather than promise and disappoint." },
  { cat: 'Timeline & fittings', q: 'How many fittings will I need?', a: "Usually two or three for bespoke — basted, intermediate and final — so the cloth learns your shape in stages. Made-to-measure is often one fitting plus collection. Reorders from your pattern can need none." },

  // ── First fitting ─────────────────────────────────────────────
  { cat: 'Your first fitting', q: "I've never done this — what happens at the first fitting?", a: "We talk, I measure, we choose cloth. About 90 minutes, unhurried, with coffee. No pressure and no obligation — the first consultation is free. You leave with a plan, not a bill." },
  { cat: 'Your first fitting', q: 'Do I need to know what I want before I come?', a: "Not at all. Most men don't. Bring the occasion and a rough budget; I'll bring thirty years of knowing what works. If you own a jacket you love, bring it — we'll measure what you already like." },
  { cat: 'Your first fitting', q: 'What should I bring or wear?', a: "Wear or bring the shirt and shoes you'd pair with the suit, so the proportions are honest. A jacket you wear often helps too. Otherwise, just yourself." },
  { cat: 'Your first fitting', q: 'How many measurements do you take?', a: "Twenty-six, by hand, plus notes on your posture, stance and shoulder slope. They're re-checked at every fitting and kept in the notebook so your next garment starts from them." },
  { cat: 'Your first fitting', q: 'Does the first consultation cost anything?', a: "No. The first conversation is free, candid and obligation-free. If we work together, I quote the garment honestly before any cloth is cut." },

  // ── Fit ───────────────────────────────────────────────────────
  { cat: 'Fit', q: 'How should a suit jacket fit?', a: "The shoulder seam should sit on the edge of your shoulder with no divot or overhang; the chest should close without pulling; and about a quarter-inch of shirt cuff should show. Get the shoulders right and everything else follows." },
  { cat: 'Fit', q: "I'm hard to fit — athletic, tall, shorter, or bigger. Can you help?", a: "That's exactly who bespoke is for. A drop from athletic shoulders to a trim waist, a long or short rise, a fuller chest — a pattern drafted to you handles what off-the-rack can't. Hard-to-fit bodies are most of my week." },
  { cat: 'Fit', q: 'Can a suit make me look slimmer or taller?', a: "A well-cut suit can, honestly — a clean shoulder line, the right button stance and trouser break lengthen and streamline you. It's tailoring, not a trick, and it only works when the suit is cut to your actual body." },
  { cat: 'Fit', q: 'How should trousers fit and break?', a: "Comfortable at the waist without a belt cinching them, and a break at the shoe that's your call — full, half, or none. I'll show you each on you before we finish the hem." },

  // ── Weddings ──────────────────────────────────────────────────
  { cat: 'Weddings', q: 'Can you coordinate the whole wedding party?', a: "Yes — up to ten groomsmen, the fathers and the groom, drawn from the same cloth with consistent lapel, button and pocket detail. The aim is cohesion without uniformity: everyone matches, everyone still fits." },
  { cat: 'Weddings', q: 'Some of my groomsmen live out of town — can they still be measured?', a: "Yes. I set up remote measuring with a guide and a video walkthrough, then fit them when they arrive. It's how most wedding parties with out-of-town members get done." },
  { cat: 'Weddings', q: 'Tuxedo or suit for my wedding?', a: "A tuxedo for a formal or evening wedding; a three-piece suit for most others, and more wearable afterward. Tell me the venue, season and time of day and I'll steer you — a suit you'll wear again is rarely the wrong answer." },
  { cat: 'Weddings', q: 'Should I match the bride and bridal party?', a: "Coordinate, don't match exactly. We tie the lining, tie or pocket square to the party's colours so the photographs read as one line without looking like a uniform. Bring a photo of the gown and the palette." },
  { cat: 'Weddings', q: 'Custom or rent for the wedding?', a: "Rentals fit a crowd, not a person — and it shows in the photos you keep forever. A custom suit costs more but fits only you and stays in your wardrobe. For the most photographed day of your life, it's usually worth it." },

  // ── Cloth ─────────────────────────────────────────────────────
  { cat: 'Cloth', q: 'How do I choose a cloth and colour?', a: "Start with where you'll wear it and how often. Navy and charcoal earn their keep first; patterns and lighter shades come later. I lay cloth in the light of the room you'll wear it in and we narrow from there — you don't need to know weaves." },
  { cat: 'Cloth', q: 'What cloth is best for a Toronto winter?', a: "A mid-weight worsted or a flannel around 11–13oz — warm, holds its press, and heavy enough not to crease on the drive downtown. I'll also cut the jacket with room for a proper overcoat on top." },
  { cat: 'Cloth', q: 'What about summer suits?', a: "High-twist fresco, linen or wool hopsack around 8oz — open weaves that breathe and travel. Linen creases by design; if that bothers you, we go fresco. Browse the cloth library and I'll point you to the coolest options." },
  { cat: 'Cloth', q: 'Do you offer vegan or wool-free cloth?', a: "Yes. I keep vegan suiting and shirtings — recycled and plant-based cloths that tailor and press well — for clients who want no wool. They're in the cloth library, tagged vegan." },
  { cat: 'Cloth', q: 'What do the Super numbers (100s, 120s, 150s) mean?', a: "They measure the fineness of the wool fibre — higher numbers are finer and softer, but also more delicate. A Super 150s feels beautiful and marks easily; a Super 110s is tougher for daily wear. Finer isn't always better; it depends how you'll use the suit." },

  // ── Visiting & traveling tailor ───────────────────────────────
  { cat: 'Visiting & the traveling tailor', q: 'Where is Sam\'s Menswear?', a: "A home studio at 318 Charlton Avenue, on the Vaughan–Thornhill line, by appointment. It's a quiet room of cloth and light — one client at a time, no showroom floor." },
  { cat: 'Visiting & the traveling tailor', q: 'Do you come to my home or office?', a: "Yes — the Traveling Tailor service. I bring the tape, the cloth book and the notebook to you, anywhere in the GTA. It's how many executives and wedding parties get measured." },
  { cat: 'Visiting & the traveling tailor', q: 'Which areas do you serve?', a: "Vaughan, Thornhill, Toronto, North York, Richmond Hill, Markham and across the GTA — at the studio or, for parties and busy clients, wherever you are." },
  { cat: 'Visiting & the traveling tailor', q: 'Do I need an appointment?', a: "Yes — everything is by appointment so each visit is unhurried and private, one client at a time. Book online or call 647·458·0711." },
  { cat: 'Visiting & the traveling tailor', q: 'Is parking easy?', a: "Yes — on-site parking, a few minutes off Highway 7 and a short walk from Rutherford GO." },

  // ── Traditional ───────────────────────────────────────────────
  { cat: 'Traditional & Jewish menswear', q: 'Do you make traditional Jewish garments?', a: "Yes — bekishe, kapota, kittel, Shabbos suits, bar-mitzvah and chosson tailoring, handled with the discretion the community expects. I've cut them in Vaughan and Thornhill for over twenty years, father to son." },
  { cat: 'Traditional & Jewish menswear', q: 'Are you open on Shabbos or Yom Tov?', a: "No. I'm closed all Shabbos, Yom Tov and chol hamoed, and Fridays I close two hours before sundown. Some things come before the work." },
  { cat: 'Traditional & Jewish menswear', q: 'How early should I order for a chosson or a Yom Tov?', a: "For a chosson, 4–6 months before the wedding so the kittel, the Shabbos suit and the bekishe are all ready and coordinated. For Yom Tov, order before the season — kittels close by the end of Elul." },

  // ── Care & long run ───────────────────────────────────────────
  { cat: 'Care & the long run', q: 'How do I care for my suit?', a: "Brush it, air it, and press it — don't dry-clean it often; the chemicals age the cloth. Rotate two suits rather than wearing one daily, hang it on a broad hanger, and bring it to me once a year for a proper press." },
  { cat: 'Care & the long run', q: "What if I gain or lose weight?", a: "Bring it back. Your pattern is on file, and most suits have cloth in the seams to let out or take in. A body that changes doesn't have to mean a suit you retire — that's the advantage of having a tailor." },
  { cat: 'Care & the long run', q: 'How long should a good suit last?', a: "Cared for and rotated, a canvassed bespoke suit lasts ten to twenty years — I have clients wearing suits I cut fifteen years ago. The pattern stays, so replacing or adding is always easy." },
  { cat: 'Care & the long run', q: 'Do you offer lifetime adjustments?', a: "Bring the suit back any time for a re-press, a button, a small letting-out or a refresh. The pattern remains in my notebook, so the suit ages with you, not against you." },

  // ── Trust ─────────────────────────────────────────────────────
  { cat: 'Trust', q: 'How long have you been tailoring?', a: "Over thirty years, and more than twenty of them from the studio in Vaughan. I still measure, cut and fit every garment myself — nothing is outsourced." },
  { cat: 'Trust', q: 'What if I don\'t like the finished suit?', a: "You won't get that far without seeing it — we fit and adjust in stages, so there are no surprises at the end. If something isn't right, we correct it. The whole method exists to avoid a suit you don't love." },
  { cat: 'Trust', q: 'Do people actually come back?', a: "Constantly — fathers who send their sons, grooms who return for their business wardrobe, clients on their fifth suit. My reviews average 4.8 stars, and most new clients arrive by word of mouth." },
];

// Helper: FAQPage JSON-LD from a list of {q,a}
export function faqSchema(list) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
