import { classNames } from "shared/lib/classNames/classNames";
import cls from "./MessageAIWelcome.module.scss";
import { memo, useCallback, useState } from "react";
import Text, { SizeText, ThemeText } from "shared/ui/Text/Text";
import Button from "shared/ui/Button/Button";
import { GuideModal } from "widgets/GuideModal";

interface MessageAIWelcomeProps {
  className?: string;
}

export const MessageAIWelcome = memo((props: MessageAIWelcomeProps) => {
  const { className } = props;

  const [opened, setOpened] = useState<boolean>(false);

  const onOpenModal = useCallback(() => {
    setOpened(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setOpened(false);
  }, []);

  return (
    <div className={classNames(cls.MessageAIText, {}, [className])}>
      <div className={cls.welcomeWrapper}>
        <Text
          text={"Привет! Чтобы загрузить чат, нажми на скрепку и следуя"}
          size={SizeText.M}
          theme={ThemeText.PRIMARY}
          className={classNames(cls.MessageAIText, {}, [className])}
        />
        <Button onClick={onOpenModal}>
          <Text
            text={"инструкциям"}
            size={SizeText.M}
            theme={ThemeText.SECONDARY}
            className={classNames(cls.MessageAIText, {}, [className])}
          />
        </Button>
        <Text
          text={"прикрепи файл в формате json"}
          size={SizeText.M}
          theme={ThemeText.PRIMARY}
          className={classNames(cls.MessageAIText, {}, [className])}
        />
      </div>
      <GuideModal isOpen={opened} onClose={onCloseModal} />
    </div>
  );
});
