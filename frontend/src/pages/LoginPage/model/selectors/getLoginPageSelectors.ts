import { StateSchema } from "app/providers/StoreProvider";

export const getLoginPageError = (state: StateSchema) => state.loginPage?.error;
export const getLoginPageIsLoading = (state: StateSchema) =>
  state.loginPage?.isLoading;

export const getLoginPageUsername = (state: StateSchema) =>
  state.loginPage?.username || "";

export const getLoginPagePassword = (state: StateSchema) =>
  state.loginPage?.password || "";
