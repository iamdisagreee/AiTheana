import { EntityState } from "@reduxjs/toolkit";

export interface Login {
  username: string;
  password: string;
}

export interface LoginPageSchema extends EntityState<Login> {
  isLoading?: boolean;
  error?: string;
}
