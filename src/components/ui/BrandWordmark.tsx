import React from 'react';
import { Link } from 'react-router-dom';

interface BrandWordmarkProps {
  subtitle?: string;
  className?: string;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  subtitle = 'YOUR SEAT. YOUR STORY.',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center select-none text-center ${className}`}>
      <Link
        to="/"
        className="font-serif text-3xl md:text-4xl tracking-[0.06em] text-[#F5E9DD] hover:opacity-95 transition-opacity"
      >
        CIN<span className="text-[#C6A77C]">É</span>RA
      </Link>
      <div className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-[#C6A77C]/90 uppercase mt-0.5 transition-all duration-300">
        {subtitle}
      </div>
    </div>
  );
};
