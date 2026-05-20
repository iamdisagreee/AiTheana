import {
  CombinedState,
  configureStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { ExtraArgumentType, StateSchema } from "./StateSchema";
import { counterReducer } from "units/Counter";
import { userReducer } from "units/User";
import { createReducerManager } from "./ReducerManager";
import { $api } from "shared/api/api";
import { NavigateOptions, To } from "react-router-dom";
import { scrollSaveReducer } from "features/ScrollSave";

const staticReducers: ReducersMapObject<StateSchema> = {
  counter: counterReducer,
  userSchema: userReducer,
  scrollSave: scrollSaveReducer,
};

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void,
) => {
  const reducerManager = createReducerManager({
    ...staticReducers,
    ...asyncReducers,
  });

  const extraArgument: ExtraArgumentType = {
    api: $api,
    navigate,
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
