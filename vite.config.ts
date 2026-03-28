import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },

  preview: {
    host: true,
    port: 4173,
    strictPort: true,

    // 🔥 핵심 설정 (403 해결)
    allowedHosts: true,
  },
});