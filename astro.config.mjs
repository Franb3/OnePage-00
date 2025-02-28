import { defineConfig } from 'astro/config';

export default defineConfig({
    output: 'server',
    pages: {
      '404': '/404'
    }
});
