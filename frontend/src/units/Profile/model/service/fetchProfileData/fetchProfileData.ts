import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExtraArgumentType } from "app/providers/StoreProvider";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { User, userActions } from "units/User";
import { Profile, ValidateProfileErrors } from "../../types/ProfileSchema";

export const fetchProfileData = createAsyncThunk<
  Profile,
  string | undefined,
  ThunkConfig<string>
>("profile/fetchProfileData", async (id, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  if (!id) {
    throw new Error("error");
  }

  try {
    const response = await extra.api.get<Profile>(`/profile/${id}`);

    if (!response.data) {
      throw new Error("Данные не загружены!");
    }

    const profile = response.data;

    return profile;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
