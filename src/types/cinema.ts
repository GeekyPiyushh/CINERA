/**
 * CINÉRA — Types for the Concave Cinema Gallery
 */

export interface Film {
  id: string;
  title: string;
  director: string;
  year: number;
  runtime: string; // e.g. "169 min"
  description: string;
  atmosphere: string; // e.g. "Deep cosmic burgundy and gold"
  themeColors: {
    primary: string;
    accent: string;
    glow: string;
  };
  image: string;
  imageAlt: string;
}

export interface GalleryTile {
  id: string;
  index: number; // 0 to 14
  row: number; // 0 (top), 1 (middle), 2 (bottom)
  col: number; // 0 to 4
  filmId: string;
  title: string;
  director: string;
  year: number;
  image: string;
  imageAlt: string;
  aspectRatio: 'portrait' | 'landscape' | 'panoramic';
  nx: number; // normalized horizontal position [-1, 1]
  ny: number; // normalized vertical position [-1, 1]
  depth: number;
  rotateY: number;
  rotateX: number;
  scale: number;
}

export interface GalleryHUDState {
  hoveredFilm: {
    title: string;
    director: string;
    filmId: string;
    year: number;
  } | null;
}
