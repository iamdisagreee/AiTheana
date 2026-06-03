import { lazy } from "react";

export const MainPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      resolve(import("./MainPage")),
    ),
);
