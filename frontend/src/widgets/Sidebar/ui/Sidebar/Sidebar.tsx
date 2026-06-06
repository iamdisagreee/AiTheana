import { memo, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import { useTranslation } from "react-i18next";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useSelector } from "react-redux";
import { Icon, IconTheme } from "shared/ui/Icon/Icon";
import Text, { FontWeightText, SizeText, ThemeText } from "shared/ui/Text/Text";
import SearchSvg from "shared/assets/icons/search.svg";
import PlusSvg from "shared/assets/icons/plus.svg";
import Input, { InputTheme, InputType } from "shared/ui/Input/Input";
import { Chat, ChatList } from "units/Chat";
import { ChatListModal } from "widgets/ChatListModal";
import { useNavigate } from "react-router-dom";
import { Logo, SizeLogo } from "shared/ui/Logo/Logo";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  chatRequestActions,
  fetchChats,
  getSidebarSearch,
} from "features/ChatRequest";
import { useDebounce } from "shared/lib/hooks/useDebounce/useDebounce";
import Button from "shared/ui/Button/Button";

interface SidebarProps {
  className?: string;
  chats: Chat[];
}

const Sidebar = memo((props: SidebarProps) => {
  const { className, chats } = props;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const [currentChat, setCurrentChat] = useState<Chat | undefined>(undefined);
  const dispatch = useAppDispatch();
  const search = useSelector(getSidebarSearch);

  const debounceFetchData = useDebounce(
    (search: string) => dispatch(fetchChats({ search, replace: true })),
    1000,
  );

  const onAddChat = useCallback(() => {
    navigate(RoutePath.chats);
  }, [navigate]);

  const onCloseModal = useCallback(() => {
    setCurrentChat(undefined);
  }, []);

  const onChatClick = (chat: Chat) => {
    setCurrentChat(chat);
  };

  const onChangeSearch = useCallback(
    (value: string) => {
      dispatch(chatRequestActions.setSidebarSearch(value));
      debounceFetchData(value);
    },
    [dispatch, debounceFetchData],
  );

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
      <Logo size={SizeLogo.BIG} className={cls.header} />
      {/* Будущая фича */}
      {/* <Button
          onClick={onToggle}
          size={ButtonSize["4XL"]}
          theme={ButtonTheme.CLEAR_SECONDARY}
          className={cls.collapsedBtn}
        >
          {collapsed ? ">" : "<"}
        </Button> */}
      {/* </div> */}
      <div className={cls.searchWrapper}>
        <Icon
          Svg={SearchSvg}
          theme={IconTheme.CLEAR}
          className={cls.searchSvg}
        />
        <Input
          placeholder={t("Поиск")}
          theme={InputTheme.CLEAR}
          onChange={onChangeSearch}
          value={search}
          type={InputType.TEXT}
          className={cls.searchInput}
        />
      </div>

      <Button onClick={onAddChat} className={cls.addWrapper}>
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
