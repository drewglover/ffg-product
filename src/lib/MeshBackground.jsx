import { useEffect } from 'react';
import { MeshGradient } from './mesh-gradient.js';

// The animated Coons-patch mesh background. The vertex config is identical
// across all three prototype surfaces, so it's mounted once at the app root
// (the renderer prepends a fixed, pointer-events:none canvas to <body>).
const VERTICES = [
  { color: '#f7f5f1', position: [0.000, 1.000], handles: { e: [0.1111111111111111, 0], w: null, n: [0, -0.1111111111111111], s: null }, introFrom: [-0.30, 1.30], outroTo: [-0.30, 1.30] },
  { color: '#f7f5f1', position: [0.572, 1.045], handles: { e: [0.1111111111111111, 0], w: [-0.1111111111111111, 0], n: [0, -0.1111111111111111], s: null }, introFrom: [0.33, 1.30], outroTo: [0.33, 1.30] },
  { color: '#f7f5f1', position: [0.865, 1.046], handles: { e: [0.1111111111111111, 0], w: [-0.1111111111111111, 0], n: [0, -0.1111111111111111], s: null }, introFrom: [0.67, 1.30], outroTo: [0.67, 1.30] },
  { color: '#f7f5f1', position: [1.000, 1.000], handles: { e: null, w: [-0.1111111111111111, 0], n: [0, -0.1111111111111111], s: null }, introFrom: [1.30, 1.30], outroTo: [1.30, 1.30] },
  { color: '#f7f5f1', position: [0.000, 0.667], handles: { e: [0.1111111111111111, 0], w: null, n: [0, -0.1111111111111111], s: [0, 0.1111111111111111] }, introFrom: [-0.30, 0.67], outroTo: [-0.30, 0.67] },
  { color: '#f7f5f1', position: [0.527, 0.470], handles: { e: [0.1111111111111111, 0], w: [-0.1111111111111111, 0], n: [0, -0.1111111111111111], s: [0, 0.1111111111111111] }, introFrom: [0.33, 0.67], outroTo: [0.33, 0.67] },
  { color: '#f7f5f1', position: [0.859, 0.609], handles: { e: [0.1111111111111111, 0], w: [-0.1111111111111111, 0], n: [0, -0.1111111111111111], s: [0, 0.1111111111111111] }, introFrom: [0.67, 0.67], outroTo: [0.67, 0.67] },
  { color: '#f7f5f1', position: [1.025, 0.696], handles: { e: null, w: [-0.1111111111111111, 0], n: [0, -0.1111111111111111], s: [0, 0.1111111111111111] }, introFrom: [1.30, 0.67], outroTo: [1.30, 0.67] },
  { color: '#f7f5f1', position: [0.000, 0.333], handles: { e: [0.1111111111111111, 0], w: null, n: [0, -0.1111111111111111], s: [0, 0.1111111111111111] }, introFrom: [-0.30, 0.33], outroTo: [-0.30, 0.33] },
  { color: '#f7f5f1', position: [0.543, 0.148], handles: { e: [0.1111111111111111, 0], w: [-0.1111111111111111, 0], n: [0, -0.1111111111111111], s: [0, 0.1111111111111111] }, introFrom: [0.33, 0.33], outroTo: [0.33, 0.33] },
  { color: '#f7f5f1', position: [0.798, 0.279], handles: { e: [0.24674479166666663, -0.022483407079646023], w: [-0.1111111111111111, 0], n: [0.04612025258112096, -0.3833978613569321], s: [0, 0.1111111111111111] }, introFrom: [0.80, 0.28], outroTo: [0.80, 0.28] },
  { color: '#8FBED5', position: [1.000, 0.395], handles: { e: null, w: [-0.05721100663716816, -0.19100294985250743], n: [0.011436439896755246, -0.20026733038348088], s: [0.021916482300884832, 0.12171828908554572] }, introFrom: [1.20, 0.33], outroTo: [1.50, 0.00] },
  { color: '#f7f5f1', position: [0.000, 0.000], handles: { e: [0.1111111111111111, 0], w: null, n: null, s: [0, 0.1111111111111111] }, introFrom: [-0.30, -0.30], outroTo: [-0.30, -0.30] },
  { color: '#f7f5f1', position: [0.539, -0.054], handles: { e: [0.1111111111111111, 0], w: [-0.1111111111111111, 0], n: null, s: [0, 0.1111111111111111] }, introFrom: [0.33, -0.30], outroTo: [0.33, -0.30] },
  { color: '#EFDFD5', position: [0.739, -0.014], handles: { e: [0.19066878687315636, -0.01595685840707972], w: [-0.1111111111111111, 0], n: null, s: [0.08242302728613571, 0.18875368731563424] }, introFrom: [0.50, -0.01], outroTo: [0.40, -0.30] },
  { color: '#263759', position: [1.006, 0.015], handles: { e: null, w: [-0.10920215707964598, 0.00821349557522133], n: null, s: [0.0224695796460177, 0.14948377581120953] }, introFrom: [1.10, -0.10], outroTo: [1.20, -0.20] },
];

export default function MeshBackground() {
  useEffect(() => {
    // Drop any canvas left by a prior mount (e.g. StrictMode's double-invoke).
    document.querySelectorAll('canvas[data-ffg-mesh]').forEach((c) => c.remove());

    const gradient = new MeshGradient({
      bgColor: '#f7f5f1',
      introDuration: 1800,
      outroDuration: 1400,
      floatAmplitude: 0.025,
      floatSpeed: 0.00018,
      rows: 4,
      cols: 4,
      vertices: VERTICES,
    });
    if (gradient._cvs) gradient._cvs.setAttribute('data-ffg-mesh', '');
    // Short delay lets the page settle before the intro fires, preventing stutter.
    const id = setTimeout(() => gradient.playIntro(), 250);

    return () => {
      clearTimeout(id);
      if (gradient._cvs) gradient._cvs.remove();
    };
  }, []);

  return null;
}
