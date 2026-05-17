import { loginReducer } from "../../slice/LoginSlice";
import { loginByUsername } from "../../service/loginByUsername/loginByUsername";
import { LoginSchema } from "../../types/LoginSchema";

describe("getLoginError", () => {
  test("initial error", () => {
    const initialState: DeepPartial<LoginSchema> = {};

    const action = loginByUsername.rejected(
      null,
      "",
      {
        username: "admin",
        password: "123",
      },
      "error",
    );

    const newState = loginReducer(initialState as LoginSchema, action);

    expect(newState.error).toBe("error");
  });
});
