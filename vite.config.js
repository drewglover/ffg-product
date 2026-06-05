import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Faithful port of the Factory for Good design prototypes.
// styles.css and /assets are served verbatim from public/ so the original
// relative url() references resolve unchanged.
export default defineConfig({
  plugins: [react()],
});
