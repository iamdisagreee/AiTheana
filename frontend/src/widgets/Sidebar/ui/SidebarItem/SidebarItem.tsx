import React, { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./SidebarItem.module.scss";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { SidebarItemType } from "../../model/types/sidebar";
import { useTranslation } from "react-i18next";

interface SidebarItemProps {
  className?: string;
  item: SidebarItemType;
  collapsed: boolean;
}

const SidebarItem = ({ className, item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();

  return (
    <AppLink
      className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
      to={item.link}
      theme={AppLinkTheme.SECONDARY}
    >
      <item.Icon />
      <span className={cls.link}>{t(item.name)}</span>
    </AppLink>
  );
};

export default memo(SidebarItem);
