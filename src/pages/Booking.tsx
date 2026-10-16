import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FILMS } from '../config/films';
import { Nav } from '../components/layout/Nav';
import { CropMarks } from '../components/ui/CropMarks';
import { Grain } from '../components/layout/Grain';

export const Booking: React.FC = () => {
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

      <div className="max-w-3xl mx-auto space-y-10">
        <Link
          to={`/movies/${film.slug}`}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.18em] uppercase text-[#C6A77C] hover:underline"
        >
          ← Back to {film.title}
        </Link>

        <header className="border-b border-[#C6A77C]/25 pb-6 space-y-3">
          <div className="text-xs font-mono tracking-[0.2em] text-[#C6A77C] uppercase">
            RESERVATION SYSTEM // SEAT ALLOCATION
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-normal">
            Book Tickets — <span className="italic text-[#C6A77C]">{film.title}</span>
          </h1>
          <p className="font-mono text-xs tracking-[0.14em] text-ivory/60">
            {film.meta} · Auditorium 1 (Grand 70mm Screen)
          </p>
        </header>

        {/* Minimal cinema seat placeholder preview in CINÉRA style */}
        <div className="p-8 border border-[#C6A77C]/20 bg-[#100B0D]/80 space-y-6">
          <div className="h-1 bg-gradient-to-r from-transparent via-[#C6A77C] to-transparent w-full opacity-60 mb-8" />
          <div className="text-center font-mono text-[11px] tracking-[0.25em] text-[#C6A77C]/70 uppercase">
            [ 70MM PROJECTION SCREEN ]
          </div>

          <div className="py-12 text-center space-y-4">
            <p className="font-display italic text-2xl text-ivory/80">
              “Your seat. Your story.”
            </p>
            <p className="font-mono text-xs tracking-[0.12em] text-ivory/60 max-w-md mx-auto">
              Ticketing and interactive seat selection will be unlocked in Phase 7.
            </p>
          </div>

          <div className="pt-4 border-t border-[#C6A77C]/15 flex justify-between items-center text-xs font-mono">
            <span className="text-ivory/60">STATUS: PRIVATE SCREENING ENROLLMENT</span>
            <Link
              to={`/movies/${film.slug}`}
              className="text-[#C6A77C] hover:underline uppercase tracking-[0.14em]"
            >
              Back to Film →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
