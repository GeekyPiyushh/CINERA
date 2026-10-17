import type { Film, CinemaListing } from '../types/cinema';

export interface DemoDate {
  id: string;
  label: string;
  day: string;
  isToday?: boolean;
}

export const DEMO_DATES: DemoDate[] = [
  { id: '2026-10-17', label: 'TODAY, OCT 17', day: 'SAT', isToday: true },
  { id: '2026-10-18', label: 'SUN, OCT 18', day: 'SUN' },
  { id: '2026-10-19', label: 'MON, OCT 19', day: 'MON' },
  { id: '2026-10-20', label: 'TUE, OCT 20', day: 'TUE' },
  { id: '2026-10-21', label: 'WED, OCT 21', day: 'WED' },
];

const STANDARD_CINEMAS: CinemaListing[] = [
  {
    id: 'cinera-dome',
    name: 'CINÉRA DOME — SCREEN 1',
    location: 'Central Arts Boulevard · Auditorium Grand',
    screen: 'Curved 70mm Hemispherical Screen (1.43:1)',
    projection: '70mm 15-Perf IMAX Mechanical Film Projector',
    sound: '12-Channel Discrete Uncompressed Audio (15,000W)',
    showtimes: [
      {
        id: 'cd-1',
        time: '14:00',
        format: '70MM IMAX',
        experience: 'Grand Auditorium',
        seatsAvailable: 48,
        totalSeats: 180,
        status: 'available',
        price: '$28.00',
      },
      {
        id: 'cd-2',
        time: '17:45',
        format: '70MM IMAX',
        experience: 'Grand Auditorium',
        seatsAvailable: 12,
        totalSeats: 180,
        status: 'filling-fast',
        price: '$28.00',
      },
      {
        id: 'cd-3',
        time: '21:30',
        format: '70MM IMAX',
        experience: 'Grand Auditorium (Director Intro)',
        seatsAvailable: 4,
        totalSeats: 180,
        status: 'limited',
        price: '$34.00',
      },
    ],
  },
  {
    id: 'monolith-theatre',
    name: 'THE MONOLITH THEATRE — SCREEN 2',
    location: 'Obsidian West District · Pavilion Tier',
    screen: 'Architectural Ultra-Widescreen Flat Matte (2.39:1)',
    projection: 'Christie 4K Dual RGB Pure Laser with DCI-P3 gamut',
    sound: 'Dolby Atmos Spatial Archival Array (64 channels)',
    showtimes: [
      {
        id: 'mt-1',
        time: '15:15',
        format: '4K DUAL LASER',
        experience: 'Intimate Tier',
        seatsAvailable: 62,
        totalSeats: 120,
        status: 'available',
        price: '$24.00',
      },
      {
        id: 'mt-2',
        time: '19:00',
        format: '4K DUAL LASER',
        experience: 'Intimate Tier',
        seatsAvailable: 19,
        totalSeats: 120,
        status: 'filling-fast',
        price: '$24.00',
      },
      {
        id: 'mt-3',
        time: '22:30',
        format: '4K DUAL LASER',
        experience: 'Midnight Screening',
        seatsAvailable: 35,
        totalSeats: 120,
        status: 'available',
        price: '$24.00',
      },
    ],
  },
];

