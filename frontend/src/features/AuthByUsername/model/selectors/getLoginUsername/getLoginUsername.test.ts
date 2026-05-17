import { getLoginUsername } from "./getLoginUsername";
import { StateSchema } from "app/providers/StoreProvider";

describe("getLoginUsername", () => {
  test("initial username", () => {
    const initialState: DeepPartial<StateSchema> = {
      login: { username: "vladimir" },
    };
    expect(getLoginUsername(initialState as StateSchema)).toEqual("vladimir");
  });

  test("initial undefined", () => {
    const initialState: DeepPartial<StateSchema> = {};
    expect(getLoginUsername(initialState as StateSchema)).toEqual("");
  });
});
