import { FiMinus, FiPlus } from "react-icons/fi";
import { H3, P } from "../../typography";

import { FAQ } from "../../../types/content-types/FAQ.type";
import React from "react";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import { useTheme } from "styled-components";

interface FAQItemProps extends Partial<FAQ> {}

const FAQItem: React.FC<FAQItemProps> = ({ title, description }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const theme = useTheme();
  return (
    <div
      className={`p-[48px] rounded-lg hover:bg-orange ${
        open ? "bg-[#006ef7]/5" : "bg-[#3fc7b4]/5"
      } hover:bg-[#006ef7]/5`}
    >
      <div
        className="flex items-center justify-between cursor-pointer text-left"
        onClick={() => setOpen(!open)}
      >
        <H3 variant="bold" color={open ? "blue" : "green"}>
          {title}
        </H3>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-8 h-8"
        >
          {open ? (
            <FiMinus color={theme.colors.primary} size={25} />
          ) : (
            <FiPlus size={25} color={theme.colors.secondary} />
          )}
        </button>
      </div>
      {open && (
        <div className="mt-4 text-left">{parseHTMLtoReact(description)}</div>
      )}
    </div>
  );
};

export default FAQItem;