export const FILMS: Film[] = [
  {
    id: 'interstellar',
    slug: 'interstellar',
    reelNumber: '01',
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: 2014,
    runtime: '169 MIN',
    description: 'A team of explorers travels through a wormhole in space in an attempt to ensure humanity’s survival across uncharted galaxies.',
    atmosphere: 'Deep cosmic burgundy and gold',
    themeColors: {
      primary: '#100B0D',
      accent: '#C6A77C',
      glow: '#481B29', // Cosmic, mysterious, expansive aura
    },
    image: '/images/gallery/interstellar.jpg',
    panoramaImage: '/images/hero/interstellar.jpg',
    imageAlt: 'Astronaut standing on shallow ocean planet with massive luminous black hole accretion disk',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    language: 'English',
    rating: 'PG-13',
    formats: ['70mm IMAX', '4K Laser'],
    status: 'now-showing',
    featured: true,
    releaseDate: 'OCTOBER 17 — NOVEMBER 15, 2026',
    curatorNote: 'Presented from Christopher Nolan’s personal archival 70mm print, struck directly from the original camera negative.',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    cinemas: STANDARD_CINEMAS,
  },
  {
    id: 'the-dark-knight',
    slug: 'the-dark-knight',
    reelNumber: '02',
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    year: 2008,
    runtime: '152 MIN',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.',
    atmosphere: 'Cold charcoal and obsidian',
    themeColors: {
      primary: '#100B0D',
      accent: '#C6A77C',
      glow: '#1A222D', // Noir, architectural, cold aura
    },
    image: '/images/gallery/dark-knight.jpg',
    panoramaImage: '/images/hero/dark-knight.jpg',
    imageAlt: 'Masked vigilante perched atop gothic skyscraper gargoyle overlooking rain-slicked Gotham at midnight',
    genres: ['Action & Crime', 'Drama', 'Thriller'],
    language: 'English',
    rating: 'PG-13',
    formats: ['70mm IMAX', '4K Laser'],
    status: 'now-showing',
    featured: false,
    releaseDate: 'OCTOBER 17 — NOVEMBER 08, 2026',
    curatorNote: 'The groundbreaking 15-perf 70mm IMAX sequences are preserved in their native, uncompressed 1.43:1 vertical aspect ratio.',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Gary Oldman'],
    cinemas: STANDARD_CINEMAS,
  },
  {
    id: 'dune-part-two',
    slug: 'dune-part-two',
    reelNumber: '03',
    title: 'Dune: Part Two',
    director: 'Denis Villeneuve',
    year: 2024,
    runtime: '166 MIN',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family in an all-out battle for the universe.',
    atmosphere: 'Desert amber and burgundy',
    themeColors: {
      primary: '#100B0D',
      accent: '#C6A77C',
      glow: '#5A2618', // Desert heat, monumental scale, ancient power aura
    },
    image: '/images/gallery/dune-two.jpg',
    panoramaImage: '/images/hero/dune-two.jpg',
    imageAlt: 'Desert warrior standing on windswept sand dune ridge under dual celestial moons with shimmering spice dust',
    genres: ['Sci-Fi', 'Epic & Adventure', 'Drama'],
    language: 'English / Chakobsa',
    rating: 'PG-13',
    formats: ['70mm IMAX', '4K Laser'],
    status: 'now-showing',
    featured: false,
    releaseDate: 'OCTOBER 17 — NOVEMBER 22, 2026',
    curatorNote: 'Filmed entirely with IMAX digital cameras, featuring Hans Zimmer’s monumental visceral score played through 15,000-watt subwoofers.',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
    cinemas: STANDARD_CINEMAS,
  },
  {
    id: 'oppenheimer',
    slug: 'oppenheimer',
    reelNumber: '04',
    title: 'Oppenheimer',
    director: 'Christopher Nolan',
    year: 2023,
    runtime: '180 MIN',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb that redefined human civilization.',
    atmosphere: 'Incandescent gold and deep crimson',
    themeColors: {
      primary: '#100B0D',
      accent: '#D98A3C',
      glow: '#4E2015', // Incandescent, volatile, historical aura
    },
    image: '/images/gallery/oppenheimer.jpg',
    panoramaImage: '/images/hero/oppenheimer.jpg',
    imageAlt: 'Silhouette of a 1940s physicist in trench coat observing a colossal atomic explosion in the night desert',
    genres: ['Drama', 'Thriller'],
    language: 'English',
    rating: 'R',
    formats: ['70mm IMAX', '35mm Archival', '4K Laser'],
    status: 'now-showing',
    featured: false,
    releaseDate: 'OCTOBER 17 — NOVEMBER 18, 2026',
    curatorNote: 'Winner of 7 Academy Awards. Presented on genuine 53-pound reels of 70mm Kodak black-and-white and color chemical film stock.',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    cinemas: STANDARD_CINEMAS,
  },
];

export interface ComingSoonFilm {
  id: string;
  slug: string;
  title: string;
  director: string;
  year: number;
  runtime: string;
  genre: string;
  format: string;
  expectedDate: string;
  tagline: string;
  synopsis: string;
  accent: string;
}

export const COMING_SOON_FILMS: ComingSoonFilm[] = [
  {
    id: 'blade-runner-2049',
    slug: 'blade-runner-2049',
    title: 'Blade Runner 2049',
    director: 'Denis Villeneuve',
    year: 2017,
    runtime: '164 MIN',
    genre: 'Sci-Fi / Cyberpunk',
    format: '4K Dual Laser & Dolby Atmos',
    expectedDate: 'DECEMBER 2026',
    tagline: '“Every memory has a shape.”',
    synopsis: 'Young Blade Runner K unearths a long-buried secret that leads him to track down former Blade Runner Rick Deckard, who has been missing for thirty years.',
    accent: '#D97736',
  },
  {
    id: '2001-a-space-odyssey',
    slug: '2001-a-space-odyssey',
    title: '2001: A Space Odyssey',
    director: 'Stanley Kubrick',
    year: 1968,
    runtime: '149 MIN',
    genre: 'Sci-Fi / Avant-Garde',
    format: 'Original 70mm Unrestored Print',
    expectedDate: 'JANUARY 2027',
    tagline: '“The ultimate trip.”',
    synopsis: 'After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft manned by two astronauts and supercomputer H.A.L. 9000 is sent on a quest to Jupiter.',
    accent: '#3B82F6',
  },
  {
    id: 'metropolis',
    slug: 'metropolis',
    title: 'Metropolis (1927)',
    director: 'Fritz Lang',
    year: 1927,
    runtime: '153 MIN',
    genre: 'Sci-Fi / Expressionist',
    format: '4K Nitrate Restoration + Live Pipe Organ',
    expectedDate: 'FEBRUARY 2027',
    tagline: '“The mediator between head and hands must be the heart.”',
    synopsis: 'In a futuristic city sharply divided between the working class and the city planners, the son of the city’s mastermind falls in love with a working-class prophet.',
    accent: '#C6A77C',
  },
  {
    id: 'lawrence-of-arabia',
    slug: 'lawrence-of-arabia',
    title: 'Lawrence of Arabia',
    director: 'David Lean',
    year: 1962,
    runtime: '222 MIN',
    genre: 'Historical Epic',
    format: '70mm Super Panavision Presentation',
    expectedDate: 'MARCH 2027',
    tagline: '“Nothing is written.”',
    synopsis: 'The monumental story of T.E. Lawrence, the English officer who successfully united and led the diverse, often warring, Arab tribes during World War I.',
    accent: '#EAB308',
  },
];

