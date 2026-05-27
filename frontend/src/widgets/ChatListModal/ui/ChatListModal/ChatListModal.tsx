import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatListModal.module.scss";
import { memo, Suspense } from "react";
import { Chat } from "units/Chat";
import Modal from "shared/ui/Modal/Modal";
import Loader from "shared/ui/Loader/Loader";

interface ChatListModalProps {
  className?: string;
  chats: Chat[];
  isOpen: boolean;
  onClose: () => void;
}

export const ChatListModal = memo((props: ChatListModalProps) => {
  const { className, chats, isOpen, onClose } = props;

  return (
    <Modal
      className={classNames("", {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader />}></Suspense>
    </Modal>
  );
});
