import { classNames } from "shared/lib/classNames/classNames";

describe("classNames", () => {
  test("with only cls", () => {
    expect(classNames("className")).toBe("className");
  });

  test("without parametrs", () => {
    expect(classNames()).toBe("");
  });

  test("without 2 additionals", () => {
    expect(classNames("className", {}, ["class1", "class2"])).toBe(
      "className class1 class2",
    );
  });

  test("without undefined additional", () => {
    expect(classNames("className", {}, ["class1", ""])).toBe(
      "className class1",
    );
  });

  test("with true mods", () => {
    expect(classNames("className", { hovered: true }, ["class1"])).toBe(
      "className class1 hovered",
    );
  });

  test("with false mods", () => {
    expect(classNames("className", { hovered: false }, ["class1"])).toBe(
      "className class1",
    );
  });

  test("with undefined mods", () => {
    expect(classNames("className", { hovered: undefined }, ["class1"])).toBe(
      "className class1",
    );
  });
});
