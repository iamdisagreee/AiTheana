import React, { memo, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";
import Modal from "shared/ui/Modal/Modal";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { LoginModal } from "features/AuthByUsername";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, userActions } from "units/User";
import Text, { ThemeText } from "shared/ui/Text/Text";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface NavbarProps {
  className?: string;
}

const Navbar = memo((props: NavbarProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const dispatch = useDispatch();
  const userAuthData = useSelector(getUserAuthData);

  const openLogin = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const closeLogin = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (userAuthData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Text
          title={t("Kharitonov site")}
          className={cls.nameWeb}
          theme={ThemeText.INVERTED}
        ></Text>
        <AppLink to={RoutePath.article_create}>
          <Text text={t("Создать статью")} theme={ThemeText.INVERTED}></Text>
        </AppLink>
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          onClick={onLogout}
          className={cls.links}
        >
          {t("Выйти")}
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={openLogin}
        className={cls.links}
      >
        {t("Войти")}
      </Button>
      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={closeLogin} />}
    </div>
  );
});

export default Navbar;
