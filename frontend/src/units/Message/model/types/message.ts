export enum MessageType {
  USER_TEXT = "USER_TEXT",
  AI_TEXT = "AI_TEXT",
  AI_ERROR = "AI_ERROR",
  AI_WELCOME = "AI_WELCOME",
}

export interface MessageData {
  type: MessageType;
  content: string;
}
