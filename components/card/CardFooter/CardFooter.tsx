import React from "react";
import styled from "styled-components";

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
  hasPadding?: boolean;
};

const StyledFooter = styled.footer``;

export default function CardFooter({
  hasPadding = true,
  children,
  ...rest
}: Props) {
  return (
    <StyledFooter className={hasPadding ? "py-[32px] px-[24px]" : ""} {...rest}>
      {children}
    </StyledFooter>
  );
}
