import { useEffect } from 'react';
import { initGradient } from './gradient/controller.js';

// Mounts the animated mesh gradient once at app root. The vertex configs now
// live in ./gradients/*.json and are owned by the gradient controller singleton
// (the renderer prepends its own fixed, pointer-events:none canvas to <body>).
// Route-driven morphing is handled by GradientRouteSync inside the router.
export default function MeshBackground() {
  useEffect(() => {
    initGradient(window.location.pathname);
  }, []);

  return null;
}
