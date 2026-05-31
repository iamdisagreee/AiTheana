import { classNames } from "shared/lib/classNames/classNames";
import cls from "./EventTimelineList.module.scss";
import { memo } from "react";
import {
  EventTimeline,
  EventTimelineItemType,
} from "../../model/types/eventTimeline";
import { EventTimelineItem } from "../EventTimelineItem/EventTimelineItem";
import { MessageType } from "units/Message";

interface EventTimelineListProps {
  className?: string;
  eventTimelines: EventTimeline[];
}

const initTimeline = {
  id: -2,
  eventType: EventTimelineItemType.MESSAGE,
  createdAt: new Date().toISOString(),
  data: {
    content:
      "Привет! Чтобы загрузить чат нажми на скрепку и следуя инструкциям прикрепи файл в формате json",
    type: MessageType.AI_TEXT,
  },
};

export const EventTimelineList = memo((props: EventTimelineListProps) => {
  const { className, eventTimelines } = props;

  const renderEventTimeline = (eventTimeline: EventTimeline) => {
    return (
      <EventTimelineItem key={eventTimeline.id} eventTimeline={eventTimeline} />
    );
  };

  const timelines = [initTimeline, ...eventTimelines];

  return (
    <div className={classNames(cls.EventTimelineList, {}, [className])}>
      {timelines.map(renderEventTimeline)}
    </div>
  );
});
