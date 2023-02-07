import React from "react";
import styled from "styled-components";
import { P } from "../../../typography/Typography";
import { Category } from "../Header";

type Props = {
  categories: Category[];
};

const Wrapper = styled.div`
  flex: 1;
  padding: 32px 64px;
  background-color: #ededed;
  display: flex;

  section {
    margin-right: 240px;
    ul {
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;

      p {
        margin: 0;
      }
    }
  }
`;

export default function HeaderSubmenu({ categories }: Props) {
  return (
    <Wrapper>
      {categories.map((category, index) => (
        <section key={index}>
          <P variant="bold">{category.name}</P>
          <ul>
            {category.items.map((item) => (
              <li key={item.link}>
                <P>
                  <a href={item.link}>{item.name}</a>
                </P>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Wrapper>
  );
}
