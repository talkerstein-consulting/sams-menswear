/**
 * Location data — used by /locations and /locations/[city].
 * One source of truth; expand as Sam takes on new neighbourhoods.
 */
export const locations = [
  {
    slug: 'vaughan',
    city: 'Vaughan',
    headline: 'The home atelier.',
    blurb:
      "Sam has been cutting suits in Vaughan for over two decades. The atelier on Charlton is where most clients start — a quiet room of wool, light and patience, one client at a time.",
    services: ['Custom Suits', 'Wedding Parties', 'Tuxedos', 'Alterations', 'Kapotas'],
    nearby: ['Thornhill', 'Concord', 'Maple', 'Woodbridge'],
  },
  {
    slug: 'thornhill',
    city: 'Thornhill',
    headline: 'Five minutes from Centre Street.',
    blurb:
      "Most of Sam's Thornhill clients walk in for the traditional garments and stay for everything else — wedding parties, Shabbos suits, and the daily working wardrobe.",
    services: ['Traditional Menswear', 'Wedding Parties', 'Custom Suits', 'Alterations'],
    nearby: ['Vaughan', 'Richmond Hill', 'North York'],
  },
  {
    slug: 'north-york',
    city: 'North York',
    headline: 'Tailoring without the traffic.',
    blurb:
      'For North York executives, Sam will come to your office. For everyone else, the atelier is a twenty-minute drive up Bathurst — worth it for the first suit that ever truly fit.',
    services: ['Custom Suits', 'Have Sam Over', 'Wedding Parties', 'Custom Shirts'],
    nearby: ['Thornhill', 'Vaughan', 'Toronto'],
  },
  {
    slug: 'toronto',
    city: 'Toronto',
    headline: 'The downtown house call.',
    blurb:
      'Sam comes downtown by appointment — hotels, offices, condos. Bolts of cloth, the measuring tape, the notebook. The same hour you would have spent in traffic, spent being measured properly.',
    services: ['Have Sam Over', 'Custom Suits', 'Business Suits', 'Wedding Parties'],
    nearby: ['North York', 'Vaughan', 'Etobicoke'],
  },
  {
    slug: 'richmond-hill',
    city: 'Richmond Hill',
    headline: 'Up the road, by appointment.',
    blurb:
      'Richmond Hill clients usually come down to the atelier — but Sam is happy to drive up for wedding parties and group fittings when a whole family needs measuring at once.',
    services: ['Custom Suits', 'Wedding Parties', 'Alterations'],
    nearby: ['Thornhill', 'Vaughan', 'Markham'],
  },
  {
    slug: 'markham',
    city: 'Markham',
    headline: 'Markham, Unionville, Cathedraltown.',
    blurb:
      'Sam takes on a steady stream of Markham wedding parties each season. Group fittings can happen at the atelier or at your venue, whichever keeps the party together.',
    services: ['Wedding Parties', 'Custom Suits', 'Tuxedos'],
    nearby: ['Richmond Hill', 'Thornhill', 'Scarborough'],
  },
];

export const getLocation = (slug) => locations.find((l) => l.slug === slug);
