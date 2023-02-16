import { H1, H2, H3, H4, H5, H6 } from ".";

import React from "react";

interface TitleWithHighlightsProps {
  text: string;
  textToHighlight: string;
  headerElement: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color: "blue" | "black";
}

const TitleWithHighlights: React.FC<TitleWithHighlightsProps> = ({
  text,
  textToHighlight,
  headerElement,
  color = "black",
}) => {
  const parts = text.split(textToHighlight);

  const HeaderComponent = () => {
    const Text: React.FC = () => {
      return (
        <>
          {parts[0]}{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>
            {textToHighlight}
          </span>
          {parts[1]}
        </>
      );
    };

    switch (headerElement) {
      case "h1":
        return (
          <H1 color={color}>
            <Text />
          </H1>
        );
      case "h2":
        return (
          <H2 color={color}>
            <Text />
          </H2>
        );
      case "h3":
        return (
          <H3 color={color}>
            <Text />
          </H3>
        );
      case "h4":
        return (
          <H4 color={color}>
            <Text />
          </H4>
        );
      case "h5":
        return (
          <H5 color={color}>
            <Text />
          </H5>
        );
      case "h6":
        return (
          <H6 color={color}>
            <Text />
          </H6>
        );

      default:
        return (
          <H1 color={color}>
            <Text />
          </H1>
        );
    }
  };

  return <HeaderComponent />;
};

export default TitleWithHighlights;
