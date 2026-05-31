import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatDetailsPage.module.scss";
import { memo } from "react";

interface ChatDetailsPageProps {
  className?: string;
}

const ChatDetailsPage = memo((props: ChatDetailsPageProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.ChatDetailsPage, {}, [className])}></div>
  );
});

export default ChatDetailsPage;
