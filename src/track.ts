import mixpanel from "mixpanel-browser";

const isProd = process.env.NODE_ENV === "production";

type GtagEvent = (command: string, targetId: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag: GtagEvent;
  }
}

function initialize() {
  const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;
  if (!isProd) {
    console.log("개발 서버에서 트래킹이 initialize 되었습니다.");
    return;
  }

  try {
    window.gtag("js", new Date().toISOString());
    window.gtag("config", "G-CODE", {
      send_page_view: false,
    });

    mixpanel.init(`${MIXPANEL_TOKEN}`, { debug: false });
  } catch (e) {
    console.error(e);
  }
}

export const track = {
  initialize,
};
