# CINÉRA — Master Implementation Spec

This file (`docs/CINERA_SPEC.md`) contains the complete creative concept, cinematic storyboard, technical architecture, and master engineering rules for CINÉRA. It is the single source of truth for all implementation phases.

---

# PART 1: THE CREATIVE CONCEPT

## FIRST LIGHT

The hero is the moment a projector fires in a dark auditorium. Four film reels are threaded; you see one at a time. One curved poster plane floats in the dark like a screen made of air. Oversized title type sits behind it, and a single beam of warm light falls onto it. Scrolling changes the reel. The plane “burns through” to the next film with an iris-shaped shader transition, and the type, light and atmosphere change with it.

### Why this concept (and not the others)
- **One focal point**: A single plane gives a clear subject and looks good paused. A poster tunnel or gallery splits attention and needs many assets.
- **3D earns its place**: A curved plane with a shader transition looks like cinema and can’t be faked well in DOM.
- **It maps to your popcorn reference**: Four posters converge to reveal one central object, giant type sits behind it, and scroll changes the object while type, colour and copy change together.
- **It’s safe to build in two days**: It uses one mesh and one material. Mobile and low-power devices fall back to a DOM crossfade version of the same composition.

### The four reels (data for films.ts)

| # | Film | Title line A (roman caps) | Title line B (italic, gold) | Meta | Accent | Original editorial line |
|---|---|---|---|---|---|---|
| 01 | Interstellar | INTER | stellar | 2014 · Christopher Nolan · 169 min | Ice `#9BCBDD` | “A father, a wormhole, a promise measured in years.” |
| 02 | The Dark Knight | THE DARK | knight | 2008 · Christopher Nolan · 152 min | Steel `#5B7BA6` | “Order is a costume. Chaos wears none.” |
| 03 | Oppenheimer | OPPEN | heimer | 2023 · Christopher Nolan · 180 min | Ember `#E03C31` | “The brightest idea in history, and the longest shadow.” |
| 04 | Dune: Part Two | DUNE | part two | 2024 · Denis Villeneuve · 166 min | Spice `#D4803C` | “Power rises from the sand.” |

Slugs are `interstellar`, `the-dark-knight`, `oppenheimer` and `dune-part-two`. Use only the original editorial lines above, not official taglines.

### Visual system

#### Colour roles
- **Obsidian `#100B0D`**: about 70% of the surface.
- **Deep Burgundy `#481B29`**: a permanent soft glow in the lower-left, at 45–55% opacity. It is the brand’s constant, and the film accent never replaces it.
- **Warm Ivory `#F5E9DD`**: type and the beam.
- **Champagne Gold `#C6A77C`**: hairlines, the É, italic title lines, the iris ring, focus outlines and the primary CTA.
- **Film accent**: at most about 3% of the surface. Use it only for the glow behind the plane, the iris ring tint, the chapter number and dust particles. Never use it for large fills or body text.

#### Typography (self-hosted via Fontsource, font-display: swap, preload the display face)
- **Display**: Instrument Serif, regular and italic. Title line A is caps with line-height 0.8 and tracking −0.02em. Line B is lowercase italic in gold.
- **UI and body**: Inter Tight, 14–16px, tracking 0 to 0.01em.
- **Metadata**: IBM Plex Mono, 11px caps, tracking 0.18em, Ivory at 70%.
- **Title fit**: each title block is measured and scaled so its widest line spans 78–90vw on desktop. Use a per-film fit multiplier and a ResizeObserver, not hardcoded guesses.

#### Layout
- 12-column grid, 4vw outer margin and 24px gutters.
- Chrome sits on the margins. The plane is centred, with a deliberate offset of about 2% toward the lower-left.
- Four L-shaped crop marks (14px, 1px, gold at 35%) sit 2vw inside the viewport corners.
- Hairlines are 1px, gold at 20–35%.
- Line A and line B are offset horizontally in opposite directions so the plane never hides the same letters in both. At least 70% of each title’s letter area must stay visible.

