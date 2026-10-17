import { createContext } from 'react';

export interface HeroContextValue {
  progressRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  isCanvasActive: boolean;
  setIsCanvasActive: (active: boolean) => void;
  webglAvailable: boolean;
}

export const HeroContext = createContext<HeroContextValue | null>(null);
