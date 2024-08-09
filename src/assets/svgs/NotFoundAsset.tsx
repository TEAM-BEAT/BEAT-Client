import * as React from "react";
import type { SVGProps } from "react";
const SvgNotFoundAsset = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 150 109" {...props}>
    <path
      fill="url(#not_found_asset_svg__a)"
      d="m60.984 58.346-12.13-38.629L42.907 0l-5.799 19.998-14.514 57.484-8.474-19.136H-10V69.25H7.975l9.403 21.365L26.25 109l5.467-20.355 11.975-45.206 8.102 25.81H166V58.347z"
    />
    <defs>
      <linearGradient
        id="not_found_asset_svg__a"
        x1={78}
        x2={78}
        y1={0}
        y2={109}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF006B" />
        <stop offset={1} stopColor="#252525" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgNotFoundAsset;
