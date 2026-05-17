import { lazy } from "react";

export const LoginPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      // @ts-ignore
      {
        setTimeout(() => resolve(import("./LoginPage")), 400);
      },
    ),
);
