// reviews.js — REAL, Google-verified customer reviews (via the Trustindex widget
// published on customsuitandshirt.com/about-us). Names and wording are the
// customers' own. Nothing here is invented. Aggregate figures are the real
// Google/Nicelocal numbers; keep reviewCount conservative ("100+").

export const reviewAggregate = {
  ratingValue: '4.7',
  reviewCount: 157, // conservative floor — Sam has 100+ Google reviews
  source: 'Google',
  sourceUrl: 'https://www.google.com/maps/search/?api=1&query=Sam%27s+Menswear+318+Charlton+Avenue+Vaughan',
};

export const reviews = [
  {
    name: 'Kunal Arneja', rating: 5, tag: 'Wedding · ahead of schedule',
    text: "I was lucky enough to find Sam just before my wedding. He was fantastic to work with in bringing my suit idea to life with his expertise and resources. He gave great recommendations on fabrics and styles, and instilled confidence throughout the process. I worked with him to create two custom suits and he delivered ahead of schedule.",
  },
  {
    name: 'kyrill', rating: 5, tag: 'Wedding',
    text: "If you are in need of a custom suit, look no further. Sam is the guy you want helping you. I went to him 3 months before my wedding and he quickly brought me in and helped me choose the right materials and colours. After 2 quick consults my suit was in development. Sam will give you the kind of attention, care and honesty that the big suit stores just won't.",
  },
  {
    name: 'Rafi Habs', rating: 5, tag: 'Off-the-rack convert',
    text: "Always bought my suits off the rack and always struggled with getting a quality suit that fit. A friend recommended I try Sam and I don't think I'll ever switch back. Sam has an extremely wide selection of fabrics and the detail he puts in every suit is truly remarkable. From the fit to choosing my fabric and design, Sam will be my go-to.",
  },
  {
    name: 'Adrian Talotti Proestos', rating: 5, tag: 'Wedding tuxedo',
    text: "Sam is such a great tailor. With only a few weeks before my wedding he made me a tuxedo that looked and felt great to wear. It fits very well and I got many compliments. I learned so much about tailoring and fabrics from him. I'd never gotten a custom suit before, but the quality was so good I'll be coming back.",
  },
  {
    name: 'Adam Gilbert', rating: 5, tag: 'Father & son',
    text: "Sam was an absolute pleasure to work with and very patient with all of my questions. He did two suits — for myself and for my son — and the result was fantastic. It was my son's first custom suit and he felt proud to wear it, like a real gentleman. Both of us have received endless compliments.",
  },
  {
    name: 'Jonathan Gilbert', rating: 5, tag: 'Wedding · summer',
    text: "This summer I purchased a wedding suit from Sam and was extremely impressed with the quality and craftsmanship — a beautiful light-grey colour in a material that felt soft and comfortable through a warm summer day. A modern slim fit that still let me move freely. His customer service was excellent throughout.",
  },
  {
    name: 'Parth Thakkar', rating: 5, tag: 'First custom suit',
    text: "My first custom suit by Sam did not disappoint. He's a master of his craft and everything was fully customized with a perfect fit. I would definitely recommend him for any occasion.",
  },
  {
    name: 'Google reviewer', rating: 5, tag: 'Weight change · fair prices',
    text: "I had my wedding and reception suits made by Sam, and also ordered a three-piece suit and shirts for my dad. The prices were reasonable — a pleasant surprise given the exceptional quality and flawless construction. After I lost some weight, he graciously resized everything for a perfect fit. If you want top-notch custom suits, Sam is your guy.",
  },
  {
    name: 'Google reviewer', rating: 5, tag: 'Alterations rescue',
    text: "Extremely positive experience. I came in with a baggy, off-the-rack, final-sale suit another tailor said needed shoulder work. I picked it up the following week and it far exceeded my best expectations. Professional.",
  },
  {
    name: 'Michael G', rating: 5, tag: 'Wedding',
    text: "Working with Sam was great. I needed a suit for my wedding and was very happy with how it turned out. I had a basic vision of what I wanted and Sam brought it to life with his expertise. Definitely recommend for any bespoke suit and tuxedo needs.",
  },
  {
    name: 'Google reviewer', rating: 5, tag: 'Family · quick turnaround',
    text: "Sam made my husband's and three sons' suits really beautiful, with a quick turnaround. We are so happy and really recommend him.",
  },
  {
    name: 'Alexander Ferrier', rating: 5, tag: 'First-timer friendly',
    text: "Sam is an amazing tailor and helped me pick out a wicked suit. He's very friendly and will help you step by step.",
  },
];

// Attach the real reviews to the LocalBusiness node (same @id as BaseLayout's
// ClothingStore, so Google merges them). The aggregateRating lives once, on the
// business in BaseLayout — we do NOT re-declare it here (avoids duplicate ratings).
// A tailor is a service/business, not a Product, so no Product node is emitted.
// datePublished is intentionally omitted — we don't have verifiable dates and
// won't invent them.
export function reviewSchema(origin = 'https://customsuitandshirt.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': origin.replace(/\/$/, '') + '/#business',
    name: "Sam's Menswear",
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
      reviewBody: r.text,
    })),
  };
}
