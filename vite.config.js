import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  root: "./",
  base: "./",
  build: {
    rollupOptions: {
      external: ["bootstrap/dist/css/bootstrap.css"],
    },
  },
  resolve: {
    alias: {
      "react-router-dom": require.resolve("react-router-dom"), // Alias na správne spracovanie v build procese
      "electron-router-dom": "electron-router-dom/dist/cjs/index.js",
    },
  },
  plugins: [react()],
});
