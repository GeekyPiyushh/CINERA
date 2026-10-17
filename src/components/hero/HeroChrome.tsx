import React from 'react';
import { Link } from 'react-router-dom';
import { FILMS } from '../../config/films';
import { useHeroContext } from '../../hooks/useHeroContext';
import { Nav } from '../layout/Nav';
import { CropMarks } from '../ui/CropMarks';

/**
 * HeroChrome
 * Layer z:5 in the architectural z-stack.
 * Contains Nav, CropMarks, Chapter index, Meta block, Primary CTA,
 * Scroll hint, and overlapping italic caption on the plane edge.
 */
export const HeroChrome: React.FC = () => {
  const { activeIndex } = useHeroContext();
  const currentFilm = FILMS[activeIndex] || FILMS[0];

  return (
    <div className="absolute inset-0 z-[5] pointer-events-none flex flex-col justify-between p-[4vw]">
      {/* Top Nav */}
      <Nav />

      {/* Screen-reader accessible live announcement per Part 4 Accessibility */}
      <div className="sr-only" aria-live="polite">
        Reel {currentFilm.reelNumber} of 04: {currentFilm.title}
      </div>

      {/* Top-left Mono Metadata */}
      <div className="absolute top-24 left-[4vw] space-y-1">
        <div className="text-[11px] font-mono tracking-[0.2em] text-[#C6A77C] uppercase">
          REEL {currentFilm.reelNumber} — FIRST LIGHT
        </div>
        <h2 className="text-xs font-mono tracking-[0.18em] text-[#F5E9DD]/70 uppercase">
          {currentFilm.meta}
        </h2>
        <div className="w-12 h-[1px] bg-[#C6A77C]/30 mt-2" />
      </div>

      {/* Right-edge Chapter Nav (Vertical Index) */}
      <div className="absolute top-1/2 right-[4vw] -translate-y-1/2 pointer-events-auto hidden md:flex flex-col items-end gap-5">
        <div className="text-[10px] font-mono tracking-[0.2em] text-[#C6A77C]/60 uppercase mb-2">
          REEL SELECTION
        </div>
        {FILMS.map((f, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={f.id}
              className={`group flex items-center gap-3 text-xs font-mono tracking-[0.16em] uppercase transition-all ${
                isActive ? 'text-[#C6A77C]' : 'text-[#F5E9DD]/40 hover:text-[#F5E9DD]/80'
              }`}
            >
              <span className="text-[11px]">{f.reelNumber}</span>
              <span className="hidden lg:inline">{f.title}</span>
              <div
                className={`w-6 h-[1px] transition-all duration-300 ${
                  isActive ? 'w-10 bg-[#C6A77C]' : 'bg-[#C6A77C]/20 group-hover:bg-[#C6A77C]/50'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Overlapping small italic caption at plane edge for depth */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-[48%] pointer-events-none"
        aria-hidden="true"
      >
        <div className="relative w-[72vw] max-w-[290px] sm:max-w-[340px] md:max-w-[390px] lg:max-w-[430px] aspect-[2/3]">
          <div className="absolute bottom-3 -right-6 md:bottom-6 md:-right-16 z-10 max-w-[200px] md:max-w-[260px] text-right pointer-events-none">
            <p className="font-display italic text-sm md:text-base text-[#F5E9DD]/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
              {currentFilm.editorialLine}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Hero Controls & Primary CTA */}
      <div className="absolute bottom-[4vw] left-[4vw] right-[4vw] flex flex-col md:flex-row items-center md:items-end justify-between gap-4 pointer-events-auto">
        {/* Bottom Primary CTA */}
        <Link
          to={`/movies/${currentFilm.slug}`}
          className="group relative inline-flex items-center justify-center gap-4 w-full sm:w-auto px-6 py-3 border border-[#C6A77C]/40 bg-[#100B0D]/80 hover:bg-[#C6A77C] hover:text-[#100B0D] transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77C] group-hover:bg-[#100B0D]" />
          <span className="text-xs font-mono tracking-[0.18em] uppercase font-semibold">
            Book tickets — {currentFilm.title}
          </span>
          <span className="font-mono text-xs text-[#C6A77C] group-hover:text-[#100B0D] transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

        {/* Centered Scroll Hint */}
        <div className="hidden sm:flex flex-col items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-[#F5E9DD]/50 uppercase pointer-events-none">
          <span>SCROLL TO THREAD REEL</span>
          <span className="text-[#C6A77C]">↓</span>
        </div>

        {/* Mobile Reel indicator */}
        <div className="md:hidden text-xs font-mono tracking-[0.18em] text-[#C6A77C]">
          REEL 0{activeIndex + 1} / 04
        </div>
      </div>

      {/* Viewport Corner Crop Marks */}
      <CropMarks />
    </div>
  );
};
