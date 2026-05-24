import { lazy } from "react";

export const ChatsPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      // @ts-ignore
      {
        setTimeout(() => resolve(import("./ChatsPage")), 400);
      },
    ),
);
