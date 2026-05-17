import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import {
  getArticlesPageInited,
  getArticlesPagePage,
} from "../../selectors/getArticlesPageSelectors";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { articlesPageActions } from "../../slices/articlesPageSlice/articlesPageSlice";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";

export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("articlesPage/initArticlesPage", async (_, thunkApi) => {
  const { rejectWithValue, dispatch, getState } = thunkApi;

  const page = getArticlesPagePage(getState());
  const inited = getArticlesPageInited(getState());
  try {
    useInitialEffect(() => {
      if (!inited) {
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList(page));
      }
    });
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
