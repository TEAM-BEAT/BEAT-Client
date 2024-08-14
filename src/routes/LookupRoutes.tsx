import Lookup from "@pages/lookup/Lookup";
import NonMbLookup from "@pages/nonMbLookup/NonMbLookup";

const LOOKUP_ROUTES = [
  { path: "nonmb-lookup", element: <NonMbLookup /> },
  { path: "lookup", element: <Lookup /> },
];

export default LOOKUP_ROUTES;