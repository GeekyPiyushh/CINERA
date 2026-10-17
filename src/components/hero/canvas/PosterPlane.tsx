import React, { useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { FILMS } from '../../../config/films';
import { generateFallbackPlateCanvas } from '../../../lib/fallbackTexture';
import vertexShader from './shaders/poster.vert.glsl?raw';
import fragmentShader from './shaders/poster.frag.glsl?raw';

export const PosterPlane: React.FC = () => {
  const currentFilm = FILMS[0]; // Interstellar for static Phase 2 stage
  const [textureA, setTextureA] = useState<THREE.Texture | null>(null);

  // Plane geometry: 1.6 x 2.4 units, 32x48 segments for smooth vertex curve
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(1.6, 2.4, 32, 48);
  }, []);

  // Generate fallback plate texture
  const fallbackTexture = useMemo(() => {
    const canvas = generateFallbackPlateCanvas({
      titleLineA: currentFilm.titleLineA,
      titleLineB: currentFilm.titleLineB,
      meta: currentFilm.meta,
      accent: currentFilm.accent,
      reelNumber: currentFilm.reelNumber,
    });
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
  }, [currentFilm]);

  // Load real poster texture with sRGB color management, falling back to canvas plate
  useEffect(() => {
    const isNoImages =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('noimages') === '1';

    if (isNoImages) {
      return;
    }

    const loader = new THREE.TextureLoader();
    let isMounted = true;
    let loadedTex: THREE.Texture | null = null;

    loader.load(
      currentFilm.poster,
      (tex) => {
        if (!isMounted) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        tex.needsUpdate = true;
        loadedTex = tex;
        setTextureA(tex);
      },
      undefined,
      () => {
        // Error handler: textureA remains null, defaulting to fallbackTexture
      },
    );

    return () => {
      isMounted = false;
      if (loadedTex) {
        loadedTex.dispose();
      }
    };
  }, [currentFilm]);

  // Clean up geometry and fallback texture on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
      fallbackTexture.dispose();
    };
  }, [geometry, fallbackTexture]);

  const activeTex = textureA || fallbackTexture;

  // ShaderMaterial uniforms (freshly constructed when activeTex or currentFilm updates)
  const uniforms = useMemo(() => {
    return {
      uBend: { value: 0.06 },
      uTexA: { value: activeTex },
      uTexB: { value: activeTex },
      uProgress: { value: 0.0 },
      uAccent: { value: new THREE.Color(currentFilm.accent) },
      uGold: { value: new THREE.Color('#C6A77C') },
    };
  }, [activeTex, currentFilm]);

  return (
    // Positioned at origin inside PosterStage group (which carries the deliberate offset)
    <mesh
      geometry={geometry}
      position={[0, 0, 0]}
    >
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        toneMapped={false}
        transparent={false}
      />
    </mesh>
  );
};
