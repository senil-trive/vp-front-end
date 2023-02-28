import React, { ReactNode } from "react";

import styled from "styled-components";

type Variant = {
  variant?: "brief" | "blog" | "vlog";
};

type Props = Variant & {
  children: ReactNode;
};

const BaseStyle = styled.article`
  background: #ffffff;
  border: 1px solid #555555;
  border-radius: 8px;
  overflow: hidden;

  header {
    height: 180px;
    position: relative;
  }
`;

const StyledPost = styled(BaseStyle)`
  header {
    margin-bottom: 0;
  }
`;

const StyledLetter = styled(BaseStyle)`
  border-color: ${({ theme }) => theme.colors.info};
`;

const StyledBlog = styled(BaseStyle)`
  padding: 24px;
  border-color: ${({ theme }) => theme.colors.primary};

  header {
    height: 366px;
    img {
      border-radius: 8px;
    }
  }
  section {
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
`;

const CardWrapper = ({
  variant,
  children,
}: React.PropsWithChildren<Variant>) => {
  switch (variant) {
    case "vlog":
    case "blog":
      return <StyledBlog>{children}</StyledBlog>;

    case "brief":
      return <StyledLetter>{children}</StyledLetter>;

    default:
      return <StyledPost>{children}</StyledPost>;
  }
};

export default function Card({ variant = "brief", children }: Props) {
  return <CardWrapper variant={variant}>{children}</CardWrapper>;
}
