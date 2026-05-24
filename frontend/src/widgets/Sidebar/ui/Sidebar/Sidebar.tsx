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
import { Icon, IconTheme } from "shared/ui/Icon/Icon";
import Text, { FontWeightText, SizeText, ThemeText } from "shared/ui/Text/Text";
import LogoIcon from "shared/assets/icons/logo.svg";
import LessSignIcon from "shared/assets/icons/less-sign.svg";
import MoreSignIcon from "shared/assets/icons/more-sign.svg";
import SearchSvg from "shared/assets/icons/search.svg";
import Input, { InputTheme, InputType } from "shared/ui/Input/Input";
import { APPLICATION_NAME } from "shared/const/const";

interface SidebarProps {
  className?: string;
}

const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  // const isAuth = useSelector(getUserAuthData);
  // const sidebarItemList = useSelector(getSidebarItems);

  const onToggle = () => setCollapsed((prev) => !prev);

  // const sidebarItems = useMemo(
  //   () =>
  //     sidebarItemList
  //       .filter((item) => {
  //         if (item.authOnly && !isAuth) return false;
  //         return true;
  //       })
  //       .map((item) => (
  //         <SidebarItem item={item} collapsed={collapsed} key={item.link} />
  //       )),
  //   [collapsed, isAuth, sidebarItemList],
  // );

  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <div className={cls.header}>
        <Icon Svg={LogoIcon} theme={IconTheme.SECONDARY} />
        <Text
          text={APPLICATION_NAME}
          theme={ThemeText.SECONDARY}
          size={SizeText.L}
          fontWeight={FontWeightText.MEDIUM}
        />
        <Button
          className={cls.collapsedBtn}
          onClick={onToggle}
          size={ButtonSize["4XL"]}
          theme={ButtonTheme.CLEAR_SECONDARY}
        >
          {collapsed ? ">" : "<"}
        </Button>
      </div>
      <div className={cls.searchWrapper}>
        <Icon
          Svg={SearchSvg}
          theme={IconTheme.CLEAR}
          className={cls.searchSvg}
        />
        <Input
          placeholder={t("Поиск")}
          theme={InputTheme.CLEAR}
          onChange={() => {}}
          value={""}
          type={InputType.TEXT}
          className={cls.searchInput}
        />
      </div>

      {/* <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher short={collapsed} className={cls.language} />
      </div> */}
    </div>
  );
});

export default Sidebar;
