// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://salary.shivrajsinh.in',
  integrations: [sitemap()],
  build: {
    format: 'directory'
  }
});
