import { useState, useEffect, useRef, useMemo } from "react";
import { getWindow } from "./mockWindow";

/**
 * `when`:
 *  - A function that takes Date object as parameter and returns boolean value
 * @param {{when: Function|number, [delay]: number}} args
 * @returns {number} the number of milliseconds returned by `Date#getTime()`
 */

export function useTime(args) {
  const { when, interval, intervalMs = 1000 } = args || {};
  const initialTime = useMemo(() => Date.now(), []);
  const [time, setTime] = useState(() => Date.now());

  const whenRef = useRef(when);
  useEffect(() => {
    whenRef.current = when;
  });
  useEffect(() => {
    const intervalId = getWindow().setInterval(() => {
      const now = Date.now();

      if (!whenRef.current) {
        setTime(now);
      } else if (typeof whenRef.current === "function") {
        if (whenRef.current(now, initialTime)) {
          setTime(now);
        }
      } else {
        console.error(new Error(`Unsupport type of 'when': ${typeof whenRef.current}.`));
      }
    }, intervalMs);

    return () => {
      getWindow().clearInterval(intervalId);
    };
  }, [intervalMs]);

  return [time, initialTime, time - initialTime];
}
