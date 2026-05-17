import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk";
import { Profile } from "../../types/ProfileSchema";
import { updateProfileData } from "./updateProfileData";
import { StateSchema } from "app/providers/StoreProvider";

const data: Profile = {
  first: "Vova",
  lastname: "Kharitonov",
  age: 22,
  city: "Yaroslavl",
  username: "iamdisagree",
};

describe("fetchProfileData", () => {
  test("200", async () => {
    const initialState: DeepPartial<StateSchema> = {
      profile: { formData: data },
    };

    const testAsyncThunk = new TestAsyncThunk(updateProfileData, initialState);

    testAsyncThunk.api.put.mockReturnValue(
      Promise.resolve({
        data,
      }),
    );

    const result = await testAsyncThunk.callThunk();

    expect(testAsyncThunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("error", async () => {
    const initialState: DeepPartial<StateSchema> = {
      profile: { formData: data },
    };
    const testAsyncThunk = new TestAsyncThunk(updateProfileData, initialState);
    testAsyncThunk.api.put.mockReturnValue(Promise.resolve({ error: "403" }));

    const result = await testAsyncThunk.callThunk();

    expect(testAsyncThunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
  });
});
