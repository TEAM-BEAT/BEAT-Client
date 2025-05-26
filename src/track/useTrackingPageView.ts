import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "./track";
import { TRACK_EVENTS } from "./events";

export function useTrackingPageView(): void {
  const location = useLocation();

  useEffect(() => {
    if (mixpanel && typeof mixpanel.track === "function") {
      const path = location.pathname;

      if (path.startsWith("/gig")) {
        const match = path.match(/^\/gig\/(\w+)/);
        const gigId = match ? match[1] : undefined;
        trackEvent(TRACK_EVENTS.VIEWED_PAGE_GIG, gigId ? { gig_id: gigId } : undefined);
        return;
      }

      if (path.startsWith("/book")) {
        const match = path.match(/^\/book\/(\w+)/);
        const gig_id = match ? match[1] : undefined;
        trackEvent(TRACK_EVENTS.VIEWED_PAGE_BOOK, gig_id ? { gig_id: gig_id } : undefined);
        return;
      }

      trackEvent(TRACK_EVENTS.PAGE_VIEW, { path });
    }
  }, [location.pathname]);
}
