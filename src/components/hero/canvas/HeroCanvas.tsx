import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { PosterStage } from './PosterStage';
import { useHeroContext } from '../../../hooks/useHeroContext';

/**
 * HeroCanvas
 * Layer z:4 in the architectural z-stack.
 * R3F Canvas: transparent background, dpr [1, 1.75], antialias, high-performance,
 * camera fov 32 at z=6. Frameloop pauses when hero is offscreen.
 */
export const HeroCanvas: React.FC = () => {
  const { isCanvasActive } = useHeroContext();
  const [dpr, setDpr] = useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    return Math.min(window.devicePixelRatio || 1, 1.75);
  });

  return (
    <div
      className="absolute inset-0 z-[4] pointer-events-none select-none"
      aria-hidden="true"
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        camera={{
          fov: 32,
          position: [0, 0, 6],
        }}
        dpr={dpr}
        style={{ background: 'transparent', pointerEvents: 'none' }}
        className="w-full h-full"
        frameloop={isCanvasActive ? 'always' : 'never'}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <PosterStage />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
