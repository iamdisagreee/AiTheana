import { StateSchema } from "app/providers/StoreProvider";
import { getLoginPassword } from "./getLoginPassword";

describe("getLoginPassword", () => {
  test("initial password", () => {
    const initialState: DeepPartial<StateSchema> = {
      login: { password: "password" },
    };
    expect(getLoginPassword(initialState as StateSchema)).toEqual("password");
  });

  test("initial undefined", () => {
    const initialState: DeepPartial<StateSchema> = {};
    expect(getLoginPassword(initialState as StateSchema)).toEqual("");
  });
});
