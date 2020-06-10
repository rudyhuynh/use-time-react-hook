const noop = function () {};

let mockWindow = {
  setInterval: noop,
  clearInterval: noop,
};

export function setWindow(w) {
  mockWindow = w;
}

/**
 * @returns {Window}
 */
export function getWindow() {
  if (typeof window !== "undefined") return window;
  return mockWindow;
}
