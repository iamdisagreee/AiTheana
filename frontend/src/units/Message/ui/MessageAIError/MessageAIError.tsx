import { classNames } from "shared/lib/classNames/classNames";
import cls from "./MessageAIError.module.scss";
import { memo } from "react";
import { MessageData } from "../../model/types/message";
import Text, { SizeText, ThemeText } from "shared/ui/Text/Text";

interface MessageAIErrorProps {
  className?: string;
  data: MessageData;
}

export const MessageAIError = memo((props: MessageAIErrorProps) => {
  const { className, data } = props;
  const { content } = data;

  return (
    <Text
      text={content}
      size={SizeText.M}
      theme={ThemeText.ERROR}
      className={classNames(cls.MessageAIError, {}, [className])}
    />
  );
});
