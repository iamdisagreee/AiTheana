import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

export const getScrollSaveScroll = (state: StateSchema) => {
  return state.scrollSave.scroll;
};

export const getScrollSaveBypath = createSelector(
  [
    (state: StateSchema) => state.scrollSave,
    (state: StateSchema, path: string) => path,
  ],
  (scrollSave, category) => scrollSave.scroll[category],
);
