"use client";

import { useEffect, useRef } from "react";

export default function useEventListener(
  eventType: string,
  callback: (e: Event) => void,
  element?
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: Event) => callbackRef.current(e);
    if (element == null) {
      addEventListener(eventType, handler);
    } else {
      element.addEventListener(eventType, handler);
    }

    return () => {
      if (element == null) {
        removeEventListener(eventType, handler);
      } else {
        element.removeEventListener(eventType, handler);
      }
    };
  }, [eventType, element]);
}
