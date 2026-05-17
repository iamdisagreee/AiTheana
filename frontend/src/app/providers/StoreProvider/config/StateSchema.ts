import { CounterSchema } from "units/Counter";
import { UserSchema } from "units/User/model/types/UserSchema";
import { LoginSchema } from "features/AuthByUsername";
import { ReducerManager } from "./ReducerManager";
import { EnhancedStore } from "@reduxjs/toolkit";
import { createReduxStore } from "./store";
import { ProfileSchema } from "units/Profile";
import { AxiosInstance } from "axios";
import { NavigateOptions, To } from "react-router-dom";
import { ArticleDetailsSchema } from "units/Article";
import {
  AddCommentForArticleSchema,
  ArticleDeailsPageSchema,
} from "pages/ArticleDetailsPage";
import { ArticlesPageSchema } from "pages/ArticlesPage";
import { ScrollSaveSchema } from "features/ScrollSave";
import { LoginPageSchema } from "pages/LoginPage/model/types/loginPageSchema";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  scrollSave: ScrollSaveSchema;

  //async
  login?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  addCommentForArticle?: AddCommentForArticleSchema;
  articlesPage?: ArticlesPageSchema;
  articleDetailsPage?: ArticleDeailsPageSchema;

  //diplom
  loginPage?: LoginPageSchema;
}

export type StateSchemaKeys = keyof StateSchema;

export interface ReducerManagerStore extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ExtraArgumentType {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ExtraArgumentType;
  state: StateSchema;
}

export type ReduxStore = ReturnType<typeof createReduxStore>;
