import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bks-lab.github.io',
  base: '/bks-news',
  output: 'static',
  build: {
    assets: 'assets'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
