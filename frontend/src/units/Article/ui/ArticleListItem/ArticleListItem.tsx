import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleListItem.module.scss";
import { memo, useCallback } from "react";
import {
  Article,
  ArticleBlockText,
  ArticleBlockType,
  ArticleView,
} from "../../model/types/article";
import Text from "shared/ui/Text/Text";
import EyeIcon from "shared/assets/icons/eye.svg";
import { Icon } from "shared/ui/Icon/Icon";
import { Card } from "shared/ui/Card/Card";
import Avatar from "shared/ui/Avatar/Avatar";
import { ArticleBlockTextComponent } from "../ArticleBlockTextComponent/ArticleBlockTextComponent";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import AppLink from "shared/ui/AppLink/AppLink";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: string;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();
  const createdAt = <Text text={article.createdAt} className={cls.date} />;
  const types = <Text text={article.type.join(", ")} className={cls.types} />;
  const image = (
    <img src={article.img} alt={article.title} className={cls.image} />
  );
  const block = article.blocks.find(
    (block) => block.type === ArticleBlockType.TEXT,
  ) as ArticleBlockText;
  const views = (
    <>
      <Text text={article.views.toString()} className={cls.views} />
      <Icon Icon={EyeIcon} />
    </>
  );

  if (view === ArticleView.LIST)
    return (
      <Card
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <div className={cls.header}>
          <Avatar src={article.user?.avatar} size={30} className={cls.avatar} />
          <Text text={article.user.username} className={cls.username} />
          {createdAt}
        </div>
        <Text title={article.title} className={cls.title} />
        {types}
        <div className={cls.imageWrapper}>{image}</div>
        <ArticleBlockTextComponent block={block} className={cls.block} />
        <div className={cls.footer}>
          <AppLink
            to={`${RoutePath.articles_details}${article.id}`}
            target={target}
          >
            <Button theme={ButtonTheme.OUTLINE}>{t("Читать далее")}</Button>
          </AppLink>

          {views}
        </div>
      </Card>
    );

  return (
    <AppLink to={`${RoutePath.articles_details}${article.id}`} target={target}>
      <Card
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <div className={cls.imageWrapper}>
          {image}
          {createdAt}
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
});
