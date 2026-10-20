import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" — чтобы собранную папку dist можно было открыть с любого хостинга или подпапки.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
