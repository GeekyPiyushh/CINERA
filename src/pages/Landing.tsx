import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FILMS } from '../config/films';
import { Nav } from '../components/layout/Nav';
import { CropMarks } from '../components/ui/CropMarks';
import { Grain } from '../components/layout/Grain';
import { DebugHud } from '../components/ui/DebugHud';
import { getFallbackPlateDataUrl } from '../lib/fallbackTexture';

export const Landing: React.FC = () => {
  const currentFilm = FILMS[0]; // Interstellar for Phase 1 static composition
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const [titleFontSize, setTitleFontSize] = useState<number>(120);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [useFallback, setUseFallback] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('noimages') === '1';
  });

  // Title fit per spec: 78-90vw on desktop, ~20vw on mobile
  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth;
      const isMobile = vw < 768;
      if (isMobile) {
        // Mobile: Titles are ~20vw per Part 2.G
        setTitleFontSize(Math.min(Math.max(vw * 0.22, 54), 100));
      } else {
        // Desktop: Spans 78-90vw
        const targetWidth = vw * 0.84 * currentFilm.fitMultiplier;
        const calculated = Math.min(Math.max(targetWidth / 3.4, 64), 240);
        setTitleFontSize(calculated);
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (document.body) {
      observer.observe(document.body);
    }
    return () => observer.disconnect();
  }, [currentFilm]);

  // Generate fallback data URL
  const fallbackDataUrl = getFallbackPlateDataUrl({
    titleLineA: currentFilm.titleLineA,
    titleLineB: currentFilm.titleLineB,
    meta: currentFilm.meta,
    accent: currentFilm.accent,
    reelNumber: currentFilm.reelNumber,
  });

  return (
    <main
      className="relative w-full h-screen h-[100dvh] overflow-hidden bg-[#100B0D] text-[#F5E9DD] select-none"
      style={{
        // Define --accent for current film
        ['--accent' as string]: currentFilm.accent,
      }}
    >
      {/* ============================================================ */}
      {/* LAYER 0: ATMOSPHERE (Obsidian base, burgundy & accent glow) */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Permanent deep burgundy glow in lower left (45-55% opacity) */}
        <div
          className="absolute -bottom-[10vh] -left-[10vw] w-[65vw] h-[65vh] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(72, 27, 41, 0.52) 0%, rgba(72, 27, 41, 0.18) 45%, transparent 70%)',
          }}
        />

        {/* Film accent glow behind the poster plane (max ~3% visual prominence) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-[48%] w-[45vw] h-[55vh] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${currentFilm.accent}25 0%, ${currentFilm.accent}08 40%, transparent 70%)`,
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* LAYER 1: BEAM (Projector cone from top-centre toward plane)  */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse 45% 75% at 50% 0%, rgba(245, 233, 221, 0.08) 0%, rgba(245, 233, 221, 0.02) 40%, transparent 75%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* ============================================================ */}
      {/* LAYER 3: GIANT TITLE (DOM, behind the plane)                */}
      {/* ============================================================ */}
      <div
        ref={titleContainerRef}
        className="absolute inset-0 z-[3] flex flex-col justify-center items-center pointer-events-none select-none px-[4vw]"
        aria-hidden="true"
      >
        <div className="w-full flex flex-col items-center justify-center leading-[0.8] tracking-[-0.02em] font-display">
          {/* Title line A: uppercase roman, offset horizontally to the left */}
          <div
            className="text-[#F5E9DD] whitespace-nowrap will-change-transform transform -translate-x-[26vw] sm:-translate-x-[18vw]"
            style={{ fontSize: `${titleFontSize}px` }}
          >
            {currentFilm.titleLineA}
          </div>

          {/* Title line B: lowercase italic in gold, offset horizontally to the right */}
          <div
            className="italic text-[#C6A77C] whitespace-nowrap will-change-transform transform translate-x-[26vw] sm:translate-x-[18vw] mt-[-0.1em]"
            style={{ fontSize: `${titleFontSize}px` }}
          >
            {currentFilm.titleLineB}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 4: POSTER STAGE / POSTER PLANE                         */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-[4] flex items-center justify-center pointer-events-none">
        {/* Plane container with deliberate 2% offset toward lower-left */}
        <div className="relative pointer-events-auto transform -translate-x-[2%] translate-y-[2%]">
          {/* Outer Outline Frame 2 (scale 1.14, 18% opacity) */}
          <div
            className="absolute -inset-6 sm:-inset-8 border border-[#C6A77C]/20 pointer-events-none rounded-none"
            aria-hidden="true"
          />

          {/* Inner Outline Frame 1 (scale 1.06, 35% opacity) */}
          <div
            className="absolute -inset-3 sm:-inset-3.5 border border-[#C6A77C]/35 pointer-events-none rounded-none"
            aria-hidden="true"
          />

          {/* The Poster Plane (74vw on mobile, 2:3 aspect ratio, ~68vh tall on desktop) */}
          <div className="relative w-[72vw] max-w-[290px] sm:max-w-[340px] md:max-w-[390px] lg:max-w-[430px] aspect-[2/3] bg-[#100B0D] shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-[#C6A77C]/50 overflow-hidden group">
            <img
              src={useFallback ? fallbackDataUrl : currentFilm.poster}
              alt={`${currentFilm.title} poster plate`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                // Instantly switch to procedural canvas plate if image fails
                setUseFallback(true);
              }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />

            {/* Subtle 1px gold interior border line */}
            <div className="absolute inset-0 border border-[#C6A77C]/25 pointer-events-none" />

            {/* Vignette on poster edges */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 40px rgba(16, 11, 13, 0.65)',
              }}
            />
          </div>

          {/* Overlapping small italic caption at plane edge for depth */}
          <div
            className="absolute bottom-3 -right-6 md:bottom-6 md:-right-16 z-10 max-w-[200px] md:max-w-[260px] text-right pointer-events-none"
            aria-hidden="true"
          >
            <p className="font-display italic text-sm md:text-base text-[#F5E9DD]/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
              {currentFilm.editorialLine}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 5: CHROME (Nav, Meta, Chapter index, CTAs, Crop marks) */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-[5] pointer-events-none flex flex-col justify-between p-[4vw]">
        {/* Top bar with Nav */}
        <Nav />

        {/* Top-left Mono metadata (positioned under nav) */}
        <div className="absolute top-24 left-[4vw] space-y-1">
          <div className="text-[11px] font-mono tracking-[0.2em] text-[#C6A77C] uppercase">
            REEL {currentFilm.reelNumber} — FIRST LIGHT
          </div>
          <h2 className="text-xs font-mono tracking-[0.18em] text-[#F5E9DD]/70 uppercase">
            {currentFilm.meta}
          </h2>
          <div className="w-12 h-[1px] bg-[#C6A77C]/30 mt-2" />
        </div>

        {/* Right-edge Chapter Nav (Vertical Index) */}
        <div className="absolute top-1/2 right-[4vw] -translate-y-1/2 pointer-events-auto hidden md:flex flex-col items-end gap-5">
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#C6A77C]/60 uppercase mb-2">
            REEL SELECTION
          </div>
          {FILMS.map((f, idx) => {
            const isActive = idx === 0;
            return (
              <div
                key={f.id}
                className={`group flex items-center gap-3 text-xs font-mono tracking-[0.16em] uppercase transition-all ${
                  isActive ? 'text-[#C6A77C]' : 'text-[#F5E9DD]/40 hover:text-[#F5E9DD]/80'
                }`}
              >
                <span className="text-[11px]">{f.reelNumber}</span>
                <span className="hidden lg:inline">{f.title}</span>
                <div
                  className={`w-6 h-[1px] transition-all duration-300 ${
                    isActive ? 'w-10 bg-[#C6A77C]' : 'bg-[#C6A77C]/20 group-hover:bg-[#C6A77C]/50'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Hero Controls & Primary CTA */}
        <div className="absolute bottom-[4vw] left-[4vw] right-[4vw] flex flex-col md:flex-row items-center md:items-end justify-between gap-4 pointer-events-auto">
          {/* Bottom Primary CTA (full width on mobile per Part 2.G) */}
          <Link
            to={`/movies/${currentFilm.slug}`}
            className="group relative inline-flex items-center justify-center gap-4 w-full sm:w-auto px-6 py-3 border border-[#C6A77C]/40 bg-[#100B0D]/80 hover:bg-[#C6A77C] hover:text-[#100B0D] transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77C] group-hover:bg-[#100B0D]" />
            <span className="text-xs font-mono tracking-[0.18em] uppercase font-semibold">
              Book tickets — {currentFilm.title}
            </span>
            <span className="font-mono text-xs text-[#C6A77C] group-hover:text-[#100B0D] transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

          {/* Centered Scroll Hint */}
          <div className="hidden sm:flex flex-col items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-[#F5E9DD]/50 uppercase pointer-events-none">
            <span>SCROLL TO THREAD REEL</span>
            <span className="text-[#C6A77C] animate-pulse">↓</span>
          </div>

          {/* Mobile Reel indicator */}
          <div className="md:hidden text-xs font-mono tracking-[0.18em] text-[#C6A77C]">
            REEL 01 / 04
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 2: CROP MARKS                                          */}
      {/* ============================================================ */}
      <CropMarks />

      {/* ============================================================ */}
      {/* LAYER 6: GRAIN & VIGNETTE                                    */}
      {/* ============================================================ */}
      <Grain />

      {/* ============================================================ */}
      {/* DEBUG HUD (enabled via ?debug=1)                             */}
      {/* ============================================================ */}
      <DebugHud
        progress={0}
        activeIndex={0}
        from={0}
        to={0.333}
        t={0}
        triggersCount={0}
        memoryGeometries={0}
        memoryTextures={imageLoaded ? 1 : 0}
      />
    </main>
  );
};
