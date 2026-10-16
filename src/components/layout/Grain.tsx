import React from 'react';

/**
 * Grain and Vignette overlay
 * Layer z:6 in the architectural z-stack.
 * Static noise tile, low opacity (0.06), with NO blend modes for guaranteed 60fps performance.
 */
export const Grain: React.FC = () => {
  // SVG feTurbulence static noise encoded as data URI for instantaneous zero-network rendering
  const svgNoise = `data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.06'/></svg>`;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 select-none"
      aria-hidden="true"
      style={{
        backgroundImage: `url("${svgNoise}")`,
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Subtle radial vignette (darkening corners slightly toward obsidian) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(16, 11, 13, 0.65) 100%)',
        }}
      />
    </div>
  );
};
