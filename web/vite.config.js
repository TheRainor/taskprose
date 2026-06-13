import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  base: isVercel ? "/" : "./",
  plugins: [tailwindcss(), react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  server: { port: 5173 },
});
