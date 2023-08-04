import React from "react";

interface IProps {
  element: any;
  step: number;
  rightArrow: any;
  leftArrow: any;
}
export const handleHorizantalScroll = ({
  element,
  step,
  rightArrow,
  leftArrow,
}: IProps) => {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    element.scrollLeft += step;
    scrollAmount += Math.abs(step);
    clearInterval(slideTimer);
  }, 1000);
  if (element.scrollLeft === 0) {
    leftArrow.classList.remove("active");
  } else if (element.scrollLeft > 0) {
    leftArrow.classList.add("active");
  }

  if (element.scrollLeft + element.offsetWidth >= element.scrollWidth - 100) {
    rightArrow.classList.remove("active");
    element.classList.add("active");
  } else if (
    element.scrollLeft + element.offsetWidth - 100 <=
    element.scrollWidth
  ) {
    element.classList.remove("active");
    rightArrow.classList.add("active");
  }
};
