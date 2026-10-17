# CINÉRA — Curated Cinema Platform

> *“Your seat. Your story.”*

CINÉRA is an architectural luxury movie-booking platform engineered around an immersive, fullscreen **Concave Cinema Gallery** ("THE ICONIC COLLECTION"). The visitor experiences a curved architectural wall of cinematic memories suspended in deep Obsidian darkness with subtle Burgundy atmospheric warmth.

---

## Technical Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Pure CSS 3D Transforms (`perspective: 1100px`, `transform-style: preserve-3d`)
- **Routing**: React Router v7
- **Motion Controller**: Native `requestAnimationFrame` damped inertia loop with GSAP hooks for entrance choreography
- **Typography**: Cormorant Garamond (Editorial Serif), Plus Jakarta Sans (UI), JetBrains Mono (Archival Metadata)

---

## Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Quality Verification
```bash
# Typecheck
npm run typecheck

# Linter (Oxlint)
npm run lint

# Production Bundle Build
npm run build
```

---

## Project Structure

```
cinera/
├── docs/
│   ├── CINERA-CREATIVE-DIRECTION.md   # Master concept & spatial math
│   └── CINERA_SPEC.md                # Multi-phase blueprint
├── AGENTS.md                          # Coding guidelines & standards
├── README.md
├── public/
│   ├── fonts/                         # Self-hosted display fonts
│   └── images/
│       ├── gallery/                   # High-resolution film stills
│       └── hero/                      # Key art assets
├── src/
│   ├── app/
│   │   └── router.tsx                 # Route declarations (/ and /movies)
│   ├── components/
│   │   ├── landing/
│   │   │   ├── ConcaveGallery.tsx     # Fullscreen coordinator & refs
│   │   │   ├── CinemaTile.tsx         # Individual 3D concave tile
│   │   │   ├── PerimeterHUD.tsx       # Stationary luxury interface overlay
│   │   │   ├── GalleryStage.tsx       # 3D perspective & pointer inertia stage
│   │   │   └── GalleryFallback.tsx    # Responsive mobile fallback
│   │   └── ui/
│   │       └── BrandWordmark.tsx      # CINÉRA brand mark
│   ├── data/
│   │   ├── films.ts                   # Typed 4-film dataset
│   │   └── galleryLayout.ts           # 15-tile spatial matrix & math
│   ├── hooks/
│   │   ├── usePointerInertia.ts       # Damped pointer inertia controller
│   │   └── useReducedMotion.ts        # Accessibility reduced-motion detection
│   ├── pages/
│   │   ├── LandingPage.tsx            # Concave gallery entry route
│   │   └── MoviesPage.tsx             # NOW SHOWING repertory placeholder
│   ├── styles/
│   │   ├── globals.css                # Design tokens & typography
│   │   └── gallery.css                # 3D perspective & tile transitions
│   ├── types/
│   │   └── cinema.ts                  # Shared TypeScript interfaces
│   ├── App.tsx                        # Root layout & Router provider
│   └── main.tsx                       # React DOM entry
├── package.json
└── vite.config.ts
```

---

## Current Implemented Features (Phase 01)

- **Concave 3D Spatial Matrix**: 15 cinematic tiles arranged in a 5-column × 3-row layout, curved inwards using pure CSS 3D perspective (`depth = (nx² + ny²) * 220 - 100`, `rotateY`, `rotateX`, `scale`).
- **Pointer-Driven Fluid Inertia**: Damped mouse-responsive camera movement (`current += (target - current) * 0.055`, X: ±180px, Y: ±110px) isolated on the outer stage wrapper.
- **Dynamic Tile Hover Recognition**: Active tile elevates to `brightness(1.12)`, unrelated tiles dim to `0.55 opacity`, and the top Perimeter HUD updates dynamically to show `FILM TITLE — DIRECTOR`.
- **Keyboard Navigation**: Full tab accessibility across all tiles with focus rings and HUD synchronization.
- **Stationary Perimeter HUD**: Fixed overlay with `REPERTORY INDEX`, `CINÉRA`, `EXPLORE MOVIES`, and `MOVE TO EXPLORE` guidance.
- **Graceful Asset Fallback**: If an image is missing or blocked, procedural archival canvas plates are synthesized with zero broken images.
- **Responsive Mobile Fallback**: Screen-optimized editorial card presentation on small viewports (<640px).

---

## Roadmap

- **Phase 02**: *The Monolith Convergence* — Scroll-driven transformation where outer rows exit and the 5 middle-row tiles collapse into a central panoramic monolith.
- **Phase 03**: *Monolith Portal & Booking* — Reel switching, 70mm archival projection details, interactive seat map, and booking reservation flow.

---

## Asset Replacement Instructions

Place cinematic movie stills under `public/images/gallery/`:
- `interstellar.jpg` (Interstellar - Christopher Nolan)
- `dark-knight.jpg` (The Dark Knight - Christopher Nolan)
- `dune-two.jpg` (Dune: Part Two - Denis Villeneuve)
- `oppenheimer.jpg` (Oppenheimer - Christopher Nolan)

Recommended format: WebP or JPEG, minimum resolution 1920×1080.
