/**
 * Location data — used by /locations and /locations/[city].
 * One source of truth; expand as Sam takes on new neighbourhoods.
 *
 * Each city carries genuinely distinct copy (intro, neighbourhoods, local FAQs)
 * so the pages read as real local pages, not thin doorway duplicates.
 */
export const locations = [
  {
    slug: 'vaughan',
    city: 'Vaughan',
    headline: 'The home studio.',
    metaTitle: "Custom Suits in Vaughan — Sam's Menswear",
    h1: "Custom Suits in <em>Vaughan.</em>",
    metaDesc: "Custom suits and men's suits in Vaughan, hand-cut by master tailor Sam on the Vaughan–Thornhill line. Wedding suits, business suits and alterations — measured personally, by appointment.",
    blurb:
      "Sam has been cutting suits in Vaughan for more than thirty years. The studio on Charlton is where most clients start — a quiet room of wool, light and patience, one client at a time.",
    services: ['Custom Suits', 'Wedding Suits & Tuxedos', 'Groomsmen & Fathers', 'Alterations', 'Kapotas'],
    nearby: ['Thornhill', 'Concord', 'Maple', 'Woodbridge'],
    neighbourhoods: [
      'Concord', 'Maple', 'Woodbridge', 'Kleinburg', 'Patterson', 'Vellore',
      'Thornhill Woods', 'Sonoma Heights', 'Vaughan Mills', 'Carrville', 'Nashville',
    ],
    intro: [
      "Vaughan is home. For a custom suit in Vaughan, this is where it begins — Sam has cut suits here for more than thirty years, and the studio on Charlton Avenue is a quiet, unhurried room where one person is measured at a time and nobody is rushed toward a rack. No traffic, no downtown parking, no showroom pressure.",
      "It's a short drive from Maple, Concord, Woodbridge and Kleinburg, and Vaughan is a wedding town — Sam dresses grooms, groomsmen and both fathers for receptions at the Woodbridge and Vaughan banquet halls (Bellvue Manor, Chateau Le Jardin, The Universal and Paramount EventSpace, Eagles Nest). The whole party measured together, coordinated, and made to fit — never rented.",
      "There's a strong traditional community here too, through Thornhill Woods and Patterson, and Sam makes the fine dark suit, the kapota and the simcha garments to match. Where a store sells men's suits off a rack in Vaughan, Sam draws, cuts and fits each one by hand on his oldest principle: the suit is built around you.",
    ],
    faqs: [
      {
        q: 'Where is Sam’s Menswear in Vaughan?',
        a: 'The studio is at 318 Charlton Avenue, Vaughan, on the Vaughan–Thornhill line — an easy drive from Maple, Concord, Woodbridge and Kleinburg. Fittings are by appointment so you get the room to yourself.',
      },
      {
        q: 'Can Sam dress a Vaughan wedding party?',
        a: 'Yes — groom, groomsmen and both fathers, measured together and coordinated. Custom wedding suits and tuxedos for receptions at Bellvue Manor, Chateau Le Jardin, The Universal EventSpace and the other Vaughan and Woodbridge halls.',
      },
      {
        q: 'Do I need an appointment?',
        a: 'Yes — everything is one-on-one, so book ahead. It means no waiting and no sharing the room; the whole fitting is yours.',
      },
      {
        q: "Where can I get men's suits in Vaughan?",
        a: "Sam makes men's suits in Vaughan to measure rather than selling them off a rack — custom suits, wedding suits and tuxedos, traditional garments including kapotas, and expert alterations, all cut to you at the Charlton Avenue studio by appointment.",
      },
    ],
  },
  {
    slug: 'thornhill',
    city: 'Thornhill',
    headline: 'Five minutes from Centre Street.',
    blurb:
      "Most of Sam's Thornhill clients walk in for the traditional garments and stay for everything else — wedding parties, Shabbos suits, and the daily working wardrobe.",
    services: ['Traditional & Jewish Menswear', 'Wedding Suits & Tuxedos', 'Bar Mitzvah Suits', 'Custom Suits', 'Alterations'],
    nearby: ['Vaughan', 'Richmond Hill', 'North York'],
    neighbourhoods: [
      'Centre Street', 'Bathurst & Clark', 'Promenade', 'Uplands', 'German Mills',
      'Royal Orchard', 'Brooke-Bathurst', 'Thornlea', 'Grandview', 'Old Thornhill',
    ],
    intro: [
      "Thornhill clients often come to Sam first for the traditional garments — the fine dark suit for Shabbos, the bekishe, the kapota, the kittel — and stay for everything else. Sam has dressed the Thornhill community for years and understands what these garments are for, not just what they look like. That's rare, and it's why families send their sons and their fathers.",
      "The studio is barely five minutes from Centre Street and the Bathurst & Clark corridor, so a fitting fits into an ordinary afternoon. Bar mitzvah suits, Shabbos suits, the everyday working wardrobe — all with the same one-on-one attention, and all made kosher-quiet: dignified, correct, never flashy.",
      "Thornhill weddings and simchas keep Sam busy every season. He dresses the groom, the groomsmen and both fathers together so the family reads as one tailored line, and coordinates a whole party from the same cloth. Custom suits and tuxedos, made to fit — never a rental.",
    ],
    faqs: [
      {
        q: 'Does Sam make traditional and Jewish garments in Thornhill?',
        a: 'Yes — the fine dark suit, the bekishe, the kapota and kittel, and simcha garments, all cut to the tradition and to you. Sam has dressed the Thornhill community for years and knows what each garment is for.',
      },
      {
        q: 'Does Sam make bar mitzvah suits?',
        a: 'Yes — bar mitzvah suits for boys in Thornhill, cut to fit properly and made to look right in shul and at the celebration. Fathers are often measured at the same time.',
      },
      {
        q: 'How close is the studio to Thornhill?',
        a: 'About five minutes from Centre Street. The studio sits right on the Vaughan–Thornhill line at 318 Charlton Avenue — an easy trip from Bathurst & Clark or the Promenade.',
      },
      {
        q: 'Can Sam dress a whole Thornhill wedding party?',
        a: 'Yes — groom, groomsmen and both fathers, at the studio or at your home. Same cloth, coordinated details, the groom set gently apart. Custom wedding suits and tuxedos, never rented.',
      },
    ],
  },
  {
    slug: 'north-york',
    city: 'North York',
    headline: 'Tailoring without the traffic.',
    metaTitle: "Custom Suits in North York — Sam's Menswear",
    h1: "Custom Suits in <em>North York.</em>",
    metaDesc: "A custom suit in North York without the traffic — Sam brings the fitting to your Willowdale, Bayview Village or Don Mills office, or measures you at the Vaughan studio. Wedding, business and traditional suits, made to fit.",
    blurb:
      'For North York executives, Sam will come to your office. For everyone else, the studio is a short drive up Bathurst — worth it for the first suit that ever truly fit.',
    services: ['Custom Suits', 'Wedding Suits', 'Groomsmen & Fathers', 'Custom Tuxedos', 'Have Sam Over', 'Custom Shirts'],
    nearby: ['Thornhill', 'Vaughan', 'Toronto'],
    neighbourhoods: [
      'Willowdale', 'Bayview Village', 'York Mills', 'Don Mills', 'Lansing',
      'Newtonbrook', 'Bathurst Manor', 'Clanton Park', 'Hoggs Hollow', 'Ledbury Park',
      'North York Centre', 'Armour Heights', 'Cricket Club', 'Uptown Yonge',
    ],
    intro: [
      "North York runs on time nobody has to spare. So for professionals from Willowdale to Don Mills, Sam brings the fitting to the office — tape, cloth book and notebook — and turns an afternoon lost to traffic into an hour spent being measured properly. It's a short hop from North York Centre and the Yonge line up to the Vaughan studio when you'd rather come to him.",
      "There's a real Jewish community through Bathurst Manor, Clanton Park and Ledbury Park, and Sam has dressed it for years — Shabbos suits, bar mitzvah suits, and the fine dark suit that reads as kavod in shul. Bayview Village and York Mills lean executive; Hoggs Hollow and the Cricket Club lean formal. Sam cuts for all of it.",
      "North York weddings keep him busy every season — the groom, the groomsmen, and both fathers measured together so the family photographs read as one tailored line. Custom suits and tuxedos, made to fit, never rented.",
    ],
    faqs: [
      {
        q: 'Will Sam come to my North York office or home?',
        a: 'Yes — the traveling service brings the whole fitting to you anywhere in North York, from Willowdale and Bayview Village to Don Mills. An hour at your desk beats an afternoon in traffic, and there’s no house-call surcharge.',
      },
      {
        q: 'Does Sam make traditional and bar mitzvah suits for the North York community?',
        a: 'Yes — Sam has dressed the Bathurst Manor, Clanton Park and Ledbury Park community for years: Shabbos suits, bar mitzvah suits, and traditional garments, all cut to you.',
      },
      {
        q: 'Can Sam dress a North York wedding party?',
        a: 'Yes — groom, groomsmen and both fathers, measured together and coordinated. Custom wedding suits and tuxedos, at the studio or on a house call across North York.',
      },
      {
        q: 'How far is the studio from North York?',
        a: 'A short drive up Bathurst or Yonge from Willowdale, Bayview Village or York Mills to the Vaughan studio at 318 Charlton Avenue.',
      },
      {
        q: 'Does Sam make custom shirts and tuxedos too?',
        a: 'Yes — custom shirts and custom tuxedos alongside suits, so collar, cuff, body and lapel are cut to you rather than to a size chart.',
      },
    ],
  },
  {
    slug: 'toronto',
    city: 'Toronto',
    headline: 'The downtown house call.',
    metaTitle: "Custom & Tailored Suits in Toronto — Sam's Menswear",
    blurb:
      "Yes — Sam makes custom suits in Toronto without the downtown showroom. He comes to you by appointment — hotels, offices, condos — with bolts of cloth, the measuring tape and the notebook. The same hour you'd have spent in traffic, spent being measured properly.",
    services: ['Have Sam Over', 'Custom Suits', 'Wedding Suits & Tuxedos', 'Business Suits', 'Groomsmen & Fathers'],
    nearby: ['North York', 'Vaughan', 'Etobicoke'],
    neighbourhoods: [
      'Financial District', 'Yorkville', 'King West', 'Liberty Village', 'The Annex',
      'Rosedale', 'Forest Hill', 'Leaside', 'Yonge & Eglinton', 'Distillery District',
      'Cabbagetown', 'Summerhill', 'The Beaches', 'CityPlace', 'Harbourfront',
    ],
    intro: [
      "Downtown, the traveling tailor makes more sense than the commute north. Sam comes to you by appointment — the office tower on Bay or King, the Yorkville condo, the hotel — with bolts of cloth, the tape and the notebook, and takes the full fitting where you already are. For the Financial District and King West crowd who can't give up half a day for a showroom, that's the whole point.",
      "Toronto is a wedding city, and Sam works it every season. Grooms and groomsmen getting married at the King Edward, the Fairmont Royal York, Casa Loma, the Distillery District or Liberty Grand — measured together with both fathers so the party reads as one tailored line in every frame. Custom suits and tuxedos, made to fit, never a rental cut for the last man who wore it.",
      "From a business suit for a Bay Street partner to a black-tie tuxedo for a Rosedale wedding, the work is the same: drafted to your body, fitted in person, and yours to keep for years of events after.",
    ],
    faqs: [
      {
        q: 'Does Sam come to downtown Toronto?',
        a: 'Yes — by appointment, to offices, condos and hotels across downtown, from the Financial District to Yorkville and King West. He brings the cloth and the tape; you keep the hour you’d have spent driving north.',
      },
      {
        q: 'Can Sam dress a downtown Toronto wedding party?',
        a: 'Yes — groom, groomsmen and both fathers, measured in one visit at a venue, office or home and fully coordinated. Custom wedding suits and tuxedos for weddings at the King Edward, Fairmont Royal York, Casa Loma, the Distillery District and beyond.',
      },
      {
        q: 'Should I rent a tuxedo for a Toronto wedding?',
        a: 'A made tuxedo beats a rental where it counts: a rental is cut for the average of everyone who wore it, and satin and black show every bad line in the photos. Rent twice and you’ve paid for one you’d own. Sam makes tuxedos to your measurements.',
      },
      {
        q: 'Is the downtown house call extra?',
        a: 'No. The suit costs what the suit costs; the visit is part of the service. Wedding parties and groups usually have a small minimum of garments.',
      },
    ],
  },
  {
    slug: 'richmond-hill',
    city: 'Richmond Hill',
    headline: 'Up the road, by appointment.',
    blurb:
      'Richmond Hill clients usually come down to the studio — but Sam is happy to drive up for wedding parties and group fittings when a whole family needs measuring at once.',
    services: ['Custom Suits', 'Wedding Suits & Tuxedos', 'Groomsmen & Fathers', 'Alterations'],
    nearby: ['Thornhill', 'Vaughan', 'Markham'],
    neighbourhoods: [
      'Oak Ridges', 'Bayview Hill', 'Mill Pond', 'Jefferson', 'Observatory',
      'Doncrest', 'Westbrook', 'Rouge Woods', 'Crosby', 'North Richvale',
    ],
    intro: [
      "Richmond Hill is a short run down Yonge or Bathurst to the studio, and most clients make the trip — it's worth it for the room to yourself and the unhurried fitting. Custom suits, wedding suits and tuxedos, and precise alterations, one client at a time.",
      "Richmond Hill weddings often gather the whole family at once, and that's Sam's favourite way to work: groom, groomsmen and both fathers measured together so the party is coordinated and the family photos read as one line. He'll drive up for group fittings — for receptions at The Manor, Eagles Nest, Bayview Golf or the Sunset Villa — or measure everyone at the studio, whichever keeps the party together.",
      "There's a real traditional community through Bayview Hill and Doncrest too, and Sam makes the fine dark suit, bar mitzvah suits and simcha garments to match — all made to fit, never rented.",
    ],
    faqs: [
      {
        q: 'Do Richmond Hill clients come to the studio?',
        a: 'Usually, yes — it’s a short drive down Yonge or Bathurst to 318 Charlton Avenue and the fitting is yours alone. For group and wedding fittings, Sam will come up to you.',
      },
      {
        q: 'Can Sam dress a Richmond Hill wedding party?',
        a: 'Yes — groom, groomsmen and both fathers, measured together and coordinated. Custom wedding suits and tuxedos for receptions at The Manor, Eagles Nest, Bayview Golf and beyond.',
      },
      {
        q: 'Can Sam measure a whole family at once?',
        a: 'Yes — for weddings, bar mitzvahs and simchas Sam measures the group in one session, at the studio or at your home in Richmond Hill.',
      },
      {
        q: 'Does Sam do alterations, not just new suits?',
        a: 'Yes — expert alterations on suits and jackets, whether Sam made them or not.',
      },
    ],
  },
  {
    slug: 'markham',
    city: 'Markham',
    headline: 'Markham, Unionville, Cathedraltown.',
    blurb:
      'Sam takes on a steady stream of Markham wedding parties each season. Group fittings can happen at the studio or at your venue, whichever keeps the party together.',
    services: ['Wedding Suits & Tuxedos', 'Groomsmen & Fathers', 'Custom Suits', 'Custom Tuxedos'],
    nearby: ['Richmond Hill', 'Thornhill', 'Scarborough'],
    neighbourhoods: [
      'Unionville', 'Cathedraltown', 'Markham Village', 'Cornell', 'Berczy',
      'Angus Glen', 'Wismer', 'Greensborough', 'Milliken Mills', 'Thornlea',
    ],
    intro: [
      "Markham keeps Sam busy every wedding season. The groom, the groomsmen and both fathers get dressed together — coordinated on colour, the groom set gently apart — so the whole party looks like it belongs in the same photographs. Custom wedding suits and tuxedos for receptions at Le Parc, Angus Glen Golf Club and the Markham-area venues, made to fit and never rented.",
      "Group fittings run wherever keeps everyone together: the Vaughan studio, or a home or venue in Unionville, Cathedraltown or Markham Village. Sam will measure a whole party in one visit — the easiest way to keep out-of-town groomsmen and busy fathers coordinated.",
      "Beyond weddings, the same care goes into custom suits and tuxedos for anyone in Markham who wants one that actually fits — drafted to your body, fitted in person, and yours to keep for every event after.",
    ],
    faqs: [
      {
        q: 'Does Sam do Markham wedding parties?',
        a: 'Yes — a steady stream every season. Group fittings happen at the studio or at your venue in Unionville, Cathedraltown or Markham Village, and Sam coordinates the groom, groomsmen and both fathers as one line.',
      },
      {
        q: 'Does Sam make custom tuxedos for Markham weddings?',
        a: 'Yes — midnight and black tuxedos with satin lapels, made to your measurements. For a Markham reception at Le Parc or Angus Glen, a made tuxedo beats a rental where it counts: the fit, and the photos you keep.',
      },
      {
        q: 'How early should a Markham wedding party start?',
        a: 'Four to six months out. A custom suit or tuxedo needs about six to eight weeks; the rest is buffer for a busy, scattered party.',
      },
      {
        q: 'Custom or rental for the groom?',
        a: 'For the groom, custom almost always wins — it fits only you, photographs better, and you keep it. Rentals make sense mainly for a one-night tuxedo you’ll never wear again.',
      },
    ],
  },
  {
    slug: 'bathurst-lawrence',
    city: 'Bathurst & Lawrence',
    headline: 'The heart of the community.',
    metaTitle: "Jewish Tailor at Bathurst & Lawrence — Shabbos & Custom Suits | Sam's Menswear",
    h1: "A tailor for <em>Bathurst &amp; Lawrence.</em>",
    metaDesc: "Traditional and custom Jewish menswear for the Bathurst–Lawrence and Lawrence Manor community — Shabbos suits, bekishe, kapota, kittel, bar mitzvah and chosson tailoring, plus custom and wedding suits. Measured personally by Sam, never on Shabbos.",
    blurb:
      "The Bathurst–Lawrence and Lawrence Manor community is where Sam's traditional work lives — Shabbos suits, simcha garments, and the fine dark suit that reads as kavod in shul.",
    services: ['Traditional & Jewish Menswear', 'Shabbos Suits', 'Bar Mitzvah Suits', 'Chosson Tailoring', 'Custom Suits', 'Alterations'],
    nearby: ['North York', 'Thornhill', 'Forest Hill'],
    neighbourhoods: [
      'Lawrence Manor', 'Lawrence Plaza', 'Ledbury Park', 'Glen Park', 'Englemount',
      'Bathurst Manor', 'Wilson Heights', 'Cedarvale', 'Forest Hill North', 'Armour Heights',
    ],
    intro: [
      "Along Bathurst from Lawrence to Wilson is one of the oldest, closest Jewish communities in Toronto — and it's where most of Sam's traditional work begins. He has dressed Lawrence Manor and Lawrence Plaza families for years: the fine dark suit for Shabbos, the bekishe and kapota, the kittel, and the bar mitzvah suit a boy grows into. Sam knows what these garments are for, not only what they look like, and that is why fathers send their sons.",
      "It's a short run up Bathurst to the studio, or Sam brings the fitting to your home — whichever keeps the family together and the schedule easy. Everything is one-on-one, dignified and discreet, and never fitted on Shabbos or Yom Tov. Chosson wardrobes are drawn together and finished in the days before the wedding; a whole party can be measured in a single visit.",
      "Beyond the traditional garments, the same hand cuts custom suits, wedding suits and tuxedos for the community — drafted to your body, kept on a pattern, and made to fit rather than sold off a rack.",
    ],
    faqs: [
      { q: 'Is there a Jewish tailor at Bathurst & Lawrence?', a: "Yes — Sam makes traditional Jewish menswear for the Bathurst–Lawrence and Lawrence Manor community: Shabbos suits, bekishe, kapota, kittel, bar mitzvah and chosson tailoring, all cut by hand and to the tradition. A short drive up Bathurst to the studio, or he comes to you." },
      { q: 'How much is a custom Shabbos suit, bekishe or kapota?', a: "It depends on the cloth and the garment — Sam gives an honest quote at the consultation, with no showroom markup and no pressure. The first conversation costs nothing." },
      { q: 'Does Sam make bar mitzvah suits for the community?', a: "Yes — bar mitzvah suits cut with room to let out over the next two years, with the pattern kept for the next suit. Fathers are often measured at the same visit." },
      { q: 'Are you closed on Shabbos and Yom Tov?', a: "Always. Fittings are by appointment, one family at a time, and never on Shabbos or Yom Tov." },
    ],
  },
  {
    slug: 'financial-district',
    city: 'the Financial District',
    headline: 'The tailor comes to the tower.',
    metaTitle: "Business Suits for Bay Street & the Financial District — Sam's Menswear",
    h1: "Business suits for <em>Bay Street.</em>",
    metaDesc: "Custom business suits for Bay Street and Toronto's Financial District — Sam brings the fitting to your tower or the boardroom. Navy, charcoal and glen check, drafted to your body and kept on a pattern. No showroom, no rack, no half-day lost.",
    blurb:
      "For the Bay Street crowd who can't lose half a day to a showroom, Sam brings the cloth and the tape to your tower — the full fitting, taken where you already are.",
    services: ['Business Suits', 'Have Sam Over', 'Custom Suits', 'Custom Shirts', 'Travel Suits'],
    nearby: ['Yorkville', 'King West', 'North York'],
    neighbourhoods: [
      'Bay Street', 'King & Bay', 'First Canadian Place', 'Commerce Court', 'Brookfield Place',
      'The PATH', 'Wellington', 'Union', 'St. Lawrence', 'The Well',
    ],
    intro: [
      "In the Financial District the traveling tailor beats the commute every time. Sam comes to you by appointment — the office tower on Bay or King, a boardroom, a condo nearby — with bolts of cloth, the tape and the notebook, and takes the full fitting where you already are. The hour you'd have spent driving to a showroom is spent being measured properly instead.",
      "The work is a partner's wardrobe: navy and charcoal that carry a room, glen check with a little more to say, and a travelling suit cut to survive a red-eye and a morning meeting. Soft enough to sit and work in, structured enough to command the table. Custom shirts to match — your collar, your cuff, your fit — so nothing gapes when the jacket comes off.",
      "Twenty-six measurements are taken by hand and kept on a personal pattern, so your next suit or shirt is already halfway made — order the reorder by phone and it arrives cut to you. One tailor, one client, no sales floor.",
    ],
    faqs: [
      { q: 'Will Sam come to my Bay Street office?', a: "Yes — the traveling service brings the whole fitting to your tower, boardroom or nearby condo across the Financial District, by appointment. There's no house-call surcharge; the suit costs what the suit costs." },
      { q: 'How long does a custom business suit take?', a: "About six to eight weeks from the first fitting, across two or three visits. Once your pattern is on file, reorders are faster." },
      { q: 'Do you make custom shirts for the office too?', a: "Yes — custom dress shirts cut from the pattern of your own shoulders, in two-ply cotton, with your collar, cuff and monogram. They stop the gape and bunching an off-the-rack shirt gives under a jacket." },
      { q: 'Can I reorder without coming in again?', a: "Yes — your measurements and pattern are kept in the notebook, so a second navy suit or a run of shirts can be ordered by phone and cut to you." },
    ],
  },
  {
    slug: 'yorkville',
    city: 'Yorkville',
    headline: 'Pay for the tailor, not the showroom.',
    metaTitle: "Bespoke Suits in Yorkville — the Tailor, Not the Showroom | Sam's Menswear",
    h1: "Bespoke suits, <em>Yorkville.</em>",
    metaDesc: "Bespoke and made-to-measure suits for Yorkville and Bloor West — the craft of a proper tailor without the Mink Mile markup. Sam drafts, cuts and fits every garment by hand, or comes to your condo. Custom, wedding and black-tie tailoring.",
    blurb:
      "In Yorkville you can pay for a showroom or pay for a tailor. With Sam, every dollar goes into the cloth and the hand that cuts it — not the address.",
    services: ['Bespoke Suits', 'Made-to-Measure', 'Custom Tuxedos', 'Have Sam Over', 'Custom Shirts'],
    nearby: ['Financial District', 'Rosedale', 'Forest Hill'],
    neighbourhoods: [
      'Bloor-Yorkville', 'The Mink Mile', 'Rosedale', 'The Annex', 'Summerhill',
      'Forest Hill', 'Deer Park', 'Ramsden Park', 'Hazelton', 'Yonge & Bloor',
    ],
    intro: [
      "Yorkville is where a suit gets expensive for reasons that have nothing to do with the suit — the address, the fit-out, the sales floor. Sam's proposition is the opposite: the whole cost goes into the cloth and the hand that cuts it. Every garment is drawn, canvassed and fitted personally, one client at a time, on the plain principle that a suit should be built around the man, not the showroom.",
      "This is real bespoke and made-to-measure depth — a full-canvas jacket that moulds to you over years, twenty-six measurements kept on a personal pattern, a wall of cloth from the good English and Italian mills. For a Bloor-Yorkville or Rosedale client that means a wardrobe with genuine craft behind it, and a tailor who answers the phone himself.",
      "For galas and black-tie seasons, Sam cuts tuxedos to your measurements — midnight or black, satin peak or shawl — that photograph clean where a rental never will. He'll come to the condo for the fitting, or you come to the studio; either way the room is yours.",
    ],
    faqs: [
      { q: 'How is Sam different from the Yorkville tailors?', a: "Same craft, without the showroom in the price. Sam draws, cuts and fits every garment by hand himself — no sales floor, no upsell — so what you pay goes into the cloth and the making, not the address." },
      { q: 'Do you offer true bespoke, or made-to-measure?', a: "Both — made-to-measure adjusted from a base pattern, and full bespoke drafted from nothing to your body, posture and stance. Sam will tell you honestly which your wardrobe actually needs." },
      { q: 'Will Sam come to my Yorkville condo?', a: "Yes — by appointment, with cloth and tape, for the fitting and later try-ons. Or come to the studio; either way it's one client in the room at a time." },
      { q: 'Do you make black-tie tuxedos?', a: "Yes — custom tuxedos in midnight or black with satin lapels, cut to your measurements for galas and weddings. A made tuxedo reads clean in photographs where a rental shows every borrowed line." },
    ],
  },
  {
    slug: 'etobicoke',
    city: 'Etobicoke',
    headline: 'West-end tailoring, on your schedule.',
    metaTitle: "Custom Suits in Etobicoke — House Calls Across the West End | Sam's Menswear",
    h1: "Custom Suits in <em>Etobicoke.</em>",
    metaDesc: "Custom and wedding suits in Etobicoke without the cross-city drive — Sam brings the fitting to your home or office from The Kingsway to Mimico, or measures you at the Vaughan studio. Groom, groomsmen and fathers, made to fit and never rented.",
    blurb:
      "Etobicoke clients skip the drive north — Sam brings the fitting to you, from The Kingsway to Mimico, or measures you at the studio when you'd rather come up.",
    services: ['Custom Suits', 'Wedding Suits & Tuxedos', 'Groomsmen & Fathers', 'Have Sam Over', 'Alterations'],
    nearby: ['Toronto', 'Vaughan', 'Mississauga'],
    neighbourhoods: [
      'The Kingsway', 'Mimico', 'Islington', 'Humber Bay', 'Sunnylea',
      'Markland Wood', 'Princess Gardens', 'Alderwood', 'New Toronto', 'Royal York',
    ],
    intro: [
      "The west end is far enough from most tailoring that the drive alone talks people out of a proper suit. So for Etobicoke — from The Kingsway to Mimico and Humber Bay — Sam brings the fitting to you: the tape, the cloth book and the notebook, at your home or office, on an afternoon you'd otherwise lose to the Gardiner. When you'd rather come up, the Vaughan studio is a straight run and the room is yours.",
      "Etobicoke weddings keep him busy every season — grooms and groomsmen getting married at the Old Mill, the west-end golf clubs and the waterfront halls, measured together with both fathers so the whole party reads as one tailored line in the photographs. Custom suits and tuxedos, made to fit, never a rental cut for the last man who wore it.",
      "The same hand does the working wardrobe too: the first serious navy suit, the daily charcoal, the sport coat and trousers for the weekend — drafted to your body, fitted in person, and yours to keep for years of events after.",
    ],
    faqs: [
      { q: 'Will Sam come to my home or office in Etobicoke?', a: "Yes — the traveling service brings the whole fitting to you anywhere in Etobicoke, from The Kingsway and Islington to Mimico and Humber Bay. There's no house-call surcharge." },
      { q: 'Can Sam dress an Etobicoke wedding party?', a: "Yes — groom, groomsmen and both fathers, measured together and coordinated. Custom wedding suits and tuxedos for weddings at the Old Mill and the west-end venues, at your home or the studio." },
      { q: 'How far is the studio from Etobicoke?', a: "A straight run up to the Vaughan studio at 318 Charlton Avenue — or skip the drive and have Sam come to you." },
      { q: 'Do you do alterations in the west end?', a: "Yes — expert alterations on suits and jackets, whether Sam made them or not." },
    ],
  },
];

export const getLocation = (slug) => locations.find((l) => l.slug === slug);
