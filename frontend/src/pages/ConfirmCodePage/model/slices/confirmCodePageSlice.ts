import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfirmCodePageSchema } from "../types/confirmCodePageSchema";
import { confirmCodeByEmail } from "../services/confirmCodeByEmail";

const initialState: ConfirmCodePageSchema = {
  enteredCode: undefined,
  isLoading: false,
  error: undefined,
};

export const confirmCodePageSlice = createSlice({
  name: "confirmCodePage",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.enteredCode = action.payload;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmCodeByEmail.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(confirmCodeByEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(confirmCodeByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: confirmCodePageActions } = confirmCodePageSlice;
export const { reducer: confirmCodePageReducer } = confirmCodePageSlice;
