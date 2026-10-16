import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FILMS } from '../config/films';
import { Nav } from '../components/layout/Nav';
import { CropMarks } from '../components/ui/CropMarks';
import { Grain } from '../components/layout/Grain';

export const MovieDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const film = FILMS.find((f) => f.slug === slug);

  if (!film) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <div className="relative min-h-screen bg-[#100B0D] text-[#F5E9DD] px-[4vw] pt-28 pb-20 selection:bg-[#C6A77C] selection:text-[#100B0D]">
      <Nav />
      <CropMarks />
      <Grain />

      {/* Atmospheric glows */}
      <div
        className="fixed bottom-0 left-0 w-[50vw] h-[50vh] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(72, 27, 41, 0.45) 0%, transparent 70%)',
        }}
      />
      <div
        className="fixed top-1/3 right-1/4 w-[40vw] h-[40vh] pointer-events-none -z-10 opacity-30"
        style={{
          background: `radial-gradient(circle at center, ${film.accent} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Navigation link back */}
        <Link
          to="/movies"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.18em] uppercase text-[#C6A77C] hover:underline"
        >
          ← All Screenings
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Poster Plate / Image */}
          <div className="md:col-span-5">
            <div className="relative aspect-[2/3] max-w-sm mx-auto border border-[#C6A77C]/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
              <img
                src={film.poster}
                alt={film.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 border border-[#C6A77C]/20 pointer-events-none" />
            </div>
          </div>

          {/* Film Details */}
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center gap-4 text-xs font-mono tracking-[0.2em] text-[#C6A77C]">
              <span>REEL {film.reelNumber}</span>
              <span>//</span>
              <span style={{ color: film.accent }}>{film.accentName.toUpperCase()} REEL</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-normal tracking-tight leading-[0.9]">
              {film.titleLineA}{' '}
              <span className="italic text-[#C6A77C] block md:inline">{film.titleLineB}</span>
            </h1>

            <p className="font-mono text-xs md:text-sm tracking-[0.18em] uppercase text-ivory/70 border-y border-[#C6A77C]/20 py-3">
              {film.meta}
            </p>

            <blockquote className="font-display italic text-2xl md:text-3xl text-ivory/90 leading-relaxed">
              {film.editorialLine}
            </blockquote>

            <div className="pt-6 flex flex-wrap items-center gap-5">
              <Link
                to={`/book/${film.slug}`}
                className="px-8 py-3.5 bg-[#C6A77C] text-[#100B0D] font-mono text-xs tracking-[0.18em] uppercase font-semibold hover:bg-[#d8bc93] transition-all shadow-[0_0_25px_rgba(198,167,124,0.3)]"
              >
                Book Tickets — {film.title}
              </Link>
              <Link
                to="/"
                className="px-6 py-3.5 border border-[#C6A77C]/30 text-ivory/80 font-mono text-xs tracking-[0.18em] uppercase hover:border-[#C6A77C] hover:text-ivory transition-all"
              >
                Experience Projection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
