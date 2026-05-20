import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { User, userActions, UserSchema } from "units/User";
import {
  getLoginPagePassword,
  getLoginPageUsername,
} from "../selectors/getLoginPageSelectors";
import { error } from "console";

export const loginByUsername = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("user/loginByUsername", async (data, thunkApi) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkApi;

  const username = getLoginPageUsername(getState());
  const password = getLoginPagePassword(getState());
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await extra.api.post<UserSchema>("/auth/login", formData);

    if (!response.data) {
      throw new Error("Непредвиденная ошибка!");
    }

    const userSchema = response.data as UserSchema;

    dispatch(userActions.setAuthData(userSchema));

    return extra.navigate?.("/");
  } catch (e) {
    const error = e.response?.data?.detail;
    if (error) return rejectWithValue(error);
    return rejectWithValue(e.message);
  }
});
