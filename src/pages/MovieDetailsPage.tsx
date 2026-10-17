import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FILMS } from '../data/films';
import { BrandWordmark } from '../components/ui/BrandWordmark';

/**
 * MovieDetailsPage
 * Minimalist luxury film dossier view for the canonical repertory collection.
 * Displays high-resolution cinema backdrop, archival metadata, synopsis,
 * technical projection specifications, and back navigation.
 */
export const MovieDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find film by slug or id
  const film = FILMS.find((f) => f.slug === slug || f.id === slug);

  if (!film) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <div className="relative min-h-screen bg-[#100B0D] text-[#F5E9DD] selection:bg-[#C6A77C] selection:text-[#100B0D] overflow-x-hidden">
      {/* Dynamic Ambient Background Aura */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 transition-colors duration-1000"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 20%, ${film.themeColors.glow} 0%, rgba(16, 11, 13, 0.95) 70%, #100B0D 100%)`,
        }}
      />

      {/* Top Header Bar */}
      <header className="px-[4vw] py-8 flex justify-between items-center border-b border-[#C6A77C]/20 bg-[#100B0D]/80 backdrop-blur-md sticky top-0 z-40">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-[#C6A77C] uppercase transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Return to Showcase</span>
        </Link>

        <BrandWordmark subtitle={`REEL ${film.reelNumber} · ARCHIVE`} />

        <Link
          to="/movies"
          className="font-mono text-xs text-[#F5E9DD]/70 hover:text-[#F5E9DD] tracking-[0.18em] uppercase transition-colors"
        >
          All Movies
        </Link>
      </header>

      {/* Main Dossier Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16 space-y-12">
        {/* Hero Cinematic Screen Frame */}
        <div className="relative overflow-hidden border border-[#C6A77C]/30 shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
          <div className="aspect-[21/9] md:aspect-[2.39/1] overflow-hidden relative">
            <img
              src={film.panoramaImage || film.image}
              alt={film.title}
              className="w-full h-full object-cover select-none"
            />
            {/* Cinematic subtle vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 60px rgba(16, 11, 13, 0.85)',
              }}
            />
          </div>

          {/* Film Index Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-[#100B0D]/85 backdrop-blur-md border border-[#C6A77C]/30 font-mono text-[10px] tracking-[0.25em] text-[#C6A77C] uppercase">
            REPERTOIRE // REEL {film.reelNumber}
          </div>
        </div>

        {/* Film Title & Primary Metadata Block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start pt-4 border-b border-[#C6A77C]/15 pb-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="font-mono text-xs tracking-[0.25em] text-[#C6A77C] uppercase">
              {film.atmosphere}
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-normal tracking-tight text-[#F5E9DD]">
              {film.title}
            </h1>
            <p className="font-sans text-base md:text-lg text-[#F5E9DD]/80 leading-relaxed pt-2 max-w-2xl">
              {film.description}
            </p>
          </div>

          {/* Technical Specifications Panel */}
          <div className="border border-[#C6A77C]/20 p-6 bg-[#100B0D]/60 space-y-5">
            <div className="font-mono text-[11px] tracking-[0.2em] text-[#C6A77C] uppercase border-b border-[#C6A77C]/20 pb-3">
              FILM SPECIFICATIONS
            </div>

            <div className="space-y-3 font-mono text-xs tracking-[0.14em]">
              <div className="flex justify-between">
                <span className="text-[#F5E9DD]/50">DIRECTOR</span>
                <span className="text-[#F5E9DD]">{film.director}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5E9DD]/50">YEAR</span>
                <span className="text-[#F5E9DD]">{film.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5E9DD]/50">RUNTIME</span>
                <span className="text-[#F5E9DD]">{film.runtime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5E9DD]/50">FORMAT</span>
                <span className="text-[#C6A77C]">70MM IMAX & 4K LASER</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5E9DD]/50">AUDIO</span>
                <span className="text-[#F5E9DD]">12-CHANNEL ARCHIVAL</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#C6A77C]/15">
              <div className="font-mono text-[10px] tracking-[0.18em] text-[#F5E9DD]/50 uppercase text-center">
                PRIVATE SCREENING INQUIRY COMING IN PHASE 04
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-6 pb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#C6A77C] text-xs font-mono tracking-[0.2em] text-[#C6A77C] hover:bg-[#C6A77C] hover:text-[#100B0D] transition-all duration-300 uppercase font-semibold"
          >
            ← Return to Cinematic Showcase
          </Link>
        </div>
      </main>
    </div>
  );
};
