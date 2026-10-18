import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkExplain, rehypeImageProvenance } from './src/lib/explain.mjs';

export default defineConfig({
  site: 'https://bks-lab.github.io',
  base: '/bks-news',
  output: 'static',
  integrations: [sitemap()],
  build: {
    assets: 'assets'
  },
  markdown: {
    // ```animation-Blöcke, Karte "Zahl der Woche", Herkunft der Inline-Bilder
    remarkPlugins: [remarkExplain],
    rehypePlugins: [rehypeImageProvenance],
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
