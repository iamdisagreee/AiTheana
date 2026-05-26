import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Comment } from "units/Comment";
import { StateSchema } from "app/providers/StoreProvider";
import { Chat } from "units/Chat";
import { ChatRequestSchema } from "../types/chatRequestSchema";
import { fetchChatsByParams } from "../services/fetchChatsByParams";
import { SortBy } from "../types/chatQueryParams";
import { SortOrder } from "../types/chatQueryParams";

const chatsAdapter = createEntityAdapter<Chat>({
  selectId: (chat: Chat) => chat.id,
});

export const getArticleComments = chatsAdapter.getSelectors<StateSchema>(
  (state) => state.chatRequest || chatsAdapter.getInitialState(),
);

const chatRequestSlice = createSlice({
  name: "chatRequestSlice",
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
      .addCase(fetchChatsByParams.pending, (state, action) => {
        state.isLoading = true;
        if (action.meta.arg.replace) {
          chatsAdapter.removeAll(state);
        }
        state.error = undefined;
      })
      .addCase(fetchChatsByParams.fulfilled, (state, action) => {
        // eslint-disable-next-line
        action.meta.arg.replace
          ? chatsAdapter.setAll(state, action.payload)
          : chatsAdapter.addMany(state, action.payload);
        state.isLoading = false;
        state.params.hasMore = action.payload.length === state?.params?.limit;
      })
      .addCase(fetchChatsByParams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: chatRequestActions } = chatRequestSlice;
export const { reducer: chatRequestReducer } = chatRequestSlice;
