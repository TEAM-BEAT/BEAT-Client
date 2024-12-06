import * as React from "react";
import type { SVGProps } from "react";
const SvgBtnFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" {...props}>
    <path
      fill="#2A2A2A"
      d="M48 24c0 13.255-10.745 24-24 24S0 37.255 0 24 10.745 0 24 0s24 10.745 24 24"
    />
    <path
      fill="#3E3E3E"
      fillRule="evenodd"
      d="M24 47c12.703 0 23-10.297 23-23S36.703 1 24 1 1 11.298 1 24s10.298 23 23 23m0 1c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24"
      clipRule="evenodd"
    />
    <path
      fill="#F4F4F4"
      fillRule="evenodd"
      d="M26.142 18.108a2.93 2.93 0 0 1 4.904 1.322H33.5a.75.75 0 0 1 0 1.5h-2.454a2.94 2.94 0 0 1-.76 1.322 2.932 2.932 0 0 1-4.904-1.322H15a.75.75 0 0 1 0-1.5h10.382a2.93 2.93 0 0 1 .76-1.322m2.072.642a1.43 1.43 0 1 0 0 2.86 1.43 1.43 0 0 0 0-2.86m-11.322 5.965a2.93 2.93 0 0 1 4.904 1.322H33.5a.75.75 0 0 1 0 1.5H21.796a2.93 2.93 0 0 1-5.664 0H15a.75.75 0 0 1 0-1.5h1.132a2.93 2.93 0 0 1 .76-1.322m2.072.642a1.43 1.43 0 1 0 0 2.86 1.43 1.43 0 0 0 0-2.86"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgBtnFilter;
