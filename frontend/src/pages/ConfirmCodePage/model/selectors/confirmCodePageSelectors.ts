import { StateSchema } from "app/providers/StoreProvider";

export const getConfirmCodePageError = (state: StateSchema) =>
  state.confirmCodePage?.error;

export const getConfirmCodePageIsLoading = (state: StateSchema) =>
  state.confirmCodePage?.isLoading;

export const getConfirmCodePageEnteredCode = (state: StateSchema) =>
  state.confirmCodePage?.enteredCode || "";
