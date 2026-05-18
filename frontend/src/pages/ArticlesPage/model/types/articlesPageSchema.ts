import { EntityState } from "@reduxjs/toolkit";
import { SortOrder } from "shared/lib/types/order";
import {
  Article,
  ArticleSortField,
  ArticleType,
  ArticleView,
} from "units/Article";

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
  view: ArticleView;
  page?: number;
  limit: number;
  hasMore?: boolean;
  order?: SortOrder;
  sort?: ArticleSortField;
  search?: string;
  type?: ArticleType;

  _inited: boolean;
}
