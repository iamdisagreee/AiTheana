import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleSortSelector.module.scss";
import { memo, useMemo } from "react";
import { SortOrder } from "shared/lib/types/order";
import Select, { SelectOption } from "shared/ui/Select/Select";
import { useTranslation } from "react-i18next";
import { Card } from "shared/ui/Card/Card";
import Input from "shared/ui/Input/Input";
import { ArticleSortField } from "units/Article";

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeSort: (value: ArticleSortField) => void;
  onChangeOrder: (value: SortOrder) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, sort, order, onChangeSort, onChangeOrder } = props;
  const { t } = useTranslation();

  const sortOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t("дате"),
      },
      {
        value: ArticleSortField.TITLE,
        content: t("заголовку"),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t("просмотрам"),
      },
    ],
    [t],
  );

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: SortOrder.ASC,
        content: t("возрастанию"),
      },
      {
        value: SortOrder.DESC,
        content: t("убыванию"),
      },
    ],
    [t],
  );

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <div className={cls.selects}>
        <Select
          placeholder={t("Сортировать ПО")}
          options={sortOptions}
          value={sort}
          onChange={onChangeSort}
        />
        <Select
          placeholder={t("Упорядочить ПО")}
          options={orderOptions}
          value={order}
          onChange={onChangeOrder}
        />
      </div>
    </div>
  );
});
