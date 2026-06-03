import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { getArticlesPageInited } from "../../selectors/getArticlesPageSelectors";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { articlesPageActions } from "../../slices/articlesPageSlice/articlesPageSlice";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { SortOrder } from "shared/lib/types/order";
import { ArticleSortField, ArticleType } from "units/Article";

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>("articlesPage/initArticlesPage", async (searchParams, thunkApi) => {
  const { rejectWithValue, dispatch, getState } = thunkApi;

  const inited = getArticlesPageInited(getState());

  try {
    useInitialEffect(() => {
      if (inited) return;

      searchParams.forEach((value, key) => {
        switch (key) {
          case "page":
            dispatch(articlesPageActions.setPage(Number(value)));
            break;
          case "order":
            dispatch(articlesPageActions.setOrder(value as SortOrder));
            break;
          case "sort":
            dispatch(articlesPageActions.setSort(value as ArticleSortField));
            break;
          case "search":
            dispatch(articlesPageActions.setSearch(value));
            break;
          case "type":
            dispatch(articlesPageActions.setType(value as ArticleType));
        }
      });

      // dispatch(articlesPageActions.initState());
      dispatch(fetchArticlesList({ replace: false }));
    });
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
