import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import {
  EventTimeline,
  EventTimelineItemType,
} from "units/EventTimeline/model/types/eventTimeline";
import { EventTimelineSchema } from "../types/eventTimelinSchema";
import { MessageType } from "units/Message";
import { fetchEventTimeline } from "../services/fetchEventTimeline";

const initTimeline = {
  id: -2,
  eventType: EventTimelineItemType.MESSAGE,
  createdAt: new Date().toISOString(),
  data: {
    content:
      "Привет! Чтобы загрузить чат нажми на скрепку и следуя инструкциям прикрепи файл в формате json",
    type: MessageType.AI_TEXT,
  },
};

const timelineAdapter = createEntityAdapter<EventTimeline>({
  selectId: (timeline: EventTimeline) => timeline.id,
});

export const timelineSelector = timelineAdapter.getSelectors<StateSchema>(
  (state) => state.eventTimeline || timelineAdapter.getInitialState(),
);

const initialState = timelineAdapter.getInitialState<EventTimelineSchema>({
  error: undefined,
  isLoading: false,
  timelines: {},
  ids: [],
  entities: {},
});

// initialState = timelineAdapter.addOne(initialState, initTimeline);

const eventTimelineSlice = createSlice({
  name: "eventTimeline",
  initialState,
  reducers: {
    setTimeline: (
      state,
      action: PayloadAction<{ timeline: EventTimeline; chatId: number }>,
    ) => {
      const { timeline, chatId } = action.payload;
      timelineAdapter.addOne(state, timeline);
      const currentIds = state.timelines[chatId] || [];
      state.timelines[chatId] = [...currentIds, timeline.id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventTimeline.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchEventTimeline.fulfilled, (state, action) => {
        const { chat, timeline } = action.payload;
        state.isLoading = false;
        timelineAdapter.addMany(state, action.payload.timeline);
        state.timelines[chat.id] = timeline.map((event) => event.id);
      })
      .addCase(fetchEventTimeline.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    //     state.isLoading = false;
    //     state.params.hasMore = action.payload.length === state.params?.limit;
    //     const chats = action.payload;
    //     const params = action.meta.arg;
    //     timelineAdapter.upsertMany(state, chats);
    //     const chatIds = chats.map((chat: Chat) => chat.id);
    //     // console.log(chatIds, params.replace);
    //     //sidebar
    //     if (!params.interlocutorId) {
    //       if (params.replace) {
    //         state.chatIds = chatIds;
    //       } else {
    //         state.chatIds.push(...chatIds);
    //       }
    //     }
    //     //modal
    //     else {
    //       const currentIds =
    //         state.chatsByInterlocutorId[params.interlocutorId] || [];
    //       state.chatsByInterlocutorId[params.interlocutorId] = params.replace
    //         ? chatIds
    //         : [...currentIds, ...chatIds];
    //     }
    //     // eslint-disable-next-line
    //     // action.meta.arg.replace
    //     //   ? chatsAdapter.setAll(state, action.payload)
    //     //   : chatsAdapter.addMany(state, action.payload);
    //     // state.isLoading = false;
    //   })
    //   .addCase(fetchChats.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   });
  },
});

export const { actions: eventTimelineActions } = eventTimelineSlice;
export const { reducer: eventTimelineReducer } = eventTimelineSlice;
