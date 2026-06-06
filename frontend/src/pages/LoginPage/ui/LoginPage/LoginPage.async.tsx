import { lazy } from "react";

export const LoginPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      resolve(import("./LoginPage")),
    ),
);
