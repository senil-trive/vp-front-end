import { ChildMenuItem } from "../Header";
import { Container } from "@mui/system";
import Link from "next/link";
import { P } from "../../../typography";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

type Props = {
  categories: ChildMenuItem[];
  selected: string;
};

const Wrapper: any = styled.div`
  padding: 24px 0;
  background-color: #ebfffc;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  position: absolute;

  z-index: 999;
  // width: 100%;
  max-width: 1440px;
  border-radius: 8px;
  top: calc(100% + 25px);
  width: ${(props: any) => (props.selected === "Vrijwilligers" ? "40%" : "")};
  right: ${(props: any) =>
    props.selected === "Kinderen"
      ? "calc(100% - 408px)"
      : props.selected === "Vrijwilligers"
      ? "calc(100% - 585px)"
      : ""};

  &:before {
    left: ${(props: any) =>
      props.selected === "Vrijwilligers"
        ? "calc(100% - 56px)"
        : "calc(100% - 60px)"};
    content: "";
    position: absolute;
    top: -10px;

    border-style: solid;
    border-width: 20px 20px 20px 20px;
    border-color: #ebfffc;
    border-radius: 4px 0;
    transform: rotate(45deg);
  }

  section {
    /* flex: 1; */
    padding: 0 30px;

    p {
      margin-bottom: 16px;
      font-family: ${({ theme }) => theme.fonts.primary};
      text-transform: uppercase;
      font-family: "Fjalla One";
      font-style: normal;
      font-weight: 400;
      font-size: 26px;
      line-height: 120%;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        &:not(:last-child) {
          padding-bottom: 15px;
        }

        width: 220px;
        a {
          // font-family: "Avenir";
          font-weight: 300;
          font-size: 18px;
          line-height: 160%;
          width: 250px;
          word-break: break-word;
          white-space: normal;
          // letter-spacing: 0.02em;
          color: ${({ theme }) => theme.colors.text.normal};

          &:hover {
            background-color: ${({ theme }) => theme.colors.primary.normal};
            padding: 12px;
            margin: -12px;
            border-radius: 8px;
            color: white;
            &:after {
              content: "  👉🏽";
            }
          }
          &.active {
            color: ${({ theme }) => theme.colors.white.normal};
            background-color: ${({ theme }) => theme.colors.primary.normal};
            padding: 12px;
            margin: -12px;
            border-radius: 8px;
            color: white;
            &:after {
              content: "  👉🏽";
            }
          }
        }
      }
    }

    &.with-divider {
      border-right: 1px solid ${({ theme }) => theme.colors.grey.normal};
    }
  }
`;

export default function HeaderSubmenu({ categories, selected }: Props) {
  const router = useRouter();

  // const [index, setIndex] = useState<string>(0);

  return (
    <Container maxWidth="xl">
      <Wrapper selected={selected} className="sub-menu-container-mn">
        {categories.map((category, index) => {
          if (category.status === "published") {
            return (
              <section
                key={index}
                className={
                  index < categories.length - 1
                    ? "with-divider"
                    : "without-divider"
                }
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
                      <li key={item.link} style={{ paddingBottom: "20px" }}>
                        <Link
                          className={
                            router.asPath === item.link ? "active" : ""
                          }
                          href={item.link}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            );
          } else {
            return null;
          }
        })}
      </Wrapper>
    </Container>
  );
}
