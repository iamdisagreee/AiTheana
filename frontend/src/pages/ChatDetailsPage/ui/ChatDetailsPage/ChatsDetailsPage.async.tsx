import { lazy } from "react";

export const ChatDetailsPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) => {
      resolve(import("./ChatDetailsPage"));
    }),
);
