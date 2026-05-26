import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatsPage.module.scss";
import { memo } from "react";
import LogoIcon from "shared/assets/icons/logo.svg";
import { Icon } from "shared/ui/Icon/Icon";
import Text, { FontWeightText, SizeText, ThemeText } from "shared/ui/Text/Text";
import { Sidebar } from "widgets/Sidebar";
import { Chat, ChatStatus } from "units/Chat";

const chats: Chat[] = [
  {
    id: 1,
    interlocutor_id: 123,
    status: ChatStatus.EMPTY,
    title: "Chat Владимир",
    original_period_start: "2026-05-26T06:15:30Z",
    original_period_end: "2026-05-26T06:15:30Z",
    created_at: "2026-05-26T06:15:30Z",
    updated_at: "2026-05-26T06:15:30Z",
  },
  {
    id: 2,
    interlocutor_id: 123,
    status: ChatStatus.EMPTY,
    title: "Chat Петр",
    original_period_start: "2026-05-26T06:15:30Z",
    original_period_end: "2026-05-26T06:15:30Z",
    created_at: "2026-05-26T06:15:30Z",
    updated_at: "2026-05-26T06:15:30Z",
  },
  {
    id: 3,
    interlocutor_id: 123,
    status: ChatStatus.EMPTY,
    title: "Chat Петр",
    original_period_start: "2026-05-26T06:15:30Z",
    original_period_end: "2026-05-26T06:15:30Z",
    created_at: "2026-05-26T06:15:30Z",
    updated_at: "2026-05-26T06:15:30Z",
  },
  {
    id: 4,
    interlocutor_id: 123,
    status: ChatStatus.EMPTY,
    title: "Chat Петр",
    original_period_start: "2026-05-26T06:15:30Z",
    original_period_end: "2026-05-26T06:15:30Z",
    created_at: "2026-05-26T06:15:30Z",
    updated_at: "2026-05-26T06:15:30Z",
  },
  {
    id: 5,
    interlocutor_id: 123,
    status: ChatStatus.EMPTY,
    title: "Chat Петр",
    original_period_start: "2026-05-26T06:15:30Z",
    original_period_end: "2026-05-26T06:15:30Z",
    created_at: "2026-05-26T06:15:30Z",
    updated_at: "2026-05-26T06:15:30Z",
  },
  {
    id: 6,
    interlocutor_id: 123,
    status: ChatStatus.EMPTY,
    title: "Chat Петр",
    original_period_start: "2026-05-26T06:15:30Z",
    original_period_end: "2026-05-26T06:15:30Z",
    created_at: "2026-05-26T06:15:30Z",
    updated_at: "2026-05-26T06:15:30Z",
  },
];

interface ChatsPageProps {
  className?: string;
}

const ChatsPage = memo((props: ChatsPageProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.ChatsPage, {}, [className])}>
      <Sidebar chats={chats} />
    </div>
  );
});

export default ChatsPage;
