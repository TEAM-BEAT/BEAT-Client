import * as React from "react";
import type { SVGProps } from "react";
const SvgIconChecked = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" {...props}>
    <rect width={18} height={18} fill="#FB247F" rx={2} />
    <path
      fill="#fff"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.27}
      d="M14.09 5.634a.585.585 0 0 0-.881-.77l-5.888 6.729-2.258-2.258a.585.585 0 1 0-.827.827l2.7 2.7a.585.585 0 0 0 .853-.028z"
    />
  </svg>
);
export default SvgIconChecked;
