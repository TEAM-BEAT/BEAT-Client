import type { SVGProps } from "react";
const SvgIcomCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 24" {...props}>
    <g fill="#fff">
      <rect width={8.25} height={8.25} x={10.625} y={10.125} rx={1.375} />
      <path
        fillRule="evenodd"
        d="M7.875 6C7.115 6 6.5 6.616 6.5 7.375v5.5c0 .76.616 1.375 1.375 1.375H9.25v-4.125c0-.76.616-1.375 1.375-1.375h4.125V7.375c0-.76-.616-1.375-1.375-1.375z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);
export default SvgIcomCopy;
