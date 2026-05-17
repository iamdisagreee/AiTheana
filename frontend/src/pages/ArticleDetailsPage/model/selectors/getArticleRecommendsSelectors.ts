import { StateSchema } from "app/providers/StoreProvider";

export const getArticlRecommendsError = (state: StateSchema) =>
  state.articleDetailsPage?.recommends.error;
export const getArticleRecommendsIsLoading = (state: StateSchema) =>
  state.articleDetailsPage?.recommends.isLoading;
