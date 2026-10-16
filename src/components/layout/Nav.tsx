import React from 'react';
import { Link } from 'react-router-dom';

interface NavProps {
  onEnterCinera?: () => void;
}

export const Nav: React.FC<NavProps> = ({ onEnterCinera }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-[4vw] py-6 flex items-center justify-between pointer-events-auto">
      {/* Brand Wordmark */}
      <Link
        to="/"
        className="group flex items-center gap-2 text-2xl md:text-3xl font-display tracking-[0.04em] text-ivory transition-opacity hover:opacity-90"
        aria-label="CINÉRA Home"
      >
        <span>CIN<span className="text-[#C6A77C]">É</span>RA</span>
      </Link>

      {/* Nav Links & CTA */}
      <div className="flex items-center gap-6 md:gap-10">
        <Link
          to="/movies"
          className="text-xs md:text-sm font-mono tracking-[0.18em] uppercase text-ivory/70 hover:text-ivory transition-colors"
        >
          Films
        </Link>

        <Link
          to="/movies"
          onClick={onEnterCinera}
          className="relative px-5 py-2.5 text-xs md:text-sm font-mono tracking-[0.18em] uppercase text-[#100B0D] bg-[#C6A77C] hover:bg-[#d8bc93] transition-all duration-300 font-medium rounded-none shadow-[0_0_20px_rgba(198,167,124,0.2)]"
        >
          Enter CINÉRA
        </Link>
      </div>
    </nav>
  );
};
