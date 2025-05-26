import mixpanel from "mixpanel-browser";

const isProd = process.env.NODE_ENV === "production";
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

type GtagEvent = (command: string, targetId: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag: GtagEvent;
  }
}

function initialize() {
  if (!isProd) {
    console.log("개발 서버에서 트래킹이 initialize 되었습니다.");
    return;
  }

  try {
    if (MIXPANEL_TOKEN) {
      window.gtag("js", new Date().toISOString());
      window.gtag("config", "G-CODE", {
        send_page_view: false,
      });

      mixpanel.init(MIXPANEL_TOKEN, {
        debug: !isProd,
        track_pageview: true,
        track_links_timeout: 300,
        persistence: "localStorage",
        ignore_dnt: true,
      });

      mixpanel.register({
        referrer: document.referrer,
        full_url: window.location.href,
        pathname: window.location.pathname,
      });
    }
  } catch (e) {
    console.error("[Mixpanel 초기화 실패]", e);
  }
}

export const track = {
  initialize,
};

type EventProperties = Record<string, unknown>;

export function trackEvent(event: string, properties?: EventProperties) {
  if (!isProd) {
    console.log("[TRACKING]", event, properties);
    return;
  }
  if (!MIXPANEL_TOKEN) {
    console.warn("[TRACKING] Mixpanel token이 설정되지 않아 이벤트를 전송하지 않습니다.");
    return;
  }

  mixpanel.track(event, {
    ...properties,
    path: window.location.pathname,
  });
}
