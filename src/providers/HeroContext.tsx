import React, { useRef, useState } from 'react';
import { HeroContext } from './heroContextInstance';

export const HeroProvider: React.FC<{
  children: React.ReactNode;
  webglAvailable?: boolean;
}> = ({ children, webglAvailable = true }) => {
  const progressRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isCanvasActive, setIsCanvasActive] = useState<boolean>(true);

  return (
    <HeroContext.Provider
      value={{
        progressRef,
        pointerRef,
        activeIndex,
        setActiveIndex,
        isCanvasActive,
        setIsCanvasActive,
        webglAvailable,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};
