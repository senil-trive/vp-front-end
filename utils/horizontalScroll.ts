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
    if (scrollAmount >= 0) {
      clearInterval(slideTimer);
    }
  }, 25);
  if (element.scrollLeft === 0) {
    leftArrow.classList.remove("active");
  } else if (element.scrollLeft > 0) {
    leftArrow.classList.add("active");
  }

  console.log(element.scrollLeft, element.offsetWidth);

  console.log(element.scrollWidth);
  if (element.scrollLeft + element.offsetWidth >= element.scrollWidth) {
    rightArrow.classList.remove("active");
  } else if (element.scrollLeft + element.offsetWidth <= element.scrollWidth) {
    rightArrow.classList.add("active");
  }
};
