import { classNames } from "shared/lib/classNames/classNames";
import cls from "./FilePreview.module.scss";
import { memo } from "react";
import FileSvg from "shared/assets/icons/file.svg";
import Text, { SizeText, ThemeText } from "shared/ui/Text/Text";
import PlusSvg from "shared/assets/icons/plus.svg";
import { Icon, IconTheme } from "shared/ui/Icon/Icon";
import Button from "shared/ui/Button/Button";

interface FilePreviewProps {
  className?: string;
  name: string;
  sizeBytes: number;
  onDeleteFile: () => void;
}

export const FilePreview = memo((props: FilePreviewProps) => {
  const { className, name, sizeBytes, onDeleteFile } = props;

  const sizeMB = (sizeBytes / 1024 / 1024).toFixed(1);

  return (
    <div className={classNames(cls.FilePreview, {}, [className])}>
      <FileSvg className={cls.fileSvg} />
      <div className={cls.info}>
        <Text
          text={name}
          size={SizeText.S}
          className={cls.name}
          textClassName={cls.nameText}
        />
        <Text
          text={`${sizeMB}MB`}
          size={SizeText.XS}
          theme={ThemeText.SEMI_PRIMARY_HIGH}
          className={cls.sizeMB}
        />
      </div>
      <Button onClick={onDeleteFile} className={cls.plusBtn}>
        <Icon
          Svg={PlusSvg}
          theme={IconTheme.SECONDARY}
          className={cls.plusSvg}
        />
      </Button>
    </div>
  );
});
