import * as React from "react";
import type { SVGProps } from "react";
const SvgUnion = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 103 30" {...props}>
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M2 0a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h94.75l6.25 5V2a2 2 0 0 0-2-2z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgUnion;
