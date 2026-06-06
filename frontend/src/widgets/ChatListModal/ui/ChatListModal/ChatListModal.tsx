import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatListModal.module.scss";
import { memo, useCallback } from "react";
import Modal from "shared/ui/Modal/Modal";
import Text, {
  AlignText,
  FontWeightText,
  SizeText,
  ThemeText,
} from "shared/ui/Text/Text";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { fetchChats, getChatsByInterlocutorId } from "features/ChatRequest";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { prettyTime } from "shared/lib/functions/prettyTime";
import { Chat, ChatList } from "units/Chat";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface ChatListModalProps {
  className?: string;
  chat?: Chat;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatListModal = memo((props: ChatListModalProps) => {
  const { className, chat, isOpen, onClose } = props;
  const chats = useSelector(getChatsByInterlocutorId(chat?.interlocutorId));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useInitialEffect(async () => {
    await dispatch(
      fetchChats({ interlocutorId: chat?.interlocutorId, replace: true }),
    );
  });

  const onChatClick = useCallback(
    (chat: Chat) => {
      navigate(`${RoutePath.chat_details}${chat.id}`);
      onClose();
    },
    [navigate, onClose],
  );

  const onAddChat = useCallback(() => navigate(RoutePath.chats), [navigate]);

  const renderChat = (chat: Chat) => {
    // className={""}
    const mask = "dd.MM.yy";
    const text = `${prettyTime(chat.originalPeriodStart || "", mask)}-${prettyTime(chat.originalPeriodEnd || "", mask)}`;
    return (
      <Text
        text={text}
        theme={ThemeText.INVERTED_PRIMARY}
        fontWeight={FontWeightText.MEDIUM}
        align={AlignText.LEFT}
      />
    );
  };

  return (
    <Modal
      className={classNames(cls.ChatListModal, {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Text
        text={chat?.title}
        size={SizeText["2XL"]}
        theme={ThemeText.SECONDARY}
        fontWeight={FontWeightText.MEDIUM}
        align={AlignText.CENTER}
        className={cls.title}
      />
      <div className={cls.chatSelectionWrapper}>
        <Text
          text={t("Выбери предыдущий или")}
          size={SizeText.M}
          theme={ThemeText.PRIMARY}
          fontWeight={FontWeightText.REGULAR}
          className={cls.selectPrevious}
        />
        <Button
          theme={ButtonTheme.BACKGROUND_SECONDARY}
          onClick={onAddChat}
          className={cls.addChatBtn}
        >
          <Text
            text={t("Создай новый чат")}
            theme={ThemeText.INVERTED_PRIMARY}
            fontWeight={FontWeightText.MEDIUM}
            align={AlignText.CENTER}
          />
        </Button>
      </div>
      <ChatList
        chats={chats}
        onChatClick={onChatClick}
        renderContent={renderChat}
        className={cls.chatList}
        cardClassName={cls.card}
      />
    </Modal>
  );
});
