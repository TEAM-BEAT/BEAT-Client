import { TRACK_EVENTS } from "./events";

type RouteTrackingConfig = {
  path: string;
  event: keyof typeof TRACK_EVENTS;
  paramKey: string;
};

export const TRACKING_CONFIG: RouteTrackingConfig[] = [
  {
    path: "/gig",
    event: "VIEWED_PAGE_GIG",
    paramKey: "gig_id",
  },
  {
    path: "/book",
    event: "VIEWED_PAGE_BOOK",
    paramKey: "gig_id",
  },
];
