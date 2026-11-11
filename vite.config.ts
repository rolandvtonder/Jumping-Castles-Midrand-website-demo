import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
import {defineConfig} from 'vite';

// A real multi-page site: every section is its own HTML file and URL
// (/castles/, /extras/ …), so each page can be shared, bookmarked and
// indexed by Google on its own. All of them mount the same React app,
// which picks the page from <body data-page>.
const pages = ['castles', 'extras', 'gallery', 'areas', 'contact'];

export default defineConfig({
  // GitHub Pages serves the demo from /<repo-name>/; the deploy workflow sets
  // BASE_PATH. Anywhere else (your own domain) it stays at the root.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        ...Object.fromEntries(pages.map((p) => [p, resolve(__dirname, p, 'index.html')])),
      },
    },
  },
});
