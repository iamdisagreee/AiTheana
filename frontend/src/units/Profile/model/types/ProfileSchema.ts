import { Country } from "units/Country";
import { Currency } from "units/Currency";

export enum ValidateProfileErrors {
  INCORRECT_NAME_ERROR = "INCORRECT_NAME_ERROR",
  INCORRECT_AGE_ERROR = "INCORRECT_AGE_ERROR",
  INCORRECT_CITY_ERROR = "INCORRECT_CITY_ERROR",
  NO_DATA_ERROR = "NO_DATA_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
}

export interface Profile {
  id?: string;
  first?: string;
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}

export interface ProfileSchema {
  data?: Profile;
  formData?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateErrors?: ValidateProfileErrors[];
}
