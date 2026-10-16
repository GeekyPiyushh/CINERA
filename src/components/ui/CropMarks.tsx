import React from 'react';

/**
 * Four L-shaped crop marks (14px, 1px, gold at 35%) positioned 2vw inside viewport corners
 */
export const CropMarks: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20" aria-hidden="true">
      {/* Top Left */}
      <div className="crop-mark crop-tl" />
      {/* Top Right */}
      <div className="crop-mark crop-tr" />
      {/* Bottom Left */}
      <div className="crop-mark crop-bl" />
      {/* Bottom Right */}
      <div className="crop-mark crop-br" />
    </div>
  );
};
