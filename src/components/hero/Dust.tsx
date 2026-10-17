import React, { useEffect, useRef } from 'react';
import { FEATURES } from '../../config/features';

/**
 * Dust
 * Layer z:2 in the architectural z-stack.
 * Static dust field (~70 particles in projector cone) for Phase 2.
 */
export const Dust: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!FEATURES.dust) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Static distribution of 70 motes concentrated within the projector beam cone
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < 70; i++) {
      // Beam cone spread from top center (0.5w, 0)
      const t = Math.random();
      const spread = t * width * 0.45;
      const x = width * 0.5 + (Math.random() - 0.5) * spread;
      const y = t * height * 0.85;
      const radius = Math.random() * 1.2 + 0.4;
      const alpha = (1 - t * 0.6) * (Math.random() * 0.35 + 0.15);

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 233, 221, ${alpha})`;
      ctx.fill();
    }
  }, []);

  if (!FEATURES.dust) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};
