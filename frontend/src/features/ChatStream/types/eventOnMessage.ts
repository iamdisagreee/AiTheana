import { ChatStatus } from "units/Chat";

export interface EventOnMessage {
  status: ChatStatus;
  content?: string;
}
