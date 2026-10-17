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

## 5. Phase 03: The Cinematic Multiverse (Implemented)

### Four Films. Four Worlds. One Seamless Cinematic Experience.
Phase 03 transforms the static *Interstellar* monolith into an interactive four-film cinematic multiverse:
- **01 — INTERSTELLAR**: Primary `#100B0D`, Ambient aura `#481B29`, Accent `#C6A77C` (Cosmic, mysterious, expansive)
- **02 — THE DARK KNIGHT**: Primary `#100B0D`, Ambient aura `#1A222D`, Accent `#C6A77C` (Noir, architectural, cold)
- **03 — DUNE: PART TWO**: Primary `#100B0D`, Ambient aura `#5A2618`, Accent `#C6A77C` (Desert heat, monumental scale, ancient power)
- **04 — OPPENHEIMER**: Primary `#100B0D`, Ambient aura `#4E2015`, Accent `#D98A3C` (Incandescent, volatile, historical)

### Signature Five-Strip Cinematic Shutter Transition
When a new film is selected, a 4-stage physics-inspired shutter wave executes across the five monolith strips:
1. **Stage A — Release (0.0s – 0.18s)**: Strips separate horizontally by a deliberate 5.5px gap (`(i - 2) * 5.5px`), revealing five independent vertical slats.
2. **Stage B — Cinematic Wave (0.18s – 0.54s)**: Staggered sinusoidal wave (`stagger: 0.045s`) with alternating Y-displacement (`±18px`), subtle perspective rotation (`rotateY: ±4.5°`), and vertical compression (`scaleY: 0.95`).
3. **Stage C — Double-Buffered Image Replacement at Apex (0.24s – 0.54s)**: Secondary buffer layer (`Buffer B`) cross-fades under the primary buffer (`Buffer A`), swapping the unbroken widescreen panorama seamlessly without any blank frames.
4. **Stage D — Reassembly (0.54s – 0.88s)**: Strips snap back edge-to-edge (`x: 0, y: 0, rotateY: 0, scaleY: 1`) into a pristine single widescreen monolith.

### Giant Editorial Typography & Atmospheric Aura Cross-Fades
- **Masked Vertical Slide**: Outgoing title translates up (`yPercent: -100`) while incoming title emerges from below (`yPercent: 100 -> 0`) behind the monolith frame in Cormorant Garamond.
- **Double-Buffered Ambient Auras**: Pre-rendered radial gradients cross-fade smoothly without heavy per-frame CSS filter recalculations.
- **Synchronized Metadata**: Film details dip and update in unison (`REEL 0X · DIRECTOR · YEAR · RUNTIME · SYNOPSIS`).
- **Interactive Chapter Selector**: Minimal horizontal editorial navigation with Champagne Gold index, Ivory titles, and animated gold active underline.
- **Functional Navigation Route**: Primary CTA routes directly to `/movies/:slug` (`MovieDetailsPage`), featuring technical specifications and back-to-experience navigation.
- **Rapid-Click Policy**: Queues the latest requested film during active animations, ensuring state integrity and zero animation collisions.
- **Accessibility & Motion Preference**: Gracefully falls back to a 0.35s opacity cross-fade when `prefers-reduced-motion` is active.

---

## 6. Phase Roadmap & Future Boundaries
- **Phase 04 (Future)**: Interactive auditorium seating plan, private screening curation, and ticket reservation.

## 5. Asset Strategy & Attribution
- Film stills are stored locally under `public/images/gallery/` and `public/images/hero/`.
- Stored assets:
  - *Interstellar* (2014, Christopher Nolan)
  - *The Dark Knight* (2008, Christopher Nolan)
  - *Dune: Part Two* (2024, Denis Villeneuve)
  - *Oppenheimer* (2023, Christopher Nolan)
- **Procedural Archival Fallback**: If an image fails to load or is missing, `src/lib/fallbackTexture.ts` generates a high-resolution editorial canvas plate in real-time, preventing broken image icons.
