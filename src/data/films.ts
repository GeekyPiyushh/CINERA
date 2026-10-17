import type { Film } from '../types/cinema';

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
  },
];
