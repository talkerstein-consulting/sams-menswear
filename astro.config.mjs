// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Sam's Menswear — static editorial site.
// React is used only for the animated hero ("The Tailor's Notebook"),
// mounted as a client island. Everything else is static HTML/CSS.
export default defineConfig({
  site: 'https://customsuitandshirt.com',
  integrations: [react()],
  server: { port: 4321 },
});
