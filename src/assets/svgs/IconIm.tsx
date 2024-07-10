import type { SVGProps } from "react";
const SvgIconIm = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
    <g clipPath="url(#icon_im_svg__a)">
      <g clipPath="url(#icon_im_svg__b)">
        <mask
          id="icon_im_svg__c"
          width={21}
          height={21}
          x={7}
          y={10}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "luminance",
          }}
        >
          <path
            fill="#fff"
            d="M7.1 17.1c7.115 0 12.902 5.786 12.902 12.901H27.1C27.098 18.953 18.143 10 7.1 10z"
          />
        </mask>
        <g mask="url(#icon_im_svg__c)">
          <path fill="url(#icon_im_svg__d)" d="M27.098 10H7.1v19.999h19.998z" />
        </g>
        <path
          fill="#00C7A9"
          d="M7.097 17.1H0V30h7.097zM40 10v7.1c-7.116 0-12.903 5.786-12.903 12.901h-7.099C19.998 18.953 28.953 10 39.999 10"
        />
      </g>
    </g>
    <defs>
      <clipPath id="icon_im_svg__a">
        <path fill="#fff" d="M0 0h40v40H0z" />
      </clipPath>
      <clipPath id="icon_im_svg__b">
        <path fill="#fff" d="M0 10h40v19.999H0z" />
      </clipPath>
      <linearGradient
        id="icon_im_svg__d"
        x1={7.188}
        x2={27.182}
        y1={19.71}
        y2={19.71}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00C7A9" />
        <stop offset={0.11} stopColor="#0FC9A3" />
        <stop offset={0.31} stopColor="#37D196" />
        <stop offset={0.59} stopColor="#79DD80" />
        <stop offset={0.94} stopColor="#D1EE63" />
        <stop offset={1} stopColor="#E2F15E" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgIconIm;
