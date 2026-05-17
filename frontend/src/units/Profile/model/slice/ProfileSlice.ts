import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, ProfileSchema } from "../types/ProfileSchema";
import { fetchProfileData } from "../service/fetchProfileData/fetchProfileData";
import { updateProfileData } from "../service/updateProfileData/updateProfileData";

const initialState: ProfileSchema = {
  isLoading: true,
  readonly: true,
  error: undefined,
  validateErrors: undefined,
  data: undefined,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    onChange: (state) => {
      state.readonly = false;
    },
    onCancel: (state) => {
      state.readonly = true;
      state.formData = state.data;
    },
    updateData: (state, action: PayloadAction<Profile>) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
      state.validateErrors = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.formData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileData.pending, (state) => {
        state.isLoading = true;
        state.readonly = true;
        state.error = undefined;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.formData = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload;
      });
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
