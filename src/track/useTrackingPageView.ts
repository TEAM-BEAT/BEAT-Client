import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "./track";
import { TRACK_EVENTS } from "./constants/events";
import { extractIdFromPath } from "./extractIdFromPath";
import { TRACKING_CONFIG } from "./constants/trackingConfig";

export function useTrackingPageView(): void {
  const location = useLocation();

  useEffect(() => {
    if (mixpanel && typeof mixpanel.track === "function") {
      const { pathname } = location;

      // "complete"의 경우 페이지가 바뀐것이 아니므로 로깅 패스
      if (pathname.includes("complete")) {
        return;
      }
      const matchedConfig = TRACKING_CONFIG.find((config) => pathname.startsWith(config.path));

      if (matchedConfig) {
        const paramValue = extractIdFromPath(pathname, matchedConfig.path);
        trackEvent(
          TRACK_EVENTS[matchedConfig.event],
          paramValue ? { [matchedConfig.paramKey]: paramValue } : undefined
        );
        return;
      }

      trackEvent(TRACK_EVENTS.PAGE_VIEW, { path: pathname });
    }
  }, [location.pathname]);
}
