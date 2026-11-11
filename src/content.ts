/**
 * All the words on the site live here, so you can update the copy, contact
 * details, castles and FAQ answers without touching any layout code.
 * Photo names (e.g. 'castle-courtyard') come from scripts/optimize-images.mjs.
 */

export const brand = {
  name: 'Jumping Castles Midrand',
  short: 'JC Midrand',
  tagline: 'Kiddies fun bouncy castles for hire',
  phone: '066 200 6822',
  phoneIntl: '+27662006822',
  whatsapp: '27662006822',
  email: 'segrananthony@gmail.com',
  facebook: 'https://www.facebook.com/PurpleHeavenJumpingCastles/',
  base: 'Midrand, Gauteng, 1685',
};

export type PageId = 'home' | 'castles' | 'extras' | 'gallery' | 'areas' | 'contact';

export const nav: {id: PageId; label: string; href: string}[] = [
  {id: 'home', label: 'Home', href: '/'},
  {id: 'castles', label: 'Our Castles', href: '/castles/'},
  {id: 'extras', label: 'Party Extras', href: '/extras/'},
  {id: 'gallery', label: 'Gallery', href: '/gallery/'},
  {id: 'areas', label: 'Areas & FAQ', href: '/areas/'},
  {id: 'contact', label: 'Book & Contact', href: '/contact/'},
];

/** Headline lines; `i` lines are set in italic and coloured. */
export type Line = {t: string; i?: boolean};

export const hero = {
  lines: [{t: 'Bounce into'}, {t: 'the party!', i: true}, {t: 'Delivered across'}, {t: 'Midrand', i: true}] as Line[],
  body: 'Kiddies jumping castles, slide-and-splash combos and party tables for hire. We deliver to your door, so you can get on with the party.',
  photos: ['combo-foam-slide', 'castle-courtyard', 'combo-party'],
  cta: ['Book on', 'WhatsApp'],
};

/** The three panels that slide in on the home page. */
export const highlights = [
  {id: 'classic', name: ['The Classic', 'Castle'], photo: 'castle-kids', tint: '#d81f2a', href: '/castles/#classic', specs: [['Great for', 'Birthdays & school days'], ['Set-up', 'Indoors or outdoors']]},
  {id: 'splash', name: ['Palm Tree', 'Slide & Splash'], photo: 'combo-garden', tint: '#1e4fd8', href: '/castles/#splash', specs: [['Great for', 'Summer & foam parties'], ['Includes', 'Bouncer, slide & pool']]},
  {id: 'extras', name: ['Party', 'Extras'], photo: 'garden-tables', tint: '#6b2fa0', href: '/extras/', specs: [['Hire', 'Kiddies & party tables'], ['Plus', 'Chairs to match']]},
] as const;

export const steps = [
  {n: '01', title: 'WhatsApp your date', body: 'Tell us the date, your area and what you would like. We will confirm availability and send a quote.'},
  {n: '02', title: 'We deliver', body: 'We bring the castle to your home, school, church or venue and get it pumped up and ready to go.'},
  {n: '03', title: 'Let them bounce', body: 'The kids have the time of their lives. When the party is over, we pack up and take it away.'},
];

export type Castle = {
  id: string;
  name: string;
  kicker: string;
  tint: string;
  photos: string[];
  body: string[];
  perfectFor: string[];
  goodToKnow: string[];
};

export const castles: Castle[] = [
  {
    id: 'classic',
    name: 'The Classic Castle',
    kicker: 'Our original bouncer',
    tint: '#d81f2a',
    photos: ['castle-courtyard', 'castle-kids', 'castle-school', 'castle-indoor'],
    body: [
      'Red roofs, sunshine-yellow towers and a big splash-blue bounce floor. This is the castle every child draws when they think of a party.',
      'It works just as well on a garden lawn as it does in a school courtyard, church car park or office hall.',
    ],
    perfectFor: ['Birthday parties', 'School fun days', 'Church & community events', 'Office & indoor parties'],
    goodToKnow: [
      'Can be set up on grass, paving or indoors',
      'Needs a plug point nearby for the blower',
      'An adult should keep an eye on the jumpers at all times',
    ],
  },
  {
    id: 'splash',
    name: 'Palm Tree Slide & Splash',
    kicker: 'Bounce, slide, splash',
    tint: '#1e4fd8',
    photos: ['combo-garden', 'combo-foam-slide', 'combo-pool-party', 'combo-ballpit'],
    body: [
      'A bounce area under a palm tree, a slide, and a pool at the bottom to land in. Three rides in one.',
      'On hot days, fill the pool with water and foam for a splash party. On cooler days, fill it with ball-pit balls for dry fun.',
    ],
    perfectFor: ['Summer birthdays', 'Foam parties', 'Pool days', 'Toddlers to tweens'],
    goodToKnow: [
      'Splash mode needs a garden hose and a level lawn',
      'Needs a plug point nearby for the blower',
      'Pack towels and swimsuits for foam parties',
    ],
  },
];

export type Extra = {id: string; name: string; photo: string; body: string; tint: string};

