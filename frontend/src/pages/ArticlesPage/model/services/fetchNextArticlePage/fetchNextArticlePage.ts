import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPagePage,
} from "../../selectors/getArticlesPageSelectors";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { articlesPageActions } from "../../slices/articlesPageSlice/articlesPageSlice";

export const fetchNextArticlePage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("articlesPage/fetchNextArticlePage", async (_, thunkApi) => {
  const { rejectWithValue, dispatch, getState } = thunkApi;

  const isLoading = getArticlesPageIsLoading(getState());
  const hasMore = getArticlesPageHasMore(getState());
  const nextPage = getArticlesPagePage(getState()) + 1;
  try {
    if (!isLoading && hasMore) {
      dispatch(fetchArticlesList(nextPage));
      dispatch(articlesPageActions.setPage(nextPage));
    }
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
