import { useEffect, useState } from "react";

const DEFAULT_IDLE_TIMEOUT = 10_000;

export function useIdle(timeout = DEFAULT_IDLE_TIMEOUT) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const resetIdle = () => {
      setIsIdle(false);

      clearTimeout(timer);

      timer = setTimeout(() => {
        setIsIdle(true);
      }, timeout);
    };

    const events = [
      "mousemove",
      "mousedown",
      "wheel",
      "scroll",
      "keydown",
      "touchstart",
      "pointerdown",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetIdle, {
        passive: true,
      });
    });

    resetIdle();

    return () => {
      clearTimeout(timer);

      events.forEach((event) => {
        window.removeEventListener(event, resetIdle);
      });
    };
  }, [timeout]);

  return isIdle;
}