import React, { useState } from 'react';
import { FILMS } from '../../config/films';
import { useHeroContext } from '../../hooks/useHeroContext';
import { getFallbackPlateDataUrl } from '../../lib/fallbackTexture';

/**
 * HeroFallback
 * Exact DOM-based replica of the poster plane composition.
 * Rendered when WebGL is unavailable, on low-power devices, or when ?nowebgl=1 is specified.
 */
export const HeroFallback: React.FC = () => {
  const { activeIndex } = useHeroContext();
  const currentFilm = FILMS[activeIndex] || FILMS[0];
  const [usePlate, setUsePlate] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('noimages') === '1';
  });

  const plateUrl = getFallbackPlateDataUrl({
    titleLineA: currentFilm.titleLineA,
    titleLineB: currentFilm.titleLineB,
    meta: currentFilm.meta,
    accent: currentFilm.accent,
    reelNumber: currentFilm.reelNumber,
  });

  return (
    <div className="absolute inset-0 z-[4] flex items-center justify-center pointer-events-none">
      {/* Plane container with deliberate 2% offset toward lower-left */}
      <div className="relative pointer-events-auto transform -translate-x-[2%] translate-y-[2%]">
        {/* Outer Outline Frame (scale 1.14, 18% opacity) */}
        <div
          className="absolute -inset-6 sm:-inset-8 border border-[#C6A77C]/20 pointer-events-none rounded-none"
          aria-hidden="true"
        />

        {/* Inner Outline Frame (scale 1.06, 35% opacity) */}
        <div
          className="absolute -inset-3 sm:-inset-3.5 border border-[#C6A77C]/35 pointer-events-none rounded-none"
          aria-hidden="true"
        />

        {/* Poster Plane: 74vw on mobile, 2:3 aspect ratio */}
        <div className="relative w-[72vw] max-w-[290px] sm:max-w-[340px] md:max-w-[390px] lg:max-w-[430px] aspect-[2/3] bg-[#100B0D] shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-[#C6A77C]/50 overflow-hidden">
          <img
            src={usePlate ? plateUrl : currentFilm.poster}
            alt={`${currentFilm.title} poster plate`}
            onError={() => setUsePlate(true)}
            className="w-full h-full object-cover"
          />

          {/* 1px gold interior border line */}
          <div className="absolute inset-0 border border-[#C6A77C]/25 pointer-events-none" />

          {/* Vignette on poster edges */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 40px rgba(16, 11, 13, 0.65)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
