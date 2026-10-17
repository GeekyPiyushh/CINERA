import React from 'react';
import { HeroProvider } from '../providers/HeroContext';
import { Hero } from '../components/hero/Hero';
import { Grain } from '../components/layout/Grain';
import { DebugHud } from '../components/ui/DebugHud';

/**
 * Landing Page
 * Mounts HeroProvider and the layered Hero stage with static Grain overlay
 * and optional diagnostic HUD.
 */
export const Landing: React.FC = () => {
  return (
    <HeroProvider>
      <main className="relative w-full min-h-screen bg-[#100B0D] overflow-x-hidden selection:bg-[#C6A77C] selection:text-[#100B0D]">
        {/* Layered Hero Stage (Z-stack layers 0 through 5) */}
        <Hero />

        {/* Layer z:6 Grain & Vignette */}
        <Grain />

        {/* Diagnostic HUD (gated by ?debug=1) */}
        <DebugHud />
      </main>
    </HeroProvider>
  );
};
