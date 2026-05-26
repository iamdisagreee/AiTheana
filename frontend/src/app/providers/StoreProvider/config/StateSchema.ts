import { CounterSchema } from "units/Counter";
import { UserSchema } from "units/User/model/types/UserSchema";
import { ReducerManager } from "./ReducerManager";
import { EnhancedStore } from "@reduxjs/toolkit";
import { createReduxStore } from "./store";
import { ProfileSchema } from "units/Profile";
import { AxiosInstance } from "axios";
import { NavigateOptions, To } from "react-router-dom";
import { ArticleDetailsSchema } from "units/Article";
import {
  AddCommentForArticleSchema,
  ArticleDetailsCommentsSchema,
} from "pages/ArticleDetailsPage";
import { ArticlesPageSchema } from "pages/ArticlesPage";
import { ScrollSaveSchema } from "features/ScrollSave";
import { RegistrationPageSchema } from "pages/RegistrationPage";
import { ConfirmCodePageSchema } from "pages/ConfirmCodePage";
import { LoginSchema } from "features/LoginByUsername";
import { ChatRequestSchema } from "features/ChatRequest";

export interface StateSchema {
  counter: CounterSchema;
  userSchema: UserSchema;
  scrollSave: ScrollSaveSchema;

  //async
  // login?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentsSchema;
  addCommentForArticle?: AddCommentForArticleSchema;
  articlesPage?: ArticlesPageSchema;
  //diplom
  login?: LoginSchema;
  registrationPage?: RegistrationPageSchema;
  confirmCodePage?: ConfirmCodePageSchema;
  chatRequest?: ChatRequestSchema;
}

export type StateSchemaKeys = keyof StateSchema;

export interface ReducerManagerStore extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ExtraArgumentType {
  api: AxiosInstance;
  // navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ExtraArgumentType;
  state: StateSchema;
}

export type ReduxStore = ReturnType<typeof createReduxStore>;
