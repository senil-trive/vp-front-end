import { H3, P } from "../../typography";

import React from "react";
import { Testimonial } from "../../../types/content-types/Testimonial.type";
import { parseDate } from "../../../utils/parseDate";
import { useTheme } from "styled-components";

interface TestimonialItemProps {
  data: Testimonial;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({ data }) => {
  const { colors } = useTheme();
  const postDate = data.date;

  return (
    <div
      className="max-w-[440px] min-h-[400px] h-full text-left p-8 bg-slate-200 rounded-lg flex flex-col justify-between"
      style={{ backgroundColor: colors.tertiary.light }}
    >
      <div>
        <H3 variant="bold">{data.title}</H3>
        <P>{data.description}</P>
      </div>
      <span
        className="flex justify-between items-center mt-11"
        style={{ color: colors.primary.normal }}
      >
        <i>{data.author}</i>
        <i>Geplaatst op {parseDate(new Date(postDate))}</i>
      </span>
    </div>
  );
};

export default TestimonialItem;
