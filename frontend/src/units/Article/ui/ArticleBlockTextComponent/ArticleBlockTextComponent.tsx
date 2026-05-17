import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleBlockTextComponent.module.scss";
import { ArticleBlockText } from "../../model/types/article";
import Text from "shared/ui/Text/Text";

export interface ArticleBlockTextComponentProps {
  className?: string;
  block: ArticleBlockText;
}

export const ArticleBlockTextComponent = ({
  className,
  block,
}: ArticleBlockTextComponentProps) => {
  return (
    <div className={classNames(cls.ArticleBlockTextComponent, {}, [className])}>
      {block?.title && <Text title={block?.title} />}
      {block?.paragraphs.map((paragraph) => (
        <Text text={paragraph} key={paragraph} />
      ))}
    </div>
  );
};
