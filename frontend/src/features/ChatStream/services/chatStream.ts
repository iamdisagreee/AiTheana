import { fetchEventSource } from "@microsoft/fetch-event-source";
import { AppDispatch } from "app/providers/StoreProvider";
import { chatStreamActions } from "../slices/chatStreamSlice";
import { ChatStatus } from "units/Chat";
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from "shared/const/const";
import { EventOnMessage } from "../types/eventOnMessage";
import { eventTimelineActions } from "features/EventTimeline";
import { EventTimeline } from "units/EventTimeline";
import { EventTimelineItemType } from "units/EventTimeline/model/types/eventTimeline";
import { MessageType } from "units/Message";

export const startChatStream = (chatId: number) => {
  return async (dispatch: AppDispatch) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);

    await fetchEventSource(`${__API__}/chats/${chatId}/stream`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      credentials: "include",

      onmessage(event) {
        const data = JSON.parse(event.data) as EventOnMessage;

        console.log(data.status);

        if (data.status === ChatStatus.PREPROCESSING) {
          dispatch(
            eventTimelineActions.setTimeline({
              timeline: {
                id: -1,
                createdAt: new Date().toISOString(),
                eventType: EventTimelineItemType.MESSAGE,
                data: {
                  content: data.content || "",
                  type: MessageType.AI_TEXT,
                },
              } as EventTimeline,
              chatId: chatId,
            }),
          );
        }

        dispatch(
          chatStreamActions.setStatus({
            chatId,
            status: data.status,
          }),
        );

        if (data.status === ChatStatus.COMPLETED) {
          dispatch(
            eventTimelineActions.setTimeline({
              timeline: {
                id: 0,
                createdAt: new Date().toISOString(),
                eventType: EventTimelineItemType.ANALYS,
                data: {
                  content: data.content || "",
                },
              } as EventTimeline,
              chatId: chatId,
            }),
          );
        }
      },

      // onerror(error) {
      //   dispatch(
      //     chatStreamActions.setStatus({
      //       chatId,
      //       status: ChatStatus.ERROR,
      //     }),
      //   );

      //   throw error;
      // },
    });
  };
};
