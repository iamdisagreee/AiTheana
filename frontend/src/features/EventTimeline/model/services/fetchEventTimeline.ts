import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { FetchEventTimelineResponse } from "../types/fetchEventTimelineResponse";

export const fetchEventTimeline = createAsyncThunk<
  FetchEventTimelineResponse,
  number,
  ThunkConfig<string>
>("chats/fetchTimelineByChatId", async (chatId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.get<FetchEventTimelineResponse>(
      `/chats/${chatId}`,
    );

    if (!response.data) {
      throw new Error("Данные не загружены!");
    }
    const chats = response.data;

    return chats;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
