import { ChatStatus } from "units/Chat";

export interface ChatStreamSchema {
  statusByChatId: Record<number, ChatStatus>;
  partialTextByChatId: Record<number, string>;
  isStreamingByChatId: Record<number, boolean>;
  error?: string;
}
