import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { Article, ArticleType } from "units/Article";
import {
  getArticlesPageLimit,
  getArticlesPageOrder,
  getArticlesPagePage,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from "../../selectors/getArticlesPageSelectors";
import { useSearchParams } from "react-router-dom";
import { addQueryParams } from "shared/lib/url/addQueryParams";

export interface fetchArticlesListProps {
  replace: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  fetchArticlesListProps,
  ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  const page = getArticlesPagePage(getState()).toString();
  const limit = getArticlesPageLimit(getState());
  const order = getArticlesPageOrder(getState());
  const sort = getArticlesPageSort(getState());
  const search = getArticlesPageSearch(getState());
  const type = getArticlesPageType(getState());

  addQueryParams({ page, order, sort, search, type });

  try {
    const response = await extra.api.get<Article[]>(`/articles`, {
      params: {
        _expand: "user",
        _page: page,
        _limit: limit,
        _order: order,
        _sort: sort,
        q: search,
        type: type !== ArticleType.ALL ? type : undefined,
      },
    });

    if (!response.data) {
      throw new Error("Данные не загружены!");
    }

    const articles = response.data;

    return articles;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
