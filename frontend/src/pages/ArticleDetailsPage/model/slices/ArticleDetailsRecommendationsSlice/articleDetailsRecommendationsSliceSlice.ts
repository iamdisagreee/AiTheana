import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Article } from "units/Article";
import { ArticleDetailsRecommendationsSchema } from "../../types/articleDetailsPageRecommendations";
import { fetchArticleRecommends } from "../../services/fetchArticleRecommends/fetchArticleRecommends";

const recommendAdapter = createEntityAdapter<Article>({
  selectId: (recommendation: Article) => recommendation.id,
});

export const getArticleRecommendations =
  recommendAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articleDetailsPage?.recommends ||
      recommendAdapter.getInitialState(),
  );

const articleDetailsRecommendationsSlice = createSlice({
  name: "articleDetailsRecommendations",
  initialState:
    recommendAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
      ids: [],
      entities: {},
      isLoading: true,
      error: undefined,
    }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommends.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchArticleRecommends.fulfilled, (state, action) => {
        state.isLoading = false;
        recommendAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleDetailsRecommendationsActions } =
  articleDetailsRecommendationsSlice;
export const { reducer: articleDetailsRecommendationsReducer } =
  articleDetailsRecommendationsSlice;
