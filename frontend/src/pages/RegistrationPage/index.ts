import { RegistrationPageAsync as RegistrationPage } from "./ui/RegistrationPage/RegistrationPage.async";
import { RegistrationPageSchema } from "./model/types/registrationPageSchema";
import {
  getRegistrationPageUsername,
  getRegistrationPagePasswordFirst,
  getRegistrationPagePasswordSecond,
} from "./model/selectors/getRegistrationPageSelectors";

export {
  RegistrationPage,
  RegistrationPageSchema,
  getRegistrationPageUsername,
  getRegistrationPagePasswordFirst,
  getRegistrationPagePasswordSecond,
};
