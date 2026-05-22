export interface RegistrationPageSchema {
  isLoading?: boolean;
  error?: string;
  username: string;
  passwordFirst: string;
  passwordSecond: string;
}
