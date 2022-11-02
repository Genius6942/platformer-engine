import { defineConfig } from "vite";
export default defineConfig({
  build: {
    target: "esnext",
    outDir: "example-dist",
  },
});
