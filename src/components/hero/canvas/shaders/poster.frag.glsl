uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform float uProgress;
uniform vec3 uAccent;
uniform vec3 uGold;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Sample textures
  vec4 colorA = texture2D(uTexA, uv);
  vec4 colorB = texture2D(uTexB, uv);

  // Progressive blend between texture A and texture B
  vec4 mixedColor = mix(colorA, colorB, clamp(uProgress, 0.0, 1.0));

  // Natural edge vignette (darkening toward borders)
  vec2 vigUv = (uv - 0.5) * 2.0;
  float vignette = clamp(1.0 - dot(vigUv, vigUv) * 0.22, 0.0, 1.0);
  mixedColor.rgb *= vignette;

  // 1px gold edge border line
  float edgeDistX = min(uv.x, 1.0 - uv.x);
  float edgeDistY = min(uv.y, 1.0 - uv.y);
  float borderDist = min(edgeDistX, edgeDistY);
  float borderFactor = 1.0 - smoothstep(0.0, 0.0035, borderDist);

  // Overlay gold hairline onto edge
  mixedColor.rgb = mix(mixedColor.rgb, uGold, borderFactor * 0.7);

  gl_FragColor = mixedColor;

  #include <colorspace_fragment>
}
