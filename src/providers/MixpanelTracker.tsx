import { useMixpanelPageView } from "../track/useMixpanelPageView";

export default function MixpanelTracker() {
  useMixpanelPageView();
  return null;
}
