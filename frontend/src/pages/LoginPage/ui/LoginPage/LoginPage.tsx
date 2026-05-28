import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LoginPage.module.scss";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Button, {
  ButtonFontWeight,
  ButtonSize,
  ButtonTheme,
} from "shared/ui/Button/Button";
import Input, { InputTheme, InputType } from "shared/ui/Input/Input";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";

import Text, {
  AlignText,
  FontWeightText,
  SizeText,
  ThemeText,
} from "shared/ui/Text/Text";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "widgets/AuthLayout/ui/AuthLayout/AuthLayout";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import {
  getLoginError,
  getLoginIsLoading,
  getLoginPassword,
  getLoginUsername,
  loginActions,
  loginByUsername,
  loginReducer,
} from "features/LoginByUsername";

interface LoginPageProps {
  className?: string;
}

const reducers: ReducersList = {
  login: loginReducer,
};

const LoginPage = memo((props: LoginPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);

  const setUsername = useCallback(
    (username: string) => {
      dispatch(loginActions.setUsername(username));
    },
    [dispatch],
  );

  const setPassword = useCallback(
    (password: string) => {
      dispatch(loginActions.setPassword(password));
    },
    [dispatch],
  );

  const toggleLogin = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate(RoutePath.chats);
    }
  }, [dispatch, navigate, username, password]);

  const toggleRegistration = useCallback(() => {
    navigate(RoutePath.registration);
  }, [navigate]);

  // if (isLoading) return <div>Zagruzka</div>;

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <AuthLayout>
        <Text
          text={t("Вход")}
          size={SizeText["4XL"]}
          theme={ThemeText.INVERTED_PRIMARY}
          align={AlignText.CENTER}
          fontWeight={FontWeightText.MEDIUM}
          className={cls.entry}
        />
        <div className={cls.loginWrapper}>
          <Text
            text={t("Логин")}
            size={SizeText["M"]}
            theme={ThemeText.INVERTED_PRIMARY}
            align={AlignText.LEFT}
            fontWeight={FontWeightText.SEMIBOLD}
            className={cls.passwordText}
          />
          <Input
            placeholder={t("Введите вашу электронную почту")}
            theme={InputTheme.PRIMARY}
            onChange={setUsername}
            value={username}
            className={cls.inputLogin}
          />
        </div>
        <div className={classNames(cls.passwordWrapper, {}, [])}>
          <Text
            text={t("Пароль")}
            size={SizeText["M"]}
            theme={ThemeText.INVERTED_PRIMARY}
            align={AlignText.LEFT}
            fontWeight={FontWeightText.SEMIBOLD}
            className={cls.passwordText}
          />
          <Input
            placeholder={t("Введите ваш пароль")}
            theme={InputTheme.PRIMARY}
            onChange={setPassword}
            value={password}
            type={InputType.PASSWORD}
            className={cls.inputPassword}
          />
        </div>
        <div className={cls.errorWrapper}>
          {error && (
            <Text
              align={AlignText.CENTER}
              text={error}
              theme={ThemeText.ERROR}
              className={cls.error}
            />
          )}
        </div>
        <div className={cls.buttonsWrapper}>
          <Button
            theme={ButtonTheme.BACKGROUND_INVERTED}
            size={ButtonSize.M}
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
      </AuthLayout>
    </DynamicModuleLoader>
  );
});

export default LoginPage;
