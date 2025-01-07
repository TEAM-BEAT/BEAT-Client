import type { SVGProps } from "react";
const SvgIconTicket = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" {...props}>
    <g filter="url(#icon_ticket_svg__a)">
      <path
        fill="#fff"
        fillOpacity={0.6}
        fillRule="evenodd"
        d="M9.219 17.09c.612.212.925.917.697 1.575-.113.329-.031.82.297.933l14.051 4.846a.77.77 0 0 0 .978-.476l3.423-9.925a.77.77 0 0 0-.477-.978L13.586 8.03h-.002c-.184.536-.668.876-1.172.87l-.004.003a.004.004 0 0 1-.006.003l-.015-.005-.006-.001a1.1 1.1 0 0 1-.317-.06c-.612-.21-.924-.916-.697-1.574l-.001-.002-4.48-1.545a.77.77 0 0 0-.978.476L2.485 16.12a.77.77 0 0 0 .477.979l3.928 1.354c.328.113.696-.223.809-.551.227-.659.907-1.021 1.52-.81m.385-.796a.24.24 0 0 1-.15-.306l.165-.478a.241.241 0 1 1 .456.158l-.164.477a.24.24 0 0 1-.307.15m.644-1.866a.24.24 0 0 1-.15-.307l.165-.477a.241.241 0 0 1 .456.157l-.165.477a.24.24 0 0 1-.306.15m.643-1.867a.24.24 0 0 1-.15-.306l.165-.477a.241.241 0 0 1 .456.157l-.164.477a.24.24 0 0 1-.307.15m.644-1.866a.24.24 0 0 1-.15-.306l.165-.478a.241.241 0 1 1 .456.158l-.165.477a.24.24 0 0 1-.306.15"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <filter
        id="icon_ticket_svg__a"
        width={26.266}
        height={18.81}
        x={2.441}
        y={5.677}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={1.538} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend in2="shape" result="effect1_innerShadow_8242_17346" />
      </filter>
    </defs>
  </svg>
);
export default SvgIconTicket;
