import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { Chat } from "units/Chat";
import { Comment } from "units/Comment";
import { ChatQueryParams } from "../types/chatQueryParams";

// limit: int = Field(default=10, gt=0)
// sort_by: SortBy = Field(default=SortBy.ID)
// sort_order: SortOrder = Field(default=SortOrder.ASC)
// interlocutor_id: int | None = Field(default=Non

export const fetchChatsByParams = createAsyncThunk<
  Chat[],
  ChatQueryParams,
  ThunkConfig<string>
>("chats/fetchChatsByParams", async (params, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Chat[]>(`/chats`, { params });

    if (!response.data) {
      throw new Error("Данные не загружены!");
    }
    const chats = response.data;
    return chats;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
