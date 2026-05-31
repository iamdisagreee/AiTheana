import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddChatSchema } from "../types/addChatSchema";
import { addChat } from "../services/addChat";

const initialState: AddChatSchema = {
  isLoading: false,
  error: undefined,
  chatId: undefined,
};

export const addChatSlice = createSlice({
  name: "addChat",
  initialState,
  reducers: {
    setChatId: (state, action: PayloadAction<number>) => {
      state.chatId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChat.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(addChat.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.chatId = action.payload;
      })
      .addCase(addChat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: addChatActions } = addChatSlice;
export const { reducer: addChatReducer } = addChatSlice;
