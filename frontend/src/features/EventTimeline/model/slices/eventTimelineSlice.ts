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
  selectId: (timeline: EventTimeline) => `${timeline.eventType}_${timeline.id}`,
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
      state.timelines[chatId] = [
        ...currentIds,
        `${timeline.eventType}_${timeline.id}`,
      ];
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
        // console.log(timeline);
        state.isLoading = false;
        timelineAdapter.addMany(state, action.payload.timeline);
        state.timelines[chat.id] = timeline.map(
          (timeline) => `${timeline.eventType}_${timeline.id}`,
        );
        // console.log(state.timelines[chat.id]);
      })
      .addCase(fetchEventTimeline.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: eventTimelineActions } = eventTimelineSlice;
export const { reducer: eventTimelineReducer } = eventTimelineSlice;
