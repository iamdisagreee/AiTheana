import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { Article } from "units/Article";

export const fetchArticleRecommends = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>("articleDetailsRecommendations/fetchArticleComments", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Article[]>(`/articles`, {
      params: {
        _limit: 4,
      },
    });

    if (!response.data) {
      throw new Error("Данные не загружены!");
    }

    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
