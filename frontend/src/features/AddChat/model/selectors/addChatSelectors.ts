import { StateSchema } from "app/providers/StoreProvider";

export const getAddChatChatId = (state: StateSchema) => state.addChat?.chatId;

export const getAddChatError = (state: StateSchema) => state.addChat?.error;
