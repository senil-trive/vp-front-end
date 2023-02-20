import { H3, P } from "../../typography";

import React from "react";
import { Testimonial } from "../../../types/content-types/Testimonial.type";

interface TestimonialItemProps {
  data: Testimonial;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({ data }) => {
  return (
    <div className="max-w-[440px] min-h-[400px] text-left p-8 bg-slate-200 rounded-lg">
      <H3 variant="bold">{data.title}</H3>
      <P>{data.description}</P>
      <span className="flex justify-between items-center mt-11">
        <i>{data.author}</i>
        <i>{data.date}</i>
      </span>
    </div>
  );
};

export default TestimonialItem;
