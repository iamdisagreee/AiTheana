import { lazy } from "react";

export const MainPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      // @ts-ignore
      {
        setTimeout(() => resolve(import("./MainPage")), 1500);
      },
    ),
);
