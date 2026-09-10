/* eslint-env node */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// Public base path. GitHub Pages project sites are served from
// /<repo-name>/, which the deploy workflow passes in as BASE_PATH. The
// fallback keeps local builds working when it is unset; rename the repo and
// only the workflow value needs to change.
const base = process.env.BASE_PATH || "/Portfolio/";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code for better caching.
          // framer-motion is deliberately NOT listed: only the lazy CaseStudy
          // modal uses it, so forcing it into a named chunk here would get it
          // modulepreloaded on first paint. Left alone, Rollup folds it into
          // that lazy chunk instead.
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": ["react-icons"],
        },
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
});
