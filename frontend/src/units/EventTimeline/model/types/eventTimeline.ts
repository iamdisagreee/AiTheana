import { AnalysData } from "units/Analys";
import { MessageData } from "units/Message";

export enum EventTimelineItemType {
  MESSAGE = "MESSAGE",
  ANALYS = "ANALYS",
}

// export interface AddChatResponse {
//   chat_id: number;
// }

export interface MessageEvent {
  id: number;
  createdAt: string;
  eventType: EventTimelineItemType.MESSAGE;
  data: MessageData;
}

export interface AnalysEvent {
  id: number;
  createdAt: string;
  eventType: EventTimelineItemType.ANALYS;
  data: AnalysData;
}

export type EventTimeline = MessageEvent | AnalysEvent;

// export interface EventTimeline {
//   timeline: MessageEvent | AnalysEvent;
// }

// export interface EventTimelineResponse {
//   chat: Chat;
//   timeline: AnalysEvent | MessageEvent;
// }
