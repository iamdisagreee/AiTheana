import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatInput.module.scss";
import { ChangeEvent, memo, useCallback, useRef, useState } from "react";
import ClipSvg from "shared/assets/icons/clip.svg";
import ArrowSvg from "shared/assets/icons/arrow.svg";
import Button from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Textarea } from "shared/ui/Textarea/Textarea";
import { FilePreview } from "../FilePreview/FilePreview";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { addChat } from "../../model/services/addChat";
import { startChatStream } from "features/ChatStream";
import { useNavigate } from "react-router-dom";

interface ChatInputProps {
  className?: string;
}

export const ChatInput = memo((props: ChatInputProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [file, setFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSelectFile = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onDeleteFile = () => {
    setFile(undefined);
  };

  const onSendFile = useCallback(async () => {
    if (!file) return;
    const result = await dispatch(addChat({ file: file, aiText: "" }));
    onDeleteFile();

    if (addChat.fulfilled.match(result)) {
      const chatId = result.payload;
      dispatch(startChatStream(chatId));
      navigate(`/chats/${chatId}`);
    } else {
      const error = result.payload;
      alert(error);
    }
  }, [dispatch, file, navigate]);

  return (
    <div className={classNames(cls.ChatInput, {}, [className])}>
      <Button onClick={onSelectFile} className={cls.clipBtn}>
        <ClipSvg className={cls.clipSvg} />
      </Button>
      {!!file && (
        <FilePreview
          name={file?.name || t("Нет имени")}
          sizeBytes={file?.size || 0}
          onDeleteFile={onDeleteFile}
        />
      )}
      <input
        ref={fileInputRef}
        type={"file"}
        accept={".json"}
        hidden
        onChange={onFileChange}
      />
      <Textarea
        placeholder={t("Прикрепи чат, писать пока что нельзя)")}
        disabled={true}
        className={cls.textarea}
      />
      <Button onClick={onSendFile} disabled={!file} className={cls.arrowBtn}>
        <ArrowSvg className={cls.arrowSvg} />
      </Button>
    </div>
  );
});
