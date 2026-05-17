import { lazy } from "react";

export const ArticlesPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      // @ts-ignore
      {
        setTimeout(() => resolve(import("./ArticlesPage")), 400);
      },
    ),
);
