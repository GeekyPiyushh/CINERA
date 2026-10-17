import type { GalleryTile } from '../types/cinema';

/**
 * Calculates concave 3D spatial properties for each tile
 * based on normalized coordinates relative to center [-1, 1].
 */
export function calculateConcaveTransform(nx: number, ny: number) {
  const distSq = nx * nx + ny * ny;
  // Center tiles are pushed back (negative depth) and flatter;
  // peripheral tiles curve inward toward the viewer.
  const depth = distSq * 220 - 100;
  const rotateY = -nx * 32;
  const rotateX = ny * 20;
  const scale = 0.88 + distSq * 0.35;

  return {
    depth: Math.round(depth * 10) / 10,
    rotateY: Math.round(rotateY * 10) / 10,
    rotateX: Math.round(rotateX * 10) / 10,
    scale: Math.round(scale * 1000) / 1000,
  };
}

export interface LegendTileDefinition {
  col: number;
  row: number;
  filmId: string;
  title: string;
  director: string;
  year: number;
  category: 'Hollywood' | 'Bollywood' | 'South Indian Cinema';
  aspectRatio: 'portrait' | 'landscape';
  image: string;
  imageAlt: string;
  objectPosition?: string;
}

export const HALL_OF_LEGENDS: LegendTileDefinition[] = [
  // ROW 0: TOP (ny = -1)
  // The Batman | Blade Runner 2049 | Interstellar | Dune: Part Two | Mad Max: Fury Road
  {
    col: 0,
    row: 0,
    filmId: 'the-batman',
    title: 'The Batman',
    director: 'Matt Reeves',
    year: 2022,
    category: 'Hollywood',
    aspectRatio: 'landscape',
    image: '/images/gallery/the-batman.jpg',
    imageAlt: 'The Batman — Official release poster featuring Robert Pattinson as Batman, Zoë Kravitz as Catwoman, and Gotham City bathed in crimson noir',
    objectPosition: 'center 22%',
  },
  {
    col: 1,
    row: 0,
    filmId: 'blade-runner-2049',
    title: 'Blade Runner 2049',
    director: 'Denis Villeneuve',
    year: 2017,
    category: 'Hollywood',
    aspectRatio: 'portrait',
    image: '/images/gallery/blade-runner-2049.jpg',
    imageAlt: 'Blade Runner 2049 — Official release poster featuring Ryan Gosling as Officer K and Harrison Ford as Rick Deckard in vivid amber and teal neon',
    objectPosition: 'center 28%',
  },
  {
    col: 2,
    row: 0,
    filmId: 'interstellar',
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: 2014,
    category: 'Hollywood',
    aspectRatio: 'landscape',
    image: '/images/gallery/interstellar.jpg',
    imageAlt: 'Interstellar — Official theatrical release poster featuring Matthew McConaughey as Cooper exploring the frozen ice planet',
    objectPosition: 'center 26%',
  },
  {
    col: 3,
    row: 0,
    filmId: 'dune-part-two',
    title: 'Dune: Part Two',
    director: 'Denis Villeneuve',
    year: 2024,
    category: 'Hollywood',
    aspectRatio: 'portrait',
    image: '/images/gallery/dune-two.jpg',
    imageAlt: 'Dune: Part Two — Official theatrical release poster featuring Timothée Chalamet as Paul Atreides and Zendaya as Chani under the blazing Arrakis sun',
    objectPosition: 'center 35%',
  },
  {
    col: 4,
    row: 0,
    filmId: 'mad-max-fury-road',
    title: 'Mad Max: Fury Road',
    director: 'George Miller',
    year: 2015,
    category: 'Hollywood',
    aspectRatio: 'landscape',
    image: '/images/gallery/mad-max-fury-road.jpg',
    imageAlt: 'Mad Max: Fury Road — Official theatrical release poster featuring Tom Hardy as Max Rockatansky and Charlize Theron as Imperator Furiosa across the desert wasteland',
    objectPosition: 'center 32%',
  },

  // ROW 1: MIDDLE (ny = 0)
  // Joker | Inception | 2001: A Space Odyssey | Arrival | The Dark Knight
  {
    col: 0,
    row: 1,
    filmId: 'joker',
    title: 'Joker',
    director: 'Todd Phillips',
    year: 2019,
    category: 'Hollywood',
    aspectRatio: 'portrait',
    image: '/images/gallery/joker.jpg',
    imageAlt: 'Joker — Official theatrical release poster featuring Joaquin Phoenix as Arthur Fleck dancing down the iconic Bronx staircase in a crimson burgundy suit',
    objectPosition: 'center 22%',
  },
  {
    col: 1,
    row: 1,
    filmId: 'inception',
    title: 'Inception',
    director: 'Christopher Nolan',
    year: 2010,
    category: 'Hollywood',
    aspectRatio: 'landscape',
    image: '/images/gallery/inception.jpg',
    imageAlt: 'Inception — Official theatrical release poster featuring Leonardo DiCaprio and the extraction team on the folded vertical Parisian boulevard',
    objectPosition: 'center 38%',
  },
  {
    col: 2,
    row: 1,
    filmId: '2001-a-space-odyssey',
    title: '2001: A Space Odyssey',
    director: 'Stanley Kubrick',
    year: 1968,
    category: 'Hollywood',
    aspectRatio: 'portrait',
    image: '/images/gallery/2001-space-odyssey.jpg',
    imageAlt: '2001: A Space Odyssey — Iconic original 70mm theatrical poster featuring Space Station One and the Orion III spaceplane by Robert McCall',
    objectPosition: 'center center',
  },
  {
    col: 3,
    row: 1,
    filmId: 'arrival',
    title: 'Arrival',
    director: 'Denis Villeneuve',
    year: 2016,
    category: 'Hollywood',
    aspectRatio: 'landscape',
    image: '/images/gallery/arrival.jpg',
    imageAlt: 'Arrival — Official theatrical release poster featuring Amy Adams as Louise Banks with the monumental extraterrestrial shell spacecraft over the misty Montana valley',
    objectPosition: 'center 36%',
  },
  {
    col: 4,
    row: 1,
    filmId: 'the-dark-knight',
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    year: 2008,
    category: 'Hollywood',
    aspectRatio: 'portrait',
    image: '/images/gallery/dark-knight.jpg',
    imageAlt: 'The Dark Knight — Official theatrical release poster featuring Christian Bale standing before the fiery Bat symbol skyscraper overlooking Gotham',
    objectPosition: 'center 20%',
  },

  // ROW 2: BOTTOM (ny = 1)
  // 1917 | La La Land | Oppenheimer | The Grand Budapest Hotel | The Matrix
  {
    col: 0,
    row: 2,
    filmId: '1917',
    title: '1917',
    director: 'Sam Mendes',
    year: 2019,
    category: 'Hollywood',
    aspectRatio: 'landscape',
    image: '/images/gallery/1917.jpg',
    imageAlt: '1917 — Official wide theatrical poster featuring Lance Corporal Schofield emerging from the trench line amidst battlefield artillery explosions captured by Roger Deakins',
    objectPosition: 'center 30%',
  },
  {
    col: 1,
    row: 2,
    filmId: 'la-la-land',
    title: 'La La Land',
    director: 'Damien Chazelle',
    year: 2016,
    category: 'Hollywood',
    aspectRatio: 'portrait',
    image: '/images/gallery/la-la-land.jpg',
    imageAlt: 'La La Land — Official theatrical release poster featuring Ryan Gosling and Emma Stone dancing beside the street lamp beneath twilight violet-blue Los Angeles skies',
    objectPosition: 'center 75%',
  },
  {
    col: 2,
    row: 2,
    filmId: 'oppenheimer',
    title: 'Oppenheimer',
    director: 'Christopher Nolan',
    year: 2023,
    category: 'Hollywood',
    aspectRatio: 'landscape',
    image: '/images/gallery/oppenheimer.jpg',
    imageAlt: 'Oppenheimer — Official theatrical release poster featuring Cillian Murphy as J. Robert Oppenheimer before the incandescent Trinity test atomic gadget',
    objectPosition: 'center 22%',
  },
  {
    col: 3,
    row: 2,
    filmId: 'grand-budapest-hotel',
    title: 'The Grand Budapest Hotel',
    director: 'Wes Anderson',
    year: 2014,
    category: 'Hollywood',
    aspectRatio: 'portrait',
    image: '/images/gallery/grand-budapest-hotel.jpg',
    imageAlt: 'The Grand Budapest Hotel — Official theatrical release poster featuring the hotel pigeonhole key rack and pastel pink Alpine facade by Wes Anderson',
    objectPosition: 'center center',
  },
  {
    col: 4,
    row: 2,
    filmId: 'the-matrix',
    title: 'The Matrix',
    director: 'Lana & Lilly Wachowski',
    year: 1999,
    category: 'Hollywood',
    aspectRatio: 'landscape',
    image: '/images/gallery/the-matrix.jpg',
    imageAlt: 'The Matrix — Iconic original theatrical release poster featuring Keanu Reeves as Neo, Laurence Fishburne as Morpheus, and Carrie-Anne Moss as Trinity with digital rain code',
    objectPosition: 'center 25%',
  },
];

export const GALLERY_TILES: GalleryTile[] = HALL_OF_LEGENDS.map((def, index) => {
  // Columns: 0, 1, 2, 3, 4 -> normalized: -1.0, -0.5, 0.0, 0.5, 1.0
  const nx = (def.col - 2) / 2;
  // Rows: 0, 1, 2 -> normalized: -1.0, 0.0, 1.0
  const ny = def.row - 1;

  const transforms = calculateConcaveTransform(nx, ny);

  return {
    id: `tile-${index}`,
    index,
    row: def.row,
    col: def.col,
    filmId: def.filmId,
    title: def.title,
    director: def.director,
    year: def.year,
    image: def.image,
    imageAlt: def.imageAlt,
    aspectRatio: def.aspectRatio,
    category: def.category,
    objectPosition: def.objectPosition,
    nx,
    ny,
    ...transforms,
  };
});
