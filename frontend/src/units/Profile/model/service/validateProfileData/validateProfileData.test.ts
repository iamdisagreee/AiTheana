import { StateSchema } from "app/providers/StoreProvider";
import { Profile, ValidateProfileErrors } from "../../types/ProfileSchema";
import { validateProfileData } from "./validateProfileData";

const data: Profile = {
  first: "Vova",
  lastname: "Kharitonov",
  age: 22,
  city: "Yaroslavl",
  username: "iamdisagree",
};

describe("validateProfileData", () => {
  test("success", () => {
    const data: Profile = {
      first: "Vova",
      lastname: "Kharitonov",
      age: 22,
      city: "Yaroslavl",
      username: "iamdisagree",
    };

    expect(validateProfileData(data)).toEqual([]);
  });
  test("name error", () => {
    const data: Profile = {
      first: "",
      lastname: "",
      age: 22,
      city: "Yaroslavl",
      username: "iamdisagree",
    };

    expect(validateProfileData(data)).toEqual([
      ValidateProfileErrors.INCORRECT_NAME_ERROR,
    ]);
  });
});
