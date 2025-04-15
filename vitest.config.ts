/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() as any, tsconfigPaths() as any],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@providers": path.resolve(__dirname, "./src/providers"),
      "@admin": path.resolve(__dirname, "./src/admin"),
      "@typings": path.resolve(__dirname, "./src/typings"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "test/", "**/*.d.ts", "**/*.test.{ts,tsx}", "src/vite-env.d.ts"],
    },
  },
});
