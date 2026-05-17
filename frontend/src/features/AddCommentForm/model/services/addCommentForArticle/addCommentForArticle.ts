import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { Comment } from "units/Comment";
import { getAddCommentForArticleText } from "../../../../../features/AddCommentForm/model/selectors/getAddCommentForArticleSelectors";
import { getUserAuthData } from "units/User";
import { addCommentForArticleActions } from "../../../../../features/AddCommentForm/model/slices/addCommentForArticleSlice";
import { getArticleData } from "units/Article/model/selectors/getArticleSelectors";

export const addCommentForArticle = createAsyncThunk<
  Comment,
  void,
  ThunkConfig<string>
>("articleComments/fetchCommentByArticleId", async (articleId, thunkApi) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkApi;

  const text = getAddCommentForArticleText(getState());
  const user = getUserAuthData(getState());
  const article = getArticleData(getState());

  if (!user) {
    return rejectWithValue("error");
  }

  try {
    const response = await extra.api.post<Comment>(`/comments`, {
      text: text,
      userId: user.id,
      articleId: article?.id,
    });

    if (!response.data) {
      throw new Error("Данные не загружены!");
    }

    const comment = response.data;

    dispatch(addCommentForArticleActions.setText(""));
    // dispatch(fetchCommentByArticleId(articleId));

    return comment;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
