import React from 'react';
import { useParams, useSearchParams, Link, Navigate } from 'react-router-dom';
import { FILMS } from '../data/films';
import { BrandWordmark } from '../components/ui/BrandWordmark';

export const BookingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  // Find film from canonical data
  const film = FILMS.find((f) => f.slug === slug || f.id === slug);

  if (!film) {
    return <Navigate to="/movies" replace />;
  }

  // Extract query parameters with elegant fallbacks
  const dateLabel = searchParams.get('dateLabel') || 'TODAY, OCT 17';
  const cinemaName = searchParams.get('cinemaName') || 'CINÉRA DOME — SCREEN 1';
  const cinemaScreen = searchParams.get('cinemaScreen') || 'Curved 70mm Hemispherical Screen (1.43:1)';
  const time = searchParams.get('time') || '17:45';
  const format = searchParams.get('format') || '70MM IMAX';
  const price = searchParams.get('price') || '$28.00';

  // Demo architectural seat rows
  const rows = ['G', 'F', 'E', 'D', 'C', 'B', 'A'];

  return (
    <div className="relative min-h-screen bg-[#100B0D] text-[#F5E9DD] px-[4vw] pt-6 pb-20 selection:bg-[#C6A77C] selection:text-[#100B0D] overflow-x-hidden">
      {/* Background ambient radial glow */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(ellipse 75% 55% at 50% 15%, ${film.themeColors.glow} 0%, rgba(16, 11, 13, 0.95) 70%, #100B0D 100%)`,
        }}
      />

      {/* Top Header Bar */}
      <header className="flex flex-wrap justify-between items-center gap-4 border-b border-[#C6A77C]/20 pb-6 mb-10 max-w-5xl mx-auto">
        <Link
          to={`/movies/${film.slug}`}
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-[#C6A77C] hover:text-[#F5E9DD] uppercase transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back to Film Dossier</span>
        </Link>
        <BrandWordmark subtitle="SEAT RESERVATION" />
        <Link
          to="/movies"
          className="font-mono text-xs text-[#F5E9DD]/60 hover:text-[#C6A77C] tracking-[0.16em] uppercase transition-colors"
        >
          All Repertory
        </Link>
      </header>

      <main className="max-w-4xl mx-auto space-y-10">
        {/* Reservation Context Card */}
        <section className="border border-[#C6A77C]/30 bg-[#100B0D]/85 p-6 md:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[#C6A77C]/20 pb-4">
            <div className="font-mono text-xs tracking-[0.25em] text-[#C6A77C] uppercase">
              RESERVATION SESSION // REEL {film.reelNumber}
            </div>
            <div className="px-3 py-1 bg-[#C6A77C] text-[#100B0D] font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
              {format}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Poster / Still Preview */}
            <div className="aspect-[16/10] overflow-hidden border border-[#C6A77C]/20 bg-black/40">
              <img
                src={film.image}
                alt={film.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Selection Metadata */}
            <div className="md:col-span-2 space-y-3 font-mono">
              <h1 className="font-serif text-3xl md:text-5xl text-[#F5E9DD] leading-none">
                {film.title}
              </h1>

              <div className="text-xs text-[#C6A77C] tracking-[0.14em] uppercase">
                {dateLabel} · {time} SESSION
              </div>

              <div className="text-xs text-[#F5E9DD]/80 space-y-1 pt-1">
                <div>Venue: <span className="text-[#F5E9DD]">{cinemaName}</span></div>
                <div>Auditorium: <span className="text-[#F5E9DD]/60">{cinemaScreen}</span></div>
                <div>Admission: <span className="text-[#C6A77C] font-bold">{price}</span> / seat</div>
              </div>
            </div>
          </div>
        </section>

        {/* Architectural Seat Preview Map (Phase 05 Booking Stage) */}
        <section className="border border-[#C6A77C]/20 bg-[#100B0D]/90 p-8 space-y-8 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#C6A77C] uppercase">
              AUDITORIUM ARCHITECTURE // SEAT ALLOCATION
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#F5E9DD]">
              Cinema Layout Preview
            </h2>
          </div>

          {/* Curved Screen Horizon Bar */}
          <div className="max-w-xl mx-auto space-y-2 pt-4">
            <div className="h-1.5 rounded-full bg-gradient-to-r from-transparent via-[#C6A77C] to-transparent w-full shadow-[0_0_15px_rgba(198,167,124,0.6)]" />
            <div className="text-center font-mono text-[10px] tracking-[0.3em] text-[#C6A77C]/70 uppercase">
              [ 70MM CURVED HEMISPHERICAL PROJECTION SCREEN ]
            </div>
          </div>

          {/* Architectural Seat Grid Simulation */}
          <div className="max-w-md mx-auto space-y-2.5 py-6">
            {rows.map((rowLetter, rIndex) => (
              <div key={rowLetter} className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] text-[#C6A77C]/60 w-4 text-center">
                  {rowLetter}
                </span>

                {/* Left Seat Block */}
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((seatNum) => {
                    const isReserved = (rIndex + seatNum) % 3 === 0;
                    return (
                      <div
                        key={seatNum}
                        className={`w-5 h-5 rounded-t-sm border transition-all ${
                          isReserved
                            ? 'bg-[#100B0D] border-[#C6A77C]/15 opacity-40'
                            : 'border-[#C6A77C]/40 bg-[#C6A77C]/10 hover:border-[#C6A77C]'
                        }`}
                        title={`Seat ${rowLetter}${seatNum} (${isReserved ? 'Reserved' : 'Available'})`}
                      />
                    );
                  })}
                </div>

                {/* Center Aisle */}
                <span className="font-mono text-[8px] text-[#F5E9DD]/20 tracking-widest px-1">
                  AISLE
                </span>

                {/* Right Seat Block */}
                <div className="flex gap-1.5">
                  {[5, 6, 7, 8].map((seatNum) => {
                    const isReserved = (rIndex * 2 + seatNum) % 5 === 0;
                    return (
                      <div
                        key={seatNum}
                        className={`w-5 h-5 rounded-t-sm border transition-all ${
                          isReserved
                            ? 'bg-[#100B0D] border-[#C6A77C]/15 opacity-40'
                            : 'border-[#C6A77C]/40 bg-[#C6A77C]/10 hover:border-[#C6A77C]'
                        }`}
                        title={`Seat ${rowLetter}${seatNum} (${isReserved ? 'Reserved' : 'Available'})`}
                      />
                    );
                  })}
                </div>

                <span className="font-mono text-[10px] text-[#C6A77C]/60 w-4 text-center">
                  {rowLetter}
                </span>
              </div>
            ))}
          </div>

          {/* Seat Map Legend */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-4 border-t border-[#C6A77C]/15 font-mono text-[10px] tracking-[0.16em] uppercase text-[#F5E9DD]/60">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 border border-[#C6A77C]/40 bg-[#C6A77C]/10 rounded-t-sm" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 border border-[#C6A77C] bg-[#C6A77C] rounded-t-sm" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 border border-[#C6A77C]/15 bg-[#100B0D] opacity-40 rounded-t-sm" />
              <span>Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 border border-amber-400 bg-amber-400/20 rounded-t-sm" />
              <span>VIP Center Circle</span>
            </div>
          </div>

          {/* Phase 05 Milestone Notice Banner */}
          <div className="p-5 border border-[#C6A77C]/30 bg-[#C6A77C]/5 space-y-2 text-center">
            <div className="font-mono text-[11px] tracking-[0.2em] text-[#C6A77C] uppercase font-bold">
              PHASE 05 RESERVATION ENGINE NOTICE
            </div>
            <p className="font-mono text-xs text-[#F5E9DD]/75 leading-relaxed max-w-xl mx-auto">
              You have arrived at the booking-context-aware gateway for <span className="text-[#C6A77C]">{film.title}</span> ({dateLabel} at {time}).
              Interactive live seat-picking, ticket tier selection, and final reservation confirmation will be unlocked in Phase 05.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link
              to={`/movies/${film.slug}#showtimes`}
              className="px-6 py-3 border border-[#C6A77C] text-xs font-mono tracking-[0.18em] text-[#C6A77C] hover:bg-[#C6A77C] hover:text-[#100B0D] transition-all uppercase"
            >
              ← Change Date or Showtime
            </Link>
            <Link
              to="/movies"
              className="px-6 py-3 border border-[#C6A77C]/30 text-xs font-mono tracking-[0.18em] text-[#F5E9DD]/70 hover:border-[#C6A77C] hover:text-[#F5E9DD] transition-all uppercase"
            >
              Browse The Repertory
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};
