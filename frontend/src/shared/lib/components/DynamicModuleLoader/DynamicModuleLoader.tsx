import React, { FC, useEffect } from "react";
import { Reducer } from "@reduxjs/toolkit";
import { useDispatch, useStore } from "react-redux";
import {
  ReducerManagerStore,
  ReduxStore,
  StateSchemaKeys,
} from "app/providers/StoreProvider/config/StateSchema";

export type ReducersList = {
  [name in StateSchemaKeys]?: Reducer;
};

export type ReducersListEntry = [StateSchemaKeys, Reducer];

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const { children, reducers, removeAfterUnmount = true } = props;

  const store = useStore() as ReducerManagerStore;
  const dispatch = useDispatch();

  useEffect(() => {
    const initializedReducers = store.reducerManager.getReducerMap();

    Object.entries(reducers).forEach(([name, reducer]) => {
      if (!initializedReducers[name as StateSchemaKeys]) {
        store.reducerManager.add(name as StateSchemaKeys, reducer);
        dispatch({ type: `@INIT GOGO ${name}` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, _]) => {
          store.reducerManager.remove(name as StateSchemaKeys);
          dispatch({ type: `@END ${name}` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
};

export default DynamicModuleLoader;
