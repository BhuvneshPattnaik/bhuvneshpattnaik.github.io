import { defineConfig } from 'astro/config';

// Update `site` to your GitHub Pages URL: https://<username>.github.io
// Update `base` to your repo name if using a project repo: /<repo-name>/
// If using <username>.github.io repo, set base to '/'
export default defineConfig({
  site: 'https://bhuvneshpattnaik.github.io',
  base: '/',
  output: 'static',
});
