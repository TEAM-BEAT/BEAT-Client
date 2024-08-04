import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import prerender from "@prerenderer/rollup-plugin";
import axios from "axios";

type Performance = {
  performanceId: number;
  performanceTitle: string;
  performancePeriod: string;
  ticketPrice: number;
  dueDate: number;
  genre: string;
  posterImage: string;
  performanceVenue: string;
};

// 사전 렌더링 경로 생성
async function generatePerformanceRoutes(url: string) {
  const staticRoutes = ["/", "/main"]; // 정적 경로
  const dynamicRoutes = await fetchPerformanceIds(url); // 동적 경로 가져오기

  return staticRoutes.concat(dynamicRoutes);
}

// 공연 ID를 가져오는 API 호출
async function fetchPerformanceIds(url: string) {
  try {
    const response = await axios.get(`${url}/main`);

    // 응답 데이터에서 performanceId 추출
    const performances = response.data.data.performanceList;
    const validIds = performances.map((performance: Performance) => performance.performanceId);

    return validIds.map((id: number) => `/gig/${id}`);
  } catch (error) {
    console.error("Error fetching performance IDs:", error);
    return [];
  }
}

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
