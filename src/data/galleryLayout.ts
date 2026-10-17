import type { GalleryTile } from '../types/cinema';
import { FILMS } from './films';

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

// Map each tile to a film with varied aspect ratios (landscape, portrait, panoramic)
const TILE_DEFINITIONS: Array<{
  col: number;
  row: number;
  filmIndex: number;
  aspectRatio: 'portrait' | 'landscape' | 'panoramic';
}> = [
  // ROW 0: TOP (ny = -1)
  { col: 0, row: 0, filmIndex: 3, aspectRatio: 'landscape' }, // Oppenheimer
  { col: 1, row: 0, filmIndex: 0, aspectRatio: 'portrait' },  // Interstellar
  { col: 2, row: 0, filmIndex: 1, aspectRatio: 'landscape' }, // The Dark Knight
  { col: 3, row: 0, filmIndex: 2, aspectRatio: 'portrait' },  // Dune: Part Two
  { col: 4, row: 0, filmIndex: 3, aspectRatio: 'landscape' }, // Oppenheimer

  // ROW 1: MIDDLE (ny = 0) — Structured for Phase 02 monolith convergence
  { col: 0, row: 1, filmIndex: 2, aspectRatio: 'portrait' },  // Dune: Part Two
  { col: 1, row: 1, filmIndex: 0, aspectRatio: 'landscape' }, // Interstellar (Segment A)
  { col: 2, row: 1, filmIndex: 0, aspectRatio: 'portrait' },  // Interstellar (Center Piece)
  { col: 3, row: 1, filmIndex: 0, aspectRatio: 'landscape' }, // Interstellar (Segment B)
  { col: 4, row: 1, filmIndex: 1, aspectRatio: 'portrait' },  // The Dark Knight

  // ROW 2: BOTTOM (ny = 1)
  { col: 0, row: 2, filmIndex: 1, aspectRatio: 'landscape' }, // The Dark Knight
  { col: 1, row: 2, filmIndex: 3, aspectRatio: 'portrait' },  // Oppenheimer
  { col: 2, row: 2, filmIndex: 2, aspectRatio: 'landscape' }, // Dune: Part Two
  { col: 3, row: 2, filmIndex: 0, aspectRatio: 'portrait' },  // Interstellar
  { col: 4, row: 2, filmIndex: 2, aspectRatio: 'landscape' }, // Dune: Part Two
];

export const GALLERY_TILES: GalleryTile[] = TILE_DEFINITIONS.map((def, index) => {
  // Columns: 0, 1, 2, 3, 4 -> normalized: -1.0, -0.5, 0.0, 0.5, 1.0
  const nx = (def.col - 2) / 2;
  // Rows: 0, 1, 2 -> normalized: -1.0, 0.0, 1.0
  const ny = def.row - 1;

  const film = FILMS[def.filmIndex];
  const transforms = calculateConcaveTransform(nx, ny);

  return {
    id: `tile-${index}`,
    index,
    row: def.row,
    col: def.col,
    filmId: film.id,
    title: film.title,
    director: film.director,
    year: film.year,
    image: film.image,
    imageAlt: `${film.title} — ${film.imageAlt}`,
    aspectRatio: def.aspectRatio,
    nx,
    ny,
    ...transforms,
  };
});
