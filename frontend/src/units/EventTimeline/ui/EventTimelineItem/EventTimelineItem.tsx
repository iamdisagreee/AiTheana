import { classNames } from "shared/lib/classNames/classNames";
import cls from "./EventTimelineItem.module.scss";
import { memo, useState } from "react";
import {
  EventTimeline,
  EventTimelineItemType,
} from "../../model/types/eventTimeline";
import { Message } from "units/Message";
import CopySvg from "shared/assets/icons/copy.svg";
import Button from "shared/ui/Button/Button";
import { Analys } from "units/Analys";
import MarkSvg from "shared/assets/icons/mark.svg";

interface EventTimelineItemProps {
  className?: string;
  eventTimeline: EventTimeline;
}

export const EventTimelineItem = memo((props: EventTimelineItemProps) => {
  const { className, eventTimeline } = props;
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onCopy = () => {
    setIsCopied((prev) => !prev);
    navigator.clipboard.writeText(eventTimeline.data.content);
  };

  let item;
  if (eventTimeline.eventType === EventTimelineItemType.MESSAGE)
    item = <Message data={eventTimeline.data} className={cls.item} />;
  else {
    item = <Analys data={eventTimeline.data} className={cls.item} />;
  }

  return (
    <div className={classNames(cls.EventTimelineItem, {}, [className])}>
      {item}
      <Button onClick={onCopy}>
        {isCopied ? (
          <MarkSvg className={cls.markSvg} />
        ) : (
          <CopySvg className={cls.copySvg} />
        )}
      </Button>
    </div>
  );
});
