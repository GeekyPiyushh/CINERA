import React, { useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { FILMS, DEMO_DATES, type DemoDate } from '../data/films';
import type { CinemaListing, Showtime } from '../types/cinema';
import { BrandWordmark } from '../components/ui/BrandWordmark';

export const MovieDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find film by slug or id
  const film = FILMS.find((f) => f.slug === slug || f.id === slug);

  // Showtime selection state (declared unconditionally)
  const [selectedDate, setSelectedDate] = useState<DemoDate>(DEMO_DATES[0]);
  const defaultCinema = film?.cinemas?.[0];
  const defaultShowtime = defaultCinema?.showtimes[0];

  const [selectedCinemaId, setSelectedCinemaId] = useState<string>(defaultCinema?.id || '');
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string>(defaultShowtime?.id || '');

  if (!film) {
    return <Navigate to="/movies" replace />;
  }

  // Derived selected cinema and showtime objects
  const activeCinema = film.cinemas?.find((c) => c.id === selectedCinemaId) || film.cinemas?.[0];
  const activeShowtime = activeCinema?.showtimes.find((s) => s.id === selectedShowtimeId) || activeCinema?.showtimes[0];

  const handleShowtimeSelect = (cinema: CinemaListing, showtime: Showtime) => {
    setSelectedCinemaId(cinema.id);
    setSelectedShowtimeId(showtime.id);
  };

  const handleProceedToSeats = () => {
    if (!activeCinema || !activeShowtime) return;

    const params = new URLSearchParams({
      date: selectedDate.id,
      dateLabel: selectedDate.label,
      cinemaId: activeCinema.id,
      cinemaName: activeCinema.name,
      cinemaScreen: activeCinema.screen,
      showtimeId: activeShowtime.id,
      time: activeShowtime.time,
      format: activeShowtime.format,
      price: activeShowtime.price,
    });

    navigate(`/book/${film.slug}?${params.toString()}`);
  };

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
      <header className="px-[4vw] py-6 flex justify-between items-center border-b border-[#C6A77C]/20 bg-[#100B0D]/85 backdrop-blur-md sticky top-0 z-40">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-[#C6A77C] uppercase transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Return to Showcase</span>
        </Link>

        <BrandWordmark subtitle={`REEL ${film.reelNumber} · DOSSIER`} />

        <Link
          to="/movies"
          className="font-mono text-xs text-[#F5E9DD]/70 hover:text-[#C6A77C] tracking-[0.18em] uppercase transition-colors"
        >
          All Repertory
        </Link>
      </header>

      {/* Main Dossier Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 md:py-14 space-y-14">
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
                boxShadow: 'inset 0 0 70px rgba(16, 11, 13, 0.85)',
              }}
            />
          </div>

          {/* Film Index Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-[#100B0D]/85 backdrop-blur-md border border-[#C6A77C]/30 font-mono text-[10px] tracking-[0.25em] text-[#C6A77C] uppercase">
            REPERTOIRE // REEL {film.reelNumber}
          </div>

          {/* Quick jump to showtimes pill */}
          <a
            href="#showtimes"
            className="absolute bottom-4 right-4 px-4 py-2 bg-[#C6A77C] text-[#100B0D] font-mono text-[11px] font-bold tracking-[0.16em] uppercase hover:bg-[#d8bc93] transition-all shadow-lg"
          >
            Jump to Showtimes ↓
          </a>
        </div>

        {/* Film Title & Primary Metadata Block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start pt-2 border-b border-[#C6A77C]/15 pb-12">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.2em] text-[#C6A77C] uppercase">
              <span>{film.atmosphere}</span>
              <span>·</span>
              <span>{film.year}</span>
              <span>·</span>
              <span>{film.runtime}</span>
              {film.rating && (
                <span className="border border-[#C6A77C]/40 px-2 py-0.5 text-[10px]">
                  {film.rating}
                </span>
              )}
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#F5E9DD] leading-[0.95]">
              {film.title}
            </h1>

            {film.curatorNote && (
              <p className="font-serif italic text-lg md:text-xl text-[#C6A77C] leading-relaxed border-l-2 border-[#C6A77C] pl-4">
                {film.curatorNote}
              </p>
            )}

            <p className="font-sans text-base md:text-lg text-[#F5E9DD]/85 leading-relaxed pt-2">
              {film.description}
            </p>

            {film.cast && (
              <div className="pt-2 font-mono text-xs text-[#F5E9DD]/60 tracking-[0.1em]">
                <span className="text-[#C6A77C]">STARRING: </span>
                {film.cast.join(', ')}
              </div>
            )}
          </div>

          {/* Technical Specifications Panel */}
          <div className="border border-[#C6A77C]/25 p-6 bg-[#100B0D]/75 space-y-5 shadow-lg">
            <div className="font-mono text-[11px] tracking-[0.2em] text-[#C6A77C] uppercase border-b border-[#C6A77C]/20 pb-3">
              ARCHIVAL SPECIFICATIONS
            </div>

            <div className="space-y-3 font-mono text-xs tracking-[0.14em]">
              <div className="flex justify-between">
                <span className="text-[#F5E9DD]/50">DIRECTOR</span>
                <span className="text-[#F5E9DD]">{film.director}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5E9DD]/50">PROJECTION</span>
                <span className="text-[#C6A77C]">70MM 15-PERF IMAX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5E9DD]/50">ASPECT RATIO</span>
                <span className="text-[#F5E9DD]">1.43:1 / 2.39:1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5E9DD]/50">AUDIO ARRAY</span>
                <span className="text-[#F5E9DD]">12-CHANNEL UNCOMPRESSED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5E9DD]/50">PRINT SOURCE</span>
                <span className="text-[#F5E9DD]">ARCHIVAL CAMERA NEGATIVE</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#C6A77C]/15">
              <div className="font-mono text-[10px] tracking-[0.16em] text-[#C6A77C]/80 uppercase text-center">
                EXHIBITION GRADE // 100% ANALOG CELLULOID
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE SHOWTIME & AUDITORIUM BOOKING SECTION */}
        {/* ------------------------------------------------------------- */}
        <section id="showtimes" className="space-y-8 pt-4">
          <div className="space-y-2 border-b border-[#C6A77C]/20 pb-4">
            <div className="font-mono text-[11px] tracking-[0.25em] text-[#C6A77C] uppercase">
              TICKETING & AUDITORIUM ACCESS
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#F5E9DD] tracking-tight">
              Select Exhibition Session
            </h2>
            <p className="font-sans text-sm text-[#F5E9DD]/65">
              Choose your preferred date, venue auditorium, and screening format.
            </p>
          </div>

          {/* 1. Date Selector Tabs */}
          <div className="space-y-3">
            <div className="font-mono text-xs tracking-[0.16em] text-[#C6A77C] uppercase">
              1. Choose Date
            </div>
            <div className="flex flex-wrap gap-2.5">
              {DEMO_DATES.map((d) => {
                const isSelected = selectedDate.id === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDate(d)}
                    className={`px-4 py-2.5 font-mono text-xs tracking-[0.14em] uppercase transition-all border ${
                      isSelected
                        ? 'bg-[#C6A77C] text-[#100B0D] border-[#C6A77C] font-bold shadow-[0_0_15px_rgba(198,167,124,0.35)]'
                        : 'bg-[#100B0D] text-[#F5E9DD]/75 border-[#C6A77C]/25 hover:border-[#C6A77C]/60 hover:text-[#F5E9DD]'
                    }`}
                  >
                    <span>{d.label}</span>
                    {d.isToday && (
                      <span className="ml-2 text-[9px] px-1 py-0.2 bg-[#100B0D]/30 border border-current">
                        TODAY
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Cinema Venues & Showtimes List */}
          <div className="space-y-6 pt-2">
            <div className="font-mono text-xs tracking-[0.16em] text-[#C6A77C] uppercase">
              2. Select Cinema & Showtime
            </div>

            <div className="space-y-6">
              {film.cinemas?.map((cinema) => (
                <div
                  key={cinema.id}
                  className="border border-[#C6A77C]/25 bg-[#100B0D]/70 p-6 space-y-5"
                >
                  {/* Cinema Header */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 border-b border-[#C6A77C]/15 pb-4">
                    <div>
                      <h3 className="font-serif text-2xl text-[#F5E9DD]">
                        {cinema.name}
                      </h3>
                      <div className="font-mono text-xs text-[#C6A77C] tracking-[0.1em] pt-0.5">
                        {cinema.location}
                      </div>
                    </div>
                    <div className="font-mono text-[11px] text-[#F5E9DD]/60 tracking-[0.12em] space-y-0.5 md:text-right">
                      <div>{cinema.projection}</div>
                      <div className="text-[#F5E9DD]/40">{cinema.sound}</div>
                    </div>
                  </div>

                  {/* Showtimes Grid */}
                  <div className="flex flex-wrap gap-3">
                    {cinema.showtimes.map((st) => {
                      const isSelected =
                        selectedCinemaId === cinema.id && selectedShowtimeId === st.id;

                      return (
                        <button
                          key={st.id}
                          onClick={() => handleShowtimeSelect(cinema, st)}
                          className={`relative p-3.5 min-w-[140px] text-left border transition-all ${
                            isSelected
                              ? 'bg-[#C6A77C]/15 border-[#C6A77C] shadow-[0_0_20px_rgba(198,167,124,0.3)]'
                              : 'bg-[#100B0D] border-[#C6A77C]/20 hover:border-[#C6A77C]/60 hover:bg-[#C6A77C]/5'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-base font-bold text-[#F5E9DD]">
                              {st.time}
                            </span>
                            <span className="font-mono text-xs text-[#C6A77C]">
                              {st.price}
                            </span>
                          </div>

                          <div className="font-mono text-[10px] tracking-[0.12em] text-[#F5E9DD]/60 pt-1 uppercase">
                            {st.format}
                          </div>

                          <div className="pt-2 flex items-center justify-between font-mono text-[9px] tracking-[0.1em]">
                            <span
                              className={`${
                                st.status === 'limited'
                                  ? 'text-red-400'
                                  : st.status === 'filling-fast'
                                  ? 'text-amber-400'
                                  : 'text-emerald-400'
                              } uppercase font-semibold`}
                            >
                              {st.status === 'limited'
                                ? 'Limited'
                                : st.status === 'filling-fast'
                                ? 'Filling Fast'
                                : 'Available'}
                            </span>
                            <span className="text-[#F5E9DD]/40">
                              {st.seatsAvailable} seats
                            </span>
                          </div>

                          {/* Selected checkmark indicator */}
                          {isSelected && (
                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#C6A77C] text-[#100B0D] text-[9px] font-bold flex items-center justify-center">
                              ✓
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Sticky / Anchored Booking Action Bar */}
          {activeCinema && activeShowtime && (
            <div className="border border-[#C6A77C] bg-[#100B0D]/95 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6">
              <div className="space-y-1">
                <div className="font-mono text-[10px] tracking-[0.2em] text-[#C6A77C] uppercase">
                  ACTIVE SELECTION SUMMARY
                </div>
                <div className="font-serif text-2xl text-[#F5E9DD]">
                  {film.title} · {selectedDate.label}
                </div>
                <div className="font-mono text-xs text-[#F5E9DD]/70 tracking-[0.12em]">
                  {activeCinema.name} · {activeShowtime.time} ({activeShowtime.format}) · Standard Admission {activeShowtime.price}
                </div>
              </div>

              <button
                onClick={handleProceedToSeats}
                className="px-8 py-4 bg-[#C6A77C] text-[#100B0D] font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#d8bc93] transition-all shadow-[0_0_25px_rgba(198,167,124,0.35)] flex items-center justify-center gap-3 whitespace-nowrap cursor-pointer"
              >
                <span>Select Your Seats</span>
                <span>→</span>
              </button>
            </div>
          )}
        </section>

        {/* Back Link */}
        <div className="text-center pt-6 pb-12 border-t border-[#C6A77C]/20">
          <Link
            to="/movies"
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#C6A77C] text-xs font-mono tracking-[0.2em] text-[#C6A77C] hover:bg-[#C6A77C] hover:text-[#100B0D] transition-all duration-300 uppercase font-semibold"
          >
            ← Return to The Repertory
          </Link>
        </div>
      </main>
    </div>
  );
};

