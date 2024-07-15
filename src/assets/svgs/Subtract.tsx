import * as React from "react";
import type { SVGProps } from "react";
const SvgSubtract = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 36 24"
    {...props}
    preserveAspectRatio="none"
  >
    <mask id="Subtract_svg__a" fill="#fff">
      <path fillRule="evenodd" d="M0 0v24h36v-8a4 4 0 0 1 0-8V0z" clipRule="evenodd" />
    </mask>
    <path fill="#0F0F0F" fillRule="evenodd" d="M0 0v24h36v-8a4 4 0 0 1 0-8V0z" clipRule="evenodd" />
    <path
      fill="#0F0F0F"
      d="M0 24h-1v1h1zM0 0v-1h-1v1zm36 24v1h1v-1zm0-8h1v-1h-1zm0-8v1h1V8zm0-8h1v-1h-1zM1 24V0h-2v24zm35-1H0v2h36zm-1-7v8h2v-8zm1-1a3 3 0 0 1-3-3h-2a5 5 0 0 0 5 5zm-3-3a3 3 0 0 1 3-3V7a5 5 0 0 0-5 5zm2-12v8h2V0zM0 1h36v-2H0z"
      mask="url(#Subtract_svg__a)"
    />
  </svg>
);
export default SvgSubtract;
