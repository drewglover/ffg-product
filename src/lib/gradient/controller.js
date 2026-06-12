// Framework-agnostic singleton that owns the live MeshGradient instance.
//
// The renderer prepends a fixed, full-viewport canvas to <body>, so the instance
// must outlive React layout swaps (Auth ↔ Unauth) and route changes. Keeping it
// in a module-level singleton (rather than React state) means it survives those
// remounts and is reachable from both React (route sync) and plain modules
// (e.g. an action handler firing a pulse).
import { MeshGradient } from '../mesh-gradient.js';
import { gradientForPath } from '../gradients/index.js';

let engine = null;
let currentConfig = null; // the vertex array currently shown/targeted

// Mount the gradient for the initial route and play the intro. Idempotent: a
// second call (e.g. React StrictMode's double-invoke) reuses the live instance
// and drops any stray canvas left by a torn-down one.
export function initGradient(pathname = '/') {
  if (engine) return engine;

  // Drop a canvas orphaned by a prior mount before creating a fresh instance.
  document.querySelectorAll('canvas[data-ffg-mesh]').forEach((c) => c.remove());

  currentConfig = gradientForPath(pathname);
  engine = new MeshGradient({
    bgColor: '#f7f5f1',
    introDuration: 1800,
    outroDuration: 1400,
    rows: 4,
    cols: 4,
    vertices: currentConfig,
  });
  if (engine.canvas) engine.canvas.setAttribute('data-ffg-mesh', '');
  // Short delay lets the page settle before the intro fires, preventing stutter.
  setTimeout(() => engine && engine.playIntro(), 250);
  return engine;
}

// Morph the gradient to the config for `pathname`, if it differs from the
// current one. No-op until the gradient has been initialised.
export function setSurface(pathname = '/') {
  if (!engine) return;
  const next = gradientForPath(pathname);
  if (next === currentConfig) return;
  currentConfig = next;
  engine.morphTo(next, 2400);
}

// Fire a one-shot pulse. The reusable action trigger — any module can call this.
export function pulse() {
  if (engine) engine.playPulse();
}

// Single import surface for callers that prefer an object handle.
export const gradientController = { initGradient, setSurface, pulse };
