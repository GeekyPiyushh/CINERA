import React from 'react';
import { PosterPlane } from './PosterPlane';
import { OutlineFrames } from './OutlineFrames';

/**
 * PosterStage
 * Groups the PosterPlane and its two OutlineFrames together.
 * Deliberate 2% offset toward lower-left: position [-0.06, -0.04, 0].
 */
export const PosterStage: React.FC = () => {
  return (
    <group position={[-0.06, -0.04, 0]}>
      <PosterPlane />
      <OutlineFrames />
    </group>
  );
};
