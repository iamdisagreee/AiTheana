import { lazy } from "react";

export const LoginFormAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      // @ts-ignore
      {
        setTimeout(() => resolve(import("./LoginForm")), 1500);
      },
    ),
);
