import { format } from "date-fns/format";
import { ru } from "date-fns/locale/ru";

export const prettyTime = (isoString: string, mask: string): string => {
  const date = new Date(isoString);

  const prettyDate = format(date, mask, { locale: ru });

  return prettyDate;
};
