import dsv from "@rollup/plugin-dsv";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: "build",
  },
  plugins: [react(), dsv()],
});
