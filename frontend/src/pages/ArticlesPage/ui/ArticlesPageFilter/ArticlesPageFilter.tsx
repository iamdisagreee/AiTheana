import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticlesPageFilter.module.scss";
import { memo, useCallback } from "react";
import {
  ArticleSortField,
  ArticleSortSelector,
  ArticleType,
  ArticleTypeTabs,
  ArticleView,
  ArticleViewSelector,
} from "units/Article";
import { useSelector } from "react-redux";
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from "../../model/selectors/getArticlesPageSelectors";
import { articlesPageActions } from "../../model/slices/articlesPageSlice/articlesPageSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { SortOrder } from "shared/lib/types/order";
import { fetchArticlesList } from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import { useDebounce } from "shared/lib/hooks/useDebounce/useDebounce";
import Input from "shared/ui/Input/Input";
import { Card } from "shared/ui/Card/Card";
import { useTranslation } from "react-i18next";

interface ArticlesPageFilterProps {
  className?: string;
}

export const ArticlesPageFilter = memo((props: ArticlesPageFilterProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesPageView);
  const sort = useSelector(getArticlesPageSort);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);
  const type = useSelector(getArticlesPageType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debounceFetchData = useDebounce(fetchData, 1000);

  const onViewClick = useCallback(
    (value: ArticleView) => {
      dispatch(articlesPageActions.setView(value));
    },
    [dispatch],
  );

  const onChangeSort = useCallback(
    (value: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(value));
      dispatch(articlesPageActions.setPage(1));
      dispatch(fetchData);
    },
    [dispatch, fetchData],
  );

  const onChangeOrder = useCallback(
    (value: SortOrder) => {
      dispatch(articlesPageActions.setOrder(value));
      dispatch(articlesPageActions.setPage(1));
      dispatch(fetchData);
    },
    [dispatch, fetchData],
  );

  const onChangeSearch = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setSearch(value));
      dispatch(articlesPageActions.setPage(1));
      debounceFetchData();
    },
    [dispatch, debounceFetchData],
  );

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));
      dispatch(articlesPageActions.setPage(1));
      dispatch(fetchData);
    },
    [dispatch, fetchData],
  );

  return (
    <div className={classNames(cls.ArticlesPageFilter, {}, [className])}>
      <ArticleViewSelector onViewClick={onViewClick} view={view} />
      <ArticleSortSelector
        sort={sort}
        order={order}
        onChangeSort={onChangeSort}
        onChangeOrder={onChangeOrder}
      />
      <Card className={cls.card}>
        <Input
          placeholder={t("Введите текст")}
          value={search}
          onChange={onChangeSearch}
          className={cls.input}
        />
      </Card>
      <ArticleTypeTabs value={type} onChangeType={onChangeType} />
    </div>
  );
});
