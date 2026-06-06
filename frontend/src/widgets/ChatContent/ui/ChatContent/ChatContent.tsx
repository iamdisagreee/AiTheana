import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatContent.module.scss";
import { memo, useEffect } from "react";
import { EventTimelineList } from "units/EventTimeline";
import { addChatActions, ChatInput } from "features/AddChat";
import { useSelector } from "react-redux";
import {
  getEventTimelineByChatId,
  getEventTimelineErrorByChatId,
} from "features/EventTimeline";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import Text, { AlignText, ThemeText } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

interface ChatContentProps {
  className?: string;
}

export const ChatContent = memo((props: ChatContentProps) => {
  const { className } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const chatId = Number(id);
  const eventTimelines = useSelector(getEventTimelineByChatId(chatId));
  const dispatch = useAppDispatch();
  const errorFetchTimeline = useSelector(getEventTimelineErrorByChatId(chatId));

  // console.log(errorFetchTimeline, chatId !== 0, chatId);

  useEffect(() => {
    if (chatId) {
      dispatch(addChatActions.setChatId(chatId));
    }
  }, [chatId, navigate, dispatch]);

  if (errorFetchTimeline && chatId) {
    return (
      <div className={classNames(cls.ChatContent, {}, [className])}>
        <Text
          text={t("Ошибка! Попробуйте создать новый чат")}
          theme={ThemeText.ERROR}
          align={AlignText.CENTER}
          className={classNames("", {}, [cls.chat, cls.eventTimelineList])}
        />
      </div>
    );
  }

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
