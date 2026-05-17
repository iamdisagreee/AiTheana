import { lazy } from "react";

export const ArticleEditPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      // @ts-ignore
      {
        setTimeout(() => resolve(import("./ArticleEditPage")), 400);
      },
    ),
);
