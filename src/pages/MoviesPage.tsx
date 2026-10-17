import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FILMS, COMING_SOON_FILMS, type ComingSoonFilm } from '../data/films';
import type { Film } from '../types/cinema';
import { BrandWordmark } from '../components/ui/BrandWordmark';

export const MoviesPage: React.FC = () => {
  // Discovery State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [selectedFormat, setSelectedFormat] = useState('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');
  const [sortBy, setSortBy] = useState<'curator' | 'year-desc' | 'year-asc' | 'runtime-desc' | 'title-asc'>('curator');
  const [spotlightFilm, setSpotlightFilm] = useState<Film>(FILMS[0]);
  const [notifiedFilmIds, setNotifiedFilmIds] = useState<Record<string, boolean>>({});

  // Distinct genres from films
  const allGenres = useMemo(() => {
    const set = new Set<string>();
    FILMS.forEach((f) => f.genres?.forEach((g) => set.add(g)));
    return ['ALL', ...Array.from(set)];
  }, []);

  // Distinct formats from films
  const allFormats = useMemo(() => {
    const set = new Set<string>();
    FILMS.forEach((f) => f.formats?.forEach((fmt) => set.add(fmt)));
    return ['ALL', ...Array.from(set)];
  }, []);

  // Filtered & Sorted Films
  const filteredFilms = useMemo(() => {
    return FILMS.filter((film) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = film.title.toLowerCase().includes(q);
        const matchesDirector = film.director.toLowerCase().includes(q);
        const matchesCast = film.cast?.some((c) => c.toLowerCase().includes(q));
        const matchesGenre = film.genres?.some((g) => g.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDirector && !matchesCast && !matchesGenre) {
          return false;
        }
      }

      // Genre filter
      if (selectedGenre !== 'ALL') {
        if (!film.genres?.includes(selectedGenre)) return false;
      }

      // Format filter
      if (selectedFormat !== 'ALL') {
        if (!film.formats?.includes(selectedFormat)) return false;
      }

      // Language filter
      if (selectedLanguage !== 'ALL') {
        if (!film.language?.includes(selectedLanguage)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'year-asc') return a.year - b.year;
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'runtime-desc') {
        const getMins = (r: string) => parseInt(r) || 0;
        return getMins(b.runtime) - getMins(a.runtime);
      }
      // default 'curator' -> reelNumber order
      return a.reelNumber.localeCompare(b.reelNumber);
    });
  }, [searchQuery, selectedGenre, selectedFormat, selectedLanguage, sortBy]);

  const handleNotifyToggle = (filmId: string) => {
    setNotifiedFilmIds((prev) => ({
      ...prev,
      [filmId]: !prev[filmId],
    }));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('ALL');
    setSelectedFormat('ALL');
    setSelectedLanguage('ALL');
    setSortBy('curator');
  };

  return (
    <div className="relative min-h-screen bg-[#100B0D] text-[#F5E9DD] px-[4vw] pt-6 pb-24 selection:bg-[#C6A77C] selection:text-[#100B0D] overflow-x-hidden">
      {/* Background ambient radial warmth */}
      <div
        className="fixed top-0 right-1/4 w-[60vw] h-[50vh] pointer-events-none -z-10 opacity-30"
        style={{
          background: `radial-gradient(ellipse at top, ${spotlightFilm.themeColors.glow} 0%, transparent 70%)`,
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-[50vw] h-[50vh] pointer-events-none -z-10 opacity-35"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(72, 27, 41, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Top Header Bar */}
      <header className="flex flex-wrap justify-between items-center gap-4 border-b border-[#C6A77C]/20 pb-6 mb-10 max-w-7xl mx-auto">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-[#C6A77C] hover:text-[#F5E9DD] uppercase transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Return to Horizon Gallery</span>
        </Link>
        <BrandWordmark subtitle="THE REPERTORY" />
        <div className="font-mono text-xs text-[#F5E9DD]/60 tracking-[0.16em] uppercase hidden md:block">
          CURATION // AUTUMN 2026
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-16">
        {/* Editorial Intro */}
        <section className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="font-mono text-xs tracking-[0.25em] text-[#C6A77C] uppercase">
            ARCHIVAL CINEMA // LARGE FORMAT EXHIBITION
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-normal tracking-tight">
            The <span className="italic text-[#C6A77C]">Repertory</span>
          </h1>
          <p className="font-sans text-sm md:text-base text-[#F5E9DD]/70 leading-relaxed max-w-2xl mx-auto">
            Celluloid encounters monumental architecture. Experience Nolan and Villeneuve’s masterworks presented exclusively on archival 70mm film stock and uncompressed dual laser.
          </p>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 1. LARGE FEATURED-FILM SPOTLIGHT */}
        {/* ------------------------------------------------------------- */}
        <section className="relative border border-[#C6A77C]/30 bg-[#100B0D]/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Backdrop Image */}
          <div className="relative aspect-[21/9] min-h-[380px] md:min-h-[460px] overflow-hidden">
            <img
              src={spotlightFilm.panoramaImage || spotlightFilm.image}
              alt={spotlightFilm.title}
              className="w-full h-full object-cover transition-all duration-1000 transform scale-100"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#100B0D] via-[#100B0D]/65 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#100B0D] via-[#100B0D]/40 to-transparent" />
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: `radial-gradient(circle at 70% 30%, ${spotlightFilm.themeColors.glow} 0%, transparent 60%)`,
              }}
            />
          </div>

          {/* Spotlight Content Overlay */}
          <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between z-10">
            {/* Top Row: Spotlight Badge & Quick Switcher */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="inline-flex items-center gap-3 px-3.5 py-1 bg-[#100B0D]/80 backdrop-blur-md border border-[#C6A77C]/30 font-mono text-[11px] tracking-[0.2em] text-[#C6A77C] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77C] animate-pulse" />
                CURATOR’S SPOTLIGHT // REEL {spotlightFilm.reelNumber}
              </div>

              {/* Quick Switcher Pills */}
              <div className="hidden sm:flex items-center gap-2 bg-[#100B0D]/85 backdrop-blur-md p-1 border border-[#C6A77C]/20">
                <span className="font-mono text-[10px] tracking-[0.14em] text-[#F5E9DD]/40 px-2 uppercase">
                  Spotlight:
                </span>
                {FILMS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSpotlightFilm(f)}
                    className={`font-mono text-[11px] tracking-[0.12em] px-2.5 py-1 transition-all uppercase ${
                      spotlightFilm.id === f.id
                        ? 'bg-[#C6A77C] text-[#100B0D] font-bold shadow-sm'
                        : 'text-[#F5E9DD]/60 hover:text-[#F5E9DD]'
                    }`}
                  >
                    {f.reelNumber}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Row: Title, Specs, & Direct CTAs */}
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.16em] text-[#C6A77C]">
                <span>{spotlightFilm.year}</span>
                <span>·</span>
                <span>DIR. {spotlightFilm.director.toUpperCase()}</span>
                <span>·</span>
                <span>{spotlightFilm.runtime}</span>
                {spotlightFilm.rating && (
                  <>
                    <span>·</span>
                    <span className="border border-[#C6A77C]/40 px-1.5 py-0.5 text-[10px]">
                      {spotlightFilm.rating}
                    </span>
                  </>
                )}
              </div>

              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#F5E9DD] tracking-tight leading-[0.95]">
                {spotlightFilm.title}
              </h2>

              <p className="font-sans text-xs sm:text-sm md:text-base text-[#F5E9DD]/80 leading-relaxed line-clamp-3">
                {spotlightFilm.curatorNote || spotlightFilm.description}
              </p>

              {/* Spotlight Format Tags & CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to={`/movies/${spotlightFilm.slug}`}
                  className="px-6 py-3 bg-[#C6A77C] text-[#100B0D] font-mono text-xs tracking-[0.18em] uppercase font-bold hover:bg-[#d8bc93] transition-all shadow-[0_0_20px_rgba(198,167,124,0.3)] inline-flex items-center gap-2"
                >
                  <span>Select Showtimes</span>
                  <span>→</span>
                </Link>
                <Link
                  to={`/movies/${spotlightFilm.slug}`}
                  className="px-5 py-3 border border-[#C6A77C]/30 text-[#F5E9DD] font-mono text-xs tracking-[0.18em] uppercase hover:border-[#C6A77C] hover:bg-[#C6A77C]/10 transition-all"
                >
                  View Film Dossier
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 2. DISCOVERY TOOLBAR: SEARCH, GENRE, FORMAT, SORTING */}
        {/* ------------------------------------------------------------- */}
        <section className="border border-[#C6A77C]/20 p-6 bg-[#100B0D]/70 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-[#C6A77C]/60 pointer-events-none">
                ⌕
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, director, or cast..."
                className="w-full bg-[#100B0D] border border-[#C6A77C]/25 px-9 py-2.5 text-xs font-mono tracking-[0.1em] text-[#F5E9DD] placeholder:text-[#F5E9DD]/35 focus:outline-none focus:border-[#C6A77C] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#F5E9DD]/40 hover:text-[#F5E9DD]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.14em] text-[#F5E9DD]/50 uppercase whitespace-nowrap">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort films by"
                className="bg-[#100B0D] border border-[#C6A77C]/25 text-[#C6A77C] font-mono text-xs tracking-[0.12em] px-3 py-2 focus:outline-none focus:border-[#C6A77C]"
              >
                <option value="curator">Curator's Reel (Default)</option>
                <option value="year-desc">Year (Newest First)</option>
                <option value="year-asc">Year (Oldest First)</option>
                <option value="runtime-desc">Runtime (Longest First)</option>
                <option value="title-asc">Title (A — Z)</option>
              </select>
            </div>
          </div>

          {/* Filter Pills Rows */}
          <div className="space-y-4 pt-2 border-t border-[#C6A77C]/15">
            {/* Genre Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] tracking-[0.16em] text-[#C6A77C] uppercase w-20">
                Genre:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-3 py-1 text-[11px] font-mono tracking-[0.12em] uppercase transition-all border ${
                      selectedGenre === genre
                        ? 'bg-[#C6A77C] text-[#100B0D] border-[#C6A77C] font-semibold'
                        : 'bg-[#100B0D]/80 text-[#F5E9DD]/65 border-[#C6A77C]/20 hover:border-[#C6A77C]/50 hover:text-[#F5E9DD]'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] tracking-[0.16em] text-[#C6A77C] uppercase w-20">
                Format:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {allFormats.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-3 py-1 text-[11px] font-mono tracking-[0.12em] uppercase transition-all border ${
                      selectedFormat === fmt
                        ? 'bg-[#C6A77C] text-[#100B0D] border-[#C6A77C] font-semibold'
                        : 'bg-[#100B0D]/80 text-[#F5E9DD]/65 border-[#C6A77C]/20 hover:border-[#C6A77C]/50 hover:text-[#F5E9DD]'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Results Summary */}
          <div className="flex justify-between items-center text-[11px] font-mono tracking-[0.16em] text-[#F5E9DD]/50 pt-2 border-t border-[#C6A77C]/10">
            <span>
              SHOWING {filteredFilms.length} OF {FILMS.length} FEATURED REPERTORY TITLES
            </span>
            {(searchQuery || selectedGenre !== 'ALL' || selectedFormat !== 'ALL' || sortBy !== 'curator') && (
              <button
                onClick={resetFilters}
                className="text-[#C6A77C] hover:underline uppercase tracking-[0.14em]"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 3. PREMIUM INTERACTIVE MOVIE CARDS */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-[#C6A77C]/20 pb-4">
            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] text-[#C6A77C] uppercase">
                ACTIVE PROGRAMME
              </div>
              <h3 className="font-serif text-3xl text-[#F5E9DD] tracking-tight">
                Now Showing
              </h3>
            </div>
            <span className="font-mono text-xs text-[#F5E9DD]/40">
              AUDITORIUM SESSIONS AVAILABLE
            </span>
          </div>

          {filteredFilms.length === 0 ? (
            <div className="text-center py-16 border border-[#C6A77C]/20 bg-[#100B0D]/50 space-y-4">
              <p className="font-serif text-2xl text-[#F5E9DD]/80">
                No titles match the selected criteria.
              </p>
              <p className="font-mono text-xs text-[#F5E9DD]/50">
                Try clearing your search query or selecting "ALL" genres.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 border border-[#C6A77C] text-xs font-mono tracking-[0.16em] text-[#C6A77C] hover:bg-[#C6A77C] hover:text-[#100B0D] transition-all uppercase"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredFilms.map((film) => (
                <div
                  key={film.id}
                  className="group relative border border-[#C6A77C]/20 bg-[#100B0D]/80 hover:border-[#C6A77C]/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Image Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/60 border-b border-[#C6A77C]/15">
                    <img
                      src={film.image}
                      alt={film.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#100B0D] via-transparent to-transparent opacity-75" />

                    {/* Reel Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#100B0D]/90 border border-[#C6A77C]/30 font-mono text-[9px] tracking-[0.2em] text-[#C6A77C] uppercase">
                      REEL {film.reelNumber}
                    </div>

                    {/* Format Tag */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#C6A77C] text-[#100B0D] font-mono text-[9px] font-bold tracking-[0.14em] uppercase">
                      70MM IMAX
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono tracking-[0.16em] text-[#F5E9DD]/60">
                        <span>{film.year}</span>
                        <span>{film.runtime}</span>
                      </div>

                      <h4 className="font-serif text-2xl text-[#F5E9DD] group-hover:text-[#C6A77C] transition-colors leading-tight">
                        {film.title}
                      </h4>

                      <div className="font-mono text-[11px] tracking-[0.12em] text-[#C6A77C]/80">
                        Dir. {film.director}
                      </div>

                      <p className="font-sans text-xs text-[#F5E9DD]/70 line-clamp-2 leading-relaxed pt-1">
                        {film.description}
                      </p>
                    </div>

                    {/* Genres Tagline */}
                    <div className="pt-2 border-t border-[#C6A77C]/10 flex flex-wrap gap-1">
                      {film.genres?.map((g) => (
                        <span
                          key={g}
                          className="font-mono text-[9px] tracking-[0.1em] text-[#F5E9DD]/50 uppercase"
                        >
                          #{g}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="pt-2 grid grid-cols-2 gap-2">
                      <Link
                        to={`/movies/${film.slug}`}
                        className="py-2 text-center border border-[#C6A77C]/30 font-mono text-[10px] tracking-[0.16em] text-[#F5E9DD] hover:border-[#C6A77C] hover:bg-[#C6A77C]/10 uppercase transition-all"
                      >
                        Dossier
                      </Link>
                      <Link
                        to={`/movies/${film.slug}#showtimes`}
                        className="py-2 text-center bg-[#C6A77C] text-[#100B0D] font-mono text-[10px] tracking-[0.16em] font-bold hover:bg-[#d8bc93] uppercase transition-all"
                      >
                        Showtimes →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 4. COMING SOON PREVIEW SECTION */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-8 pt-8 border-t border-[#C6A77C]/20">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="space-y-1">
              <div className="font-mono text-[11px] tracking-[0.25em] text-[#C6A77C] uppercase">
                COMING TO THE MONOLITH // FUTURE ARCHIVAL SEASONS
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-[#F5E9DD] tracking-tight">
                Upcoming Masterworks
              </h3>
            </div>
            <p className="font-mono text-xs text-[#F5E9DD]/50 max-w-sm">
              Archival restorations struck from original camera negatives. Register for early ticket access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMING_SOON_FILMS.map((item: ComingSoonFilm) => (
              <div
                key={item.id}
                className="border border-[#C6A77C]/20 p-5 bg-[#100B0D]/50 hover:border-[#C6A77C]/50 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-[0.18em]">
                    <span className="text-[#C6A77C] uppercase">{item.expectedDate}</span>
                    <span className="text-[#F5E9DD]/40">{item.year}</span>
                  </div>

                  <h4 className="font-serif text-2xl text-[#F5E9DD] leading-tight">
                    {item.title}
                  </h4>

                  <div className="font-mono text-[11px] tracking-[0.12em] text-[#F5E9DD]/60">
                    Dir. {item.director}
                  </div>

                  <div className="px-2 py-1 bg-[#C6A77C]/10 border border-[#C6A77C]/20 font-mono text-[10px] tracking-[0.14em] text-[#C6A77C] uppercase">
                    {item.format}
                  </div>

                  <blockquote className="font-serif italic text-xs text-[#F5E9DD]/80 leading-relaxed border-l border-[#C6A77C]/40 pl-2">
                    {item.tagline}
                  </blockquote>

                  <p className="font-sans text-xs text-[#F5E9DD]/65 leading-relaxed pt-1">
                    {item.synopsis}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C6A77C]/10">
                  <button
                    onClick={() => handleNotifyToggle(item.id)}
                    className={`w-full py-2.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-all border ${
                      notifiedFilmIds[item.id]
                        ? 'bg-[#C6A77C]/20 text-[#C6A77C] border-[#C6A77C]'
                        : 'border-[#C6A77C]/30 text-[#F5E9DD]/80 hover:border-[#C6A77C] hover:text-[#F5E9DD]'
                    }`}
                  >
                    {notifiedFilmIds[item.id] ? '✓ Notification Confirmed' : 'Notify on Release'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back to Concave Gallery Footer CTA */}
        <div className="text-center pt-8 border-t border-[#C6A77C]/20">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#C6A77C] text-xs font-mono tracking-[0.2em] text-[#C6A77C] hover:bg-[#C6A77C] hover:text-[#100B0D] transition-all duration-300 uppercase font-semibold shadow-[0_0_20px_rgba(198,167,124,0.15)]"
          >
            ← Return to Concave Horizon
          </Link>
        </div>
      </main>
    </div>
  );
};

