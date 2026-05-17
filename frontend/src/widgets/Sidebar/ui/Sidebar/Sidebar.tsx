import React, { memo, useMemo, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import LanguageSwitcher from "widgets/LanguageSwitcher/ui/LanguageSwitcher";
import Button, { ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";
import AboutLink from "shared/assets/icons/about.svg";
import MainLink from "shared/assets/icons/main.svg";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import SidebarItem from "../SidebarItem/SidebarItem";
import { useSelector } from "react-redux";
import { getUserAuthData } from "units/User";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";

interface SidebarProps {
  className?: string;
}

const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const isAuth = useSelector(getUserAuthData);
  const sidebarItemList = useSelector(getSidebarItems);

  const onToggle = () => setCollapsed((prev) => !prev);

  const sidebarItems = useMemo(
    () =>
      sidebarItemList
        .filter((item) => {
          if (item.authOnly && !isAuth) return false;
          return true;
        })
        .map((item) => (
          <SidebarItem item={item} collapsed={collapsed} key={item.link} />
        )),
    [collapsed, isAuth, sidebarItemList],
  );

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <div className={cls.items}>{sidebarItems}</div>
      <Button
        className={cls.collapsedBtn}
        theme={ButtonTheme.BACKGROUND}
        square
        size={ButtonSize.L}
        data-testid="toggle-sidebar"
        onClick={onToggle}
      >
        {collapsed ? ">" : "<"}
      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher short={collapsed} className={cls.language} />
      </div>
    </div>
  );
});

export default Sidebar;
