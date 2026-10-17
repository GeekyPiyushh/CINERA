import React from 'react';

/**
 * Beam
 * Layer z:1 in the architectural z-stack.
 * Projector cone from top-centre toward the poster plane.
 * Warm Ivory #F5E9DD at 8% opacity, mix-blend-mode: screen, mask-softened with NO blur filter.
 */
export const Beam: React.FC = () => {
  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none select-none"
      aria-hidden="true"
      style={{
        background: 'radial-gradient(ellipse 52% 80% at 50% -5%, rgba(245, 233, 221, 0.08) 0%, rgba(245, 233, 221, 0.03) 38%, transparent 75%)',
        mixBlendMode: 'screen',
      }}
    />
  );
};
