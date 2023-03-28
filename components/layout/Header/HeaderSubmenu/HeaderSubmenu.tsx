import { ChildMenuItem } from "../Header";
import { Container } from "@mui/system";
import Link from "next/link";
import { P } from "../../../typography";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

type Props = {
  categories: ChildMenuItem[];
};

const Wrapper = styled.div`
  padding: 24px 0;
  background-color: ${({ theme }) => theme.colors.white.normal};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  position: absolute;
  z-index: 999;
  width: 100%;
  max-width: 1440px;
  border-radius: 8px;
  top: calc(100% + 5px);

  section {
    /* flex: 1; */
    padding: 0 30px;

    p {
      margin-bottom: 16px;
      font-family: ${({ theme }) => theme.fonts.primary};
      text-transform: uppercase;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        a {
          font-weight: 300;
          font-size: 18px;
          line-height: 160%;
          letter-spacing: 0.02em;
          color: ${({ theme }) => theme.colors.text.normal};
          &:hover {
            color: ${({ theme }) => theme.colors.primary.normal};
          }
          &.active {
            color: ${({ theme }) => theme.colors.primary.normal};
            text-decoration: underline;
          }
        }
      }
    }

    &.with-divider {
      border-right: 1px solid ${({ theme }) => theme.colors.grey.normal};
    }
  }
`;

export default function HeaderSubmenu({ categories }: Props) {
  const router = useRouter();

  return (
    <Container maxWidth="xl">
      <Wrapper>
        {categories.map((category, index) => (
          <section
            key={index}
            className={index < categories.length - 1 ? "with-divider" : ""}
          >
            <P variant="bold">{category.name}</P>
            <ul
              className={`grid gap-x-6 ${
                category.children.length > 4 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {category.children
                .filter((item) => item.status === "published")
                .map((item) => (
                  <li key={item.link}>
                    <Link
                      className={router.asPath === item.link ? "active" : ""}
                      href={item.link}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </Wrapper>
    </Container>
  );
}
