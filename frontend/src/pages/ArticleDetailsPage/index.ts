import { ArticleDetailsPageAsync } from "./ui/ArticleDetailsPage/ArticleDetailsPage.async";
import { ArticleDetailsCommentsSchema } from "./model/types/articleDetailsCommentsSchema";
import { AddCommentForArticleSchema } from "../../features/AddCommentForm/model/types/AddCommentForArticleSchema";
import { articleDetailsCommentsReducer } from "./model/slices/articleDetailsCommentsSlice/articleDetailsCommentsSlice";
import { ArticleDetailsRecommendationsSchema } from "./model/types/articleDetailsPageRecommendations";
import { articleDetailsRecommendationsReducer } from "./model/slices/ArticleDetailsRecommendationsSlice/articleDetailsRecommendationsSliceSlice";
import { ArticleDeailsPageSchema } from "./model/types/articleDetailsPage";

export {
  ArticleDetailsPageAsync as ArticleDetailsPage,
  ArticleDetailsCommentsSchema,
  AddCommentForArticleSchema,
  articleDetailsCommentsReducer,
  ArticleDetailsRecommendationsSchema,
  articleDetailsRecommendationsReducer,
  ArticleDeailsPageSchema,
};
