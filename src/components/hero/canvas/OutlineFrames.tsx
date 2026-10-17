import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';

/**
 * OutlineFrames
 * Two gold LineLoop frames positioned behind the poster plane.
 * Scales: 1.06 and 1.14, at z: -0.25 and -0.5 (35% and 18% opacity).
 * Fully memoized geometry with explicit disposal on unmount.
 */
export const OutlineFrames: React.FC = () => {
  // Rectangle coordinates matching the 1.6 x 2.4 units poster plane
  const geometry = useMemo(() => {
    const hw = 0.8;
    const hh = 1.2;
    const positions = new Float32Array([
      -hw, hh, 0,
       hw, hh, 0,
       hw, -hh, 0,
      -hw, -hh, 0,
    ]);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <group>
      {/* Inner frame: scale 1.06, z -0.25, 35% opacity */}
      <lineLoop geometry={geometry} scale={[1.06, 1.06, 1]} position={[0, 0, -0.25]}>
        <lineBasicMaterial color="#C6A77C" transparent opacity={0.35} depthWrite={false} />
      </lineLoop>

      {/* Outer frame: scale 1.14, z -0.5, 18% opacity */}
      <lineLoop geometry={geometry} scale={[1.14, 1.14, 1]} position={[0, 0, -0.5]}>
        <lineBasicMaterial color="#C6A77C" transparent opacity={0.18} depthWrite={false} />
      </lineLoop>
    </group>
  );
};
