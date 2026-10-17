import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_TILES } from '../../data/galleryLayout';
import { FILMS } from '../../data/films';
import { GalleryStage } from './GalleryStage';
import { CinemaTile } from './CinemaTile';
import { PerimeterHUD } from './PerimeterHUD';
import { GalleryFallback } from './GalleryFallback';
import { MonolithReveal } from './MonolithReveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Film, GalleryHUDState } from '../../types/cinema';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export const ConcaveGallery: React.FC = () => {
  const [hoveredFilm, setHoveredFilm] = useState<GalleryHUDState['hoveredFilm']>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Active showcase film (Phase 03 Multiverse: Interstellar, Dark Knight, Dune 2, Oppenheimer)
  const [activeFilm, setActiveFilm] = useState<Film>(FILMS[0]);
  const [nextFilm, setNextFilm] = useState<Film | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Animation lock and queue refs to prevent overlapping transitions on rapid clicks
  const isTransitioningRef = useRef<boolean>(false);
  const queuedFilmRef = useRef<Film | null>(null);

  const prefersReducedMotion = useReducedMotion();

  // ScrollTrigger container and pinned viewport refs
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Decoupled pointer inertia influence: 1.0 (full motion) -> 0.0 (settled to center)
  const pointerInfluenceRef = useRef<number>(1.0);

  // Stable refs for all 15 tiles (outer 3D transform containers)
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Stable refs for the inner cards of the 15 tiles
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  // Stable refs for original gallery image layers
  const imageLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Stable refs for the 5 panorama slice layers (middle row)
  const panoramaLayerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Phase 03: 5-Strip Shutter Wave and Double-Buffer Slice refs
  const shutterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const primarySliceRefs = useRef<(HTMLImageElement | null)[]>([]);
  const secondarySliceRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Act V Reveal refs
  const titleRef = useRef<HTMLDivElement>(null);
  const titleIncomingRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowIncomingRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const metadataContentRef = useRef<HTMLDivElement>(null);

  // Responsive mobile check
  useEffect(() => {
    const checkMobile = () => {
      const hasMobileQuery = typeof window !== 'undefined' && window.location.search.includes('mobile=true');
      setIsMobile(window.innerWidth < 640 || hasMobileQuery);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload all four film panoramas on mount
  useEffect(() => {
    FILMS.forEach((film) => {
      const img = new Image();
      img.src = film.panoramaImage;
    });
  }, []);

  const handleSelectFilmRef = useRef<(film: Film) => void>(() => {});

  // -------------------------------------------------------------
  // PHASE 03: FIVE-STRIP CINEMATIC SHUTTER TRANSITION CONTROLLER
  // -------------------------------------------------------------
  const handleSelectFilm = useCallback(
    (targetFilm: Film) => {
      // Ignore if already active
      if (targetFilm.id === activeFilm.id) return;

      // Rapid-click queueing policy: queue target film if already animating
      if (isTransitioningRef.current) {
        queuedFilmRef.current = targetFilm;
        return;
      }

      isTransitioningRef.current = true;
      setIsTransitioning(true);
      setNextFilm(targetFilm);

      // Pre-set secondary buffer image source across all 5 strips
      secondarySliceRefs.current.forEach((img) => {
        if (img) {
          img.src = targetFilm.panoramaImage;
        }
      });

      // Reduced motion fallback: clean opacity cross-fade
      if (prefersReducedMotion) {
        gsap.to(primarySliceRefs.current, {
          opacity: 0,
          duration: 0.35,
          ease: 'power1.inOut',
        });

        gsap.to(secondarySliceRefs.current, {
          opacity: 1,
          duration: 0.35,
          ease: 'power1.inOut',
          onComplete: () => {
            setActiveFilm(targetFilm);
            setNextFilm(null);
            primarySliceRefs.current.forEach((img) => {
              if (img) img.src = targetFilm.panoramaImage;
            });
            gsap.set(primarySliceRefs.current, { opacity: 1 });
            gsap.set(secondarySliceRefs.current, { opacity: 0 });

            isTransitioningRef.current = false;
            setIsTransitioning(false);

            if (queuedFilmRef.current) {
              const queued = queuedFilmRef.current;
              queuedFilmRef.current = null;
              handleSelectFilmRef.current(queued);
            }
          },
        });
        return;
      }

      // Master 4-Stage Shutter Wave Timeline
      const shutterTL = gsap.timeline({
        onComplete: () => {
          setActiveFilm(targetFilm);
          setNextFilm(null);

          // Synchronize Buffer A to target panorama and reset Buffer B
          primarySliceRefs.current.forEach((img) => {
            if (img) img.src = targetFilm.panoramaImage;
          });
          gsap.set(primarySliceRefs.current, { opacity: 1 });
          gsap.set(secondarySliceRefs.current, { opacity: 0 });

          // Reset title positions
          if (titleRef.current) {
            gsap.set(titleRef.current, { yPercent: 0, opacity: 0.95 });
          }
          if (titleIncomingRef.current) {
            gsap.set(titleIncomingRef.current, { yPercent: 100, opacity: 0 });
          }

          // Reset glow layers
          if (glowRef.current) {
            gsap.set(glowRef.current, {
              opacity: 0.75,
              backgroundImage: `radial-gradient(ellipse 75% 65% at 50% 50%, ${targetFilm.themeColors.glow} 0%, rgba(20, 10, 14, 0.85) 60%, #100B0D 100%)`,
            });
          }
          if (glowIncomingRef.current) {
            gsap.set(glowIncomingRef.current, { opacity: 0 });
          }

          // Restore metadata opacity
          if (metadataContentRef.current) {
            gsap.to(metadataContentRef.current, { opacity: 1, y: 0, duration: 0.25 });
          }

          isTransitioningRef.current = false;
          setIsTransitioning(false);

          // Process queued film if requested during animation
          if (queuedFilmRef.current) {
            const queued = queuedFilmRef.current;
            queuedFilmRef.current = null;
            handleSelectFilmRef.current(queued);
          }
        },
      });

      // Metadata Panel: slight dip and dim during transition
      if (metadataContentRef.current) {
        shutterTL.to(
          metadataContentRef.current,
          { opacity: 0.35, y: 6, duration: 0.2, ease: 'power1.out' },
          0,
        );
      }

      // -------------------------------------------------------------
      // STAGE A — RELEASE (0.00s to 0.18s)
      // Five strips separate horizontally by 5.5px deliberate gap
      // -------------------------------------------------------------
      shutterRefs.current.forEach((stripEl, i) => {
        if (!stripEl) return;
        const gapX = (i - 2) * 5.5; // Strip 0: -11px, Strip 1: -5.5px, Strip 2: 0px, Strip 3: +5.5px, Strip 4: +11px
        shutterTL.to(
          stripEl,
          {
            x: gapX,
            duration: 0.18,
            ease: 'power1.out',
          },
          0,
        );
      });

      // -------------------------------------------------------------
      // STAGE B — CINEMATIC WAVE (0.18s to 0.54s)
      // Staggered wave across 5 strips with alternate Y and rotateY
      // -------------------------------------------------------------
      const waveY = [-18, 18, -18, 18, -18];
      const waveRot = [-4.5, 4.5, -4.5, 4.5, -4.5];

      shutterRefs.current.forEach((stripEl, i) => {
        if (!stripEl) return;
        shutterTL.to(
          stripEl,
          {
            y: waveY[i],
            rotateY: waveRot[i],
            scaleY: 0.95,
            duration: 0.32,
            ease: 'power2.inOut',
          },
          0.18 + i * 0.045,
        );
      });

      // -------------------------------------------------------------
      // STAGE C — IMAGE REPLACEMENT AT APEX (0.32s to 0.54s)
      // Double-buffered cross-fade between Buffer A and Buffer B
      // -------------------------------------------------------------
      secondarySliceRefs.current.forEach((secImg, i) => {
        const priImg = primarySliceRefs.current[i];
        if (secImg) {
          shutterTL.to(
            secImg,
            { opacity: 1, duration: 0.22, ease: 'power1.inOut' },
            0.32,
          );
        }
        if (priImg) {
          shutterTL.to(
            priImg,
            { opacity: 0, duration: 0.22, ease: 'power1.inOut' },
            0.32,
          );
        }
      });

      // Giant Typography Transition (Masked Vertical Reveal)
      if (titleRef.current) {
        shutterTL.to(
          titleRef.current,
          { yPercent: -100, opacity: 0, duration: 0.3, ease: 'power2.in' },
          0.2,
        );
      }

      if (titleIncomingRef.current) {
        shutterTL.fromTo(
          titleIncomingRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 0.95, duration: 0.36, ease: 'power2.out' },
          0.34,
        );
      }

      // Background Aura Cross-fade
      if (glowIncomingRef.current) {
        shutterTL.to(
          glowIncomingRef.current,
          { opacity: 0.75, duration: 0.45, ease: 'power1.inOut' },
          0.24,
        );
      }
      if (glowRef.current) {
        shutterTL.to(
          glowRef.current,
          { opacity: 0, duration: 0.45, ease: 'power1.inOut' },
          0.24,
        );
      }

      // -------------------------------------------------------------
      // STAGE D — REASSEMBLY (0.54s to 0.88s)
      // Five strips lock edge-to-edge at x: 0, y: 0, rotateY: 0, scaleY: 1
      // -------------------------------------------------------------
      shutterRefs.current.forEach((stripEl, i) => {
        if (!stripEl) return;
        shutterTL.to(
          stripEl,
          {
            x: 0,
            y: 0,
            rotateY: 0,
            scaleY: 1,
            duration: 0.3,
            ease: 'power2.out',
          },
          0.54 + i * 0.035,
        );
      });
    },
    [activeFilm.id, prefersReducedMotion],
  );

  useEffect(() => {
    handleSelectFilmRef.current = handleSelectFilm;
  }, [handleSelectFilm]);

  // -------------------------------------------------------------
  // GSAP SCROLLTRIGGER CONVERGENCE TIMELINE (Phase 02 Baseline)
  // -------------------------------------------------------------
  useEffect(() => {
    if (isMobile || prefersReducedMotion || !containerRef.current || !pinRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Calculate responsive geometry
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Monolith target dimensions: ~65vw width, ~56vh height (clamped for aesthetics)
      const monolithWidth = Math.min(1280, Math.max(760, Math.round(vw * 0.65)));
      const monolithHeight = Math.min(680, Math.max(440, Math.round(vh * 0.56)));
      const stripWidth = monolithWidth / 5;

      // Grid track measurement (width of 1 of the 5 columns)
      const gridWidth = gridRef.current ? gridRef.current.offsetWidth : vw * 1.3;
      const trackWidth = gridWidth / 5;

      // Middle row indices: 5, 6, 7, 8, 9 (strip indices 0, 1, 2, 3, 4)
      const middleIndices = [5, 6, 7, 8, 9];
      // Upper row indices: 0, 1, 2, 3, 4
      const upperIndices = [0, 1, 2, 3, 4];
      // Lower row indices: 10, 11, 12, 13, 14
      const lowerIndices = [10, 11, 12, 13, 14];

      // Master scrubbed timeline
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // Damped pointer influence: smoothly settles to 0 by 15% scroll
            pointerInfluenceRef.current = Math.max(0, 1 - p / 0.15);

            setScrollProgress(p);

            // Clear any active hover when scrolling starts
            if (p > 0.01) {
              setHoveredFilm(null);
            }
          },
        },
      });

      // -------------------------------------------------------------
      // ACT II — THE GALLERY RELEASES (Progress: 0.05 to 0.35)
      // Upper and lower rows drift outward, forward in Z, and fade out
      // -------------------------------------------------------------
      const upperDrifts = [
        { x: -160, y: -480, z: 90 }, // tile 0
        { x: -80, y: -420, z: 80 },  // tile 1
        { x: 0, y: -440, z: 80 },    // tile 2
        { x: 80, y: -420, z: 80 },   // tile 3
        { x: 160, y: -480, z: 90 },  // tile 4
      ];

      upperIndices.forEach((tileIdx, i) => {
        const el = tileRefs.current[tileIdx];
        if (!el) return;

        masterTL.to(
          el,
          {
            x: upperDrifts[i].x,
            y: upperDrifts[i].y,
            z: upperDrifts[i].z,
            opacity: 0,
            scale: 0.82,
            ease: 'power1.inOut',
            duration: 0.3,
          },
          0.05 + i * 0.012,
        );
      });

      const lowerDrifts = [
        { x: -160, y: 480, z: 90 }, // tile 10
        { x: -80, y: 420, z: 80 },  // tile 11
        { x: 0, y: 440, z: 80 },    // tile 12
        { x: 80, y: 420, z: 80 },   // tile 13
        { x: 160, y: 480, z: 90 },  // tile 14
      ];

      lowerIndices.forEach((tileIdx, i) => {
        const el = tileRefs.current[tileIdx];
        if (!el) return;

        masterTL.to(
          el,
          {
            x: lowerDrifts[i].x,
            y: lowerDrifts[i].y,
            z: lowerDrifts[i].z,
            opacity: 0,
            scale: 0.82,
            ease: 'power1.inOut',
            duration: 0.3,
          },
          0.05 + i * 0.012,
        );
      });

      // -------------------------------------------------------------
      // ACT III — FIVE STRIPS CONVERGENCE (Progress: 0.20 to 0.65)
      // Five middle-row tiles flatten perspective, align edge-to-edge
      // -------------------------------------------------------------
      middleIndices.forEach((tileIdx, stripIndex) => {
        const tileEl = tileRefs.current[tileIdx];
        const cardEl = cardRefs.current[tileIdx];

        // Delta X from column track center to strip center
        const deltaX = (stripIndex - 2) * (stripWidth - trackWidth);

        if (tileEl) {
          masterTL.to(
            tileEl,
            {
              rotateX: 0,
              rotateY: 0,
              z: 0,
              scale: 1,
              x: deltaX,
              y: 0,
              ease: 'power2.inOut',
              duration: 0.45,
            },
            0.2,
          );
        }

        if (cardEl) {
          masterTL.to(
            cardEl,
            {
              width: stripWidth,
              height: monolithHeight,
              borderColor: 'rgba(198, 167, 124, 0)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)',
              ease: 'power2.inOut',
              duration: 0.45,
            },
            0.2,
          );
        }
      });

      // -------------------------------------------------------------
      // ACT IV — PANORAMA REVEAL (Progress: 0.48 to 0.78)
      // Cross-fade from gallery imagery to the seamless 20% slices
      // -------------------------------------------------------------
      middleIndices.forEach((tileIdx, stripIndex) => {
        const galleryLayer = imageLayerRefs.current[tileIdx];
        const panoLayer = panoramaLayerRefs.current[stripIndex];

        if (galleryLayer) {
          masterTL.to(
            galleryLayer,
            {
              opacity: 0,
              ease: 'power1.inOut',
              duration: 0.26,
            },
            0.48,
          );
        }

        if (panoLayer) {
          masterTL.to(
            panoLayer,
            {
              opacity: 1,
              ease: 'power1.inOut',
              duration: 0.26,
            },
            0.5,
          );
        }
      });

      // -------------------------------------------------------------
      // ACT V — MONOLITH REVEAL (Progress: 0.65 to 1.00)
      // Giant editorial typography emerges behind frame, glow blooms,
      // metadata and Explore CTA appear below.
      // -------------------------------------------------------------
      if (titleRef.current) {
        masterTL.to(
          titleRef.current,
          {
            y: '0%',
            opacity: 0.95,
            ease: 'power2.out',
            duration: 0.32,
          },
          0.66,
        );
      }

      if (glowRef.current) {
        masterTL.to(
          glowRef.current,
          {
            opacity: 0.75,
            ease: 'power1.inOut',
            duration: 0.35,
          },
          0.65,
        );
      }

      if (metadataRef.current) {
        masterTL.to(
          metadataRef.current,
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.25,
          },
          0.75,
        );
      }
    }, containerRef);

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [isMobile, prefersReducedMotion]);

  if (isMobile) {
    return (
      <GalleryFallback
        activeFilm={activeFilm}
        onSelectFilm={handleSelectFilm}
      />
    );
  }

  const isScrolled = scrollProgress > 0.01;

  return (
    <div ref={containerRef} className="relative w-full bg-[#100B0D]">
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className={`relative w-full h-screen h-[100dvh] overflow-hidden bg-[#100B0D] ${
          isScrolled ? 'is-scrolling' : ''
        }`}
      >
        {/* Stationary Perimeter HUD */}
        <PerimeterHUD hoveredFilm={hoveredFilm} scrollProgress={scrollProgress} />

        {/* Monolith Reveal Layers (Giant Title, Background Glow, Metadata & Chapter Navigation) */}
        <MonolithReveal
          activeFilm={activeFilm}
          nextFilm={nextFilm}
          onSelectFilm={handleSelectFilm}
          isTransitioning={isTransitioning}
          titleRef={titleRef}
          titleIncomingRef={titleIncomingRef}
          glowRef={glowRef}
          glowIncomingRef={glowIncomingRef}
          metadataRef={metadataRef}
          metadataContentRef={metadataContentRef}
        />

        {/* 3D Concave Gallery Stage with Decoupled Pointer Inertia */}
        <GalleryStage stageRef={stageRef} influenceRef={pointerInfluenceRef}>
          <div
            ref={gridRef}
            className={`grid grid-cols-5 grid-rows-3 gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10 gap-y-4 sm:gap-y-6 md:gap-y-8 items-center justify-items-center w-full h-full preserve-3d py-12 relative z-20 ${
              hoveredFilm !== null ? 'gallery-has-hover' : ''
            }`}
          >
            {GALLERY_TILES.map((tile, i) => {
              const isActive = hoveredFilm !== null && hoveredFilm.filmId === tile.filmId;
              const isMiddleRow = tile.row === 1;
              const stripIndex = isMiddleRow ? tile.col : undefined;

              return (
                <CinemaTile
                  key={tile.id}
                  ref={(el) => {
                    tileRefs.current[i] = el;
                  }}
                  cardRef={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  imageLayerRef={(el) => {
                    imageLayerRefs.current[i] = el;
                  }}
                  panoramaLayerRef={(el) => {
                    if (isMiddleRow && stripIndex !== undefined) {
                      panoramaLayerRefs.current[stripIndex] = el;
                    }
                  }}
                  shutterRef={(el) => {
                    if (isMiddleRow && stripIndex !== undefined) {
                      shutterRefs.current[stripIndex] = el;
                    }
                  }}
                  primarySliceRef={(el) => {
                    if (isMiddleRow && stripIndex !== undefined) {
                      primarySliceRefs.current[stripIndex] = el;
                    }
                  }}
                  secondarySliceRef={(el) => {
                    if (isMiddleRow && stripIndex !== undefined) {
                      secondarySliceRefs.current[stripIndex] = el;
                    }
                  }}
                  currentPanorama={activeFilm.panoramaImage}
                  incomingPanorama={nextFilm?.panoramaImage}
                  activeFilmSlug={activeFilm.slug}
                  tile={tile}
                  isActive={isActive}
                  onHover={setHoveredFilm}
                  isMiddleRow={isMiddleRow}
                  stripIndex={stripIndex}
                />
              );
            })}
          </div>
        </GalleryStage>
      </div>
    </div>
  );
};
