import React from 'react';
import { Link } from 'react-router-dom';
import { FILMS } from '../config/films';
import { Nav } from '../components/layout/Nav';
import { CropMarks } from '../components/ui/CropMarks';
import { Grain } from '../components/layout/Grain';

export const Movies: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#100B0D] text-[#F5E9DD] px-[4vw] pt-28 pb-20 selection:bg-[#C6A77C] selection:text-[#100B0D]">
      <Nav />
      <CropMarks />
      <Grain />

      {/* Atmospheric ambient glow */}
      <div
        className="fixed bottom-0 left-0 w-[55vw] h-[55vh] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(72, 27, 41, 0.45) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="border-b border-[#C6A77C]/25 pb-8 space-y-4">
          <div className="text-xs font-mono tracking-[0.2em] text-[#C6A77C] uppercase">
            CINÉRA REPERTOIRE // REEL ARCHIVE
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-normal tracking-tight">
            Curated <span className="italic text-[#C6A77C]">Screenings</span>
          </h1>
          <p className="font-mono text-xs md:text-sm tracking-[0.08em] text-[#F5E9DD]/70 max-w-xl">
            Four masterworks presented in large-format 70mm and dual laser projection.
          </p>
        </header>

        {/* Film Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FILMS.map((film) => (
            <Link
              key={film.slug}
              to={`/movies/${film.slug}`}
              className="group block space-y-4 p-4 border border-[#C6A77C]/15 hover:border-[#C6A77C]/60 bg-[#100B0D]/60 transition-all duration-300"
            >
              <div className="flex justify-between items-center text-[11px] font-mono tracking-[0.18em] text-ivory/60">
                <span>REEL {film.reelNumber}</span>
                <span style={{ color: film.accent }}>{film.accentName}</span>
              </div>

              <div className="relative aspect-[2/3] overflow-hidden bg-black/40 border border-[#C6A77C]/20">
                <img
                  src={film.poster}
                  alt={film.title}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  onError={(e) => {
                    // Fallback to stylized dark plate on error
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100B0D] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <div className="font-display text-2xl text-[#F5E9DD]">{film.titleLineA}</div>
                  <div className="font-display italic text-xl text-[#C6A77C]">{film.titleLineB}</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono tracking-[0.14em] text-ivory/70">
                  {film.year} · {film.director}
                </div>
                <div className="text-[11px] font-mono tracking-[0.1em] text-[#C6A77C] flex justify-between items-center pt-2">
                  <span>VIEW DETAILS</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Return link */}
        <div className="pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.18em] uppercase text-[#C6A77C] hover:underline"
          >
            ← Return to Projection
          </Link>
        </div>
      </div>
    </div>
  );
};
