import { getArticleData } from "./model/selectors/getArticleSelectors";
import { fetchArticleById } from "./model/services/fetchArticleById/fetchArticleById";
import {
  articleDetailsActions,
  articleDetailsReducer,
} from "./model/slice/ArticleDetailsSlice";
import { Article, ArticleView } from "./model/types/article";
import type { ArticleDetailsSchema } from "./model/types/ArticleDetailsSchema";
import { ArticleDetails } from "./ui/ArticleDetails/ArticleDetails";
import { ArticleList } from "./ui/ArticleList/ArticleList";
import { ArticleViewSelector } from "./ui/ArticleViewSelector/ArticleViewSelector";

export {
  Article,
  ArticleDetails,
  fetchArticleById,
  ArticleDetailsSchema,
  articleDetailsActions,
  articleDetailsReducer,
  ArticleView,
  ArticleList,
  ArticleViewSelector,
  getArticleData,
};
