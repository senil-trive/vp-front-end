import * as React from "react";
import { SVGProps } from "react";
import { useTheme } from "styled-components";

export default function ChevronUpFilled(props: SVGProps<SVGSVGElement>) {
  const { colors } = useTheme();

  return (
    <svg
      width={17}
      height={12}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.692.566a1 1 0 0 1 1.6 0L16.297 9.9a1 1 0 0 1-.8 1.6H1.487a1 1 0 0 1-.8-1.6L7.692.566Z"
        fill={colors.info}
      />
    </svg>
  );
}
