import React from 'react';
import { Link } from 'react-router-dom';
import { FILMS } from '../../data/films';
import { BrandWordmark } from '../ui/BrandWordmark';

/**
 * GalleryFallback
 * Lightweight, luxurious mobile presentation for CINÉRA.
 * Replaces expensive 3D CSS transforms with a clean editorial composition.
 */
export const GalleryFallback: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#100B0D] text-[#F5E9DD] px-6 py-12 flex flex-col justify-between">
      {/* Soft Burgundy atmospheric background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(72, 27, 41, 0.45) 0%, rgba(16, 11, 13, 0.95) 75%)',
        }}
      />

      {/* Mobile Header */}
      <header className="relative z-10 space-y-6 text-center pt-4">
        <BrandWordmark subtitle="THE ICONIC COLLECTION" />
        <p className="font-mono text-xs tracking-[0.16em] text-[#F5E9DD]/65 uppercase max-w-xs mx-auto">
          A spatial archive of iconic cinema. Curated 70mm & large-format revival.
        </p>
      </header>

      {/* Curated Mobile Cinema Cards */}
      <div className="relative z-10 py-6 space-y-6">
        {FILMS.map((film, index) => (
          <Link
            key={film.id}
            to="/movies"
            className="group block relative overflow-hidden border border-[#C6A77C]/25 bg-[#100B0D]/80 shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          >
            <div className="aspect-[16/9] overflow-hidden relative">
              <img
                src={film.image}
                alt={film.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100B0D] via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-4 flex justify-between items-end">
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-[#C6A77C] uppercase">
                  REEL 0{index + 1}
                </div>
                <div className="font-serif text-2xl text-[#F5E9DD]">
                  {film.title}
                </div>
                <div className="font-mono text-[11px] tracking-[0.12em] text-[#F5E9DD]/60">
                  {film.year} · {film.director}
                </div>
              </div>

              <span className="font-mono text-xs text-[#C6A77C] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Featured Cinema Monolith Section (Phase 02 Mobile Transformation) */}
      <div className="relative z-10 my-10 pt-8 border-t border-[#C6A77C]/20 text-center space-y-6">
        <div className="font-mono text-[10px] tracking-[0.25em] text-[#C6A77C] uppercase">
          FEATURED REPERTORY MONOLITH
        </div>

        {/* 3-Strip Mobile Panoramic Monolith */}
        <div className="relative overflow-hidden border border-[#C6A77C]/40 shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
          <div className="grid grid-cols-3 aspect-[16/9] overflow-hidden">
            {[0, 1, 2].map((stripIdx) => (
              <div key={stripIdx} className="relative h-full overflow-hidden border-r border-[#C6A77C]/15 last:border-r-0">
                <img
                  src="/images/hero/interstellar.jpg"
                  alt="Interstellar Cinema Frame"
                  className="absolute top-0 h-full max-w-none object-cover"
                  style={{
                    width: '300%',
                    left: `-${stripIdx * 100}%`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Oversized Interstellar Title */}
        <div className="font-serif text-4xl sm:text-5xl tracking-[0.16em] uppercase text-[#F5E9DD] leading-none pt-2">
          INTERSTELLAR
        </div>

        {/* Mobile Metadata */}
        <div className="flex justify-center items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-[#F5E9DD]/70 uppercase">
          <span>CHRISTOPHER NOLAN</span>
          <span className="w-1 h-1 rounded-full bg-[#C6A77C]" />
          <span>2014</span>
          <span className="w-1 h-1 rounded-full bg-[#C6A77C]" />
          <span>169 MIN</span>
        </div>
      </div>

      {/* Mobile Footer CTA */}
      <footer className="relative z-10 text-center pb-6">
        <Link
          to="/movies"
          className="inline-block w-full py-3.5 border border-[#C6A77C] bg-[#C6A77C] text-[#100B0D] font-mono text-xs tracking-[0.2em] uppercase font-semibold text-center shadow-[0_0_25px_rgba(198,167,124,0.25)] hover:bg-[#F5E9DD] transition-colors"
        >
          Explore All Movies
        </Link>
      </footer>
    </div>
  );
};