#### Z-stack (back to front)
- `z: 0` **Atmosphere**: Obsidian base, burgundy glow, accent glow, all as CSS gradients
- `z: 1` **Beam**: Projector cone from top-centre toward the plane, Ivory 6–10% opacity, mix-blend-mode: screen, mask-softened (no blur filter)
- `z: 2` **Dust**: Optional 2D canvas, about 70 particles, 30fps
- `z: 3` **Giant title**: DOM, behind the plane
- `z: 4` **WebGL canvas**: Transparent. The curved poster plane plus two outline frames
- `z: 5` **Chrome**: Nav, meta, chapter index, CTA, crop marks, one small italic caption that overlaps the plane’s edge for depth
- `z: 6` **Grain and vignette**: Static tile, low opacity, no blend modes
- `z: 7` **Cursor**: Fine pointers only
- `z: 8` **Preloader and iris overlay**

#### Motion language
- Expo and quart eases only, with no bounce.
- CSS cubic-beziers: out `cubic-bezier(0.16,1,0.3,1)`, in-out `cubic-bezier(0.76,0,0.24,1)`.
- GSAP: `expo.inOut`, `power4.out`, `power3.out`, `power2.inOut`.
- Everything is transform- or opacity-driven.

---

# PART 2: CINEMATIC STORYBOARD

## A. Opening sequence (about 5.9s first visit)

| Time (s) | What the viewer sees | How |
|---|---|---|
| 0.00–0.35 | Pure obsidian. Grain fades 0→0.07. Mono label top-left: REEL 00 — THREADING. Counter bottom-left: 000. | Opacity tweens |
| 0.35–1.25 | A 1px gold hairline draws outward from centre across the full width, vertically centred. | scaleX 0→1, origin 50% 50%, expo.inOut |
| 1.25–2.35 | CINÉRA rises out of the hairline, using the hairline as its baseline. The É lands last, in gold. | Letters in overflow-hidden masks, yPercent 115→0, 1.1s, power4.out, stagger 0.07. É gets +0.15s delay and scaleY 1.08→1. Size about 15vw, tracking 0.04em. |
| 2.35–2.95 | Tagline “Your seat. Your story.” fades up below the hairline, with italic gold on the two key words. | y 16→0, opacity, tracking 0.3em→0.12em, 0.6s power3.out |
| 2.95–3.40 | A held beat. The counter reaches 100 and the label becomes REEL 01 — FIRST LIGHT. | Counter follows real asset progress, with a minimum total of 1.6s |
| 3.40–4.50 | The screen splits at the hairline. The two obsidian halves part and a single warm flash lights the seam: the projector turns on. | Panels: top yPercent 0→-100, bottom 0→100, 1.1s expo.inOut. Beam opacity 0→0.35→0.1 in 0.5s (one flash only, no strobing). |
| 3.40–4.50 | The wordmark shrinks and travels to the top-left nav slot. | Measured transform (x, y, scale), 1.1s expo.inOut. The hairline fades 0.3s. |
| 3.55–4.95 | Four posters fly in from the four corners, spinning from perspective into alignment, and converge on the centre. Interstellar arrives last and lands on top. | See “Convergence” below |
| 4.60–5.30 | Giant title lines slide in from opposite sides, behind the plane. | Line A from −28vw, B from +28vw, opacity 0→1, 1.0s power4.out |
| 4.95–5.40 | The three other posters cross-fade out under Interstellar. A diagonal light sweep crosses the plane and a gold ring pulses from its centre. | Opacity tweens, uSweep 0→1 over 0.9s, uRing 0→1 over 0.8s |
| 5.20–5.90 | The chrome assembles: crop marks draw in, nav items rise 12px, meta lines slide up through masks, 01 / 04 appears, the CTA scales .92→1, and the scroll hint comes last. | Stagger 0.06 |
| 5.90 | Intro done. Scrolling and pointer parallax unlock. | `lenis.start()`, enable the hero trigger |

### Convergence (WebGL)
Camera: fov 32°, position z=6. At that distance the visible height is about 3.44 units, so each plane is 1.6 × 2.4 units (about 70% of viewport height). Start poses, with ± on x and y per corner:
- Position (±3.6, ±2.4, −2.5).
- Scale 1.3.
- Rotation Y ±0.6 and Z ±0.35.

End pose is the origin, identity rotation, scale 1. Use independent eases for x (power3.inOut), y (power2.inOut) and rotation (power3.out) so the paths curve. Stagger 0.09s, with Interstellar last.

