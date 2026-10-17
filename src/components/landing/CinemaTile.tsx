import { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { GalleryTile } from '../../types/cinema';
import { getFallbackPlateDataUrl } from '../../lib/fallbackTexture';

interface CinemaTileProps {
  tile: GalleryTile;
  isActive: boolean;
  onHover: (film: { title: string; director: string; filmId: string; year: number } | null) => void;
}

export const CinemaTile = forwardRef<HTMLDivElement, CinemaTileProps>(
  ({ tile, isActive, onHover }, ref) => {
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
        <Link
          to="/movies"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          aria-label={`${tile.title} (${tile.year}), directed by ${tile.director}`}
          className={`group block relative overflow-hidden bg-[#100B0D] border border-[#C6A77C]/25 hover:border-[#C6A77C]/80 transition-colors duration-300 shadow-[0_15px_45px_rgba(0,0,0,0.85)] ${sizeClasses}`}
        >
          {/* Tile Image */}
          <img
            src={imageError ? fallbackUrl : tile.image}
            alt={tile.imageAlt}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Vignette border shadow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 35px rgba(16, 11, 13, 0.75)',
            }}
          />

          {/* 1px inner gold hairline */}
          <div className="absolute inset-1 border border-[#C6A77C]/15 pointer-events-none group-hover:border-[#C6A77C]/35 transition-colors" />

          {/* Subtle lower film tag visible on hover */}
          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center px-2 py-1 bg-[#100B0D]/85 backdrop-blur-sm border border-[#C6A77C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#F5E9DD]/80 truncate">
              {tile.title}
            </span>
            <span className="font-mono text-[9px] tracking-[0.12em] text-[#C6A77C] ml-2">
              {tile.year}
            </span>
          </div>
        </Link>
      </div>
    );
  },
);

CinemaTile.displayName = 'CinemaTile';
