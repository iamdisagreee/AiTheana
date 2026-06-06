import { lazy } from "react";

export const ChatsPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      resolve(import("./ChatsPage")),
    ),
);
