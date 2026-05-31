import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Chat } from "units/Chat";
import { ChatRequestSchema } from "../types/chatRequestSchema";
import { fetchChats } from "../services/fetchChats";
import { SortBy } from "../types/chatQueryParams";
import { SortOrder } from "../types/chatQueryParams";

const chatsAdapter = createEntityAdapter<Chat>({
  selectId: (chat: Chat) => chat.id,
});

export const chatsSelector = chatsAdapter.getSelectors<StateSchema>(
  (state) => state.chatRequest || chatsAdapter.getInitialState(),
);

const chatRequestSlice = createSlice({
  name: "chatRequest",
  initialState: chatsAdapter.getInitialState<ChatRequestSchema>({
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
    chatIds: [],
    chatsByInterlocutorId: {},
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.params.hasMore = action.payload.length === state.params?.limit;

        const chats = action.payload;
        const params = action.meta.arg;

        chatsAdapter.upsertMany(state, chats);

        const chatIds = chats.map((chat: Chat) => chat.id);

        // console.log(chatIds, params.replace);

        //sidebar
        if (!params.interlocutorId) {
          if (params.replace) {
            state.chatIds = chatIds;
          } else {
            state.chatIds.push(...chatIds);
          }
        }

        //modal
        else {
          const currentIds =
            state.chatsByInterlocutorId[params.interlocutorId] || [];

          state.chatsByInterlocutorId[params.interlocutorId] = params.replace
            ? chatIds
            : [...currentIds, ...chatIds];
        }

        // eslint-disable-next-line
        // action.meta.arg.replace
        //   ? chatsAdapter.setAll(state, action.payload)
        //   : chatsAdapter.addMany(state, action.payload);
        // state.isLoading = false;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: chatRequestActions } = chatRequestSlice;
export const { reducer: chatRequestReducer } = chatRequestSlice;
