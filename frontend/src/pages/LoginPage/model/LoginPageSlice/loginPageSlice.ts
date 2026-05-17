import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { LoginPageSchema } from "../types/loginPageSchema";
import { StateSchema } from "app/providers/StoreProvider";
import { Login } from "../types/loginPageSchema";

const loginAdapter = createEntityAdapter<Login>({
  selectId: (login: Login) => login.username,
});

export const getLogin = loginAdapter.getSelectors<StateSchema>(
  (state) => state.loginPage || loginAdapter.getInitialState(),
);

const loginPageSlice = createSlice({
  name: "LoginPage",
  initialState: loginAdapter.getInitialState<LoginPageSchema>({
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
  }),
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(.pending, (state) => {
  //       state.isLoading = true;
  //       state.error = undefined;
  //     })
  //     .addCase(.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       templateAdapter.setAll(state, action.payload);
  //     })
  //     .addCase(.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const { actions: LoginPageSliceActions } = loginPageSlice;
export const { reducer: LoginPageSliceReducer } = loginPageSlice;
