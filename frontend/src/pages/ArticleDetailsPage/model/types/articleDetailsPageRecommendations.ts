import { EntityState } from "@reduxjs/toolkit";
import { Article } from "units/Article";

export interface ArticleDetailsRecommendationsSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
}
