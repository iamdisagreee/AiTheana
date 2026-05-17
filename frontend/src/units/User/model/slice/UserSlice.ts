import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserSchema } from "../types/UserSchema";
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from "shared/const/const";

const initialState: UserSchema = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      localStorage.setItem(
        ACCESS_TOKEN_LOCALSTORAGE_KEY,
        JSON.stringify(action.payload),
      );
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
      if (user) {
        state.authData = JSON.parse(user);
      }
      state._inited = true;
    },
    logout: (state) => {
      localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
      state.authData = undefined;
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
