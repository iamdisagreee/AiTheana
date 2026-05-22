import { lazy } from "react";

export const RegistrationPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      // @ts-ignore
      {
        setTimeout(() => resolve(import("./RegistrationPage")), 400);
      },
    ),
);
