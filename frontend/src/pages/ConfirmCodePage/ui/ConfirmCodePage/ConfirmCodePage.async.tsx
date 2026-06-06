import { lazy } from "react";

export const ConfirmCodePageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      resolve(import("./ConfirmCodePage")),
    ),
);
