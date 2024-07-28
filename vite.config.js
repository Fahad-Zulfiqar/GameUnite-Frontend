import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://game-unite-backend.koyeb.app",
        changeOrigin: true,
      },
      "/uploads": {
        target: "https://game-unite-backend.koyeb.app",
        changeOrigin: true,
      },
    },
  },
});
