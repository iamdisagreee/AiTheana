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
import { EventTimelineList } from "units/EventTimeline";
import { addChatReducer } from "features/AddChat";
import { ChatContent } from "widgets/ChatContent";
import { chatStreamReducer } from "features/ChatStream/slices/chatStreamSlice";
import { eventTimelineReducer } from "features/EventTimeline";

interface ChatsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  chatRequest: chatRequestReducer,
  addChat: addChatReducer,
  chatStream: chatStreamReducer,
  eventTimeline: eventTimelineReducer,
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
          <ChatContent />
        </div>
      </Page>
    </DynamicModuleLoader>
  );
});

export default ChatsPage;
