// key - путь до страницы
// value - позиция на странице
export type ScrollSave = Record<string, number>;

export interface ScrollSaveSchema {
  scroll: ScrollSave;
}
