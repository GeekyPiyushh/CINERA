import React, { useEffect, useRef, useState } from 'react';
import { FILMS } from '../../config/films';
import { useHeroContext } from '../../hooks/useHeroContext';

/**
 * HeroTitle
 * Layer z:3 in the architectural z-stack.
 * Stacks all four film title groups behind the poster plane.
 * Dynamic fit-to-width via ResizeObserver and per-film fitMultiplier (spans 78-90vw).
 * Strictly aria-hidden per accessibility mandate (real title is in HeroChrome <h2>).
 */
export const HeroTitle: React.FC = () => {
  const { activeIndex } = useHeroContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSizes, setFontSizes] = useState<number[]>([120, 120, 120, 120]);

  useEffect(() => {
    const updateSizes = () => {
      const vw = window.innerWidth;
      const isMobile = vw < 768;

      const newSizes = FILMS.map((film) => {
        if (isMobile) {
          // Mobile: ~20vw per Part 2.G
          return Math.min(Math.max(vw * 0.22, 54), 100);
        }
        // Desktop: Widest line spans 78-90vw
        const targetWidth = vw * 0.84 * film.fitMultiplier;
        return Math.min(Math.max(targetWidth / 3.4, 64), 240);
      });

      setFontSizes(newSizes);
    };

    updateSizes();
    const observer = new ResizeObserver(updateSizes);
    if (document.body) {
      observer.observe(document.body);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none select-none px-[4vw]"
      aria-hidden="true"
    >
      {FILMS.map((film, idx) => {
        const isCurrent = idx === activeIndex;
        const fontSize = fontSizes[idx] || 120;

        return (
          <div
            key={film.id}
            data-film-index={idx}
            className={`absolute inset-0 flex flex-col items-center justify-center leading-[0.8] tracking-[-0.02em] font-display transition-opacity duration-500 ${
              isCurrent ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Title Line A: Roman caps, offset horizontally to the left */}
            <div
              className="text-[#F5E9DD] whitespace-nowrap will-change-transform transform -translate-x-[26vw] sm:-translate-x-[18vw]"
              style={{ fontSize: `${fontSize}px` }}
            >
              {film.titleLineA}
            </div>

            {/* Title Line B: Lowercase italic gold, offset horizontally to the right */}
            <div
              className="italic text-[#C6A77C] whitespace-nowrap will-change-transform transform translate-x-[26vw] sm:translate-x-[18vw] mt-[-0.1em]"
              style={{ fontSize: `${fontSize}px` }}
            >
              {film.titleLineB}
            </div>
          </div>
        );
      })}
    </div>
  );
};
