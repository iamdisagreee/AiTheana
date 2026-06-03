import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatDetailsPage.module.scss";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  chatRequestReducer,
  fetchChats,
  getChats,
  initChats,
} from "features/ChatRequest";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Page } from "widgets/Page/Page";
import { Sidebar } from "widgets/Sidebar";
import { ChatContent } from "widgets/ChatContent";
import { addChatReducer } from "features/AddChat";
import {
  chatStreamActions,
  chatStreamReducer,
} from "features/ChatStream/slices/chatStreamSlice";
import {
  eventTimelineReducer,
  fetchEventTimeline,
  getEventTimelineIsLoadedByChatId,
} from "features/EventTimeline";
import { useParams, useSearchParams } from "react-router-dom";
import { ChatStatus } from "units/Chat";
import { InfoPanel } from "widgets/InfoPanel";

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
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const chatId = Number(id);
  const eventTimelineIsLoaded = useSelector(
    getEventTimelineIsLoadedByChatId(chatId),
  );

  dispatch(initChats(searchParams));

  useEffect(() => {
    dispatch(fetchChats({ replace: true }));
    if (chatId && !eventTimelineIsLoaded) {
      dispatch(fetchEventTimeline(chatId));
      dispatch(
        chatStreamActions.setStatus({ chatId, status: ChatStatus.COMPLETED }),
      );
    }
  }, [chatId, dispatch, eventTimelineIsLoaded]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page>
        <div className={classNames(cls.ChatsPage, {}, [className])}>
          <Sidebar chats={chats} />
          <ChatContent />
          <InfoPanel />
        </div>
      </Page>
    </DynamicModuleLoader>
  );
});

export default ChatDetailsPage;
