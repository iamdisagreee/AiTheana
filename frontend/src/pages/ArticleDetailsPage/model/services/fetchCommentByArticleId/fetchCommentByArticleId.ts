import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { Comment } from "units/Comment";

export const fetchCommentByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>("articleComments/fetchCommentByArticleId", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  if (!articleId) {
    return rejectWithValue("error");
  }

  try {
    const response = await extra.api.get<Comment[]>(`/comments`, {
      params: {
        articleId,
        _expand: "user",
      },
    });

    if (!response.data) {
      throw new Error("Данные не загружены!");
    }

    const comments = response.data;

    return comments;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
