import { lazy } from "react";

export const RegistrationPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      resolve(import("./RegistrationPage")),
    ),
);
