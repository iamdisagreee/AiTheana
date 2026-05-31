import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatStreamSchema } from "../types/chatStremSchema";
import { act } from "react-dom/test-utils";
import { ChatStatus } from "units/Chat";

const initialState: ChatStreamSchema = {
  error: undefined,
  statusByChatId: {},
  partialTextByChatId: {},
  isStreamingByChatId: {},
};

export const chatStreamSlice = createSlice({
  name: "chatStream",
  initialState,
  reducers: {
    startStream: (state, action: PayloadAction<number>) => {
      const chatId = action.payload;
      state.isStreamingByChatId[chatId] = true;
      state.statusByChatId[chatId] = ChatStatus.EMPTY;
      state.partialTextByChatId[chatId] = "";
    },
    setStatus: (
      state,
      action: PayloadAction<{ chatId: number; status: ChatStatus }>,
    ) => {
      const { chatId, status } = action.payload;
      state.statusByChatId[chatId] = status;
    },
    appendChunk: (
      state,
      action: PayloadAction<{ chatId: number; chunk: string }>,
    ) => {
      const { chatId, chunk } = action.payload;

      if (!state.partialTextByChatId[chatId]) {
        state.partialTextByChatId[chatId] = "";
      }

      state.partialTextByChatId[chatId] = chunk;
    },

    finishStream: (state, action: PayloadAction<number>) => {
      const chatId = action.payload;

      state.isStreamingByChatId[chatId] = false;
      state.statusByChatId[chatId] = ChatStatus.COMPLETED;
    },

    clearStream: (state, action: PayloadAction<number>) => {
      const chatId = action.payload;

      delete state.partialTextByChatId[chatId];
      delete state.statusByChatId[chatId];
      delete state.isStreamingByChatId[chatId];
    },
  },
  // extraReducers: (builder) => {
  // builder
  //   .addCase(addChat.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = undefined;
  //   })
  //   .addCase(addChat.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.chatId = action.payload;
  //   })
  //   .addCase(addChat.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   });
  // },
});

export const { actions: chatStreamActions } = chatStreamSlice;
export const { reducer: chatStreamReducer } = chatStreamSlice;
