import { componentRender } from "shared/lib/tests/componentRender";
import Counter from "./Counter";
import { fireEvent, screen } from "@testing-library/react";
import { StateSchema } from "app/providers/StoreProvider";

describe("Counter", () => {
  test("base show", () => {
    const state: DeepPartial<StateSchema> = {
      counter: {
        value: 10,
      },
    };
    componentRender(<Counter />, { initialState: state });
    expect(screen.getByTestId("counter-title")).toHaveTextContent("10");
  });

  test("increment", () => {
    const state: DeepPartial<StateSchema> = {
      counter: {
        value: 10,
      },
    };
    componentRender(<Counter />, { initialState: state });
    fireEvent.click(screen.getByTestId("increment-btn"));
    expect(screen.getByTestId("counter-title")).toHaveTextContent("11");
  });

  test("decrement", () => {
    const state: DeepPartial<StateSchema> = {
      counter: {
        value: 10,
      },
    };
    componentRender(<Counter />, { initialState: state });
    fireEvent.click(screen.getByTestId("decrement-btn"));
    expect(screen.getByTestId("counter-title")).toHaveTextContent("9");
  });
});
