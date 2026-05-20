import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { User, userActions } from "units/User";

export interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>("user/loginByUsername", async (data, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.post<User>("/login", data);

    if (!response.data) {
      throw new Error("Неправильный логин или пароль!");
    }

    const user = response.data as User;

    // dispatch(userActions.setAuthData(user));

    // extra.navigate?.("/profile");

    return user;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
