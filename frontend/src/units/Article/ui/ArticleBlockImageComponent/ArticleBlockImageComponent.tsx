import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleBlockImageComponent.module.scss";
import { ArticleBlockImage } from "units/Article/model/types/article";
import Text, { AlignText } from "shared/ui/Text/Text";

export interface ArticleBlockImageComponentProps {
  className?: string;
  block: ArticleBlockImage;
}

export const ArticleBlockImageComponent = ({
  className,
  block,
}: ArticleBlockImageComponentProps) => {
  return (
    <div
      className={classNames(cls.ArticleBlockImageComponent, {}, [className])}
    >
      <img src={block.src} alt={block.title} className={cls.image} />
      {block.title && <Text text={block.title} align={AlignText.CENTER} />}
    </div>
  );
};
