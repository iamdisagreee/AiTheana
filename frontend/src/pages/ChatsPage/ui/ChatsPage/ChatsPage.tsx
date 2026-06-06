import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatsPage.module.scss";
import { memo } from "react";
import { useSelector } from "react-redux";
import { chatRequestReducer, getChats, initChats } from "features/ChatRequest";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Page } from "widgets/Page/Page";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { addChatReducer } from "features/AddChat";
import { ChatContent } from "widgets/ChatContent";
import { chatStreamReducer } from "features/ChatStream/slices/chatStreamSlice";
import { eventTimelineReducer } from "features/EventTimeline";
import { InfoPanel } from "widgets/InfoPanel";
import { Sidebar } from "widgets/Sidebar";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
  const chats = useSelector(getChats);
  const dispatch = useAppDispatch();

  dispatch(initChats(searchParams));

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

export default ChatsPage;
