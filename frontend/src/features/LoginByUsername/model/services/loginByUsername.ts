import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { userActions, UserSchema } from "units/User";

export interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  void,
  LoginByUsernameProps,
  ThunkConfig<string>
>("user/loginByUsername", async (props, thunkApi) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkApi;
  const { username, password } = props;

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

  } catch (e) {
    return rejectWithValue(
      e.response?.data?.detail[0].msg ?? e.response?.data?.detail ?? e.message,
    );
  }
});
