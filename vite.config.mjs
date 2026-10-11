// vite.config.mjs
// Vite turns our React code (client folder) into plain HTML, CSS and JS.
//
// "npm run build" puts the finished files INTO the public_html folder,
// next to the PHP api. Then you upload public_html to Hostinger.
//
// emptyOutDir: false  ->  do NOT delete public_html first
// (it contains our api, data and uploads folders!)
//
// The proxy is only for "npm run dev": React runs on port 5173
// and sends /api requests to the PHP test server on port 8000.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "client",
  build: {
    outDir: "../public_html",
    emptyOutDir: false
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:8000",
      "/uploads": "http://localhost:8000"
    }
  }
});
