import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { Article } from "units/Article";
import { getArticlesPageLimit } from "../../selectors/getArticlesPageSelectors";

export const fetchArticlesList = createAsyncThunk<
  Article[],
  number,
  ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (page, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  const limit = getArticlesPageLimit(getState());

  try {
    const response = await extra.api.get<Article[]>(`/articles`, {
      params: {
        _expand: "user",
        _page: page,
        _limit: limit,
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
