import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import {
  getUserAuthData,
  SendCodeUser,
  userActions,
  UserSchema,
} from "units/User";
import { getConfirmCodePageEnteredCode } from "../selectors/confirmCodePageSelectors";

export const confirmCodeByEmail = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("user/confirmCodeByEmail", async (data, thunkApi) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkApi;

  const authData = getUserAuthData(getState());
  const enteredCode = getConfirmCodePageEnteredCode(getState());
  try {
    const response = await extra.api.post<SendCodeUser>(
      "auth/registration/confirm",
      {
        email: authData?.email,
        enteredCode,
      },
    );

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
