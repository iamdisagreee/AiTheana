import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatListModal.module.scss";
import { memo } from "react";
import { Chat } from "units/Chat";
import Modal from "shared/ui/Modal/Modal";
import Text, { FontWeightText, SizeText, ThemeText } from "shared/ui/Text/Text";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { t } from "i18next";

interface ChatListModalProps {
  className?: string;
  chat?: Chat;
  isOpen: boolean;
  onClose: () => void;
  onChatClick: (chat: Chat) => void;
}

export const ChatListModal = memo((props: ChatListModalProps) => {
  const { className, chat, isOpen, onClose, onChatClick } = props;

  return (
    <Modal
      className={classNames("", {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Text
        text={chat?.title}
        size={SizeText["2XL"]}
        theme={ThemeText.SECONDARY}
        fontWeight={FontWeightText.MEDIUM}
        className={cls.title}
      />
      <div className={cls.chatSelectionWrapper}>
        <Text
          text={t("Выберите предыдущий или")}
          size={SizeText.M}
          theme={ThemeText.PRIMARY}
          fontWeight={FontWeightText.REGULAR}
          className={cls.selectPrevious}
        />
        <Button theme={ButtonTheme.BACKGROUND_SECONDARY}>
          <Text
            text={t("Создать новый чат")}
            theme={ThemeText.INVERTED_PRIMARY}
            fontWeight={FontWeightText.MEDIUM}
          />
        </Button>
      </div>
    </Modal>
  );
});
