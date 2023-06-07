import { FiMinus, FiPlus } from "react-icons/fi";
import { H3, P } from "../../typography";
import styled, { useTheme } from "styled-components";

import { FAQ } from "../../../types/content-types/FAQ.type";
import React from "react";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";

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
      className={`cursor-pointer pl-[61px] p-[42px] rounded-lg ${
        isSelected ? "bg-[#3FC7B4]" : "bg-[#EBFFFC]"
      } hover:bg-[#3FC7B4]`}
      onClick={handelSelect}
    >
      <div className="flex items-center justify-between  text-left">
        <H3 color={isSelected ? "white" : "black"}>{title}</H3>
        <button
          onClick={handelSelect}
          className="flex items-center justify-center w-8 h-8"
        >
          {isSelected ? (
            <FiMinus color={`white`} size={42} />
          ) : (
            <FiPlus color={`black`} size={42} />
          )}
        </button>
      </div>

      <div style={{color: "#fff"}}
        className={`description  text-left ${isSelected ? "visible mt-4" : ""}`}
      >
        {parseHTMLtoReact(description ?? "")}
      </div>
    </StyleFaq>
  );
};

export default FAQItem;
