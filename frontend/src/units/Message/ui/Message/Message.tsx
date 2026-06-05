import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Message.module.scss";
import { memo } from "react";
import { MessageData, MessageType } from "../../model/types/message";
import { MessageAIText } from "../MessageAIText/MessageAIText";
import { MessageAIError } from "../MessageAIError/MessageAIError";
import { MessageAIWelcome } from "../MessageAIWelcome/MessageAIWelcome";

interface MessageProps {
  className?: string;
  data: MessageData;
}

export const Message = memo((props: MessageProps) => {
  const { className, data } = props;
  let item;

  switch (data.type) {
    case MessageType.AI_TEXT:
      item = <MessageAIText data={data} />;
      break;
    case MessageType.AI_ERROR:
      item = <MessageAIError data={data} />;
      break;
    case MessageType.AI_WELCOME:
      item = <MessageAIWelcome />;
      break;
  }

  return <div className={classNames(cls.Message, {}, [className])}>{item}</div>;
});
