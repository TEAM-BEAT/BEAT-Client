import Prerenderer from "@prerenderer/prerenderer";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";
import chromium from "@sparticuz/chromium-min";

export async function POST(req: Request, res) {
  console.log("req is: ", req);

  try {
    const body = await readBody(req);

    const { performanceId } = body;
    console.log("performanceId is: ", performanceId);

    const chromePath =
      import.meta.env.VITE_CHROME_PATH ||
      (await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"
      ));

    // 프리렌더 작업 수행
    const prerenderer = new Prerenderer({
      staticDir: __dirname, // 정적 파일이 있는 디렉터리 경로
      renderer: new PuppeteerRenderer({
        launchOptions: {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          ignoreDefaultArgs: ["--disable-extensions"],
          defaultViewport: chromium.defaultViewport,
          executablePath: chromePath,
          ignoreHTTPSErrors: true,
          headless: chromium.headless,
        },
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      }),
    });

    await prerenderer.initialize();
    await prerenderer.renderRoutes([`/gig/${performanceId}`]);
    await prerenderer.destroy();

    res.status(200).json({ message: "Prerender complete", performanceId });
  } catch (error) {
    console.error("Error during prerendering:", error);
    res.status(500).json({ message: "Error during prerendering", error });
  }
}

// Request body를 JSON으로 파싱하는 유틸리티 함수
async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks).toString();
  return JSON.parse(buffer);
}
