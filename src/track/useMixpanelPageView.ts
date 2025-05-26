import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useMixpanelPageView(): void {
  const location = useLocation();

  useEffect(() => {
    if (mixpanel && typeof mixpanel.track === "function") {
      mixpanel.track("Page Viewed", {
        path: location.pathname,
        full_url: window.location.href,
      });

      mixpanel.register({
        referrer: document.referrer,
      });
    }
  }, [location.pathname]);
}
