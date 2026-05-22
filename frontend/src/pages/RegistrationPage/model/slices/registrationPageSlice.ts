import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegistrationPageSchema } from "../types/registrationPageSchema";
import { sendCodeByEmail } from "../services/sendCodeByEmail";

const initialState: RegistrationPageSchema = {
  username: "",
  passwordFirst: "",
  passwordSecond: "",
  isLoading: false,
  error: undefined,
};

export const registrationPageSlice = createSlice({
  name: "registrationPage",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPasswordFirst: (state, action: PayloadAction<string>) => {
      state.passwordFirst = action.payload;
    },
    setPasswordSecond: (state, action: PayloadAction<string>) => {
      state.passwordSecond = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCodeByEmail.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(sendCodeByEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendCodeByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: registrationPageActions } = registrationPageSlice;
export const { reducer: registrationPageReducer } = registrationPageSlice;
