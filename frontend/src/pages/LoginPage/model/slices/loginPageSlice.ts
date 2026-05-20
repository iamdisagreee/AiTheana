import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPageSchema } from "../types/loginPageSchema";
import { loginByUsername } from "../services/loginByUsername";

const initialState: LoginPageSchema = {
  username: "",
  password: "",
  isLoading: false,
  error: undefined,
};

export const loginPageSlice = createSlice({
  name: "loginPage",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: loginPageActions } = loginPageSlice;
export const { reducer: loginPageReducer } = loginPageSlice;
