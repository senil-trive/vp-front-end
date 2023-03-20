import * as React from "react";
import { SVGProps } from "react";
import { useTheme } from "styled-components";

export default function ChevronUp(props: SVGProps<SVGSVGElement>) {
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
        d="M15.492 7 9.273 1.67a1.2 1.2 0 0 0-1.562 0L1.492 7"
        stroke={colors.info.normal}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
