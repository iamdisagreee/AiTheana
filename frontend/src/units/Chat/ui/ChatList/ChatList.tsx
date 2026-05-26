import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatList.module.scss";
import { memo } from "react";
import { Chat } from "../../model/types/chat";
import { ChatCard } from "../ChatCard/ChatCard";

interface ChatListProps {
  className?: string;
  chats: Chat[];
}

export const ChatList = memo((props: ChatListProps) => {
  const { className, chats } = props;

  const renderChat = (chat: Chat) => {
    return <ChatCard chat={chat} />;
  };

  return (
    <div className={classNames(cls.ChatList, {}, [className])}>
      {chats.map(renderChat)}
    </div>
  );
});
