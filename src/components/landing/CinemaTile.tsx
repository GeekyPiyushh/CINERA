import { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { GalleryTile } from '../../types/cinema';
import { getFallbackPlateDataUrl } from '../../lib/fallbackTexture';

interface CinemaTileProps {
  tile: GalleryTile;
  isActive: boolean;
  onHover: (film: { title: string; director: string; filmId: string; year: number } | null) => void;
  isMiddleRow?: boolean;
  stripIndex?: number;
  cardRef?: (el: HTMLElement | null) => void;
  imageLayerRef?: (el: HTMLDivElement | null) => void;
  panoramaLayerRef?: (el: HTMLDivElement | null) => void;
}

export const CinemaTile = forwardRef<HTMLDivElement, CinemaTileProps>(
  (
    {
      tile,
      isActive,
      onHover,
      isMiddleRow = false,
      stripIndex,
      cardRef,
      imageLayerRef,
      panoramaLayerRef,
    },
    ref,
  ) => {
    const [imageError, setImageError] = useState(false);

    // Dynamic 3D transform derived from spatial concave coordinates
    const transformStyle = {
      transform: `translate3d(0, 0, ${tile.depth}px) rotateY(${tile.rotateY}deg) rotateX(${tile.rotateX}deg) scale(${tile.scale})`,
    };

    // Aspect ratio styling
    const sizeClasses =
      tile.aspectRatio === 'portrait'
        ? 'w-[180px] sm:w-[210px] md:w-[240px] lg:w-[260px] aspect-[2/3]'
        : 'w-[230px] sm:w-[270px] md:w-[300px] lg:w-[330px] aspect-[16/10]';

    const fallbackUrl = getFallbackPlateDataUrl({
      titleLineA: tile.title.toUpperCase(),
      titleLineB: tile.director,
      meta: `${tile.year} · CINÉRA REPERTOIRE`,
      accent: '#C6A77C',
      reelNumber: `0${(tile.index % 4) + 1}`,
    });

    const handleMouseEnter = () => {
      onHover({
        title: tile.title,
        director: tile.director,
        filmId: tile.filmId,
        year: tile.year,
      });
    };

    const handleMouseLeave = () => {
      onHover(null);
    };

    return (
      <div
        ref={ref}
        data-tile-index={tile.index}
        data-tile-row={tile.row}
        data-tile-col={tile.col}
        className={`cinema-tile relative flex items-center justify-center ${isActive ? 'is-active' : ''}`}
        style={transformStyle}
      >
        <div
          ref={cardRef}
          className={`cinema-tile-card group block relative overflow-hidden bg-[#100B0D] border border-[#C6A77C]/25 transition-colors duration-300 shadow-[0_15px_45px_rgba(0,0,0,0.85)] ${sizeClasses}`}
        >
          {/* Dual Layer 1: Original Gallery Image Layer */}
          <div ref={imageLayerRef} className="gallery-image-layer absolute inset-0 w-full h-full pointer-events-none">
            <img
              src={imageError ? fallbackUrl : tile.image}
              alt={tile.imageAlt}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Vignette border shadow */}
            <div
              className="tile-vignette absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 35px rgba(16, 11, 13, 0.75)',
              }}
            />

            {/* 1px inner gold hairline */}
            <div className="tile-hairline absolute inset-1 border border-[#C6A77C]/15 pointer-events-none group-hover:border-[#C6A77C]/35 transition-colors" />
          </div>

          {/* Dual Layer 2: Seamless Panorama Slice Layer (Middle Row strips 0..4) */}
          {isMiddleRow && stripIndex !== undefined && (
            <div
              ref={panoramaLayerRef}
              className="panorama-slice-layer absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-0"
            >
              <img
                src="/images/hero/interstellar.jpg"
                alt="Interstellar Cinema Monolith Frame"
                loading="eager"
                className="absolute top-0 h-full max-w-none select-none pointer-events-none"
                style={{
                  width: '500%',
                  left: `-${stripIndex * 100}%`,
                  objectFit: 'cover',
                }}
              />
              {/* Outer edge subtle shadow for monolith wings */}
              {stripIndex === 0 && (
                <div className="absolute top-0 bottom-0 left-0 w-12 pointer-events-none bg-gradient-to-r from-[#100B0D]/70 to-transparent" />
              )}
              {stripIndex === 4 && (
                <div className="absolute top-0 bottom-0 right-0 w-12 pointer-events-none bg-gradient-to-l from-[#100B0D]/70 to-transparent" />
              )}
            </div>
          )}

          {/* Subtle lower film tag visible on hover */}
          <div className="tile-hover-tag absolute bottom-2 left-2 right-2 flex justify-between items-center px-2 py-1 bg-[#100B0D]/85 backdrop-blur-sm border border-[#C6A77C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#F5E9DD]/80 truncate">
              {tile.title}
            </span>
            <span className="font-mono text-[9px] tracking-[0.12em] text-[#C6A77C] ml-2">
              {tile.year}
            </span>
          </div>

          {/* Accessible interactive link overlay */}
          <Link
            to="/movies"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            aria-label={`${tile.title} (${tile.year}), directed by ${tile.director}`}
            className="absolute inset-0 z-20 focus:outline-none"
          />
        </div>
      </div>
    );
  },
);

CinemaTile.displayName = 'CinemaTile';
