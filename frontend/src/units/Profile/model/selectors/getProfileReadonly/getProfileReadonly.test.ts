import { StateSchema } from "app/providers/StoreProvider";
import { Profile } from "../../types/ProfileSchema";
import { getProfileReadonly } from "./getProfileReadonly";

const data: Profile = {
  first: "Vova",
  lastname: "Kharitonov",
  age: 22,
  city: "Yaroslavl",
  username: "iamdisagree",
};

describe("getProfileReadonly", () => {
  test("all right", () => {
    const initialState: DeepPartial<StateSchema> = {
      profile: { readonly: true },
    };

    expect(getProfileReadonly(initialState as StateSchema)).toEqual(true);
  });

  test("empty result", () => {
    const initialState: DeepPartial<StateSchema> = {
      profile: { formData: undefined },
    };

    expect(getProfileReadonly(initialState as StateSchema)).toBeUndefined();
  });
});
