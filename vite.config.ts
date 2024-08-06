import prerender from "@prerenderer/rollup-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { generatePerformanceRoutes } from "./src/utils/generatePerformanceRoute";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const routes = await generatePerformanceRoutes(env.VITE_API_BASE_URL);

  return {
    plugins: [
      react(),
      prerender({
        routes,
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          maxConcurrentRoutes: 1,
          renderAfterTime: 500,
          puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
          executablePath: "/usr/bin/google-chrome-stable",
          useCustomPuppeteer: true,
          customPuppeteerModule: "puppeteer-core",
        },
      }),
      svgr({
        svgrOptions: {
          icon: true,
          memo: true,
        },
      }),
      tsconfigPaths(),
    ],
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    optimizeDeps: {
      include: ["react-lottie-player"],
    },
  };
});
