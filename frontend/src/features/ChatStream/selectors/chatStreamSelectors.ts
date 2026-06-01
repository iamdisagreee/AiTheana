import { StateSchema } from "app/providers/StoreProvider";

export const getChatStreamStatusByChatId =
  (chatId?: number) => (state: StateSchema) => {
    if (!chatId) return;
    return state.chatStream?.statusByChatId[chatId];
  };
