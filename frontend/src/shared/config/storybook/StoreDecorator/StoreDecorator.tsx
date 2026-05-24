import { ReducersMapObject } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { addCommentForArticleReducer } from "features/AddCommentForm";
import { loginReducer } from "features/LoginByUsername";
// import { loginReducer } from "features/AuthByUsername/model/slice/LoginSlice";
import { articleDetailsCommentsReducer } from "pages/ArticleDetailsPage";
import { articlesPageReducer } from "pages/ArticlesPage";
import { BrowserRouter } from "react-router-dom";
import { articleDetailsReducer } from "units/Article";
import { profileReducer } from "units/Profile";

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> =
  {
    login: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    articleDetailsComments: articleDetailsCommentsReducer,
    addCommentForArticle: addCommentForArticleReducer,
    articlesPage: articlesPageReducer,
  };

export const StoreDecorator =
  (
    store: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
  ) =>
  (StoryComponent: Story) => {
    return (
      <BrowserRouter>
        <StoreProvider
          initialState={store}
          asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
        >
          <StoryComponent />
        </StoreProvider>
      </BrowserRouter>
    );
  };
