import { StateSchema } from "app/providers/StoreProvider";

export const getRegistrationPageError = (state: StateSchema) =>
  state.registrationPage?.error;
export const getRegistrationPageIsLoading = (state: StateSchema) =>
  state.registrationPage?.isLoading;

export const getRegistrationPageUsername = (state: StateSchema) =>
  state.registrationPage?.username || "";

export const getRegistrationPagePasswordFirst = (state: StateSchema) =>
  state.registrationPage?.passwordFirst || "";

export const getRegistrationPagePasswordSecond = (state: StateSchema) =>
  state.registrationPage?.passwordSecond || "";
