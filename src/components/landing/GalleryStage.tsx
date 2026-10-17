import React from 'react';
import { usePointerInertia } from '../../hooks/usePointerInertia';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface GalleryStageProps {
  children: React.ReactNode;
}

/**
 * GalleryStage
 * Hosts the 3D perspective context (perspective: 1100px; transform-style: preserve-3d).
 * The inner wrapper handles pointer-driven inertial translation (X: ±180px, Y: ±110px)
 * completely separated from tile-level concave transforms.
 */
export const GalleryStage: React.FC<GalleryStageProps> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  const inertiaRef = usePointerInertia<HTMLDivElement>({
    maxX: 180,
    maxY: 110,
    damping: 0.055,
    disabled: prefersReducedMotion,
  });

  return (
    <div className="relative w-screen h-screen h-[100dvh] overflow-hidden bg-[#100B0D] perspective-stage flex items-center justify-center select-none">
      {/* Deep Burgundy ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(72, 27, 41, 0.45) 0%, rgba(16, 11, 13, 0.8) 60%, #100B0D 100%)',
        }}
      />

      {/* Inertial motion wrapper — isolated translation in X and Y */}
      <div
        ref={inertiaRef}
        className="relative preserve-3d flex items-center justify-center w-[130vw] h-[125vh] max-w-[2000px] max-h-[1400px] pointer-events-auto"
        style={{
          transformOrigin: '50% 50%',
        }}
      >
        {children}
      </div>
    </div>
  );
};
