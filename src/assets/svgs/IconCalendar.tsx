import type { SVGProps } from "react";
const SvgIconCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill={props.fill}
      d="M9.9 5v1.4h4.2V5h1.4v1.4h2.8a.7.7 0 0 1 .7.7v11.2a.7.7 0 0 1-.7.7H5.7a.7.7 0 0 1-.7-.7V7.1a.7.7 0 0 1 .7-.7h2.8V5zm7.7 7H6.4v5.6h11.2zM8.5 7.8H6.4v2.8h11.2V7.8h-2.1v1.4h-1.4V7.8H9.9v1.4H8.5z"
    />
  </svg>
);
export default SvgIconCalendar;
