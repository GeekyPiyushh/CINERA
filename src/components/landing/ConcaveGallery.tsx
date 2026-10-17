import React, { useState, useRef, useEffect } from 'react';
import { GALLERY_TILES } from '../../data/galleryLayout';
import { GalleryStage } from './GalleryStage';
import { CinemaTile } from './CinemaTile';
import { PerimeterHUD } from './PerimeterHUD';
import { GalleryFallback } from './GalleryFallback';
import type { GalleryHUDState } from '../../types/cinema';

export const ConcaveGallery: React.FC = () => {
  const [hoveredFilm, setHoveredFilm] = useState<GalleryHUDState['hoveredFilm']>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Stable refs for all 15 tiles, preserving compatibility for Phase 02 GSAP monolith convergence
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <GalleryFallback />;
  }

  return (
    <div className="relative w-full h-screen h-[100dvh] overflow-hidden bg-[#100B0D]">
      {/* Stationary Perimeter HUD */}
      <PerimeterHUD hoveredFilm={hoveredFilm} />

      {/* 3D Concave Gallery Stage with Pointer Inertia */}
      <GalleryStage>
        <div
          className={`grid grid-cols-5 grid-rows-3 gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10 gap-y-4 sm:gap-y-6 md:gap-y-8 items-center justify-items-center w-full h-full preserve-3d py-12 ${
            hoveredFilm !== null ? 'gallery-has-hover' : ''
          }`}
        >
          {GALLERY_TILES.map((tile, i) => {
            const isActive = hoveredFilm !== null && hoveredFilm.filmId === tile.filmId;

            return (
              <CinemaTile
                key={tile.id}
                ref={(el) => {
                  tileRefs.current[i] = el;
                }}
                tile={tile}
                isActive={isActive}
                onHover={setHoveredFilm}
              />
            );
          })}
        </div>
      </GalleryStage>
    </div>
  );
};
