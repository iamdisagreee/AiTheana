import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { timelineSelector } from "../slices/eventTimelineSlice";
import { EventTimeline, EventTimelineItemType } from "units/EventTimeline";

export const getEventTimelineByChatId = (
  chatId?: number,
  // eventType: EventTimelineItemType,
) =>
  createSelector(
    [
      (state: StateSchema) =>
        state.eventTimeline?.timelines[Number(chatId)] || [],
      timelineSelector.selectEntities,
    ],
    (eventTimelineByChatId, entities) =>
      eventTimelineByChatId
        .map((id) => entities[id])
        .filter((timeline): timeline is EventTimeline => Boolean(timeline)),
  );

export const getEventTimelineErrorByChatId =
  (chatId?: number) => (state: StateSchema) => {
    if (!chatId) return true;
    return state.eventTimeline?.error;
  };

export const getEventTimelineIsLoadedByChatId =
  (chatId?: number) => (state: StateSchema) => {
    if (!chatId) return;
    // console.log(
    //   state.eventTimeline?.timelines[chatId],
    //   state.eventTimeline?.timelines[chatId]?.length,
    // );
    return !!state.eventTimeline?.timelines[chatId]?.length;
  };