### Skip and repeat visits
- A “Skip intro ↵” control appears at t≥0.8s at bottom-right. Click, Enter, Space or Esc sets `timeScale(10)`. It must still end in the exact final state.
- If `sessionStorage.cinera_intro_seen` is set, run a trimmed 2.4s version: hairline, wordmark and convergence only.
- Reduced motion: no intro. See section G.

## B. Idle hero (the “paused frame”)
The plane floats with a vertical drift of ±0.04 units on a 10s sine. Dust drifts. The beam flickers at ±1.5% opacity, 12fps. The pointer tilts the plane (see D). Nothing else moves. A screenshot taken here must look like a poster.

## C. Scroll: four reels, one pinned stage
- **Pin length**: desktop +=400% of viewport height, mobile +=300%.
- **Scrub**: `scrub: 0.8` linked to one paused master timeline normalised to duration 1.
- **Wheel**: native scroll with Lenis smoothing only. Never intercept the wheel.
- **Snap**: soft snap to `[0, 1/3, 2/3, 1]`, duration `{min .25, max .7}`, delay `.12`, ease `power2.inOut`.
- **After the pin**: normal scrolling continues into the page sections.

**Windows**: Holds are centred on `i/3`, with `±0.07` of progress before and after each hold centre. The three transitions occupy `[i/3 + 0.07, (i+1)/3 − 0.07]`, each about 0.193 long (about 77vh of scroll). The first and last holds are half-length because they start and end the range.

### Transition choreography (progress t = 0→1 inside a window)

| t | Plane (WebGL, derived from timeline.progress()) | DOM (GSAP tweens on the master timeline) |
|---|---|---|
| 0–0.5 | Iris opens from the plane’s centre, with a noisy edge and a gold ring on the edge. The plane tilts (rotationY 0→−0.35) and pushes back (z 0→−0.25, scale 1→0.94). Chromatic split rises to 0.006 UV. | Line A exits xPercent 0→−35 and line B exits 0→+35, both fading, power2.in. Meta lines fade out. Beam rises 0.09→0.14. |
| 0.5 | The iris is half open. The ring is at peak. The brightness dip is −10%. | `--accent` is mid-blend. The chapter digit rolls 01→02. |
| 0.5–1 | The next film fills the iris, and the plane settles back to identity. At t=1 a light sweep fires. | The next title lines enter from ∓35 to 0, power3.out, from t=0.45. Next meta fades in. Beam eases back to 0.09. |

Throughout the window, tween `--accent` and the glow position (shift ±4%) with `ease: "none"`. All of this is driven by scroll, so scrolling back reverses it exactly.

**Chapter nav**: The vertical index at the right edge lists 01 Interstellar … 04 Dune, with a 1px progress line. Clicking an entry calls `lenis.scrollTo(position, { duration: 1.6 })`, so every switch goes through the same scroll-driven path.

## D. Interactions
- **Pointer parallax (fine pointers only)**, smoothed with `gsap.quickTo` at 0.9s `power3.out`, with pointer values normalised to −1…1:
  - Plane `rotationY = nx * 0.12 rad`, `rotationX = -ny * 0.08 rad`, `x = nx * 0.12 units`.
  - Outline frames move opposite at 0.5×.
  - The title layer moves `-nx * 1.2vw`.
  - Plane hover: scale 1.02 and a subtle local UV ripple at the pointer position (`uHover`).
- **Custom cursor** (hero only, fine pointers only, off for reduced motion):
  - A 12px ivory dot plus a 44px ring that follows with `quickTo`. The ring expands over magnetic elements. Over the plane it shows the label `OPEN`.
  - Clicking the plane goes to `/movies/:slug`.
- **Magnetic buttons**: radius 90px, strength 0.35, enter with `power3.out`, release with `elastic.out(1, 0.45)`.
- **Nav links**: a hairline underline draws `scaleX 0→1` from the left in 0.5s `expo.out`, and the label does a two-line text roll in 0.45s.
- **Primary CTA**: “Enter CINÉRA” in the nav, and “Book tickets — {film}” at the bottom of the hero. Both are always visible.
- **Keyboard**: Tab reaches the chapter nav and CTAs. Arrow keys move within the chapter nav only. Page keys scroll natively.

