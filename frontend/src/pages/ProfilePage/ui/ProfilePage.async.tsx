import { lazy } from "react";

export const ProfilePageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      // @ts-ignore
      {
        setTimeout(() => resolve(import("./ProfilePage")), 1500);
      },
    ),
);
