import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { EventTimeline } from "units/EventTimeline/model/types/eventTimeline";
import { EventTimelineSchema } from "../types/eventTimelinSchema";
import { fetchEventTimeline } from "../services/fetchEventTimeline";

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
  },
});

export const { actions: eventTimelineActions } = eventTimelineSlice;
export const { reducer: eventTimelineReducer } = eventTimelineSlice;
