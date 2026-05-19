import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LoginPage.module.scss";
import { memo } from "react";
import { Page } from "widgets/Page/Page";
import backgroundImage from "shared/assets/png/background-login.png";
import { useTranslation } from "react-i18next";
import Button, { ButtonFontWeight, ButtonTheme } from "shared/ui/Button/Button";
import Input, { InputTheme } from "shared/ui/Input/Input";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { loginPageReducer } from "../../model/slices/loginPageSlice";

interface LoginPageProps {
  className?: string;
}

const reducers: ReducersList = {
  loginPage: loginPageReducer,
};

const LoginPage = memo((props: LoginPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={classNames(cls.LoginPage, {}, [className])}>
          <div className={cls.loginForm}>
            <div className={cls.entry}>{t("Вход")}</div>
            <div className={cls.loginWrapper}>
              <div className={cls.loginText}>{t("Логин")}</div>
              <Input
                placeholder={t("Введите ваше имя")}
                theme={InputTheme.PRIMARY}
                className={cls.inputLogin}
              />
            </div>
            <div className={cls.passwordWrapper}>
              <div className={cls.passwordText}>{t("Пароль")}</div>
              <Input
                placeholder={t("Введите ваш пароль")}
                theme={InputTheme.PRIMARY}
                className={cls.inputPassword}
              />
            </div>
            <div className={cls.buttonsWrapper}>
              <Button
                theme={ButtonTheme.BASE}
                fontWeight={ButtonFontWeight.MEDIUM}
                className={cls.loginBtn}
              >
                {t("Войти")}
              </Button>
              <Button
                fontWeight={ButtonFontWeight.SEMIBOLD}
                className={cls.registrationBtn}
              >
                {t("Создать аккаунт")}
              </Button>
            </div>
          </div>
        </div>
      </Page>
    </DynamicModuleLoader>
  );
});

export default LoginPage;
