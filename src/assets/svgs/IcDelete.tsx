import * as React from "react";
import type { SVGProps } from "react";
const SvgIcDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" {...props}>
    <circle cx={16} cy={16} r={11} fill="#3E3E3E" />
    <path
      stroke="#797979"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m12 20 4-4 4 4m0-8-4 4-4-4"
    />
  </svg>
);
export default SvgIcDelete;
