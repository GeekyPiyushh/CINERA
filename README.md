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

## Current Implemented Features

### Phase 01: The Concave Cinema Gallery
- **Concave 3D Spatial Matrix**: 15 cinematic tiles arranged in a 5-column × 3-row layout, curved inwards using pure CSS 3D perspective (`depth = (nx² + ny²) * 220 - 100`, `rotateY`, `rotateX`, `scale`).
- **Pointer-Driven Fluid Inertia**: Damped mouse-responsive camera movement (`current += (target - current) * 0.055`, X: ±180px, Y: ±110px) isolated on the outer stage wrapper.
- **Dynamic Tile Hover Recognition**: Active tile elevates to `brightness(1.12)`, unrelated tiles dim to `0.55 opacity`, and the top Perimeter HUD updates dynamically to show `FILM TITLE — DIRECTOR`.
- **Keyboard Navigation**: Full tab accessibility across all tiles with focus rings and HUD synchronization.
- **Stationary Perimeter HUD**: Fixed overlay with `REPERTORY INDEX`, `CINÉRA`, `EXPLORE MOVIES`, and `MOVE TO EXPLORE` guidance.
- **Graceful Asset Fallback**: If an image is missing or blocked, procedural archival canvas plates are synthesized with zero broken images.

### Phase 02: The Convergence (Signature Cinematic Transformation)
- **Scrubbed ScrollTrigger Stage**: Smooth pinned 350vh scroll stage without scroll-jacking, completely reversible in reverse scroll.
- **Decoupled Animation Ownership**: Pointer inertia smoothly settles to center (`pointerInfluenceRef: 1.0 -> 0.0`) as scroll initiates, preventing transform collisions with GSAP.
- **Act II Outer Row Exit**: Top 5 and bottom 5 tiles drift outward and upward/downward into darkness with subtle stagger.
- **Act III Five-Strip Convergence**: Five middle-row tiles flatten their perspective, normalize dimensions, and slide together edge-to-edge with calculated zero gaps.
- **Act IV Seamless Panorama Reveal**: Individual gallery images smoothly cross-fade to continuous 20% horizontal slices of the unbroken *Interstellar* panorama (`width: 500%`, `left: -${stripIndex * 100}%`).
- **Act V Monolith Reveal & Giant Typography**: Masked vertical reveal of oversized `INTERSTELLAR` title (~13vw Cormorant Garamond) emerging behind the overlapping monolithic frame.
- **Archival Metadata & CTA**: Minimal film details (`REEL 01 · CHRISTOPHER NOLAN · 2014 · 169 MIN`) and `EXPLORE ALL MOVIES →` action button.
- **Responsive Mobile Showcase**: Clean vertical editorial presentation on mobile devices with featured 3-strip *Interstellar* panorama showcase.

---

## Roadmap

- **Phase 03**: *Monolith Portal & Film Switching* — Reel switching between the 4 iconic films, shutter / iris transitions, interactive seat map, and booking reservation flow.

---

## Asset Replacement Instructions

Place cinematic movie stills under `public/images/gallery/`:
- `interstellar.jpg` (Interstellar - Christopher Nolan)
- `dark-knight.jpg` (The Dark Knight - Christopher Nolan)
- `dune-two.jpg` (Dune: Part Two - Denis Villeneuve)
- `oppenheimer.jpg` (Oppenheimer - Christopher Nolan)

Recommended format: WebP or JPEG, minimum resolution 1920×1080.
