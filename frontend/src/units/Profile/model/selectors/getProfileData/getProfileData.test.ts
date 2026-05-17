import { StateSchema } from "app/providers/StoreProvider";
import { Profile } from "../../types/ProfileSchema";
import { getProfileData } from "./getProfileData";

const data: Profile = {
  first: "Vova",
  lastname: "Kharitonov",
  age: 22,
  city: "Yaroslavl",
  username: "iamdisagree",
};

describe("getProfileData", () => {
  test("all right", () => {
    const initialState: DeepPartial<StateSchema> = { profile: { data } };

    expect(getProfileData(initialState as StateSchema)).toEqual(data);
  });

  test("empty result", () => {
    const initialState: DeepPartial<StateSchema> = {
      profile: { data: undefined },
    };

    expect(getProfileData(initialState as StateSchema)).toBeUndefined();
  });
});
