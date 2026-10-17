import React from 'react';
import type { Film } from '../../types/cinema';

interface FilmChapterSelectorProps {
  films: Film[];
  activeFilmId: string;
  onSelectFilm: (film: Film) => void;
  isTransitioning?: boolean;
}

/**
 * FilmChapterSelector
 * Minimalist, luxury editorial horizontal chapter navigation for the four canonical films:
 * 01 INTERSTELLAR · 02 THE DARK KNIGHT · 03 DUNE: PART TWO · 04 OPPENHEIMER
 * Uses real semantic buttons, animated Champagne Gold underline indicator,
 * and keyboard accessibility.
 */
export const FilmChapterSelector: React.FC<FilmChapterSelectorProps> = ({
  films,
  activeFilmId,
  onSelectFilm,
  isTransitioning = false,
}) => {
  return (
    <nav
      aria-label="Repertory Film Chapters"
      className="w-full flex justify-center items-center overflow-x-auto no-scrollbar py-2 px-4"
    >
      <div className="flex items-center gap-6 sm:gap-10 md:gap-14 whitespace-nowrap">
        {films.map((film) => {
          const isActive = film.id === activeFilmId;

          return (
            <button
              key={film.id}
              type="button"
              onClick={() => onSelectFilm(film)}
              disabled={isTransitioning && isActive}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`Select chapter ${film.reelNumber}: ${film.title}`}
              className={`group relative flex items-center gap-2.5 py-2.5 text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A77C] ${
                isActive
                  ? 'text-[#F5E9DD] opacity-100'
                  : 'text-[#F5E9DD]/45 hover:text-[#F5E9DD]/90 hover:opacity-100'
              }`}
            >
              {/* Film Reel Index */}
              <span
                className={`transition-colors duration-300 ${
                  isActive ? 'text-[#C6A77C] font-semibold' : 'text-[#C6A77C]/60 group-hover:text-[#C6A77C]'
                }`}
              >
                {film.reelNumber}
              </span>

              {/* Film Title */}
              <span className="font-sans font-medium tracking-[0.16em] text-[11px] sm:text-xs">
                {film.title.toUpperCase()}
              </span>

              {/* Thin Animated Champagne Gold Underline */}
              <span
                className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C6A77C] transition-all duration-500 ease-out ${
                  isActive
                    ? 'w-full opacity-100 shadow-[0_0_8px_rgba(198,167,124,0.6)]'
                    : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-40'
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
