# CINÉRA — Agent Guidelines & Engineering Standards

This document establishes non-negotiable rules for AI coding assistants working in the CINÉRA repository.

---

## 1. Inspection Before Modification
- Always inspect the existing file tree, package dependencies, and configs before writing code.
- Never blindly overwrite existing modules or delete unrelated files.
- If a file exists, understand its role in the overall architecture.

## 2. Strict Phase Boundaries
- Implement **only** the phase requested by the user.
- Do not implement unrequested future phases (e.g. do not implement Phase 02 convergence during Phase 01).
- Prepare clean interfaces and stable references so future phases connect naturally without refactoring.

## 3. Modular Architecture & Clean Separation of Concerns
- Keep components focused and single-purpose.
- Separate data definitions (`src/data/`), spatial math (`src/data/galleryLayout.ts`), presentation components (`src/components/`), and custom hooks (`src/hooks/`).
- Never put the entire application into `App.tsx` or inline heavy spatial logic into JSX.

## 4. Animation Ownership & Performance Rules
- **Isolate Transforms**: When combining global camera/scene translation with local 3D transformations, assign them to distinct parent/child DOM elements to prevent transform-property conflicts.
- **Zero React State Per Frame**: Never update React component state within `requestAnimationFrame` loops or high-frequency pointer listeners. Use mutable refs and direct DOM style mutations.
- **Strict Cleanup**: Always cancel animation frames, disconnect observers, and remove window event listeners upon component unmount.
- **Hardware Acceleration**: Use `transform3d`, `will-change: transform`, and avoid animating layout properties (`width`, `height`, `top`, `left`, `margin`).

## 5. TypeScript Strictness
- Full type safety across all interfaces. No `any` without an explicit justification comment.
- Centralize shared types in `src/types/cinema.ts`.

## 6. Build & Lint Verification
- Every milestone must pass `npm run typecheck`, `npm run lint`, and `npm run build` with zero errors and zero warnings before completion.
- Verify visual fidelity on real viewports (1440px desktop, 1024px tablet, 390px mobile).

## 7. No Invented Backend
- This is a frontend-only cinematic experience. Do not fabricate backend endpoints, authentication layers, databases, or payment gateways.
