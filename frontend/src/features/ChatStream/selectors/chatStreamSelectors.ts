import { StateSchema } from "app/providers/StoreProvider";

export const getChatStremPartialTextByChatId =
  (chatId?: number) => (state: StateSchema) => {
    if (!chatId) return;
    return state.chatStream?.partialTextByChatId[chatId];
  };
