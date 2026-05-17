import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleBlockCodeComponent.module.scss";
import { ArticleBlockCode } from "units/Article/model/types/article";
import Button from "shared/ui/Button/Button";
import CopyIcon from "shared/assets/icons/copy.svg";
import { Icon } from "shared/ui/Icon/Icon";

interface ArticleBlockCodeComponentProps {
  className?: string;
  block: ArticleBlockCode;
}

export const ArticleBlockCodeComponent = ({
  className,
  block,
}: ArticleBlockCodeComponentProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(block.code);
  };

  return (
    <div className={classNames(cls.ArticleBlockCodeComponent, {}, [className])}>
      <Button>
        <CopyIcon className={cls.copyBtn} onClick={onCopy} />
      </Button>
      <pre>
        <code>{block.code}</code>
      </pre>
    </div>
  );
};
