import { classNames } from "shared/lib/classNames/classNames";
import cls from "./EventTimelineItem.module.scss";
import { memo } from "react";
import {
  EventTimeline,
  EventTimelineItemType,
} from "../../model/types/eventTimeline";
import { Message } from "units/Message";
import { Icon, IconTheme } from "shared/ui/Icon/Icon";
import CopySvg from "shared/assets/icons/copy.svg";
import Button from "shared/ui/Button/Button";
import { Analys } from "units/Analys";

interface EventTimelineItemProps {
  className?: string;
  eventTimeline: EventTimeline;
}

export const EventTimelineItem = memo((props: EventTimelineItemProps) => {
  const { className, eventTimeline } = props;
  let item;

  if (eventTimeline.eventType === EventTimelineItemType.MESSAGE)
    item = <Message data={eventTimeline.data} className={cls.item} />;
  else {
    item = <Analys data={eventTimeline.data} className={cls.item} />;
  }

  return (
    <div className={classNames(cls.EventTimelineItem, {}, [className])}>
      {item}
      <Button onClick={() => {}}>
        <CopySvg className={cls.CopySvg} />
      </Button>
    </div>
  );
});
