import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatContent.module.scss";
import { memo, useEffect } from "react";
import { EventTimelineList } from "units/EventTimeline";
import { addChatActions, ChatInput, getAddChatChatId } from "features/AddChat";
import { useSelector } from "react-redux";
import { getEventTimelineByChatId } from "features/EventTimeline";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ChatContentProps {
  className?: string;
}

export const ChatContent = memo((props: ChatContentProps) => {
  const { className } = props;
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();
  const eventTimelines = useSelector(getEventTimelineByChatId(Number(chatId)));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chatId) {
      dispatch(addChatActions.setChatId(Number(chatId)));
    }
  }, [chatId, navigate, dispatch]);

  return (
    <div className={classNames(cls.ChatContent, {}, [className])}>
      <div className={cls.chat}>
        <EventTimelineList
          className={cls.eventTimelineList}
          eventTimelines={eventTimelines}
        />
        <ChatInput className={cls.chatInput} />
      </div>
    </div>
  );
});
