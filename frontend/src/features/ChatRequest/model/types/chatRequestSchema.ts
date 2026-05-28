import { EntityState } from "@reduxjs/toolkit";
import { Chat } from "units/Chat";
import { ChatQueryParams } from "./chatQueryParams";

export interface ChatRequestSchema extends EntityState<Chat> {
  isLoading?: boolean;
  error?: string;

  chatIds: number[];

  chatsByInterlocutorId: Record<number, number[]>;

  params: ChatQueryParams;
}
