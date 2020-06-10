import { parseTimeQueryString, parseInterval } from "./useTime";

describe("parseTimeQueryString", () => {
  const mockNow = new Date(2020, 1, 1, 1, 1, 1).getTime();
  const originalNow = Date.now;
  beforeEach(() => {
    Date.now = jest.fn(() => mockNow);
  });
  afterEach(() => {
    Date.now = originalNow;
  });

  test("last 5 minutes", () => {
    const expectedTime = {
      from: mockNow - 5 * 60 * 1000,
      to: mockNow,
    };
    expect(parseTimeQueryString("last 5 minutes", Date.now())).toEqual(expectedTime);
  });
});

describe("parseInterval()", () => {
  test("parseInterval(1000)", () => {
    expect(parseInterval(1000)).toBe(1000);
  });

  test('parseInterval("1 min")', () => {
    expect(parseInterval("1 min")).toBe(60000);
  });
});