## E. After the hero
- **Manifesto**: Giant statement: “Four films. One beam of light. One seat, waiting for you.” Words go from Ivory 15% to 100% opacity scrubbed on scroll. No pin.
- **Now Showing**: Four posters in a staggered, off-grid row (alternating ±8% vertical offsets). Hover lifts a poster, reveals its mono metadata and crops its edge with a masked reveal. Click goes to `/movies/:slug`. Use `content-visibility: auto`.
- **Final CTA**: “Your seat. Your story.” and a 160px magnetic circular button whose SVG text path rotates slowly: `ENTER CINÉRA •`. Clicking triggers the iris-close transition (F).
- **Footer**: Hairline plus mono links and “© 2026 CINÉRA — student project”.

## F. Entering the platform (iris-close transition)
An overlay element at the click point is a 2px circle with `box-shadow: 0 0 0 150vmax #100B0D` and a 1px gold border. Closing animates `scale 1500→1` over 0.9s with `expo.in`. Then navigate, and open again with `scale 1→1500` over 0.9s with `expo.out`. Use transform only and never animate a full-screen clip-path. Total transition is about 1.8s, and it is interruptible by Esc.

## G. Variants
- **Mobile**: The plane is 74vw wide, centred at 46% height. Titles are about 20vw. The chapter index becomes dots at the bottom, the CTA is full-width, and pin length is 300vh. The pointer is replaced by an idle sway of ±2°. No custom cursor. Lenis is off on touch devices, so native touch scrolling is used.
- **Reduced motion**: There is no intro, just a 0.3s fade. There is no pin and no scrub. The hero is one static composition, with chapter buttons switching films by a 0.4s crossfade. Parallax, cursor, beam flicker and dust are off.
- **Fallback (no WebGL, or low power)**: Same composition with a DOM `<img>` poster plane, with CSS transform tilt on desktop only and the same crossfade switching.

---

# PART 3: TECHNICAL ARCHITECTURE

## Dependencies

| Package | Why |
|---|---|
| `react`, `react-dom` (19), `react-router-dom` | App and routing |
| `vite`, `typescript` | Tooling |
| `tailwindcss` v4 with `@tailwindcss/vite` | Styling, tokens in `@theme` |
| `gsap`, `@gsap/react` | Timelines, ScrollTrigger, useGSAP for cleanup. |
| `lenis` | Smooth scroll, optional behind a feature flag |
| `three`, `@react-three/fiber` (v9+), `@react-three/drei` | One scene. Use only useTexture and PerformanceMonitor. |
| `motion` | React-state UI only (mobile menu AnimatePresence, route placeholders). Never for the hero timeline. |
| `@fontsource/instrument-serif`, `@fontsource-variable/inter-tight`, `@fontsource/ibm-plex-mono` | Fonts |

No other libraries. GLSL is imported with Vite’s `?raw`.

## Folder structure
```
src/
  main.tsx  App.tsx  routes.tsx
  config/
    films.ts            // film data + themes (single source of truth)
    features.ts         // flags: lenis, cursor, dust, beam, shaderTransition
    motion.ts           // named eases, durations
  styles/
    index.css           // @theme tokens, fonts, base, grain, utilities
  lib/
    deriveHeroState.ts  // progress -> {from, to, t, activeIndex}
    fitText.ts  clamp.ts  isCoarsePointer.ts
    fallbackTexture.ts  // canvas "plate" when images fail
  hooks/
    useReducedMotion.ts  usePointerParallax.ts  useMagnetic.ts
    useAssetPreload.ts  useLenis.ts  useInView.ts
  providers/
    SmoothScrollProvider.tsx   // Lenis <-> ScrollTrigger wiring
    HeroContext.tsx            // refs, not state, for per-frame data
    IrisTransitionProvider.tsx
  components/
    layout/ RootLayout.tsx  Nav.tsx  Footer.tsx  Grain.tsx  Cursor.tsx
    ui/ MagneticButton.tsx  TextRoll.tsx  CropMarks.tsx  CtaCircle.tsx
    preloader/ Preloader.tsx  introTimeline.ts
    hero/
      Hero.tsx  HeroBackdrop.tsx  Beam.tsx  Dust.tsx
      HeroTitle.tsx  HeroChrome.tsx  ChapterNav.tsx  HeroFallback.tsx
      heroTimeline.ts          // builds the master scroll timeline
      canvas/
        HeroCanvas.tsx  (lazy)  PosterStage.tsx  PosterPlane.tsx
        OutlineFrames.tsx  shaders/poster.vert.glsl  poster.frag.glsl
    sections/ Manifesto.tsx  NowShowing.tsx  FinalCta.tsx
  pages/ Landing.tsx  Movies.tsx  MovieDetails.tsx  Booking.tsx  (last three are placeholders)
public/films/<slug>/poster.webp  backdrop.webp
```

