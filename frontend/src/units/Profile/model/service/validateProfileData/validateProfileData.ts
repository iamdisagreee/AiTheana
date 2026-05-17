import { Profile, ValidateProfileErrors } from "../../types/ProfileSchema";

export const validateProfileData = (profile?: Profile) => {
  const errors: ValidateProfileErrors[] = [];

  if (!profile) {
    return [ValidateProfileErrors.NO_DATA_ERROR];
  }

  if (!profile.first || !profile.lastname)
    errors.push(ValidateProfileErrors.INCORRECT_NAME_ERROR);

  if (!profile.age || !Number.isInteger(profile.age))
    errors.push(ValidateProfileErrors.INCORRECT_AGE_ERROR);

  if (!profile.city) errors.push(ValidateProfileErrors.INCORRECT_CITY_ERROR);

  return errors;
};
