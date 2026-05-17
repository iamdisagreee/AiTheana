import { combineReducers } from "@reduxjs/toolkit";
import { ArticleDeailsPageSchema } from "../types/articleDetailsPage";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice/articleDetailsCommentsSlice";
import { articleDetailsRecommendationsReducer } from "./ArticleDetailsRecommendationsSlice/articleDetailsRecommendationsSliceSlice";

export const articleDetailsPageReducers =
  combineReducers<ArticleDeailsPageSchema>({
    comments: articleDetailsCommentsReducer,
    recommends: articleDetailsRecommendationsReducer,
  });
