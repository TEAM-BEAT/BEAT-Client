import * as React from "react";
import type { SVGProps } from "react";
const SvgBtnFloating = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" {...props}>
    <g clipPath="url(#btn_floating_svg__a)">
      <circle cx={32} cy={32} r={32} fill="#FF006B" />
      <path
        fill="url(#btn_floating_svg__b)"
        d="m41.11 32.916-4.173-13.185L34.891 13l-1.995 6.826-4.443 17.693-3.444-9.15-2.087-6.674-2.703 6.583-2.198 4.638H14v3.722h7.127l1.748-3.311L26.78 45.3 29.161 52l1.649-6.838 4.351-17.334 2.787 8.81H50v-3.722z"
      />
    </g>
    <defs>
      <linearGradient
        id="btn_floating_svg__b"
        x1={30.845}
        x2={29.865}
        y1={13}
        y2={58.68}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.258} stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0.16} />
      </linearGradient>
      <clipPath id="btn_floating_svg__a">
        <path fill="#fff" d="M0 0h64v64H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBtnFloating;
