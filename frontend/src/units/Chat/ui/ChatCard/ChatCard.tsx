import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatCard.module.scss";
import { memo, ReactNode, useCallback } from "react";
import { Chat } from "units/Chat";
import Text, { FontWeightText, ThemeText } from "shared/ui/Text/Text";
import Button from "shared/ui/Button/Button";

interface ChatCardProps {
  className?: string;
  chat: Chat;
  onClick: (chat: Chat) => void;
  renderContent: (chat: Chat) => ReactNode;
  cardClassName?: string;
}

export const ChatCard = memo((props: ChatCardProps) => {
  const { className, chat, onClick, renderContent, cardClassName } = props;

  const onToggle = useCallback((chat: Chat) => onClick(chat), [onClick]);

  return (
    <Button
      onClick={() => onToggle(chat)}
      className={classNames(cls.ChatCard, {}, [className, cardClassName])}
    >
      {renderContent(chat)}
    </Button>
  );
});
