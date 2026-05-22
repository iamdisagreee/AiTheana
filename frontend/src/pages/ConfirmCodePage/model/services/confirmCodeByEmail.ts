import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import {
  getRegistrationPagePasswordFirst,
  getRegistrationPageUsername,
} from "pages/RegistrationPage";
import { SendCodeUser, User, userActions, UserSchema } from "units/User";
import { getConfirmCodePageEnteredCode } from "../selectors/confirmCodePageSelectors";

export const confirmCodeByEmail = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("user/confirmCodeByEmail", async (data, thunkApi) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkApi;

  const email = getRegistrationPageUsername(getState());
  const password = getRegistrationPagePasswordFirst(getState());
  const enteredCode = getConfirmCodePageEnteredCode(getState());
  try {
    const response = await extra.api.post<SendCodeUser>(
      "auth/registration/confirm",
      {
        email,
        password,
        enteredCode,
      },
    );

    if (!response.data) {
      throw new Error("Непредвиденная ошибка!");
    }

    return extra.navigate?.("/");
  } catch (e) {
    return rejectWithValue(
      e.response?.data?.detail[0].msg ?? e.response?.data?.detail ?? e.message,
    );
  }
});
