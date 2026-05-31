import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Modal.module.scss";
import Portal from "shared/ui/Portal/Portal";
import Button, { ButtonTheme } from "../Button/Button";
import { Icon, IconTheme } from "../Icon/Icon";
import PlusSvg from "shared/assets/icons/plus.svg";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy } = props;

  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const handleClosing = useCallback(() => {
    setIsClosing(true);
    timerRef.current = setTimeout(() => {
      onClose?.();
      setIsClosing(false);
    }, ANIMATION_DELAY);
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClosing();
    },
    [handleClosing],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("keydown", onKeyDown);
      setIsMounted(false);
    };
  }, [isOpen, onKeyDown]);

  const stopContent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  if (!isMounted && lazy) return null;

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [])}>
        <div className={cls.overlay} onClick={handleClosing}>
          <div
            className={classNames(cls.content, {}, [className])}
            onClick={stopContent}
          >
            <Button
              onClick={handleClosing}
              theme={ButtonTheme.CLEAR}
              className={cls.closeBtn}
            >
              <Icon
                Svg={PlusSvg}
                theme={IconTheme.SECONDARY}
                className={cls.closeBtnSvg}
              />
            </Button>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
