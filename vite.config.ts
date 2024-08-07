import prerender from "@prerenderer/rollup-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { generatePerformanceRoutes } from "./src/utils/generatePerformanceRoute";
import chromium from "@sparticuz/chromium-min";

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
          launchOptions: {
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            defaultViewport: chromium.defaultViewport,
            executablePath:
              env.VITE_CHROME_PATH ||
              (await chromium.executablePath(
                "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"
              )),
            ignoreHTTPSErrors: true,
            headless: chromium.headless,
          },
          maxConcurrentRoutes: 1,
          renderAfterTime: 500,
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
