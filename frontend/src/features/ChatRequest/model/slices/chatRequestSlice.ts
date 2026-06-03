import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
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
    sidebarParams: {
      page: 1,
      limit: 10,
      search: undefined,
      sortBy: SortBy.ID,
      sortOrder: SortOrder.ASC,
      interlocutorId: undefined,
      replace: false,
      hasMore: true,
    },
    modalByIntelocutorIdParams: {},
    chatIds: [],
    chatsByInterlocutorId: {},
    sidebarInited: false,
    ids: [],
    entities: {},
  }),
  reducers: {
    setSidebarSearch: (state, action: PayloadAction<string>) => {
      state.sidebarParams.search = action.payload;
    },
    setModalSearchByIntelocutorId: (
      state,
      action: PayloadAction<{ interlocutorId: number; search: string }>,
    ) => {
      const { interlocutorId, search } = action.payload;
      state.modalByIntelocutorIdParams[interlocutorId].search = search;
    },
    initSidebarState: (state) => {
      state.sidebarInited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sidebarParams.hasMore =
          action.payload.length === state.sidebarParams?.limit;

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
