import { StateSchema } from "app/providers/StoreProvider";
import { counterActions, counterReducer } from "./CounterSlice";
import type { CounterSchema } from "../types/CounterSchema";

describe("Counter", () => {
  test("decrement", () => {
    const initialState: CounterSchema = {
      value: 10,
    };
    expect(counterReducer(initialState, counterActions.decrement)).toEqual({
      value: 9,
    });
  });

  test("increment", () => {
    const initialState: CounterSchema = {
      value: 10,
    };
    expect(counterReducer(initialState, counterActions.increment)).toEqual({
      value: 11,
    });
  });

  test("shold work with empty state", () => {
    expect(counterReducer(undefined, counterActions.increment)).toEqual({
      value: 1,
    });
  });
});
