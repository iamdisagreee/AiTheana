import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { Profile, ValidateProfileErrors } from "../../types/ProfileSchema";
import { getProfileFormData } from "../../selectors/getProfileFormData/getProfileFormData";
import { validateProfileData } from "../validateProfileData/validateProfileData";

export const updateProfileData = createAsyncThunk<
  Profile,
  string | undefined,
  ThunkConfig<ValidateProfileErrors[]>
>("profile/updateProfileData", async (id, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  const formData = getProfileFormData(getState());

  const validateErrors = validateProfileData(formData);

  if (validateErrors.length) {
    return rejectWithValue(validateErrors);
  }

  try {
    if (!id) {
      throw new Error("error");
    }

    const response = await extra.api.put<Profile>(`/profile/${id}`, formData);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
