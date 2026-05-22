import { lazy } from "react";

export const ConfirmCodePageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      // @ts-ignore
      {
        setTimeout(() => resolve(import("./ConfirmCodePage")), 400);
      },
    ),
);
