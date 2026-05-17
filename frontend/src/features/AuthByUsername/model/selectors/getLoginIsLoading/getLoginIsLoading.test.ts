import { loginReducer } from "../../slice/LoginSlice";
import { loginByUsername } from "../../service/loginByUsername/loginByUsername";
import { LoginSchema } from "../../types/LoginSchema";

describe("getLoginIsLoading", () => {
  test("initial isLoading", () => {
    const initialState: DeepPartial<LoginSchema> = { isLoading: true };

    const action = loginByUsername.pending("", {
      username: "admin",
      password: "123",
    });

    const newState = loginReducer(initialState as LoginSchema, action);
    expect(newState.isLoading).toBe(true);
  });
});
