import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fenomelini.github.io',
  base: '/balatro-odyssey-wiki',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap(),
  ],
});
