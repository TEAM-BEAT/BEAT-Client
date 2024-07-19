import type { SVGProps } from "react";
const SvgIconPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#FFF"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    {...props}
  >
    <path stroke="current" strokeMiterlimit={10} strokeWidth={1.2} d="M12 7v10M17 12H7" />
  </svg>
);
export default SvgIconPlus;
