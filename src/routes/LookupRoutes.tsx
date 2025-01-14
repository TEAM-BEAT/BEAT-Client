import Lookup from "@pages/lookup/Lookup";
import NonMbLookup from "@pages/nonMbLookup/NonMbLookup";
import Cancel from "@pages/cancel/Cancel";

const LOOKUP_ROUTES = [
  { path: "nonmb-lookup", element: <NonMbLookup /> },
  { path: "lookup", element: <Lookup /> },
  { path: "lookup/cancel", element: <Cancel /> },
];

export default LOOKUP_ROUTES;
