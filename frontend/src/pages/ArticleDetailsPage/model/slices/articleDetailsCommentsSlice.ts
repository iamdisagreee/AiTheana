import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Comment } from "units/Comment";
import { ArticleDetailsCommentsSchema } from "../types/ArticleDetailsCommentsSchema";
import { StateSchema } from "app/providers/StoreProvider";
import { fetchCommentByArticleId } from "../services/fetchCommentByArticleId/fetchCommentByArticleId";

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment: Comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
  name: "articleDetailsComments",
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    ids: [],
    entities: {},
    error: undefined,
    isLoading: undefined,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentByArticleId.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchCommentByArticleId.fulfilled, (state, action) => {
        state.isLoading = false;
        commentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCommentByArticleId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleDetailsCommentsActions } =
  articleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice;
