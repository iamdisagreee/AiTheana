import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatList.module.scss";
import { memo, ReactNode } from "react";
import { Chat } from "../../model/types/chat";
import { ChatCard } from "../ChatCard/ChatCard";

interface ChatListProps {
  className?: string;
  chats?: Chat[];
  onChatClick: (chat: Chat) => void;
  renderContent: (chat: Chat) => ReactNode;
  cardClassName?: string;
}

export const ChatList = memo((props: ChatListProps) => {
  const { className, chats, onChatClick, renderContent, cardClassName } = props;

  const renderChat = (chat: Chat) => {
    return (
      <ChatCard
        key={chat.id}
        chat={chat}
        onClick={onChatClick}
        renderContent={renderContent}
        cardClassName={cardClassName}
      />
    );
  };

  return (
    <div className={classNames(cls.chatsWrapper, {}, [className])}>
      {chats?.map(renderChat)}
    </div>
  );
});
