import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { timelineSelector } from "../slices/eventTimelineSlice";
import { EventTimeline } from "units/EventTimeline";

export const getEventTimelineByChatId = (chatId?: number) =>
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
