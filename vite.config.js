import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  server: {
    port: 8000,
  },
  build: {
    target: "es2019",
    emptyOutDir: true,
    outDir: "dist",
  },
});
