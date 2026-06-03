import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { Chat } from "units/Chat";
import { ChatQueryParams } from "../types/chatQueryParams";
import { FetchChatsResponse } from "../types/fetchChatsResponse";
import { addQueryParams } from "shared/lib/url/addQueryParams";

export const fetchChats = createAsyncThunk<
  Chat[],
  ChatQueryParams,
  ThunkConfig<string>
>("chats/fetchChats", async (params, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  const { search } = params;

  addQueryParams({ search });

  try {
    const response = await extra.api.get<FetchChatsResponse>(`/chats`, {
      params,
    });

    if (!response.data) {
      throw new Error("Данные не загружены!");
    }
    const chats = response.data.chats;

    return chats;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
