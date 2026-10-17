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

## 4. Phase 02: The Convergence (Implemented)

### The Signature Cinematic Transformation
Phase 02 implements the seamless scroll-driven transformation from the 15-image concave gallery into a single five-strip cinematic monolith:
- **Act I — The Gallery (0% scroll)**: Full 15-image concave spatial gallery with fluid pointer inertia and dynamic hover recognition.
- **Act II — The Gallery Releases (0–25% scroll)**:
  - Pointer inertia settles smoothly to center (`pointerInfluenceRef` damps to 0).
  - Upper row (5 tiles) floats upward and outward into darkness (`opacity: 0, y: -450px, z: +90px`).
  - Lower row (5 tiles) floats downward and outward into darkness (`opacity: 0, y: +450px, z: +90px`).
- **Act III — Five Strips Convergence (20–65% scroll)**:
  - Five middle-row tiles (Row 1, cols 0..4) converge inward to the center.
  - Rotations flatten (`rotateX: 0, rotateY: 0, z: 0, scale: 1.0`).
  - Tile widths normalize to `stripWidth = monolithWidth / 5`, heights normalize to `monolithHeight` (~65vw × 56vh).
  - Calculated delta X: `deltaX = (stripIndex - 2) * (stripWidth - trackWidth)`.
  - Borders dissolve to zero-gap contiguous seams.
- **Act IV — Panorama Reveal (48–78% scroll)**:
  - Original gallery images cross-fade to shared 20% horizontal slices of the unbroken *Interstellar* panorama (`left: -${stripIndex * 100}%`, `width: 500%`).
  - Mathematically aligned with zero seams, zero stretching, and zero distortion.
- **Act V — Monolith Reveal & Giant Typography (65–100% scroll)**:
  - Oversized `INTERSTELLAR` title in Cormorant Garamond (`~13vw`) emerges behind the frame using a masked vertical reveal.
  - Central movie frame overlaps the lower title letters, establishing deep spatial layering.
  - Burgundy atmospheric glow (`#481B29`) blooms behind the frame.
  - Archival metadata row (`REEL 01 · CHRISTOPHER NOLAN · 2014 · 169 MIN`) and `EXPLORE ALL MOVIES →` CTA appear below the frame.
- **Bi-Directional Reversibility**: Scrolling upward seamlessly reverses the entire sequence back into the resting 15-tile concave amphitheater.

---

## 5. Phase Roadmap & Future Boundaries

### Phase 03: Movie Switching & Monolith Portal (Future)
- Pinned scroll transitions between the 4 canonical films (*The Dark Knight*, *Dune: Part Two*, *Oppenheimer*).
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
