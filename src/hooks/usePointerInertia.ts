import { useEffect, useRef } from 'react';

interface PointerInertiaOptions {
  maxX?: number; // max horizontal shift in px (default 180)
  maxY?: number; // max vertical shift in px (default 110)
  damping?: number; // interpolation factor (default 0.055)
  disabled?: boolean;
}

/**
 * usePointerInertia
 * Heavy, fluid pointer-responsive inertial translation for the gallery wrapper.
 * Pure DOM mutation via requestAnimationFrame — zero React state updates per frame.
 * Moves opposite to pointer direction.
 */
export function usePointerInertia<T extends HTMLElement>(options: PointerInertiaOptions = {}) {
  const { maxX = 180, maxY = 110, damping = 0.055, disabled = false } = options;
  const elementRef = useRef<T>(null);

  // High-frequency animation values stored in refs
  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || disabled || typeof window === 'undefined') {
      if (el) {
        el.style.transform = 'translate3d(0px, 0px, 0px)';
      }
      return;
    }

    // Normalized pointer position [-1, 1] relative to center
    const handlePointerMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - halfW) / halfW));
      const ny = Math.max(-1, Math.min(1, (e.clientY - halfH) / halfH));

      // Inverse shift: move opposite to pointer
      targetRef.current.x = -nx * maxX;
      targetRef.current.y = -ny * maxY;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Smooth inertial animation loop
    const tick = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      current.x += (target.x - current.x) * damping;
      current.y += (target.y - current.y) * damping;

      if (el) {
        el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0px)`;
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [maxX, maxY, damping, disabled]);

  return elementRef;
}
