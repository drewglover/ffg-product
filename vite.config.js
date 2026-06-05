import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Faithful port of the Factory for Good design prototypes.
// styles.css and /assets are served verbatim from public/ so the original
// relative url() references resolve unchanged.
//
// Tailwind v4 + the shadcn theme are layered on top for the `@/components/ui/*`
// shadcn instance (themed to match Niftic-Agency/ffg-components). See
// components.json and src/index.css.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
