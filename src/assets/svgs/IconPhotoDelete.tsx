import * as React from "react";
import type { SVGProps } from "react";
const SvgIconPhotoDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <circle cx={12} cy={12} r={9} fill="#FF006B" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9 15 3-3 3 3m0-6-3 3-3-3"
    />
  </svg>
);
export default SvgIconPhotoDelete;
