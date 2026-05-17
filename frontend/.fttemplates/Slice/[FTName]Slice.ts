import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { [withoutSlice || capitalize]Schema } from "../../types/<withoutSlice || capitalize>Schema";
import { StateSchema } from "app/providers/StoreProvider";

const [baseName]Adapter = createEntityAdapter<[baseName || capitalize]>({
  selectId: ([baseName]: [baseName || capitalize]) => [baseName].id,
});

export const get[baseName || capitalize] = [baseName]Adapter.getSelectors<StateSchema>(
  (state) => state.[withoutSlice] || [baseName]Adapter.getInitialState(),
);

const [FTName] = createSlice({
  name: "[withoutSlice]",
  initialState: [baseName]Adapter.getInitialState<[withoutSlice || capitalize]Schema>({
    ids: [],
    entities: {},
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

export const { actions: <FTName>Actions } = [FTName];
export const { reducer: <FTName>Reducer } = [FTName];