import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPage.module.scss";
import { memo, useCallback } from "react";
import { ArticleDetails, ArticleList, ArticleView } from "units/Article";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from "../../model/slices/articleDetailsCommentsSlice/articleDetailsCommentsSlice";
import { fetchCommentByArticleId } from "../../model/services/fetchCommentByArticleId/fetchCommentByArticleId";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useDispatch, useSelector } from "react-redux";
import { CommentList } from "units/Comment";
import { getArticleCommentsIsLoading } from "../../model/selectors/getArticleCommentsSelectors";
import Text from "shared/ui/Text/Text";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { AddCommentForm } from "features/AddCommentForm";
import { Page } from "widgets/Page/Page";
import { getArticleRecommendations } from "../../model/slices/ArticleDetailsRecommendationsSlice/articleDetailsRecommendationsSliceSlice";
import { getArticleRecommendsIsLoading } from "pages/ArticleDetailsPage/model/selectors/getArticleRecommendsSelectors";
import { fetchArticleRecommends } from "../../model/services/fetchArticleRecommends/fetchArticleRecommends";
import { articleDetailsPageReducers } from "../../model/slices";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducers,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { id = "1" } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const isLoadingComments = useSelector(getArticleCommentsIsLoading);
  const recommends = useSelector(getArticleRecommendations.selectAll);
  const isLoadingRecommends = useSelector(getArticleRecommendsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchArticleRecommends());
    dispatch(fetchCommentByArticleId(id));
  });

  const onSendComment = useCallback(() => {
    dispatch(addCommentForArticle());
  }, [dispatch]);

  if (!id) {
    return (
      <div className={classNames(cls.AtricleDetailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.AtricleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <Text title={t("Рекомендации")} className={cls.commentsTitle} />
        <ArticleList
          articles={recommends}
          isLoading={isLoadingRecommends}
          view={ArticleView.TILE}
          className={cls.recommends}
          target={"_blank"}
        />
        <Text title={t("Комментарии")} className={cls.commentsTitle} />
        <AddCommentForm className={cls.input} onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={isLoadingComments} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
