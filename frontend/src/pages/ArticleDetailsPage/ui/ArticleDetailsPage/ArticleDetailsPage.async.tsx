import { lazy } from "react";

export const ArticleDetailsPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      // @ts-ignore
      {
        setTimeout(() => resolve(import("./ArticleDetailsPage")), 400);
      },
    ),
);
