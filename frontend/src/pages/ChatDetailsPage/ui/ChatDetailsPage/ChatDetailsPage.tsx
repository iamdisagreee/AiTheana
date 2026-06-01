import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatDetailsPage.module.scss";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  chatRequestReducer,
  fetchChats,
  getChatRequestIsLoading,
  getChats,
} from "features/ChatRequest";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Page } from "widgets/Page/Page";
import { Sidebar } from "widgets/Sidebar";
import { ChatContent } from "widgets/ChatContent";
import { addChatReducer } from "features/AddChat";
import { chatStreamReducer } from "features/ChatStream/slices/chatStreamSlice";
import {
  eventTimelineReducer,
  fetchEventTimeline,
} from "features/EventTimeline";
import { useParams } from "react-router-dom";

interface ChatDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  chatRequest: chatRequestReducer,
  addChat: addChatReducer,
  chatStream: chatStreamReducer,
  eventTimeline: eventTimelineReducer,
};

const ChatDetailsPage = memo((props: ChatDetailsPageProps) => {
  const { className } = props;
  const chats = useSelector(getChats);
  const dispatch = useAppDispatch();

  useInitialEffect(async () => {
    await dispatch(fetchEventTimeline(11));
    await dispatch(fetchChats({ replace: true }));
  });

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

export default ChatDetailsPage;
