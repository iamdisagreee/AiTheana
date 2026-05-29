import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatsPage.module.scss";
import { memo } from "react";
import LogoIcon from "shared/assets/icons/logo.svg";
import { Icon } from "shared/ui/Icon/Icon";
import Text, { FontWeightText, SizeText, ThemeText } from "shared/ui/Text/Text";
import { Sidebar } from "widgets/Sidebar";
import { Chat, ChatStatus } from "units/Chat";
import { useSelector } from "react-redux";
import {
  chatRequestReducer,
  fetchChats,
  getChatRequestIsLoading,
  getChats,
} from "features/ChatRequest";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Page } from "widgets/Page/Page";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

// const chats: Chat[] = [
//   {
//     id: 1,
//     interlocutor_id: 123,
//     status: ChatStatus.EMPTY,
//     title: "Chat Владимир",
//     original_period_start: "2026-05-26T06:15:30Z",
//     original_period_end: "2026-05-26T06:15:30Z",
//     created_at: "2026-05-26T06:15:30Z",
//     updated_at: "2026-05-26T06:15:30Z",
//   },
//   {
//     id: 2,
//     interlocutor_id: 123,
//     status: ChatStatus.EMPTY,
//     title: "Chat Петр",
//     original_period_start: "2026-05-26T06:15:30Z",
//     original_period_end: "2026-05-26T06:15:30Z",
//     created_at: "2026-05-26T06:15:30Z",
//     updated_at: "2026-05-26T06:15:30Z",
//   },
//   {
//     id: 3,
//     interlocutor_id: 123,
//     status: ChatStatus.EMPTY,
//     title: "Chat Петр",
//     original_period_start: "2026-05-26T06:15:30Z",
//     original_period_end: "2026-05-26T06:15:30Z",
//     created_at: "2026-05-26T06:15:30Z",
//     updated_at: "2026-05-26T06:15:30Z",
//   },
//   {
//     id: 4,
//     interlocutor_id: 123,
//     status: ChatStatus.EMPTY,
//     title: "Chat Петр",
//     original_period_start: "2026-05-26T06:15:30Z",
//     original_period_end: "2026-05-26T06:15:30Z",
//     created_at: "2026-05-26T06:15:30Z",
//     updated_at: "2026-05-26T06:15:30Z",
//   },
//   {
//     id: 5,
//     interlocutor_id: 123,
//     status: ChatStatus.EMPTY,
//     title: "Chat Петр",
//     original_period_start: "2026-05-26T06:15:30Z",
//     original_period_end: "2026-05-26T06:15:30Z",
//     created_at: "2026-05-26T06:15:30Z",
//     updated_at: "2026-05-26T06:15:30Z",
//   },
//   {
//     id: 6,
//     interlocutor_id: 123,
//     status: ChatStatus.EMPTY,
//     title: "Chat Петр",
//     original_period_start: "2026-05-26T06:15:30Z",
//     original_period_end: "2026-05-26T06:15:30Z",
//     created_at: "2026-05-26T06:15:30Z",
//     updated_at: "2026-05-26T06:15:30Z",
//   },
// ];

interface ChatsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  chatRequest: chatRequestReducer,
};

const ChatsPage = memo((props: ChatsPageProps) => {
  const { className } = props;
  const chats = useSelector(getChats);
  const isLoading = useSelector(getChatRequestIsLoading);
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(fetchChats({}));
  });

  // const onLoadNextPart = useCallback(() => {
  //   dispatch(fetchNextArticlePage());
  // }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page>
        <div className={classNames(cls.ChatsPage, {}, [className])}>
          <Sidebar chats={chats} />
        </div>
      </Page>
    </DynamicModuleLoader>
  );
});

export default ChatsPage;
