import { lazy } from "react";

export const ChatDetailsPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      // @ts-ignore
      {
        setTimeout(() => resolve(import("./ChatDetailsPage")), 400);
      },
    ),
);
