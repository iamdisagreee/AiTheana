import { useEffect } from "react";

export const useChatStream = (chatId?: number) => {
  useEffect(() => {
    if (!chatId) return;

    const eventSource = new EventSource(`${__API__}/chats/${chatId}/stream`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log(data);
    };

    return () => {
      eventSource.close();
    };
  }, [chatId]);
};
