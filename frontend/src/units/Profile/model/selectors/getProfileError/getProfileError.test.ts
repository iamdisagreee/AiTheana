import { StateSchema } from "app/providers/StoreProvider";
import { Profile } from "../../types/ProfileSchema";
import { getProfileError } from "./getProfileError";

const data: Profile = {
  first: "Vova",
  lastname: "Kharitonov",
  age: 22,
  city: "Yaroslavl",
  username: "iamdisagree",
};

describe("getProfileError", () => {
  test("all right", () => {
    const error = "Something went wrong...";
    const initialState: DeepPartial<StateSchema> = {
      profile: { error },
    };

    expect(getProfileError(initialState as StateSchema)).toEqual(error);
  });

  test("empty result", () => {
    const initialState: DeepPartial<StateSchema> = {
      profile: { error: undefined },
    };

    expect(getProfileError(initialState as StateSchema)).toBeUndefined();
  });
});
