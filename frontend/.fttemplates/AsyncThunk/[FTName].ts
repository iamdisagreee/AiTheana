import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";

export const [FTName] = createAsyncThunk<
  [outputType],
  void,
  ThunkConfig<string>
>(".../[FTName]", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<[outputType]>(`/`, {});

    if (!response.data) {
      throw new Error("Данные не загружены!");
    }

    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
