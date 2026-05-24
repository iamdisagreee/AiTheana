import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { SendCodeUser, User, userActions, UserSchema } from "units/User";

import {
  getRegistrationPagePasswordFirst,
  getRegistrationPageUsername,
} from "../selectors/getRegistrationPageSelectors";

export const sendCodeByEmail = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("user/sendCodeByEmail", async (data, thunkApi) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkApi;

  const username = getRegistrationPageUsername(getState());
  const password = getRegistrationPagePasswordFirst(getState());
  try {
    const response = await extra.api.post<SendCodeUser>(
      "auth/registration/request",
      {
        email: username,
        password,
      },
    );

    if (!response.data) {
      throw new Error("Непредвиденная ошибка!");
    }

    const userSchema: UserSchema = { user: { email: username } };

    dispatch(userActions.setAuthData(userSchema));

    // return extra.navigate?.("/confirm-code");
  } catch (e) {
    return rejectWithValue(
      e.response?.data?.detail[0].msg ?? e.response?.data?.detail ?? e.message,
    );
  }
});
