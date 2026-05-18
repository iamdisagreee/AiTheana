import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPage.module.scss";
import { memo, useCallback } from "react";
import { ArticleDetails } from "units/Article";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from "../../model/slices/articleDetailsCommentsSlice";
import { fetchCommentByArticleId } from "../../model/services/fetchCommentByArticleId/fetchCommentByArticleId";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useDispatch, useSelector } from "react-redux";
import { CommentList } from "units/Comment";
import { getArticleCommentsIsLoading } from "../../model/selectors/getArticleCommentsSelectors";
import Text from "shared/ui/Text/Text";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { AddCommentForm } from "features/AddCommentForm";
import { Page } from "widgets/Page/Page";

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { id = "1" } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const isLoadingComments = useSelector(getArticleCommentsIsLoading);

  useInitialEffect(() => dispatch(fetchCommentByArticleId(id)));

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
        <ArticleDetails id={id} />
        <Text title={t("Комментарии")} className={cls.commentsTitle} />
        <AddCommentForm className={cls.input} onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={isLoadingComments} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
