import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Tabs.module.scss";
import { Card, CardTheme } from "shared/ui/Card/Card";

export interface TabItem<T> {
  value: T;
  content: string;
}

interface TabsProps<T extends string> {
  className?: string;
  tabs: TabItem<T>[];
  value: T;
  onTabClick: (value: T) => void;
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const { className, tabs, value, onTabClick } = props;

  const handleTabClick = (value: T) => () => {
    onTabClick(value as T);
  };

  const insertTabs = tabs.map((tab) => (
    <Card
      key={tab.value}
      onClick={handleTabClick(tab.value)}
      className={cls.tab}
      theme={tab.value === value ? CardTheme.OUTLINED : CardTheme.NORMAL}
    >
      {tab.content}
    </Card>
  ));

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>{insertTabs}</div>
  );
};