## Component tree and animation ownership
```
<App> → <SmoothScrollProvider> → <IrisTransitionProvider> → <RootLayout> (Grain, Cursor)
  "/" <Landing>
        <Preloader/>                 owns introTimeline (DOM + WebGL pose via refs)
        <Hero>                       owns ScrollTrigger + heroTimeline
          <HeroBackdrop> <Beam/> <Dust/> </HeroBackdrop>
          <HeroTitle/>               DOM, tweens driven by heroTimeline
          <HeroCanvas> (lazy)        reads heroTimeline.progress() in useFrame
          <HeroChrome> <Nav/> <ChapterNav/> <CropMarks/> CTAs </HeroChrome>
        </Hero>
        <Manifesto/> <NowShowing/> <FinalCta/> <Footer/>
  "/movies" "/movies/:slug" "/book/:slug"   placeholders
```

| Concern | Owner | Rule |
|---|---|---|
| Intro | `introTimeline.ts` | Builds with useGSAP in Preloader. Reverts on unmount. |
| Hero scroll | `heroTimeline.ts` | One paused timeline of duration 1, linked to one ScrollTrigger (pin, scrub: 0.8, snap). |
| WebGL transform and uniforms | `PosterPlane useFrame` | Reads progress from a ref and calls pure deriveHeroState. No GSAP, no React state per frame. |
| Pointer | `usePointerParallax` | gsap.quickTo writes to a ref and DOM transforms. |
| Active film index | `HeroContext` | The only React state: a 4-valued activeIndex, set from onUpdate when it changes. It drives the CTA label, aria-live and chapter-nav highlight. |

**Single source of truth**: `heroTimeline.progress()`. The DOM tweens live inside that timeline, and WebGL reads the same value each frame, so they can’t desync.

## Lifecycle and cleanup rules
- Every GSAP/ScrollTrigger creation lives inside `useGSAP(..., { scope })`. Nothing is created in module scope.
- Lenis wiring:
  - `lenis.on('scroll', ScrollTrigger.update)`
  - `gsap.ticker.add(t => lenis.raf(t * 1000))`
  - `gsap.ticker.lagSmoothing(0)`
  - Destroy all three on unmount.
- Set `history.scrollRestoration = 'manual'` and call `lenis.stop()` during the intro.
- After assets load: `document.fonts.ready` and textures loaded, then `ScrollTrigger.refresh()`.
- StrictMode: the app must work with double-mounts. No duplicate triggers. Verify `ScrollTrigger.getAll().length` is stable.
- WebGL: dispose geometries, materials and textures on unmount. Pause the canvas (`frameloop="never"`) when the hero is offscreen, using an IntersectionObserver that updates a state flag on enter and leave.
- Routing away and back must not leak listeners, tickers or triggers.

---

# PART 4: MASTER IMPLEMENTATION SPEC & ENGINEERING RULES

## Product & priority
- Brand: CINÉRA. Tagline: "Your seat. Your story."
- Priority 1: the cinematic landing hero ("FIRST LIGHT"). Everything else is secondary and must never dilute it.
- Stability beats ambition: the app must build and run after every phase. If an effect threatens stability, put it behind a flag in `src/config/features.ts` and ship without it.

## Hard scope fences
- **IN**: React + Vite + TypeScript + Tailwind v4 + GSAP/ScrollTrigger/@gsap/react + Lenis (flagged) + three/R3F/drei (hero only) + motion (UI state only) + React Router.
- **OUT**: backend, auth, payments, database, admin, real APIs, analytics, CMS.
- Do not add libraries beyond the list in Part 3. Do not write network code that downloads images or fonts at runtime from the web.

