import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddCommentForArticleSchema } from "../types/AddCommentForArticleSchema";

const initialState: AddCommentForArticleSchema = {
  text: undefined,
  isLoading: undefined,
};

export const addCommentForArticleSlice = createSlice({
  name: "addCommentForArticle",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { actions: addCommentForArticleActions } =
  addCommentForArticleSlice;
export const { reducer: addCommentForArticleReducer } =
  addCommentForArticleSlice;
