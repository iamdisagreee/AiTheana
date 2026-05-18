import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { Article } from "../../types/article";

export const fetchArticleById = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>("article/fetchArticleById", async (id, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.get<Article>(`/articles/${id}`);

    if (!response.data) {
      throw new Error("Данные не загружены!");
    }

    const article = response.data;

    return article;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
