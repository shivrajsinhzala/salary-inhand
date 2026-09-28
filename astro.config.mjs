// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { CONTENT_UPDATED } from './src/lib/site.js';

const lastmod = new Date(`${CONTENT_UPDATED}T00:00:00Z`);

/** Crawl-budget hints: hubs and the homepage outrank the long tail. */
function priorityFor(url) {
  const path = new URL(url).pathname;
  if (path === '/') return 1.0;
  if (path === '/in-hand-salary/' || path === '/income-tax/') return 0.9;
  if (path.startsWith('/tools/')) return 0.8;
  if (path === '/methodology/') return 0.5;
  if (path === '/privacy/') return 0.3;
  return 0.7;
}

export default defineConfig({
  site: 'https://salary.shivrajsinh.in',
  integrations: [
    tailwind(),
    sitemap({
      // 404 has no business in a sitemap; it is served as noindex anyway.
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      lastmod,
      serialize(item) {
        return { ...item, priority: priorityFor(item.url) };
      }
    })
  ],
  build: {
    format: 'directory'
  }
});
