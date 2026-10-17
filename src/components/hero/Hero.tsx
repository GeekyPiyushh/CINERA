import React, { Suspense, useEffect, useRef, useState } from 'react';
import { FILMS } from '../../config/films';
import { useHeroContext } from '../../hooks/useHeroContext';
import { HeroBackdrop } from './HeroBackdrop';
import { Beam } from './Beam';
import { Dust } from './Dust';
import { HeroTitle } from './HeroTitle';
import { HeroChrome } from './HeroChrome';
import { HeroFallback } from './HeroFallback';

// Lazy-load WebGL Canvas chunk so the preloader and critical UI paint first
const HeroCanvasLazy = React.lazy(() => import('./canvas/HeroCanvas'));

function checkWebGLSupport(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('nowebgl') === '1') return false;
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { activeIndex, setIsCanvasActive } = useHeroContext();
  const currentFilm = FILMS[activeIndex] || FILMS[0];
  const [hasWebGL] = useState<boolean>(() => checkWebGLSupport());

  // IntersectionObserver to pause WebGL rendering and ambient systems when offscreen
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCanvasActive(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(el);

    // Also listen to tab visibility changes to pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsCanvasActive(false);
      } else if (el) {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsCanvasActive(inView);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [setIsCanvasActive]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen h-[100dvh] overflow-hidden bg-[#100B0D] text-[#F5E9DD] select-none"
      style={{
        // Set dynamic --accent token for the active film reel
        ['--accent' as string]: currentFilm.accent,
      }}
    >
      {/* Layer z:0 Atmosphere */}
      <HeroBackdrop />

      {/* Layer z:1 Projector Beam */}
      <Beam />

      {/* Layer z:2 Projector Dust */}
      <Dust />

      {/* Layer z:3 Giant Title Type (DOM, behind the plane) */}
      <HeroTitle />

      {/* Layer z:4 Curved Poster Plane (WebGL if available, else DOM Fallback) */}
      {hasWebGL ? (
        <Suspense fallback={<HeroFallback />}>
          <HeroCanvasLazy />
        </Suspense>
      ) : (
        <HeroFallback />
      )}

      {/* Layer z:5 Chrome (Nav, ChapterNav, CropMarks, CTAs, Meta, Caption) */}
      <HeroChrome />
    </section>
  );
};
