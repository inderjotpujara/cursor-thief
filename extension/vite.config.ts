/* This file exists so editors get a vite root. Real builds are driven by scripts/build.mjs */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: true,
    target: "es2022",
  },
});
