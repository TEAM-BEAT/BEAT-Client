import * as React from "react";
import type { SVGProps } from "react";
const SvgBeatMapMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 31" {...props}>
    <path
      fill="#FB247F"
      d="M3.434 3.434c4.579-4.579 12.002-4.579 16.581 0a11.724 11.724 0 0 1 1.155 15.237l-8.2 11.15c-.618.84-1.873.84-2.491 0l-8.2-11.15A11.724 11.724 0 0 1 3.434 3.434"
    />
    <circle cx={12} cy={12} r={5} fill="#fff" />
  </svg>
);
export default SvgBeatMapMarker;
