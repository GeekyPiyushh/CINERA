uniform float uBend;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Gentle curved screen: concave bend along horizontal axis (IMAX screen curve)
  pos.z -= pow(pos.x, 2.0) * uBend;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
