/**
 * CINÉRA Fallback Plate Generator
 * Creates an archival editorial canvas plate when film poster images are missing or loading.
 * Pure procedural rendering: Obsidian-to-accent gradient, film title in Instrument Serif,
 * subtle film grain, and luxury gold hairlines.
 */

interface FallbackPlateOptions {
  titleLineA: string;
  titleLineB: string;
  meta: string;
  accent: string;
  reelNumber: string;
  width?: number;
  height?: number;
}

const plateCache = new Map<string, string>();

export function generateFallbackPlateCanvas({
  titleLineA,
  titleLineB,
  meta,
  accent,
  reelNumber,
  width = 1000,
  height = 1500,
}: FallbackPlateOptions): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Obsidian base
  ctx.fillStyle = '#100B0D';
  ctx.fillRect(0, 0, width, height);

  // 2. Soft radial glow from lower-center in film accent
  const radialGlow = ctx.createRadialGradient(
    width * 0.5,
    height * 0.72,
    50,
    width * 0.5,
    height * 0.72,
    width * 0.75,
  );
  radialGlow.addColorStop(0, `${accent}40`);
  radialGlow.addColorStop(0.5, `${accent}15`);
  radialGlow.addColorStop(1, 'rgba(16, 11, 13, 0)');
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, width, height);

  // 3. Deep burgundy ambient glow in lower left
  const burgGlow = ctx.createRadialGradient(
    width * 0.2,
    height * 0.85,
    30,
    width * 0.2,
    height * 0.85,
    width * 0.6,
  );
  burgGlow.addColorStop(0, 'rgba(72, 27, 41, 0.45)');
  burgGlow.addColorStop(1, 'rgba(16, 11, 13, 0)');
  ctx.fillStyle = burgGlow;
  ctx.fillRect(0, 0, width, height);

  // 4. Procedural film grain
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const grainStrength = 14;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * grainStrength;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // 5. Hairlines and crop marks
  const margin = 50;
  ctx.strokeStyle = 'rgba(198, 167, 124, 0.35)';
  ctx.lineWidth = 1;
  ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

  // Inner inset frame
  const inset = 65;
  ctx.strokeStyle = 'rgba(198, 167, 124, 0.15)';
  ctx.strokeRect(inset, inset, width - inset * 2, height - inset * 2);

  // 6. Header mono metadata
  ctx.fillStyle = 'rgba(245, 233, 221, 0.7)';
  ctx.font = '500 20px "IBM Plex Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`CINÉRA ARCHIVE // REEL ${reelNumber}`, margin + 30, margin + 45);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#C6A77C';
  ctx.fillText('70MM PROJECTION', width - margin - 30, margin + 45);

  // Center optical graphic (geometric projector aperture)
  const cy = height * 0.44;
  const cx = width * 0.5;

  ctx.strokeStyle = 'rgba(198, 167, 124, 0.25)';
  ctx.beginPath();
  ctx.arc(cx, cy, 140, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `${accent}60`;
  ctx.beginPath();
  ctx.arc(cx, cy, 100, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(198, 167, 124, 0.4)';
  ctx.beginPath();
  ctx.arc(cx, cy, 60, 0, Math.PI * 2);
  ctx.stroke();

  // Central star glyph
  ctx.fillStyle = '#C6A77C';
  ctx.font = '36px "Instrument Serif", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✦', cx, cy);

  // 7. Title presentation in Instrument Serif
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#F5E9DD';
  ctx.font = '400 96px "Instrument Serif", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText(titleLineA, cx, height * 0.72);

  ctx.fillStyle = '#C6A77C';
  ctx.font = 'italic 400 84px "Instrument Serif", Georgia, serif';
  ctx.fillText(titleLineB, cx, height * 0.79);

  // 8. Footer metadata
  ctx.fillStyle = 'rgba(245, 233, 221, 0.65)';
  ctx.font = '18px "IBM Plex Mono", monospace';
  ctx.fillText(meta.toUpperCase(), cx, height - margin - 35);

  return canvas;
}

export function getFallbackPlateDataUrl(options: FallbackPlateOptions): string {
  const cacheKey = `${options.reelNumber}-${options.titleLineA}-${options.titleLineB}`;
  const cached = plateCache.get(cacheKey);
  if (cached) return cached;

  const canvas = generateFallbackPlateCanvas(options);
  const dataUrl = canvas.toDataURL('image/webp', 0.92);
  plateCache.set(cacheKey, dataUrl);
  return dataUrl;
}
