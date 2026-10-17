import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import type { Film } from '../../types/cinema';
import { FILMS } from '../../data/films';
import { FilmChapterSelector } from './FilmChapterSelector';

interface MonolithRevealProps {
  activeFilm: Film;
  nextFilm: Film | null;
  onSelectFilm: (film: Film) => void;
  isTransitioning: boolean;
  titleRef: React.RefObject<HTMLDivElement | null>;
  titleIncomingRef: React.RefObject<HTMLDivElement | null>;
  glowRef: React.RefObject<HTMLDivElement | null>;
  glowIncomingRef: React.RefObject<HTMLDivElement | null>;
  metadataRef: React.RefObject<HTMLDivElement | null>;
  metadataContentRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * MonolithReveal (Phase 03: The Cinematic Multiverse)
 * Hosts:
 * - Double-buffered atmospheric background auras for seamless color crossfades
 * - Masked vertical reveal of oversized editorial typography behind the frame
 * - Refined 4-film chapter selector (01 Interstellar, 02 The Dark Knight, 03 Dune 2, 04 Oppenheimer)
 * - Dynamic metadata panel and direct route CTA (/movies/:slug)
 */
export const MonolithReveal = forwardRef<HTMLDivElement, MonolithRevealProps>(
  (
    {
      activeFilm,
      nextFilm,
      onSelectFilm,
      isTransitioning,
      titleRef,
      titleIncomingRef,
      glowRef,
      glowIncomingRef,
      metadataRef,
      metadataContentRef,
    },
    _ref,
  ) => {
    return (
      <>
        {/* Layer 1: Ambient Atmospheric Glow Layers (z-0 behind everything) */}
        {/* Current Film Aura */}
        <div
          ref={glowRef}
          className="monolith-glow-current absolute inset-0 pointer-events-none opacity-0 select-none z-0 transition-transform duration-700"
          style={{
            background: `radial-gradient(ellipse 75% 65% at 50% 50%, ${activeFilm.themeColors.glow} 0%, rgba(20, 10, 14, 0.85) 60%, #100B0D 100%)`,
          }}
        />

        {/* Incoming Film Aura (Buffer B for smooth crossfading) */}
        <div
          ref={glowIncomingRef}
          className="monolith-glow-incoming absolute inset-0 pointer-events-none opacity-0 select-none z-0 transition-transform duration-700"
          style={{
            background: nextFilm
              ? `radial-gradient(ellipse 75% 65% at 50% 50%, ${nextFilm.themeColors.glow} 0%, rgba(20, 10, 14, 0.85) 60%, #100B0D 100%)`
              : undefined,
          }}
        />

        {/* Layer 2: Giant Editorial Typography (z-10: Sits BEHIND the central movie monolith frame) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 select-none px-4">
          <div className="overflow-hidden pb-4 relative w-full flex justify-center items-center h-[16vw] max-h-[160px] min-h-[90px]">
            {/* Active Film Title */}
            <div
              ref={titleRef}
              className="font-serif text-[clamp(2.5rem,8.5vw,11.5vw)] tracking-[0.14em] uppercase text-[#F5E9DD] leading-[0.85] text-center will-change-transform drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] opacity-0 translate-y-full whitespace-nowrap absolute"
            >
              {activeFilm.title.toUpperCase()}
            </div>

            {/* Incoming Film Title (for masked upward transition) */}
            <div
              ref={titleIncomingRef}
              className="font-serif text-[clamp(2.5rem,8.5vw,11.5vw)] tracking-[0.14em] uppercase text-[#F5E9DD] leading-[0.85] text-center will-change-transform drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] opacity-0 translate-y-full whitespace-nowrap absolute"
            >
              {nextFilm ? nextFilm.title.toUpperCase() : ''}
            </div>
          </div>
        </div>

        {/* Layer 3: Minimal Metadata Panel & Chapter Navigation (z-30: Positioned below the frame) */}
        <div
          ref={metadataRef}
          className="absolute bottom-[3vh] md:bottom-[4.5vh] left-0 right-0 flex flex-col items-center justify-center pointer-events-auto z-30 opacity-0 translate-y-6 select-none"
        >
          <div
            ref={metadataContentRef}
            className="flex flex-col items-center gap-3 md:gap-4 text-center max-w-2xl px-6 transition-all duration-300"
          >
            {/* Four-Film Chapter Selector */}
            <FilmChapterSelector
              films={FILMS}
              activeFilmId={activeFilm.id}
              onSelectFilm={onSelectFilm}
              isTransitioning={isTransitioning}
            />

            {/* Editorial Metadata Tags */}
            <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-4 font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-[#F5E9DD]/80 uppercase">
              <span className="text-[#C6A77C] font-semibold">REEL {activeFilm.reelNumber}</span>
              <span className="w-1 h-1 rounded-full bg-[#C6A77C]/50" />
              <span>{activeFilm.director}</span>
              <span className="w-1 h-1 rounded-full bg-[#C6A77C]/50" />
              <span>{activeFilm.year}</span>
              <span className="w-1 h-1 rounded-full bg-[#C6A77C]/50" />
              <span className="text-[#F5E9DD]/60">{activeFilm.runtime}</span>
            </div>

            {/* Concise Cinematic Synopsis */}
            <p className="font-serif italic text-xs sm:text-sm text-[#F5E9DD]/75 max-w-lg leading-relaxed line-clamp-2 px-2">
              "{activeFilm.description}"
            </p>

            {/* Primary Action CTA (Navigates to /movies/:slug) */}
            <div className="mt-1">
              <Link
                to={`/movies/${activeFilm.slug}`}
                className="group relative inline-flex items-center gap-3 px-6 py-2.5 border border-[#C6A77C]/40 bg-[#100B0D]/90 backdrop-blur-md text-[#F5E9DD] font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase hover:border-[#C6A77C] hover:bg-[#C6A77C]/15 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
              >
                <span>EXPLORE FILM ARCHIVE</span>
                <span className="text-[#C6A77C] group-hover:translate-x-1 transition-transform">
                  →
                </span>
                {/* Champagne Gold Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C6A77C]" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C6A77C]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C6A77C]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C6A77C]" />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  },
);

MonolithReveal.displayName = 'MonolithReveal';
