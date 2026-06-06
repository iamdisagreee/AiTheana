import { EntityState } from "@reduxjs/toolkit";
import { EventTimeline } from "units/EventTimeline";

export interface EventTimelineSchema extends EntityState<EventTimeline> {
  isLoading?: boolean;
  error?: string;
  timelines: Record<number, string[]>;
}
