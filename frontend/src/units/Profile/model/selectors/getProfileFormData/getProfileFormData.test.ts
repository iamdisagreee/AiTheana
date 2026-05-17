import { StateSchema } from "app/providers/StoreProvider";
import { Profile } from "../../types/ProfileSchema";
import { getProfileFormData } from "./getProfileFormData";

const data: Profile = {
  first: "Vova",
  lastname: "Kharitonov",
  age: 22,
  city: "Yaroslavl",
  username: "iamdisagree",
};

describe("getProfileFormData", () => {
  test("all right", () => {
    const initialState: DeepPartial<StateSchema> = {
      profile: { formData: data },
    };

    expect(getProfileFormData(initialState as StateSchema)).toEqual(data);
  });

  test("empty result", () => {
    const initialState: DeepPartial<StateSchema> = {
      profile: { formData: undefined },
    };

    expect(getProfileFormData(initialState as StateSchema)).toBeUndefined();
  });
});
