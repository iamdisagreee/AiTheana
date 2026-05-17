import { DeepPartial } from "@reduxjs/toolkit";
import { loginActions, loginReducer, loginSlice } from "./LoginSlice";
import { LoginSchema } from "../types/LoginSchema";

describe("LoginSlice", () => {
  test("setPassword", () => {
    const initialState: DeepPartial<LoginSchema> = {
      password: "123",
    };
    expect(
      loginReducer(
        initialState as LoginSchema,
        loginActions.setPassword("123123"),
      ),
    ).toEqual({ password: "123123" });
  });

  test("setUsername", () => {
    const initialState: DeepPartial<LoginSchema> = {
      username: "admin",
    };
    expect(
      loginReducer(
        initialState as LoginSchema,
        loginActions.setUsername("admin123"),
      ),
    ).toEqual({ username: "admin123" });
  });
});
