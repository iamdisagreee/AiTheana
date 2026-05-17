import { createSelector } from "@reduxjs/toolkit";
import { getArticleData } from "units/Article";
import { getUserAuthData } from "units/User";

export const getArticleIsEdit = createSelector(
  [getUserAuthData, getArticleData],
  (user, article) => {
    if (!user || !article) {
      return false;
    }

    return user.id === article.user.id;
  },
);
