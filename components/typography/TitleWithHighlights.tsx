import { H1, H2, H3, H4, H5, H6 } from ".";

import React from "react";
import { useTheme } from "styled-components";

interface TitleWithHighlightsProps {
  text: string;
  textToHighlight?: string;
  headerElement: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color: "blue" | "black";
  highlightColor: "info" | "tertiary";
}

const TitleWithHighlights: React.FC<TitleWithHighlightsProps> = ({
  text,
  textToHighlight,
  headerElement,
  color = "black",
  highlightColor = "info",
}) => {
  const theme = useTheme();
  const parts = textToHighlight ? text.split(textToHighlight) : [text];

  const HeaderComponent = () => {
    const Text: React.FC = () => {
      return (
        <>
          {parts[0]}{" "}
          <span
            style={{ color: theme.colors[highlightColor], fontWeight: "bold" }}
          >
            {textToHighlight}
          </span>
          {parts[1]}
        </>
      );
    };

    switch (headerElement) {
      case "h1":
        return (
          <H1 color={color} variant="bold">
            <Text />
          </H1>
        );
      case "h2":
        return (
          <H2 color={color} variant="bold">
            <Text />
          </H2>
        );
      case "h3":
        return (
          <H3 color={color} variant="bold">
            <Text />
          </H3>
        );
      case "h4":
        return (
          <H4 color={color} variant="bold">
            <Text />
          </H4>
        );
      case "h5":
        return (
          <H5 color={color} variant="bold">
            <Text />
          </H5>
        );
      case "h6":
        return (
          <H6 color={color} variant="bold">
            <Text />
          </H6>
        );

      default:
        return (
          <H1 color={color} variant="bold">
            <Text />
          </H1>
        );
    }
  };

  return <HeaderComponent />;
};

export default TitleWithHighlights;
