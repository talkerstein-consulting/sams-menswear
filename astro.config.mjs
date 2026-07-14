// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Sam's Menswear — static editorial site.
// React is used only for the animated hero ("The Tailor's Notebook"),
// mounted as a client island. Everything else is static HTML/CSS.
export default defineConfig({
  site: 'https://customsuitandshirt.com',
  integrations: [
    react(),
    // Exclude the staging suit-builder from the sitemap — it's noindex until it
    // replaces the SVG configurator on /design (after Ingrid's colour pass).
    sitemap({ filter: (page) => !page.includes('/suit-builder') }),
  ],
  server: { port: 4321 },
});
