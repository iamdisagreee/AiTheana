import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPageSchema } from "../model/types/loginPageSchema";

const initialState: LoginPageSchema = {
  error: undefined,
  isLoading: false,
  username: "",
  password: "",
};

export const loginPageSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  // extraReducers: (builder) => {},
});

export const { actions: loginActions } = loginPageSlice;
export const { reducer: loginReducer } = loginPageSlice;
