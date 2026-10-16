# CINÉRA — Curated Cinema

> *“Your seat. Your story.”*

CINÉRA is a premium cinema curation and ticket-booking experience engineered around a signature WebGL projection hero stage ("FIRST LIGHT"), 70mm large-format film curation, and luxury editorial aesthetics.

The master architecture, creative concept, and engineering specifications are documented in [`docs/CINERA_SPEC.md`](docs/CINERA_SPEC.md).

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation & Development
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Typecheck and production bundle build
npm run build

# Run linter
npm run lint
```

---

## Adding Film Image Assets

Film poster and backdrop assets are placed in the `public/films/` directory according to film slug:

```
public/
  films/
    interstellar/
      poster.webp     # 1000x1500 2:3 vertical poster
      backdrop.webp   # 1920x1080 16:9 cinematic still
    the-dark-knight/
      poster.webp
      backdrop.webp
    oppenheimer/
      poster.webp
      backdrop.webp
    dune-part-two/
      poster.webp
      backdrop.webp
```

### Zero-Image Fallback Engine
If an image file is absent or fails to load, CINÉRA automatically synthesizes a procedural archival canvas plate (`src/lib/fallbackTexture.ts`):
- Deep obsidian-to-accent atmospheric gradients
- Instrument Serif display typography with gold italic accents
- Real-time procedural film grain and aperture geometry
- Gold hairlines and IBM Plex Mono archival metadata

To test the zero-images fallback mode at any time, append `?noimages=1` to the URL.

---

## Feature Flags & Debug Tooling

### Feature Flags (`src/config/features.ts`)
Features can be toggled to support low-power devices and testing:
- `lenis`: Smooth native scrolling
- `cursor`: Fine-pointer custom dot and magnetic ring cursor
- `dust`: 2D canvas floating dust particles
- `beam`: Projector beam cone and flicker
- `shaderTransition`: WebGL iris dissolve shader
- `debug`: Enable internal debug mode

### Debug HUD (`?debug=1`)
Append `?debug=1` to any route URL to reveal the live diagnostic HUD:
- Real-time FPS counter
- Device Pixel Ratio (DPR)
- Scroll progress and active reel index (01—04)
- Window transition coordinates (`from`, `to`, `t`)
- Active ScrollTrigger count
- WebGL geometry and texture memory allocation
