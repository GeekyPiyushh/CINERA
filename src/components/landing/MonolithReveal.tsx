import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

interface MonolithRevealProps {
  titleRef: React.RefObject<HTMLDivElement | null>;
  glowRef: React.RefObject<HTMLDivElement | null>;
  metadataRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * MonolithReveal
 * Hosts the Act V monolith reveal assets:
 * - Oversized INTERSTELLAR typography behind the movie screen frame (z-10, masked vertical reveal)
 * - Restrained Burgundy atmospheric glow
 * - Minimalist archival film metadata row and Explore Movies CTA (z-30)
 */
export const MonolithReveal = forwardRef<HTMLDivElement, MonolithRevealProps>(
  ({ titleRef, glowRef, metadataRef }, _ref) => {
    return (
      <>
        {/* Layer 1: Restrained Burgundy Atmospheric Glow (z-0 behind everything) */}
        <div
          ref={glowRef}
          className="monolith-glow absolute inset-0 pointer-events-none opacity-0 select-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(72, 27, 41, 0.75) 0%, rgba(20, 10, 14, 0.85) 60%, #100B0D 100%)',
          }}
        />

        {/* Layer 2: Giant INTERSTELLAR Typography (z-10: Sits BEHIND the movie monolith frame) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 select-none">
          <div className="overflow-hidden pb-4">
            <div
              ref={titleRef}
              className="font-serif text-[11vw] md:text-[13vw] tracking-[0.16em] uppercase text-[#F5E9DD] leading-[0.85] text-center will-change-transform drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] opacity-0 translate-y-full"
            >
              INTERSTELLAR
            </div>
          </div>
        </div>

        {/* Layer 3: Minimal Metadata Row & Explore Repertory CTA (z-30: Positioned cleanly below the monolith) */}
        <div
          ref={metadataRef}
          className="absolute bottom-[4.5vh] md:bottom-[6vh] left-0 right-0 flex flex-col items-center justify-center pointer-events-auto z-30 opacity-0 translate-y-6 transition-all duration-300"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Editorial Metadata Tags */}
            <div className="flex items-center gap-3 sm:gap-6 font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#F5E9DD]/80 uppercase">
              <span className="text-[#C6A77C]">REEL 01</span>
              <span className="w-1 h-1 rounded-full bg-[#C6A77C]/50" />
              <span>CHRISTOPHER NOLAN</span>
              <span className="w-1 h-1 rounded-full bg-[#C6A77C]/50" />
              <span>2014</span>
              <span className="w-1 h-1 rounded-full bg-[#C6A77C]/50" />
              <span>169 MIN</span>
            </div>

            {/* Action CTA Button */}
            <div className="mt-1">
              <Link
                to="/movies"
                className="group relative inline-flex items-center gap-3 px-7 py-3 border border-[#C6A77C]/40 bg-[#100B0D]/90 backdrop-blur-md text-[#F5E9DD] font-mono text-xs tracking-[0.22em] uppercase hover:border-[#C6A77C] hover:bg-[#C6A77C]/15 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
              >
                <span>EXPLORE ALL MOVIES</span>
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
