import * as React from "react";
import { SVGProps } from "react";

import { useTheme } from "styled-components";

export default function ChevronDown(props: SVGProps<SVGSVGElement>) {
  const { colors } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={8}
      fill="none"
      {...props}
    >
      <path
        d="m1.492 1 6.22 5.33a1.2 1.2 0 0 0 1.561 0L15.493 1"
        stroke={colors.info.normal}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
