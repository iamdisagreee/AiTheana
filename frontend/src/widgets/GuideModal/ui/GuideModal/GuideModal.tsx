import { classNames } from "shared/lib/classNames/classNames";
import cls from "./GuideModal.module.scss";
import { memo } from "react";
import Modal from "shared/ui/Modal/Modal";
import guideVideo from "shared/assets/videos/guide.webm";

interface GuideModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const GuideModal = memo((props: GuideModalProps) => {
  const { className, isOpen, onClose } = props;

  return (
    <Modal
      className={classNames(cls.GuideModal, {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <video controls className={cls.video}>
        <source src={guideVideo} type="video/webm" />
        Ваш браузер не поддерживает видео.
      </video>
    </Modal>
  );
});

export default GuideModal;
