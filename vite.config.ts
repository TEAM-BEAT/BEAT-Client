import prerender from "@prerenderer/rollup-plugin";
import chromium from "@sparticuz/chromium-min";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { generatePerformanceRoutes } from "./src/utils/generatePerformanceRoute";
import axios from "axios";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const routes = await generatePerformanceRoutes(env.VITE_API_BASE_URL);

  const executablePath =
    env.VITE_CHROME_PATH ||
    (await chromium.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"
    ));

  return {
    plugins: [
      react(),
      prerender({
        routes,
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          launchOptions: {
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            ignoreDefaultArgs: ["--disable-extensions"],
            defaultViewport: chromium.defaultViewport,
            executablePath,
            ignoreHTTPSErrors: true,
            headless: chromium.headless,
          },
          maxConcurrentRoutes: 1,
          renderAfterTime: 500,
          customPuppeteerModule: "puppeteer-core",
        },
        // Debugging
        postProcess: async (context) => {
          console.log(`Prerendered: ${context.route}`);

          if (context.route.includes("/gig")) {
            const response = await axios.get(
              `${env.VITE_API_BASE_URL}/performances/detail/${context.route.slice(context.route.lastIndexOf("/") + 1)}`
            );

            const performanceData = response.data.data;

            context.html = context.html.replace(
              /<\/head>/i,
              `
                <meta property="og:title" content="${performanceData.performanceTitle || "BEAT"}" />
                <meta property="og:image" content="${performanceData.posterImage || "https://www.sinjibabo.shop/og_img.png"}" />
                <meta name="keywords" content="공연, 밴드, 뮤지컬, 비트, beat" />
                <meta property="og:description" content="${performanceData.performanceDescription || "심장이 뛰는 곳, BEAT에서 만나보세요."}" />
                <meta property="og:url" content="https://www.sinjibabo.shop/gig/${performanceData.performanceId}" />
              </head>`
            );
          }
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
