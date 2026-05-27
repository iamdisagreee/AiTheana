import { StateSchema } from "app/providers/StoreProvider";

export const getChatRequestError = (state: StateSchema) =>
  state.chatRequest?.error;
export const getChatRequestIsLoading = (state: StateSchema) =>
  state.chatRequest?.isLoading;
