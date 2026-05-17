import { createReduxStore, AppDispatch } from "./config/store";
import StoreProvider from "./ui/StoreProvider";
import { StateSchema, ThunkConfig } from "./config/StateSchema";
import { ExtraArgumentType } from "./config/StateSchema";

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  AppDispatch,
  ExtraArgumentType,
  ThunkConfig as ThunkApiConfig,
};
