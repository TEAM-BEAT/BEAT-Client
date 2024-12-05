import * as React from "react";
import type { SVGProps } from "react";
const SvgKakaoMapArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" {...props}>
    <circle cx={9} cy={9} r={9} fill="#626262" />
    <path
      fill="#fff"
      d="M12.57 6a.5.5 0 0 0-.5-.5h-4.5a.5.5 0 0 0 0 1h4v4a.5.5 0 0 0 1 0zm-6.146 6.354 6-6-.707-.708-6 6z"
    />
  </svg>
);
export default SvgKakaoMapArrow;
