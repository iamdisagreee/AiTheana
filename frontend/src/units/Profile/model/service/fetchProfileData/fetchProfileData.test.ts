import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk";
import { fetchProfileData } from "./fetchProfileData";
import { Profile } from "../../types/ProfileSchema";

const data: Profile = {
  id: "1",
  first: "Vova",
  lastname: "Kharitonov",
  age: 22,
  city: "Yaroslavl",
  username: "iamdisagree",
};

describe("fetchProfileData", () => {
  test("200", async () => {
    const testAsyncThunk = new TestAsyncThunk(fetchProfileData);

    testAsyncThunk.api.get.mockReturnValue(
      Promise.resolve({
        data,
      }),
    );

    const result = await testAsyncThunk.callThunk();

    expect(testAsyncThunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("empty result", async () => {
    const testAsyncThunk = new TestAsyncThunk(fetchProfileData);
    testAsyncThunk.api.get.mockReturnValue(Promise.resolve({}));

    const result = await testAsyncThunk.callThunk();

    expect(testAsyncThunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
  });
});
