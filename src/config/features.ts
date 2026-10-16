/**
 * CINÉRA Feature Flags
 * Allows disabling or toggling individual visual/interactive systems
 * to maintain 60fps stability and graceful degradation.
 */
export const FEATURES = {
  lenis: true,
  cursor: true,
  dust: true,
  beam: true,
  shaderTransition: true,
  debug: false,
} as const;

export type FeatureKey = keyof typeof FEATURES;
