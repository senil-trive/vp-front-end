import * as React from "react";
import { SVGProps } from "react";
import { useTheme } from "styled-components";

const ListIcon = (props: SVGProps<SVGSVGElement>) => {
  const { colors } = useTheme();

  return (
    <svg
      width={19}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.333 4.75h10.292M6.333 9.5h10.292M6.333 14.25h10.292M2.375 4.75h.008M2.375 9.5h.008M2.375 14.25h.008"
        stroke={colors.tertiary.normal}
        strokeWidth={1.583}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ListIcon;
