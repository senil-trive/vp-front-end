import { debounce } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

type Scrolloptions = {
  offset?: number;
  waitTime?: number;
  scrollingLeftClassName?: string;
  scrollingRightClassName?: string;
};

export const useCallbackOnReachedBottom = (
  callback: () => void,
  options: Scrolloptions = {
    offset: 650,
    waitTime: 300,
  }
) => {
  const handleCallback = useCallback(() => {
    const scrollSource = window.innerHeight + window.scrollY;
    const scrollTarget = document.body.offsetHeight - (options.offset ?? 0);

    if (scrollSource >= scrollTarget) {
      callback();
    }
  }, [callback, options.offset]);

  // Debounce the trigger
  const debouncedCallback = debounce(handleCallback, options.waitTime);

  useEffect(() => {
    window.onscroll = debouncedCallback;
  }, [debouncedCallback, handleCallback]);
};

/**
 * A hook to add hints to the sides of a vertical scrollable item
 * @returns an array of 2 items, first item being the ref object and second is the scrollhandler
 */
export function useVerticalScrollHint(
  options: Scrolloptions = {
    scrollingLeftClassName: "scrolling-left",
    scrollingRightClassName: "scrolling-right",
  }
): React.RefObject<HTMLDivElement> {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const newScrollLeft = elementRef?.current?.scrollLeft;
    const width = elementRef?.current?.getBoundingClientRect().width;
    const scrollWidth = elementRef?.current?.scrollWidth;

    if (newScrollLeft === 0) {
      elementRef?.current?.classList.remove(
        options.scrollingLeftClassName ?? ""
      );
    } else if (
      newScrollLeft &&
      scrollWidth &&
      width &&
      newScrollLeft >= scrollWidth - width
    ) {
      elementRef?.current?.classList.remove(
        options.scrollingRightClassName ?? ""
      );
    } else {
      elementRef?.current?.classList.add(options.scrollingRightClassName ?? "");
      elementRef?.current?.classList.add(options.scrollingLeftClassName ?? "");
    }
  }, [options.scrollingLeftClassName, options.scrollingRightClassName]);

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
