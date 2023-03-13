import { useCallback, useEffect, useRef } from "react";

export const useReachedBottom = () => {};

/**
 * A hook to add hints to the sides of a vertical scrollable item
 * @returns an array of 2 items, first item being the ref object and second is the scrollhandler
 */
export function useVerticalScrollHint(): React.RefObject<HTMLDivElement> {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const newScrollLeft = elementRef?.current?.scrollLeft;
    const width = elementRef?.current?.getBoundingClientRect().width;
    const scrollWidth = elementRef?.current?.scrollWidth;

    if (newScrollLeft === 0) {
      elementRef?.current?.classList.remove("scrolling-left");
    } else if (
      newScrollLeft &&
      scrollWidth &&
      width &&
      newScrollLeft >= scrollWidth - width
    ) {
      elementRef?.current?.classList.remove("scrolling-right");
    } else {
      elementRef?.current?.classList.add("scrolling-right");
      elementRef?.current?.classList.add("scrolling-left");
    }
  }, []);

  useEffect(() => {
    const el = elementRef.current;

    handleScroll();

    if (el) {
      el.onscroll = handleScroll;
    }

    return () => {
      if (el) {
        el.onscroll = null;
      }
    };
  }, [handleScroll]);

  return elementRef;
}
