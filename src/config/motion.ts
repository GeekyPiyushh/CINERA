/**
 * CINÉRA Motion Language & Design Tokens
 * Strictly enforces expo and power/quart eases with no bounce.
 */
export const EASING = {
  // GSAP Easing strings
  expoInOut: 'expo.inOut',
  expoIn: 'expo.in',
  expoOut: 'expo.out',
  power4Out: 'power4.out',
  power3Out: 'power3.out',
  power3InOut: 'power3.inOut',
  power2In: 'power2.in',
  power2Out: 'power2.out',
  power2InOut: 'power2.inOut',
  none: 'none',

  // CSS Cubic-Beziers
  cssOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  cssInOut: 'cubic-bezier(0.76, 0, 0.24, 1)',
} as const;

export const DURATIONS = {
  instant: 0.15,
  fast: 0.3,
  standard: 0.6,
  long: 0.9,
  splitPanel: 1.1,
  convergence: 1.4,
  chapterSwitch: 1.6,
  irisTransition: 1.8,
  heldBeat: 0.45,
} as const;
