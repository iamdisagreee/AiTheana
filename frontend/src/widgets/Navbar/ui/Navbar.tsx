import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
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
  const navigate = useNavigate();
  const onClickLogin = useCallback(() => navigate(RoutePath.chats), [navigate]);

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
    </div>
  );
});

export default Navbar;
