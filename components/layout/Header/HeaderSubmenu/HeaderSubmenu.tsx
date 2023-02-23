import { Container } from "@mui/system";
import React from "react";
import styled from "styled-components";
import { P } from "../../../typography";
import { ChildMenuItem } from "../Header";

type Props = {
  categories: ChildMenuItem[];
};

const Wrapper = styled.div`
  padding: 24px 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  position: absolute;
  z-index: 999;
  width: 100%;
  max-width: 1200px;
  border-radius: 8px;
  top: calc(100% + 5px);

  section {
    flex: 1;
    padding: 0 56px;

    p {
      margin-bottom: 16px;
    }

    ul {
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;

      li {
        a {
          font-weight: 300;
          font-size: 18px;
          line-height: 160%;
          letter-spacing: 0.02em;
          color: ${({ theme }) => theme.colors.text};
        }
      }
    }

    &.with-divider {
      border-right: 1px solid ${({ theme }) => theme.colors.grey};
    }
  }
`;

export default function HeaderSubmenu({ categories }: Props) {
  return (
    <Container>
      <Wrapper>
        {categories.map((category, index) => (
          <section
            key={index}
            className={index < categories.length - 1 ? "with-divider" : ""}
          >
            <P variant="bold">{category.name}</P>
            <ul>
              {category.children.map((item) => (
                <li key={item.link}>
                  <a href={item.link}>{item.name}</a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Wrapper>
    </Container>
  );
}
