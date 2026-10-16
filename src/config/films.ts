export interface Film {
  id: string;
  slug: string;
  reelNumber: string;
  title: string;
  titleLineA: string; // roman caps
  titleLineB: string; // italic, gold
  meta: string;
  accent: string; // hex
  accentName: string;
  editorialLine: string;
  poster: string;
  backdrop: string;
  director: string;
  year: number;
  runtime: string;
  fitMultiplier: number; // multiplier to achieve 78-90vw span
}

export const FILMS: Film[] = [
  {
    id: '01',
    slug: 'interstellar',
    reelNumber: '01',
    title: 'Interstellar',
    titleLineA: 'INTER',
    titleLineB: 'stellar',
    meta: '2014 · Christopher Nolan · 169 min',
    accent: '#9BCBDD',
    accentName: 'Ice',
    editorialLine: '“A father, a wormhole, a promise measured in years.”',
    poster: '/films/interstellar/poster.webp',
    backdrop: '/films/interstellar/backdrop.webp',
    director: 'Christopher Nolan',
    year: 2014,
    runtime: '169 min',
    fitMultiplier: 0.84,
  },
  {
    id: '02',
    slug: 'the-dark-knight',
    reelNumber: '02',
    title: 'The Dark Knight',
    titleLineA: 'THE DARK',
    titleLineB: 'knight',
    meta: '2008 · Christopher Nolan · 152 min',
    accent: '#5B7BA6',
    accentName: 'Steel',
    editorialLine: '“Order is a costume. Chaos wears none.”',
    poster: '/films/the-dark-knight/poster.webp',
    backdrop: '/films/the-dark-knight/backdrop.webp',
    director: 'Christopher Nolan',
    year: 2008,
    runtime: '152 min',
    fitMultiplier: 0.81,
  },
  {
    id: '03',
    slug: 'oppenheimer',
    reelNumber: '03',
    title: 'Oppenheimer',
    titleLineA: 'OPPEN',
    titleLineB: 'heimer',
    meta: '2023 · Christopher Nolan · 180 min',
    accent: '#E03C31',
    accentName: 'Ember',
    editorialLine: '“The brightest idea in history, and the longest shadow.”',
    poster: '/films/oppenheimer/poster.webp',
    backdrop: '/films/oppenheimer/backdrop.webp',
    director: 'Christopher Nolan',
    year: 2023,
    runtime: '180 min',
    fitMultiplier: 0.83,
  },
  {
    id: '04',
    slug: 'dune-part-two',
    reelNumber: '04',
    title: 'Dune: Part Two',
    titleLineA: 'DUNE',
    titleLineB: 'part two',
    meta: '2024 · Denis Villeneuve · 166 min',
    accent: '#D4803C',
    accentName: 'Spice',
    editorialLine: '“Power rises from the sand.”',
    poster: '/films/dune-part-two/poster.webp',
    backdrop: '/films/dune-part-two/backdrop.webp',
    director: 'Denis Villeneuve',
    year: 2024,
    runtime: '166 min',
    fitMultiplier: 0.86,
  },
];
