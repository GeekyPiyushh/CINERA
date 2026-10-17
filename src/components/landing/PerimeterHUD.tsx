import React from 'react';
import { Link } from 'react-router-dom';
import { BrandWordmark } from '../ui/BrandWordmark';
import type { GalleryHUDState } from '../../types/cinema';

interface PerimeterHUDProps {
  hoveredFilm: GalleryHUDState['hoveredFilm'];
}

export const PerimeterHUD: React.FC<PerimeterHUDProps> = ({ hoveredFilm }) => {
  const subtitle = hoveredFilm
    ? `${hoveredFilm.title.toUpperCase()} — ${hoveredFilm.director.toUpperCase()}`
    : 'YOUR SEAT. YOUR STORY.';

  return (
    <header className="fixed inset-0 pointer-events-none z-30 select-none p-[3vw]">
      {/* 4 Viewport Corner Crop Marks */}
      <div className="crop-corner top-[2vw] left-[2vw] border-t border-l" aria-hidden="true" />
      <div className="crop-corner top-[2vw] right-[2vw] border-t border-r" aria-hidden="true" />
      <div className="crop-corner bottom-[2vw] left-[2vw] border-b border-l" aria-hidden="true" />
      <div className="crop-corner bottom-[2vw] right-[2vw] border-b border-r" aria-hidden="true" />

      {/* Top Left: REPERTORY INDEX */}
      <div className="absolute top-[3vw] left-[3vw] pointer-events-auto">
        <Link
          to="/movies"
          className="group flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#F5E9DD]/70 hover:text-[#F5E9DD] uppercase transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77C]/60 group-hover:bg-[#C6A77C] transition-colors" />
          <span>REPERTORY INDEX</span>
        </Link>
      </div>

      {/* Top Center: Brand + Dynamic Editorial Subtitle */}
      <div className="absolute top-[2vw] left-1/2 -translate-x-1/2 pointer-events-none z-40">
        <div className="pointer-events-auto inline-flex flex-col items-center px-6 py-2 bg-[#100B0D]/80 backdrop-blur-md border border-[#C6A77C]/25 rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <BrandWordmark subtitle={subtitle} />
        </div>
      </div>

      {/* Top Right: EXPLORE MOVIES */}
      <div className="absolute top-[3vw] right-[3vw] pointer-events-auto">
        <Link
          to="/movies"
          className="relative px-4 py-2 border border-[#C6A77C]/30 text-xs font-mono tracking-[0.2em] uppercase text-[#F5E9DD] hover:border-[#C6A77C] hover:bg-[#C6A77C]/10 transition-all duration-300 shadow-[0_0_15px_rgba(198,167,124,0.1)]"
        >
          EXPLORE MOVIES
        </Link>
      </div>

      {/* Bottom Center: Interaction Guidance (Phase 01) */}
      <div className="absolute bottom-[3vw] left-1/2 -translate-x-1/2 text-center pointer-events-auto">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#C6A77C]/20 bg-[#100B0D]/70 backdrop-blur-sm">
          <span className="w-1 h-1 rounded-full bg-[#C6A77C] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#F5E9DD]/60 uppercase">
            MOVE TO EXPLORE
          </span>
        </div>
      </div>
    </header>
  );
};
