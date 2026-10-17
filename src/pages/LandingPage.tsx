import React from 'react';
import { ConcaveGallery } from '../components/landing/ConcaveGallery';

/**
 * LandingPage
 * The Concave Horizon to Monolith Portal (Phase 01)
 * Fullscreen spatial 3D gallery of 15 cinematic tiles with pointer inertia,
 * perimeter HUD, and zero generic marketing fluff.
 */
export const LandingPage: React.FC = () => {
  return (
    <main className="relative w-full bg-[#100B0D] select-none">
      <ConcaveGallery />
    </main>
  );
};
