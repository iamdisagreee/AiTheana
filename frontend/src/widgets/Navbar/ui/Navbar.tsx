import React, { memo, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";
import Modal from "shared/ui/Modal/Modal";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, userActions } from "units/User";
import { Logo } from "shared/ui/Logo/Logo";
import { FontWeightText, SizeText, ThemeText } from "shared/ui/Text/Text";
import Text from "shared/ui/Text/Text";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  className?: string;
}

const Navbar = memo((props: NavbarProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const dispatch = useDispatch();
  const userAuthData = useSelector(getUserAuthData);
  const navigate = useNavigate();
  const onClickLogin = useCallback(() => navigate(RoutePath.chats), [navigate]);

  const openLogin = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const closeLogin = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  // if (userAuthData) {
  //   return (
  //     <div className={classNames(cls.Navbar, {}, [className])}>
  //       <Button
  //         theme={ButtonTheme.CLEAR_INVERTED}
  //         onClick={onLogout}
  //         className={cls.links}
  //       >
  //         {t("Выйти")}
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Logo className={cls.logo} />
      <Button
        theme={ButtonTheme.CLEAR}
        onClick={onClickLogin}
        className={cls.loginBtn}
      >
        <Text
          text={t("Войти")}
          size={SizeText.M}
          theme={ThemeText.PRIMARY}
          fontWeight={FontWeightText.MEDIUM}
        />
      </Button>
      {/* {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={closeLogin} />} */}
    </div>
  );
});

export default Navbar;
