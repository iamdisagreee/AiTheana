import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Chat } from "units/Chat";
import { ChatRequestSchema } from "../types/chatRequestSchema";
import { fetchChats } from "../services/fetchChats";
import { SortBy } from "../types/chatQueryParams";
import { SortOrder } from "../types/chatQueryParams";

const chatsAdapter = createEntityAdapter<Chat>({
  selectId: (chat: Chat) => chat.id,
});

export const getChats = chatsAdapter.getSelectors<StateSchema>(
  (state) => state.chatRequest || chatsAdapter.getInitialState(),
);

const chatRequestSlice = createSlice({
  name: "chatRequest",
  initialState: chatsAdapter.getInitialState<ChatRequestSchema>({
    ids: [],
    entities: {},
    error: undefined,
    isLoading: false,
    params: {
      page: 1,
      limit: 10,
      search: undefined,
      sortBy: SortBy.ID,
      sortOrder: SortOrder.ASC,
      interlocutorId: undefined,
      replace: false,
      hasMore: true,
    },
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state, action) => {
        state.isLoading = true;
        if (action.meta.arg.replace) {
          chatsAdapter.removeAll(state);
        }
        state.error = undefined;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        // eslint-disable-next-line
        action.meta.arg.replace
          ? chatsAdapter.setAll(state, action.payload)
          : chatsAdapter.addMany(state, action.payload);
        state.isLoading = false;
        state.params.hasMore = action.payload.length === state?.params?.limit;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: chatRequestActions } = chatRequestSlice;
export const { reducer: chatRequestReducer } = chatRequestSlice;
