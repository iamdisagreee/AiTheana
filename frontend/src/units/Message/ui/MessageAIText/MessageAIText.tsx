import { classNames } from "shared/lib/classNames/classNames";
import cls from "./MessageAIText.module.scss";
import { memo } from "react";
import { MessageData } from "../../model/types/message";
import Text, { SizeText, ThemeText } from "shared/ui/Text/Text";

interface MessageAITextProps {
  className?: string;
  data: MessageData;
}

export const MessageAIText = memo((props: MessageAITextProps) => {
  const { className, data } = props;
  const { content } = data;

  return (
    <Text
      text={content}
      size={SizeText.M}
      theme={ThemeText.PRIMARY}
      className={classNames(cls.MessageAIText, {}, [className])}
    />
  );
});
