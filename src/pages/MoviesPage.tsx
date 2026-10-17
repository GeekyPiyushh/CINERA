import React from 'react';
import { Link } from 'react-router-dom';
import { FILMS } from '../data/films';
import { BrandWordmark } from '../components/ui/BrandWordmark';

/**
 * MoviesPage
 * Clean, minimal placeholder for the future movie discovery application (Phase 01).
 * Features CINÉRA branding, "NOW SHOWING" title, curated archive preview, and back navigation.
 */
export const MoviesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#100B0D] text-[#F5E9DD] px-[4vw] py-10 selection:bg-[#C6A77C] selection:text-[#100B0D]">
      {/* Ambient background burgundy glow */}
      <div
        className="fixed bottom-0 left-0 w-[50vw] h-[50vh] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(72, 27, 41, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Top Bar with Brand and Back Link */}
      <header className="flex justify-between items-center border-b border-[#C6A77C]/20 pb-6 mb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-[#C6A77C] hover:underline uppercase"
        >
          ← Return to Concave Gallery
        </Link>
        <BrandWordmark subtitle="NOW SHOWING" />
        <div className="font-mono text-xs text-[#F5E9DD]/60 hidden sm:block tracking-[0.16em]">
          REPERTOIRE ARCHIVE
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto space-y-16">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="font-mono text-xs tracking-[0.25em] text-[#C6A77C] uppercase">
            CINÉRA CURATION // SEASON 2026
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-normal tracking-tight">
            Now <span className="italic text-[#C6A77C]">Showing</span>
          </h1>
          <p className="font-sans text-sm md:text-base text-[#F5E9DD]/70 leading-relaxed">
            Large-format 70mm and dual laser projections. The full discovery and booking experience will be unlocked in subsequent releases.
          </p>
        </div>

        {/* Minimal Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FILMS.map((film, index) => (
            <div
              key={film.id}
              className="group border border-[#C6A77C]/20 p-6 bg-[#100B0D]/60 hover:border-[#C6A77C]/60 transition-all duration-300 space-y-5"
            >
              <div className="flex justify-between items-center font-mono text-[11px] text-[#C6A77C] tracking-[0.18em]">
                <span>REEL 0{index + 1}</span>
                <span>{film.runtime}</span>
              </div>

              <div className="aspect-[16/9] overflow-hidden bg-black/40 border border-[#C6A77C]/20">
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-3xl text-[#F5E9DD]">
                  {film.title}
                </h2>
                <div className="font-mono text-xs tracking-[0.14em] text-[#F5E9DD]/60">
                  {film.year} · Directed by {film.director}
                </div>
                <p className="font-sans text-xs text-[#F5E9DD]/70 pt-2 leading-relaxed">
                  {film.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="text-center pt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#C6A77C] text-xs font-mono tracking-[0.2em] text-[#C6A77C] hover:bg-[#C6A77C] hover:text-[#100B0D] transition-all duration-300 uppercase font-semibold"
          >
            ← Return to Concave Gallery
          </Link>
        </div>
      </main>
    </div>
  );
};
