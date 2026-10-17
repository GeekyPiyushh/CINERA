# CINÉRA — Creative Direction & Master Architectural Specification

## 1. Project Identity & Brand Philosophy
- **Brand**: CINÉRA
- **Tagline**: *Your seat. Your story.*
- **Experience**: THE ICONIC COLLECTION
- **Creative Concept**: *The Concave Horizon to Monolith Portal*
- **Primary Visual Reference**: [Ryan Chappell Spatial Gallery](https://ryan-chappell.com/)

CINÉRA is an architectural, spatial gallery of cinema memories. The visitor stands inside a fullscreen, concave architectural amphitheater of cinematic moments, suspended in deep Obsidian darkness with subtle Burgundy atmospheric warmth.

This is **not** a Netflix clone, streaming dashboard, or generic movie-card grid. It is an art-directed luxury installation designed to feel expensive, minimal, spatial, and cinematic even when completely static.

---

## 2. Design System Tokens

### Color Roles
- **Obsidian (`#100B0D`)**: Dominant background (~75% surface area).
- **Deep Burgundy (`#481B29`)**: Ambient atmospheric depth and subtle radial warmth.
- **Champagne Gold (`#C6A77C`)**: Refined hairlines, interaction indicators, and focal branding accents.
- **Warm Ivory (`#F5E9DD`)**: Primary typography and high-contrast editorial titles.

### Typography
- **Editorial Titles & Headings**: `Cormorant Garamond` (Dramatic serif typography)
- **Navigation & UI Controls**: `Plus Jakarta Sans` (Refined geometric sans-serif)
- **Technical Indexing & Metadata**: `JetBrains Mono` (Archival precision, mono labels)

---

## 3. Phase 01: The Concave Cinema Gallery (Current Implementation)

### 3D Perspective & Spatial Geometry
The gallery operates in pure CSS 3D transforms (`perspective: 1100px; transform-style: preserve-3d`):
- **Matrix**: 5 columns × 3 rows (exactly 15 cinematic tiles).
- **Spatial Bounds**: Spans ~130vw × 125vh, forming a concave curved amphitheater.
- **Mathematical Curvature Formula**:
  ```text
  nx = normalized horizontal coordinate [-1, 1]
  ny = normalized vertical coordinate [-1, 1]
  distSq = nx² + ny²
  depth = distSq × 220 - 100
  rotateY = -nx × 32 deg
  rotateX = ny × 20 deg
  scale = 0.88 + distSq × 0.35
  ```
  - **Center Tiles**: Positioned deeper in z-space (`depth: -100px`), flatter, slightly smaller.
  - **Peripheral Tiles**: Curve inward toward the viewer, rotated along Y and X axes.

### Pointer-Driven Inertia
- Outer scene wrapper translates inversely to pointer movement (`maxX: ±180px`, `maxY: ±110px`).
- Damped interpolation loop: `current += (target - current) * 0.055` via `requestAnimationFrame`.
- **Architectural Isolation**: Pointer translations live on the outer wrapper; tile concave transforms live on individual tiles. Neither system fights over the same CSS transform property.

### Tile Hover Interaction
- Hovered tile: `brightness(1.12)`, subtle elevation, and prominent z-index.
- Unrelated tiles: dim to `0.55 opacity` and subtle desaturation.
- HUD updates dynamically: `FILM TITLE — DIRECTOR`.
- Keyboard accessible: focus produces identical HUD update.

---

## 4. Phase Roadmap & Future Compatibility

### Phase 02: Gallery-to-Monolith Convergence
- When scroll begins, the top and bottom rows (10 tiles) exit along their perspective curves.
- The 5 middle-row tiles (Row 1, Cols 0–4) converge toward the center, flattening their 3D rotations.
- The 5 tiles lock contiguously into a single panoramic monolithic film frame.
- Oversized movie title typography rises behind the monolithic frame.
- **Architecture Ready**: All 15 tiles have stable DOM refs in `ConcaveGallery.tsx`, deterministic geometry in `galleryLayout.ts`, and isolated transforms.

### Phase 03: Movie Switching & Monolith Portal
- Pinned scroll transitions between the 4 iconic films.
- Shutter / iris transitions across the monolith frame.
- Interactive seat selection and private screening booking portal.

---

## 5. Asset Strategy & Attribution
- Film stills are stored locally under `public/images/gallery/` and `public/images/hero/`.
- Stored assets:
  - *Interstellar* (2014, Christopher Nolan)
  - *The Dark Knight* (2008, Christopher Nolan)
  - *Dune: Part Two* (2024, Denis Villeneuve)
  - *Oppenheimer* (2023, Christopher Nolan)
- **Procedural Archival Fallback**: If an image fails to load or is missing, `src/lib/fallbackTexture.ts` generates a high-resolution editorial canvas plate in real-time, preventing broken image icons.
