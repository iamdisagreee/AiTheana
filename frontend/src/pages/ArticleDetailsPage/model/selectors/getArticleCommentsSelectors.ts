import { StateSchema } from "app/providers/StoreProvider";

export const getArticlCommentseError = (state: StateSchema) =>
  state.articleDetailsComments?.error;
export const getArticleCommentsIsLoading = (state: StateSchema) =>
  state.articleDetailsComments?.isLoading;
