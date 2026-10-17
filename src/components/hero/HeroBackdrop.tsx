import React from 'react';

/**
 * HeroBackdrop
 * Layer z:0 in the architectural z-stack.
 * Obsidian #100B0D base (~70% surface), permanent deep burgundy #481B29 glow
 * in the lower-left at 45-55% opacity, and subtle film accent glow behind the plane.
 */
export const HeroBackdrop: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#100B0D]">
      {/* Permanent deep burgundy glow in lower-left (45-55% opacity) */}
      <div
        className="absolute -bottom-[12vh] -left-[10vw] w-[65vw] h-[65vh] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(72, 27, 41, 0.52) 0%, rgba(72, 27, 41, 0.18) 45%, transparent 70%)',
        }}
      />

      {/* Film accent glow directly behind the central plane (max ~3% of surface) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-[48%] w-[48vw] h-[58vh] rounded-full pointer-events-none transition-colors duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle at center, color-mix(in srgb, var(--accent, #9BCBDD) 25%, transparent) 0%, color-mix(in srgb, var(--accent, #9BCBDD) 8%, transparent) 40%, transparent 70%)',
        }}
      />

      {children}
    </div>
  );
};
