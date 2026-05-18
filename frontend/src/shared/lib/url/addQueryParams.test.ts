import { getQueryParams } from "./addQueryParams";

describe("addQueryParams", () => {
  test("1 param", () => {
    const params = {
      test: "true",
    };

    expect(getQueryParams(params)).toEqual("?test=true");
  });

  test("2 params", () => {
    const params = {
      test: "true",
      go: "3",
    };
    expect(getQueryParams(params)).toEqual("?test=true&go=3");
  });

  test("undefined param", () => {
    const params = {
      test: "true",
      go: undefined,
    };

    expect(getQueryParams(params)).toEqual("?test=true");
  });
});
