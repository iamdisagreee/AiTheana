import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatCard.module.scss";
import { memo, useCallback } from "react";
import { Chat } from "units/Chat";
import Text, { FontWeightText, ThemeText } from "shared/ui/Text/Text";
import Button from "shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";

interface ChatCardProps {
  className?: string;
  chat: Chat;
}

export const ChatCard = memo((props: ChatCardProps) => {
  const { className, chat } = props;
  const navigate = useNavigate();

  const toChatDetails = useCallback(() => navigate("/"), [navigate]);

  return (
    <Button
      onClick={toChatDetails}
      className={classNames(cls.ChatCard, {}, [className])}
    >
      <Text
        text={chat.title}
        theme={ThemeText.INVERTED_PRIMARY}
        fontWeight={FontWeightText.MEDIUM}
        className={cls.title}
        textClassName={cls.text}
      />
    </Button>
  );
});
