import { FiMinus, FiPlus } from "react-icons/fi";
import { H3, P } from "../../typography";

import { FAQ } from "../../../types/content-types/FAQ.type";
import React from "react";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import styled, { useTheme } from "styled-components";

interface FAQItemProps extends Partial<FAQ> {
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const StyleFaq = styled.div`
  .description {
    transition: 0.3s ease-in-out;
    max-height: 1px;
    opacity: 0;
    overflow: hidden;

    &.visible {
      opacity: 1;
      max-height: 999px;
    }
  }
`;

const FAQItem: React.FC<FAQItemProps> = ({
  id,
  isSelected = false,
  title,
  description,
  onSelect,
}) => {
  const theme = useTheme();

  const handelSelect = () => {
    onSelect(id ?? "");
  };

  return (
    <StyleFaq
      className={`cursor-pointer p-[48px] rounded-lg ${
        isSelected ? "bg-[#F3F8FE]" : "bg-[#F4FCFB]"
      } hover:bg-[#F3F8FE]`}
      onClick={handelSelect}
    >
      <div className="flex items-center justify-between  text-left">
        <H3 variant="bold" color={isSelected ? "primary" : "secondary"}>
          {title}
        </H3>
        <button
          onClick={handelSelect}
          className="flex items-center justify-center w-8 h-8"
        >
          {isSelected ? (
            <FiMinus color={theme.colors.primary.normal} size={25} />
          ) : (
            <FiPlus size={25} color={theme.colors.secondary.normal} />
          )}
        </button>
      </div>
      <div
        className={`description mt-4 text-left ${isSelected ? "visible" : ""}`}
      >
        {parseHTMLtoReact(description ?? "")}
      </div>
    </StyleFaq>
  );
};

export default FAQItem;
