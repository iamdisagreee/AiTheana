import {
  CombinedState,
  configureStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { ExtraArgumentType, StateSchema } from "./StateSchema";
import { userReducer } from "units/User";
import { createReducerManager } from "./ReducerManager";
import { $api } from "shared/api/api";
import { scrollSaveReducer } from "features/ScrollSave";

const staticReducers: ReducersMapObject<StateSchema> = {
  userSchema: userReducer,
  scrollSave: scrollSaveReducer,
};

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) => {
  const reducerManager = createReducerManager({
    ...staticReducers,
    ...asyncReducers,
  });

  const extraArgument: ExtraArgumentType = {
    api: $api,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument } }),
  });

  //@ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
