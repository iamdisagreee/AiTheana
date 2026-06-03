import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import {
  chatRequestActions,
  fetchChats,
  getSidebarInited,
} from "features/ChatRequest";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";

export const initChats = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>("chats/initChats", async (searchParams, thunkApi) => {
  const { rejectWithValue, dispatch, getState } = thunkApi;

  const inited = getSidebarInited(getState());
  try {
    useInitialEffect(() => {
      if (inited) return;
      searchParams.forEach((value, key) => {
        switch (key) {
          case "search":
            dispatch(chatRequestActions.setSidebarSearch(value));
            break;
        }
      });
      const search = searchParams.get("search") ?? "";
      dispatch(fetchChats({ search, replace: true }));
      dispatch(chatRequestActions.initSidebarState());
    });
  } catch (e) {
    console.log(e);
    return rejectWithValue(e.message);
  }
});
