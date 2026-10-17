/**
 * CINÉRA — Types for the Concave Cinema Gallery
 */

export interface FilmThemeColors {
  primary: string;
  accent: string;
  glow: string; // Ambient aura color
}

export interface Film {
  id: string;
  slug: string;
  reelNumber: string; // e.g. "01", "02", "03", "04"
  title: string;
  director: string;
  year: number;
  runtime: string; // e.g. "169 MIN"
  description: string;
  atmosphere: string; // e.g. "Deep cosmic burgundy and gold"
  themeColors: FilmThemeColors;
  image: string; // gallery thumbnail / still
  panoramaImage: string; // high-res wide panorama for monolith
  imageAlt: string;
}

export type TransitionState = 'idle' | 'transitioning';

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
