import { EntityState } from "@reduxjs/toolkit";

export interface LoginPageSchema {
  isLoading?: boolean;
  error?: string;
  username: string;
  password: string;
}
