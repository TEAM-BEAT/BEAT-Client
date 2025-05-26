import { TRACK_EVENTS } from "src/track/events";
import { trackEvent } from "src/track/track";

export const useTracking = () => {
  const track = (event: keyof typeof TRACK_EVENTS, properties = {}) => {
    trackEvent(TRACK_EVENTS[event], properties);
  };

  return { track };
};
