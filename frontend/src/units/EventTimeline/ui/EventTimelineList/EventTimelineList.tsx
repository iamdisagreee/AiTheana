import { classNames } from "shared/lib/classNames/classNames";
import cls from "./EventTimelineList.module.scss";
import { memo } from "react";
import {
  EventTimeline,
  EventTimelineItemType,
} from "../../model/types/eventTimeline";
import { EventTimelineItem } from "../EventTimelineItem/EventTimelineItem";
import { MessageType } from "units/Message";
import { useSelector } from "react-redux";
import { getChatStreamStatusByChatId } from "features/ChatStream";
import { useParams } from "react-router-dom";
import { ChatStatus } from "units/Chat";
import Loader from "shared/ui/Loader/Loader";

interface EventTimelineListProps {
  className?: string;
  eventTimelines: EventTimeline[];
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initTimeline = {
  id: getRandomInt(1, 100000),
  eventType: EventTimelineItemType.MESSAGE,
  createdAt: new Date().toISOString(),
  data: {
    content: "",
    type: MessageType.AI_WELCOME,
  },
};

export const EventTimelineList = memo((props: EventTimelineListProps) => {
  const { className, eventTimelines } = props;
  const { id: chatId } = useParams();
  const status = useSelector(getChatStreamStatusByChatId(Number(chatId)));

  const renderEventTimeline = (eventTimeline: EventTimeline) => {
    return (
      <EventTimelineItem
        key={eventTimeline.createdAt}
        eventTimeline={eventTimeline}
      />
    );
  };

  const timelines = [initTimeline, ...eventTimelines];

  return (
    <>
      <div className={classNames(cls.EventTimelineList, {}, [className])}>
        {timelines.map(renderEventTimeline)}
        {chatId &&
          status !== ChatStatus.COMPLETED &&
          status != ChatStatus.FAILED && <Loader className={cls.loader} />}
      </div>
    </>
  );
});
