import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { chatsSelector } from "../slices/chatRequestSlice";
import { Chat } from "units/Chat";

export const getChatRequestError = (state: StateSchema) =>
  state.chatRequest?.error;
export const getChatRequestIsLoading = (state: StateSchema) =>
  state.chatRequest?.isLoading;

export const getChats = createSelector(
  [
    (state: StateSchema) => state.chatRequest?.chatIds || [],
    chatsSelector.selectEntities,
  ],
  (chatIds, entities) =>
    chatIds
      .map((id) => entities[id])
      .filter((chat): chat is Chat => Boolean(chat)),
);

export const getChatsByInterlocutorId = (interlocutorId?: number) =>
  createSelector(
    [
      (state: StateSchema) =>
        state.chatRequest?.chatsByInterlocutorId[Number(interlocutorId)] || [],
      chatsSelector.selectEntities,
    ],
    (chatsByInterlocutorId, entities) =>
      chatsByInterlocutorId
        .map((id) => entities[id])
        .filter((chat): chat is Chat => Boolean(chat)),
  );
