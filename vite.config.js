/* eslint-env node */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// Use BASE_PATH env for GitHub Pages project sites (e.g., /Portfolio-2025/)
const base = "/Portfolio/";

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
          "ui-vendor": ["react-icons", "react-type-animation"],
        },
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
});
