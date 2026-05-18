import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss";
import { memo } from "react";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { useTranslation } from "react-i18next";
import Text from "shared/ui/Text/Text";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const skeletonArticles = (view: ArticleView) => {
  return new Array(view === ArticleView.LIST ? 3 : 9)
    .fill(1)
    .map((_, index) => <ArticleListItemSkeleton view={view} key={index} />);
};

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view = ArticleView.TILE } = props;
  const { t } = useTranslation();

  const renderArticle = (article: Article) => (
    <ArticleListItem article={article} view={view} key={article.id} />
  );

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text title={t("Ничего не найдено...")} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && skeletonArticles(view)}
    </div>
  );
});
