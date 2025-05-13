import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useMixpanelPageView(): void {
  const location = useLocation();

  useEffect(() => {
    mixpanel.track("Page Viewed", {
      path: location.pathname,
    });
  }, [location.pathname]);
}
