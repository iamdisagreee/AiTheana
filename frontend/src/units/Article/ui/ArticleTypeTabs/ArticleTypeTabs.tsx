import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleTypeTabs.module.scss";
import { memo, useMemo } from "react";
import { TabItem, Tabs } from "shared/ui/Tabs/Tabs";
import { ArticleType } from "../../model/types/article";
import { useTranslation } from "react-i18next";

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (value: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation();

  const tabs = useMemo<TabItem<ArticleType>[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t("Все"),
      },
      {
        value: ArticleType.IT,
        content: t("IT"),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t("Экономика"),
      },
      {
        value: ArticleType.SCIENCE,
        content: t("Наука"),
      },
    ],
    [t],
  );

  return (
    <div className={classNames(cls.ArticleTypeTabs, {}, [className])}>
      <Tabs tabs={tabs} value={value} onTabClick={onChangeType}></Tabs>
    </div>
  );
});
