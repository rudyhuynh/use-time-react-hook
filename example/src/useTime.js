import { useState, useEffect, useMemo } from "react";
import { getWindow } from "./mockWindow";

const TIME_UNITS = {
  ms: { unit: 1, names: ["ms", "millisecond", "milliseconds"] },
  s: { unit: 1000, names: ["s", "seconds", "sec", "second"] },
  m: { unit: 1000 * 60, names: ["m", "min", "minute", "minutes"] },
  h: { unit: 1000 * 60 * 60, names: ["h", "hour", "hours"] },
};
const SUPPORT_TIME_UNIT_NAMES = flatten(Object.values(TIME_UNITS).map(({ names }) => names));

/**
 * `when`:
 *  - A function that takes Date object as parameter and returns boolean value
 * @param {{when: Function|number, [delay]: number}} args
 * @returns {number} the number of milliseconds returned by `Date#getTime()`
 */

export function useTime(args = {}) {
  const { range } = args || {};
  const interval = parseInterval(args.interval || 1000);
  const initialTime = useMemo(() => Date.now(), []);
  const [time, setTime] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = getWindow().setInterval(() => {
      const now = Date.now();

      if (!range) {
        setTime(now);
      } else if (typeof range === "string") {
        const { from, to, error } = parseTimeQueryString(range, now);
        if (error) console.error(new Error(error));
        else {
          if (from <= now && now <= to) {
            setTime({ from, to });
          }
        }
        setTime();
      } else if (typeof range === "function") {
        if (range(now, initialTime)) {
          setTime(now);
        }
      } else {
        console.error(new Error(`Unsupport type of 'range': ${typeof range}.`));
      }
    }, interval);

    return () => {
      getWindow().clearInterval(intervalId);
    };
  }, [initialTime, interval, range]);

  return [time, initialTime, time - initialTime];
}

export function parseInterval(interval) {
  if (typeof interval === "number") {
    return interval;
  } else if (typeof interval === "string") {
    const [num, unitName] = interval.split(/\s+/);
    return getMilliseconds(num, unitName);
  }
  throw new Error(`Unsupoprt interval. Found: ${interval}`);
}

/**
 * @example
 *  parseTimeQueryString('last 5 minutes')
 * @param {string} timeQueryString
 * @returns {{from: number, to: number, error: string}}
 */
export function parseTimeQueryString(timeQueryString) {
  const [last, numStr, unitName] = timeQueryString.split(/\s+/);
  const num = parseInt(numStr);

  if (last !== "last") {
    return { error: `Invalid time range query string. Must start with "last". Found: ${last}` };
  }
  if (isNaN(num)) {
    return { error: `Invalid time range query string at ${numStr}. Expect a number` };
  }
  if (!SUPPORT_TIME_UNIT_NAMES.includes(unitName)) {
    return { error: `Unrecognized time range unit ${unitName}. Must be one of ${SUPPORT_TIME_UNIT_NAMES.join(", ")}` };
  }

  const milliseconds = getMilliseconds(num, unitName);
  const to = Date.now();
  const from = to - milliseconds;

  return { from, to };
}

function getMilliseconds(num, unitName) {
  const unitDefinition = Object.values(TIME_UNITS).find((unitDefinition) => unitDefinition.names.includes(unitName));
  return unitDefinition.unit * num;
}

function flatten(array) {
  return [].concat.apply([], array);
}
