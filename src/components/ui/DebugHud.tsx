import React, { useEffect, useState } from 'react';

interface DebugHudProps {
  progress?: number;
  activeIndex?: number;
  from?: number;
  to?: number;
  t?: number;
  triggersCount?: number;
  memoryGeometries?: number;
  memoryTextures?: number;
}

export const DebugHud: React.FC<DebugHudProps> = ({
  progress = 0,
  activeIndex = 0,
  from = 0,
  to = 0,
  t = 0,
  triggersCount = 0,
  memoryGeometries = 0,
  memoryTextures = 0,
}) => {
  const [enabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('debug') === '1';
  });
  const [fps, setFps] = useState(60);
  const [dpr] = useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    return window.devicePixelRatio || 1;
  });

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // FPS counter loop
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="fixed bottom-20 left-[4vw] z-50 bg-[#100B0D]/95 backdrop-blur-md border border-[#C6A77C]/40 text-[#F5E9DD] p-3 text-xs font-mono shadow-2xl rounded-none max-w-xs space-y-1 select-none pointer-events-auto"
      style={{ letterSpacing: '0.04em' }}
    >
      <div className="flex justify-between border-b border-[#C6A77C]/20 pb-1 mb-1 text-[#C6A77C] font-semibold">
        <span>CINÉRA DEBUG HUD</span>
        <span>?debug=1</span>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px]">
        <div className="text-ivory/60">FPS:</div>
        <div className={fps >= 55 ? 'text-emerald-400' : 'text-amber-400'}>{fps} FPS</div>
        
        <div className="text-ivory/60">DPR:</div>
        <div>{dpr.toFixed(2)}</div>
        
        <div className="text-ivory/60">HERO PROGRESS:</div>
        <div>{progress.toFixed(3)}</div>
        
        <div className="text-ivory/60">REEL INDEX:</div>
        <div className="text-[#C6A77C] font-bold">0{activeIndex + 1} / 04</div>
        
        <div className="text-ivory/60">WINDOW (FROM/TO/T):</div>
        <div>{from.toFixed(2)} → {to.toFixed(2)} ({t.toFixed(2)})</div>
        
        <div className="text-ivory/60">SCROLLTRIGGERS:</div>
        <div>{triggersCount}</div>
        
        <div className="text-ivory/60">WEBGL GEOMETRIES:</div>
        <div>{memoryGeometries}</div>
        
        <div className="text-ivory/60">WEBGL TEXTURES:</div>
        <div>{memoryTextures}</div>
      </div>
    </div>
  );
};
