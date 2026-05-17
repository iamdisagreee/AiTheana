import { createSlice } from "@reduxjs/toolkit";
import { ArticleDetailsSchema } from "../types/ArticleDetailsSchema";
import { fetchArticleById } from "../services/fetchArticleById/fetchArticleById";

const initialState: ArticleDetailsSchema = {
  isLoading: true,
  data: undefined,
  error: undefined,
};

export const ArticleDetailsSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleDetailsActions } = ArticleDetailsSlice;
export const { reducer: articleDetailsReducer } = ArticleDetailsSlice;
