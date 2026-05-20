import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LoginPage.module.scss";
import { memo, useCallback, useEffect } from "react";
import { Page } from "widgets/Page/Page";
import backgroundImage from "shared/assets/png/background-login.png";
import { useTranslation } from "react-i18next";
import Button, { ButtonFontWeight, ButtonTheme } from "shared/ui/Button/Button";
import Input, { InputTheme, InputType } from "shared/ui/Input/Input";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  loginPageActions,
  loginPageReducer,
} from "../../model/slices/loginPageSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getLoginPageError,
  getLoginPageIsLoading,
  getLoginPagePassword,
  getLoginPageUsername,
} from "../../model/selectors/getLoginPageSelectors";
import { loginByUsername } from "../../model/services/loginByUsername";
import Text, { AlignText, ThemeText } from "shared/ui/Text/Text";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  className?: string;
}

const reducers: ReducersList = {
  loginPage: loginPageReducer,
};

const LoginPage = memo((props: LoginPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginPageUsername);
  const password = useSelector(getLoginPagePassword);
  const error = useSelector(getLoginPageError);
  const isLoading = useSelector(getLoginPageIsLoading);

  const setUsername = useCallback(
    (username: string) => {
      dispatch(loginPageActions.setUsername(username));
    },
    [dispatch],
  );

  const setPassword = useCallback(
    (password: string) => {
      dispatch(loginPageActions.setPassword(password));
    },
    [dispatch],
  );

  const toggleLogin = useCallback(async () => {
    await dispatch(loginByUsername());
  }, [dispatch]);

  const toggleRegistration = useCallback(() => {
    navigate("/registration");
  }, [navigate]);

  // if (isLoading) return <div>Zagruzka</div>;

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
                placeholder={t("Введите вашу электронную почту")}
                theme={InputTheme.PRIMARY}
                onChange={setUsername}
                value={username}
                className={cls.inputLogin}
              />
            </div>

            <div
              className={classNames(
                cls.passwordWrapper,
                { [cls.withError]: error },
                [],
              )}
            >
              <div className={cls.passwordText}>{t("Пароль")}</div>
              <Input
                placeholder={t("Введите ваш пароль")}
                theme={InputTheme.PRIMARY}
                onChange={setPassword}
                value={password}
                type={InputType.PASSWORD}
                className={cls.inputPassword}
              />
            </div>
            {error && (
              <div className={cls.errorWrapper}>
                <Text
                  align={AlignText.CENTER}
                  text={t(error)}
                  theme={ThemeText.ERROR}
                  className={cls.error}
                />
              </div>
            )}
            <div className={cls.buttonsWrapper}>
              <Button
                theme={ButtonTheme.BASE}
                fontWeight={ButtonFontWeight.MEDIUM}
                onClick={toggleLogin}
                className={cls.loginBtn}
              >
                {t("Войти")}
              </Button>
              <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                fontWeight={ButtonFontWeight.SEMIBOLD}
                onClick={toggleRegistration}
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