export const extras: Extra[] = [
  {
    id: 'kiddies-tables',
    name: 'Kiddies tables & chairs',
    photo: 'kiddies-tables',
    tint: '#ffc72c',
    body: 'Bright plastic tables with matching chairs, sized just right for little ones. Perfect for cake time, colouring and party snacks.',
  },
  {
    id: 'party-tables',
    name: 'Party tables & chairs',
    photo: 'garden-tables',
    tint: '#2aa84a',
    body: 'Round tables with white chairs for the grown-ups, so everyone has a seat while the kids bounce.',
  },
  {
    id: 'foam',
    name: 'Foam fun',
    photo: 'combo-foam-kids',
    tint: '#1fb3dc',
    body: 'Turn the Slide & Splash into a foam party. Mountains of bubbles, guaranteed giggles and a very clean set of kids.',
  },
];

export type Shot = {photo: string; alt: string; tag: 'classic' | 'splash' | 'extras'};

export const gallery: Shot[] = [
  {photo: 'combo-party', alt: 'Palm Tree Slide & Splash set up at a garden party with a pink and blue balloon arch', tag: 'splash'},
  {photo: 'castle-courtyard', alt: 'Classic Castle with red roofs and yellow towers in a sunny courtyard', tag: 'classic'},
  {photo: 'combo-foam-slide', alt: 'Foam pouring down the slide into the splash pool', tag: 'splash'},
  {photo: 'combo-pool-party', alt: 'Kids sliding into a foam-filled pool beside a swimming pool', tag: 'splash'},
  {photo: 'kiddies-tables', alt: 'A stack of colourful kiddies plastic tables', tag: 'extras'},
  {photo: 'castle-school', alt: 'Classic Castle on artificial grass outside a school', tag: 'classic'},
  {photo: 'combo-garden', alt: 'A girl climbing into the Palm Tree Slide & Splash on a green lawn', tag: 'splash'},
  {photo: 'castle-kids', alt: 'Children bouncing in the Classic Castle outside an office park', tag: 'classic'},
  {photo: 'combo-foam-kids', alt: 'Two toddlers in pink swimsuits playing in foam', tag: 'splash'},
  {photo: 'garden-tables', alt: 'White party tables and chairs set out on a lawn', tag: 'extras'},
  {photo: 'castle-indoor', alt: 'Classic Castle set up indoors with balloons on the floor', tag: 'classic'},
  {photo: 'combo-ballpit', alt: 'Slide & Splash with a bag of ball-pit balls in the pool', tag: 'splash'},
  {photo: 'castles-lineup', alt: 'Several jumping castles set up together for a big event', tag: 'classic'},
  {photo: 'combo-pool-wide', alt: 'Kids playing in the splash pool next to a swimming pool', tag: 'splash'},
  {photo: 'castle-garden', alt: 'Classic Castle in a leafy garden', tag: 'classic'},
  {photo: 'combo-slider', alt: 'A toddler sliding down the blue slide', tag: 'splash'},
  {photo: 'kiddies-set', alt: 'Kiddies table and chairs with party presents and cake', tag: 'extras'},
  {photo: 'castle-paving', alt: 'Classic Castle set up on paving', tag: 'classic'},
  {photo: 'combo-foam', alt: 'Splash pool filled with foam at the bottom of the slide', tag: 'splash'},
  {photo: 'combo-lawn', alt: 'Slide & Splash combo on a garden lawn', tag: 'splash'},
  {photo: 'combo-street', alt: 'Kids playing on the Slide & Splash in a front garden', tag: 'splash'},
  {photo: 'combo-slider-2', alt: 'A little boy sliding on his tummy down the slide', tag: 'splash'},
  {photo: 'castle-lawn', alt: 'Classic Castle on a lawn under a big sky', tag: 'classic'},
  {photo: 'combo-slide-view', alt: 'Looking down the slide of the Slide & Splash combo', tag: 'splash'},
];

export const areas = [
  {name: 'Midrand', note: 'Home base'},
  {name: 'Centurion'},
  {name: 'Kempton Park'},
  {name: 'Randburg'},
  {name: 'Johannesburg East', note: 'Eastern suburbs'},
  {name: 'Johannesburg West', note: 'Western suburbs'},
];

export const faq: {q: string; a: string}[] = [
  {q: 'Which areas do you deliver to?', a: 'We are based in Midrand and deliver to Centurion, Kempton Park, Randburg and Johannesburg’s eastern and western suburbs. Not on the list? Send us a WhatsApp. We may still be able to help.'},
  {q: 'How much does it cost?', a: 'It depends on what you hire, your date and how far we travel. Send us a WhatsApp with your date and area and we will send a quote.'},
  {q: 'How far ahead should I book?', a: 'As early as you can. Weekends, especially in summer and over school holidays, get booked up fast. WhatsApp us your date to check if it is free.'},
  {q: 'What do I need at the venue?', a: 'A flat, open space (lawn, paving or an indoor hall) and a plug point within reach for the blower that keeps the castle inflated. For splash mode you will also need a garden hose.'},
  {q: 'Can the castle go indoors?', a: 'Yes. The Classic Castle has been set up in offices and halls. Let us know your ceiling height and floor space and we will check that it fits.'},
  {q: 'What if it rains or is very windy?', a: 'Jumping castles are not safe to use in rain, lightning or strong wind. If the weather turns, chat to us and we will work something out.'},
  {q: 'Do the kids need to be supervised?', a: 'Yes. An adult should watch the castle the whole time it is in use. Shoes off, no sharp objects, and keep big kids and little kids bouncing separately.'},
];

export const footerNote = 'Kiddies fun bouncy castles for hire. Delivery and reservations across Midrand and surrounds.';
