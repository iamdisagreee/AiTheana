import { UserSchema } from "units/User/model/types/UserSchema";
import { ReducerManager } from "./ReducerManager";
import { EnhancedStore } from "@reduxjs/toolkit";
import { createReduxStore } from "./store";
import { AxiosInstance } from "axios";
import { ScrollSaveSchema } from "features/ScrollSave";
import { RegistrationPageSchema } from "pages/RegistrationPage";
import { ConfirmCodePageSchema } from "pages/ConfirmCodePage";
import { LoginSchema } from "features/LoginByUsername";
import { ChatRequestSchema } from "features/ChatRequest";
import { AddChatSchema } from "features/AddChat";
import { ChatStreamSchema } from "features/ChatStream";
import { EventTimelineSchema } from "features/EventTimeline";

export interface StateSchema {
  userSchema: UserSchema;
  scrollSave: ScrollSaveSchema;
  login?: LoginSchema;
  registrationPage?: RegistrationPageSchema;
  confirmCodePage?: ConfirmCodePageSchema;
  chatRequest?: ChatRequestSchema;
  addChat?: AddChatSchema;
  eventTimeline?: EventTimelineSchema;
  chatStream?: ChatStreamSchema;
}

export type StateSchemaKeys = keyof StateSchema;

export interface ReducerManagerStore extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ExtraArgumentType {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ExtraArgumentType;
  state: StateSchema;
}

export type ReduxStore = ReturnType<typeof createReduxStore>;
