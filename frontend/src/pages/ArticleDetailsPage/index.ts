import { ArticleDetailsPageAsync } from "./ui/ArticleDetailsPage/ArticleDetailsPage.async";
import { ArticleDetailsCommentsSchema } from "./model/types/ArticleDetailsCommentsSchema";
import { AddCommentForArticleSchema } from "../../features/AddCommentForm/model/types/AddCommentForArticleSchema";
import { articleDetailsCommentsReducer } from "./model/slices/articleDetailsCommentsSlice";

export {
  ArticleDetailsPageAsync as ArticleDetailsPage,
  ArticleDetailsCommentsSchema,
  AddCommentForArticleSchema,
  articleDetailsCommentsReducer,
};
