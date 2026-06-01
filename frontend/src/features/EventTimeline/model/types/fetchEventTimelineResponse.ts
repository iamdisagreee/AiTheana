import { Chat } from "units/Chat";
import { EventTimeline } from "units/EventTimeline";

export interface FetchEventTimelineResponse {
  chat: Chat;
  timeline: EventTimeline[];
}
