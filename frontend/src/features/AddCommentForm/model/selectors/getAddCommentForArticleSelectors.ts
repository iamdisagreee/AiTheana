import { StateSchema } from "app/providers/StoreProvider";

export const getAddCommentForArticleText = (state: StateSchema) =>
  state.addCommentForArticle?.text;

export const getAddCommentForArticleIsLoading = (state: StateSchema) =>
  state.addCommentForArticle?.isLoading;
