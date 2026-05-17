import { render, screen } from "@testing-library/react";
import Button, { ButtonTheme } from "shared/ui/Button/Button";

describe("Button", () => {
  test("with text", () => {
    render(<Button>Touch me</Button>);
    expect(screen.getByText("Touch me")).toBeInTheDocument();
  });

  test("with theme='CLEAR'", () => {
    render(<Button theme={ButtonTheme.CLEAR}>Touch me</Button>);
    expect(screen.getByText("Touch me")).toBeInTheDocument();
    // screen.debug()
  });
});
