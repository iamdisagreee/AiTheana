import { StateSchema } from "app/providers/StoreProvider";

export const getArticlCommentseError = (state: StateSchema) =>
  state.articleDetailsPage?.comments.error;
export const getArticleCommentsIsLoading = (state: StateSchema) =>
  state.articleDetailsPage?.comments.isLoading;
