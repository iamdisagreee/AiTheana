import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserSchema } from "../types/UserSchema";
import {
  ACCESS_TOKEN_LOCALSTORAGE_KEY,
  USER_LOCALSTORAGE_KEY,
} from "shared/const/const";

const initialState: UserSchema = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<UserSchema>) => {
      state.user = action.payload.user;
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(state.user));
      localStorage.setItem(
        ACCESS_TOKEN_LOCALSTORAGE_KEY,
        JSON.stringify(action.payload.access_token),
      );
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        state.user = JSON.parse(user);
      }
      state._inited = true;
    },
    logout: (state) => {
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
      state.user = undefined;
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
