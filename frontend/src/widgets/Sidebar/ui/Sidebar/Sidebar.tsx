import React, { memo, useCallback, useMemo, useState } from "react";
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
import PlusSvg from "shared/assets/icons/plus.svg";
import Input, { InputTheme, InputType } from "shared/ui/Input/Input";
import { APPLICATION_NAME } from "shared/const/const";
import { Chat, ChatList, ChatListModal } from "units/Chat";

interface SidebarProps {
  className?: string;
  chats: Chat[];
}

const Sidebar = memo((props: SidebarProps) => {
  const { className, chats } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const [currentChat, setCurrentChat] = useState<Chat | undefined>(undefined);

  const onCloseModal = useCallback(() => {
    setCurrentChat(undefined);
  }, []);

  // const onShowModal = useCallback(() => {
  //   setIsChatsModal(true);
  // }, []);

  // const onToggleCollaps = () => setCollapsed((prev) => !prev);
  const onChatClick = (chat: Chat) => {
    setCurrentChat(chat);
  };

  const renderChat = (chat: Chat) => {
    return (
      <Text
        text={chat?.title}
        theme={ThemeText.INVERTED_PRIMARY}
        fontWeight={FontWeightText.MEDIUM}
        className={cls.titleChat}
        textClassName={cls.textChat}
      />
    );
  };

  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <div className={cls.header}>
        <Icon
          Svg={LogoIcon}
          theme={IconTheme.SECONDARY}
          className={cls.headerSvg}
        />
        <Text
          text={APPLICATION_NAME}
          theme={ThemeText.SECONDARY}
          size={SizeText.L}
          fontWeight={FontWeightText.MEDIUM}
          className={cls.application}
        />
        {/* Будущая фича */}
        {/* <Button
          onClick={onToggle}
          size={ButtonSize["4XL"]}
          theme={ButtonTheme.CLEAR_SECONDARY}
          className={cls.collapsedBtn}
        >
          {collapsed ? ">" : "<"}
        </Button> */}
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

      <Button onClick={() => {}} className={cls.addWrapper}>
        {/* <div className={cls.addWrapper}> */}
        <div className={cls.addSvgWrapper}>
          <Icon
            Svg={PlusSvg}
            theme={IconTheme.INVERTED_PRIMARY}
            className={cls.addSvg}
          />
        </div>
        <Text
          text={t("Новый чат")}
          size={SizeText.M}
          theme={ThemeText.SEMI_PRIMARY_LOW}
          fontWeight={FontWeightText.MEDIUM}
        />
      </Button>
      <div className={cls.line} />
      <ChatList
        chats={chats}
        onChatClick={onChatClick}
        renderContent={renderChat}
        className={cls.chatList}
        cardClassName={cls.card}
      />
      {currentChat && (
        <ChatListModal
          chat={currentChat}
          isOpen={!!currentChat}
          onClose={onCloseModal}
        />
      )}
    </div>
  );
});

export default Sidebar;
