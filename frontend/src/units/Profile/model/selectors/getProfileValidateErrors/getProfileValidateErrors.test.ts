import { StateSchema } from "app/providers/StoreProvider";
import { Profile, ValidateProfileErrors } from "../../types/ProfileSchema";
import { getProfileValidateErrors } from "./getProfileValidateErrors";

const data: Profile = {
  first: "Vova",
  lastname: "Kharitonov",
  age: 22,
  city: "Yaroslavl",
  username: "iamdisagree",
};

const errors = [ValidateProfileErrors.INCORRECT_AGE_ERROR];

describe("getProfileValidateErrors", () => {
  test("with errors", () => {
    const initialState: DeepPartial<StateSchema> = {
      profile: { validateErrors: [ValidateProfileErrors.INCORRECT_AGE_ERROR] },
    };

    expect(getProfileValidateErrors(initialState as StateSchema)).toEqual(
      errors,
    );
  });

  test("empty result", () => {
    const initialState: DeepPartial<StateSchema> = {
      profile: { formData: undefined },
    };

    expect(
      getProfileValidateErrors(initialState as StateSchema),
    ).toBeUndefined();
  });
});
