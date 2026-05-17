import { StateSchema } from "app/providers/StoreProvider";
import { Profile } from "../../types/ProfileSchema";
import { getProfileIsLoading } from "./getProfileIsLoading";

const data: Profile = {
  first: "Vova",
  lastname: "Kharitonov",
  age: 22,
  city: "Yaroslavl",
  username: "iamdisagree",
};

describe("getProfileIsLoading", () => {
  test("all right", () => {
    const initialState: DeepPartial<StateSchema> = {
      profile: { isLoading: true },
    };

    expect(getProfileIsLoading(initialState as StateSchema)).toEqual(true);
  });

  test("empty result", () => {
    const initialState: DeepPartial<StateSchema> = {
      profile: { isLoading: undefined },
    };

    expect(getProfileIsLoading(initialState as StateSchema)).toBeUndefined();
  });
});
