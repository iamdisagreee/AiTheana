import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { AddChatProps } from "../types/addChatProps";
import { AddChatResponse } from "../types/addChatResponse";

export const addChat = createAsyncThunk<
  number,
  AddChatProps,
  ThunkConfig<string>
>("chats/addChat", async (props, thunkApi) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkApi;
  const { file, aiText } = props;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("ai_text", aiText);

  try {
    const response = await extra.api.post<AddChatResponse>("/chats", formData);

    if (!response.data) {
      throw new Error("Непредвиденная ошибка!");
    }

    const chatId = response.data.chatId;

    return chatId;
  } catch (e) {
    return rejectWithValue(
      e.response?.data?.detail[0].msg ?? e.response?.data?.detail ?? e.message,
    );
  }
});
