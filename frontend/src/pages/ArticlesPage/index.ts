import { articlesPageReducer } from "./model/slices/articlesPageSlice/articlesPageSlice";
import { ArticlesPageSchema } from "./model/types/articlesPageSchema";
import { ArticlesPageAsync } from "./ui/ArticlesPage/ArticlesPage.async";

export {
  ArticlesPageAsync,
  ArticlesPageAsync as ArticlesPage,
  articlesPageReducer,
  ArticlesPageSchema,
};
