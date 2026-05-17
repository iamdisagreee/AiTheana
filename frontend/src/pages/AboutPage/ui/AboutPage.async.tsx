import { lazy } from "react";

export const AboutPageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      // @ts-ignore
      {
        setTimeout(() => resolve(import("./AboutPage")), 1500);
      },
    ),
);
