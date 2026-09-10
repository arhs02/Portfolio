import { useEffect, useRef, useState } from "react";

/*
  Salar de Uyuni — a procedural mirror-horizon scene.

  One fullscreen fragment shader, no three.js: the sky is a vertical gradient
  with drifting fbm cloud banks, and the salt flat below the horizon samples
  that same sky mirrored, warped by a shallow ripple that widens toward the
  viewer. That reuse is what sells the reflection, and it costs one extra
  texture-free evaluation rather than a render target.

  Falls back to a plain CSS gradient if WebGL is unavailable, and renders a
  single still frame under prefers-reduced-motion.
*/

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform float uScroll;   // 0..1, drifts the light through the day
uniform float uReduced;  // 1.0 = hold still

// -- noise -------------------------------------------------------------
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

// -- palette -----------------------------------------------------------
// Three stops per keyframe: zenith, middle band, horizon.
void palette(float t, out vec3 zen, out vec3 mid, out vec3 hor) {
  // Dawn
  vec3 z0 = vec3(0.353, 0.451, 0.643);
  vec3 m0 = vec3(0.812, 0.667, 0.702);
  vec3 h0 = vec3(0.969, 0.839, 0.706);
  // Soft day
  vec3 z1 = vec3(0.451, 0.612, 0.792);
  vec3 m1 = vec3(0.749, 0.843, 0.918);
  vec3 h1 = vec3(0.925, 0.941, 0.949);
  // Dusk
  vec3 z2 = vec3(0.310, 0.361, 0.545);
  vec3 m2 = vec3(0.678, 0.541, 0.671);
  vec3 h2 = vec3(0.937, 0.678, 0.522);

  if (t < 0.5) {
    float k = smoothstep(0.0, 1.0, t * 2.0);
    zen = mix(z0, z1, k); mid = mix(m0, m1, k); hor = mix(h0, h1, k);
  } else {
    float k = smoothstep(0.0, 1.0, (t - 0.5) * 2.0);
    zen = mix(z1, z2, k); mid = mix(m1, m2, k); hor = mix(h1, h2, k);
  }
}

// h: 0 at horizon, 1 at zenith
vec3 sky(float h, vec2 p, float t, float time) {
  vec3 zen, mid, hor;
  palette(t, zen, mid, hor);

  float hh = clamp(h, 0.0, 1.0);
  vec3 col = mix(hor, mid, smoothstep(0.0, 0.42, hh));
  col = mix(col, zen, smoothstep(0.35, 1.0, hh));

  // Cloud banks: stretched wide and flat, drifting slowly.
  vec2 cp = vec2(p.x * 1.15 + time * 0.012, (hh + 0.05) * 3.4 - time * 0.004);
  float c = fbm(cp * 2.1);
  c = smoothstep(0.42, 0.88, c);
  // Thin them out near the horizon so the skyline stays clean and far away.
  c *= smoothstep(0.02, 0.30, hh) * (1.0 - smoothstep(0.72, 1.0, hh) * 0.55);

  vec3 cloudLit = mix(vec3(1.0), hor, 0.35);
  col = mix(col, cloudLit, c * 0.62);

  // Warm bloom sitting right on the horizon.
  col += hor * 0.30 * exp(-hh * 14.0);
  return col;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y);

  float time = uReduced > 0.5 ? 120.0 : uTime;
  float tod = clamp(uScroll, 0.0, 1.0);

  // Horizon sits just above centre, which leaves room for the reflection.
  const float HORIZON = 0.52;

  vec3 col;

  if (uv.y > HORIZON) {
    float h = (uv.y - HORIZON) / (1.0 - HORIZON);
    col = sky(h, p, tod, time);
  } else {
    // Mirror: distance below the horizon maps back up into the sky.
    float d = (HORIZON - uv.y) / HORIZON;

    // Ripple widens and slows toward the viewer. Kept small — this is a
    // few millimetres of water, not a lake.
    float rip = fbm(vec2(p.x * 5.0, d * 14.0 - time * 0.10)) - 0.5;
    float rip2 = fbm(vec2(p.x * 11.0 + 4.0, d * 26.0 - time * 0.16)) - 0.5;
    float warp = (rip * 0.020 + rip2 * 0.008) * smoothstep(0.0, 0.55, d);

    float h = d * (1.0 - HORIZON) / HORIZON + warp;
    vec2 pr = vec2(p.x + warp * 0.6, p.y);
    col = sky(max(h, 0.0), pr, tod, time);

    // Reflections are never quite as bright as the source.
    col *= 0.94 - d * 0.10;
    col = mix(col, vec3(dot(col, vec3(0.299, 0.587, 0.114))), d * 0.16);

    // Faint salt-polygon seams, only in the near field.
    vec2 sp = vec2(p.x * 7.0, d * 9.0);
    float seam = abs(fbm(sp) - 0.5);
    seam = 1.0 - smoothstep(0.0, 0.055, seam);
    col = mix(col, col * 1.05 + 0.02, seam * smoothstep(0.25, 0.95, d) * 0.5);
  }

  // The waterline itself: a thin, bright, slightly soft band.
  float line = 1.0 - smoothstep(0.0, 0.006, abs(uv.y - HORIZON));
  vec3 zen, mid, hor;
  palette(tod, zen, mid, hor);
  col = mix(col, mix(hor, vec3(1.0), 0.45), line * 0.55);

  // Gentle cinematic falloff at the frame edges.
  vec2 vg = uv - 0.5;
  col *= 1.0 - dot(vg, vg) * 0.38;

  // Dither: breaks up banding across these very smooth gradients.
  col += (hash(frag + fract(time)) - 0.5) * 0.006;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(log || "shader compile failed");
  }
  return sh;
}

export default function UyuniScene({ reduced = false }) {
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl;
    try {
      gl =
        canvas.getContext("webgl", {
          antialias: false,
          alpha: false,
          powerPreference: "low-power",
        }) || canvas.getContext("experimental-webgl");
    } catch {
      gl = null;
    }
    if (!gl) {
      setFailed(true);
      return;
    }

    let program;
    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "link failed");
      }
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    } catch (err) {
      console.warn("UyuniScene: falling back to CSS gradient —", err.message);
      setFailed(true);
      return;
    }

    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uScroll = gl.getUniformLocation(program, "uScroll");
    const uReduced = gl.getUniformLocation(program, "uReduced");

    // A fullscreen fbm shader does not need retina pixels. Capping DPR here
    // is the single biggest lever on fill cost.
    const maxDpr = 1.5;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    };
    window.addEventListener("resize", onResize);

    // Scroll drives time-of-day. Eased so the light never snaps.
    let scrollTarget = 0;
    let scrollCurrent = 0;
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollTarget = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let running = true;
    const start = performance.now();

    const draw = () => {
      if (!running) return;
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.045;
      const t = (performance.now() - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uScroll, scrollCurrent);
      gl.uniform1f(uReduced, reduced ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();

    // Don't burn cycles behind a hidden tab.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        draw();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onLost = (e) => {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, [reduced]);

  if (failed) {
    return <div className="fixed inset-0 z-0 uyuni-fallback" aria-hidden="true" />;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 block"
      aria-hidden="true"
    />
  );
}