## Non-negotiable engineering rules
- TypeScript strict. No `any` without a comment explaining why.
- One source of truth for hero state: `heroTimeline.progress()`. Never call `setState` per frame. React state is allowed only for `activeIndex` (4 values), the canvas on/off flag, and reduced-motion/pointer-capability flags.
- All GSAP/ScrollTrigger code inside `useGSAP` with a scope. No module-scope triggers. Everything must clean up. Must work in React StrictMode.
- Animate only transform and opacity (plus CSS custom properties for colour). Never animate filter blur, backdrop-filter, box-shadow, width/height, top/left, or full-screen clip-path. `will-change` only on actively animating elements.
- No `useFrame` allocations: reuse vectors/colors; no `new` inside loops.
- Native scroll must never be blocked. No wheel/touch preventDefault hijacking. Lenis only smooths; it must be flag-controlled and off for reduced motion and touch.
- Colour management: textures use `SRGBColorSpace`; the ShaderMaterial ends with `#include <colorspace_fragment>`; `toneMapped: false`. (Prevents washed-out posters.)
- Use svh/dvh units for full-height layouts on mobile.

## Design tokens (Tailwind v4 @theme)
- Obsidian `#100B0D`, Burgundy `#481B29`, Gold `#C6A77C`, Ivory `#F5E9DD`.
- Film accents live in `src/config/films.ts` and are applied as the CSS variable `--accent` on the hero root.
- Type: Instrument Serif (display), Inter Tight (UI), IBM Plex Mono (metadata).
- Ease vocabulary and durations live in `src/config/motion.ts`; do not inline magic eases.

## Performance budgets
- Landing route JS ≤ ~400 kB gzip including three/R3F; load the canvas chunk with `React.lazy` so the preloader paints before three loads.
- Hero images: poster 1000x1500 WebP ≤ 200 kB; load the 4 posters before the intro ends. Backdrops (1920x1080 ≤ 280 kB) load lazily after intro, never block.
- Target 60 fps desktop, ≥ 50 fps mid-range mobile. Canvas dpr [1, 1.75] desktop, [1, 1.5] mobile, with drei `PerformanceMonitor` lowering dpr on decline.
- Pause the canvas, dust and beam flicker when the hero is offscreen or the tab is hidden.
- Fonts: preload the display font; use metric-matched fallbacks to avoid layout shift.
- Below-hero sections use `content-visibility: auto`.

## Accessibility & reduced motion
- `prefers-reduced-motion`: no intro (0.3 s fade), no pin/scrub, no Lenis, no parallax, no cursor, no flicker, no dust. Chapter buttons switch films with a 0.4 s crossfade. Full content remains available.
- The giant title is aria-hidden. The real film title is an `<h2>` in the chrome. An `aria-live="polite"` region announces "Reel N of 4: {title}".
- The canvas is aria-hidden. Every interactive element is keyboard reachable with a visible 2 px gold focus outline (offset 4 px). Skip-intro works via Esc/Enter/Space.
- Text contrast ≥ 4.5:1. Film accents are never used for body text.
- No flashes faster than 3 per second. The "projector on" flash happens once, <0.5 s.

## Assets & fallbacks
- Film images are supplied at `public/films/<slug>/poster.webp` and `backdrop.webp`. Slugs: `interstellar`, `the-dark-knight`, `oppenheimer`, `dune-part-two`.
- If an image is missing or fails to load, generate a fallback "plate" texture on a canvas: obsidian-to-accent gradient, film title in Instrument Serif, subtle grain. The app must look intentional with ZERO images present.
- WebGL unavailable, `hardwareConcurrency ≤ 4` with low dpr performance, or shader compile failure → render `HeroFallback` (DOM version, same composition).

## Anti-generic mandate (enforced)
- **Forbidden**: centred H1 + two buttons hero; text-left/image-right split; 3-column feature cards; rounded-2xl glass cards; purple/blue gradients; drop-shadow card stacks; icon-in-circle feature grids; emoji icons; lorem ipsum; "Welcome to"; default Tailwind palette colours; Inter as the display face; uniform spacing.
- **Required**: asymmetric composition on the 12-col grid; mono metadata with numeric indexing (01—04); 1 px gold hairlines; crop marks; oversized type with deliberate occlusion; italic/roman contrast in titles; copy that is short, specific and cinematic. Every phase ends with a self-critique: screenshot at 1440x900, 1024x768 and 390x844, compare against Part 1 and Part 2, and list what looks templated, then fix it.

## Debug tooling (gated by ?debug=1)
Small HUD: fps, dpr, hero progress, from/to/t, activeIndex, `ScrollTrigger.getAll().length`, `renderer.info.memory` (geometries/textures). `?markers=1` enables ScrollTrigger markers.
