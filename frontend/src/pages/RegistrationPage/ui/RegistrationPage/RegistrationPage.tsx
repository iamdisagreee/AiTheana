import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback } from "react";
import cls from "./RegistrationPage.module.scss";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { AuthLayout } from "widgets/AuthLayout/ui/AuthLayout/AuthLayout";
import {
  registrationPageActions,
  registrationPageReducer,
} from "../../model/slices/registrationPageSlice";
import Input, { InputTheme, InputType } from "shared/ui/Input/Input";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getRegistrationPageError,
  getRegistrationPagePasswordFirst,
  getRegistrationPagePasswordSecond,
  getRegistrationPageUsername,
} from "pages/RegistrationPage/model/selectors/getRegistrationPageSelectors";
import Text, {
  AlignText,
  FontWeightText,
  SizeText,
  ThemeText,
} from "shared/ui/Text/Text";
import Button, { ButtonFontWeight, ButtonTheme } from "shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { sendCodeByEmail } from "pages/RegistrationPage/model/services/sendCodeByEmail";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface RegistrationPageProps {
  className?: string;
}

const reducers: ReducersList = {
  registrationPage: registrationPageReducer,
};

const RegistrationPage = memo((props: RegistrationPageProps) => {
  const { className } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const username = useSelector(getRegistrationPageUsername);
  const passwordFirst = useSelector(getRegistrationPagePasswordFirst);
  const passwordSecond = useSelector(getRegistrationPagePasswordSecond);
  const error = useSelector(getRegistrationPageError);

  const setUsername = useCallback(
    (username: string) => {
      dispatch(registrationPageActions.setUsername(username));
    },
    [dispatch],
  );

  const setPasswordFirst = useCallback(
    (password: string) => {
      dispatch(registrationPageActions.setPasswordFirst(password));
    },
    [dispatch],
  );

  const setPasswordSecond = useCallback(
    (password: string) => {
      dispatch(registrationPageActions.setPasswordSecond(password));
    },
    [dispatch],
  );

  const toggleRegistration = useCallback(async () => {
    const result = await dispatch(sendCodeByEmail());
    if (result.meta.requestStatus === "fulfilled") {
      navigate(RoutePath.confirm_code);
    }
  }, [dispatch, navigate]);

  const toggleLogin = useCallback(() => {
    navigate(RoutePath.login);
  }, [navigate]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <AuthLayout>
        <Text
          text={t("Регистрация")}
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
            onChange={setPasswordFirst}
            value={passwordFirst}
            type={InputType.PASSWORD}
            className={cls.inputPasswordFirst}
          />
          <Text
            text={t("Введите пароль еще раз")}
            size={SizeText["M"]}
            theme={ThemeText.INVERTED_PRIMARY}
            align={AlignText.LEFT}
            fontWeight={FontWeightText.SEMIBOLD}
            className={cls.passwordText}
          />
          <Input
            placeholder={t("Введите ваш пароль")}
            theme={InputTheme.PRIMARY}
            onChange={setPasswordSecond}
            value={passwordSecond}
            type={InputType.PASSWORD}
            className={cls.inputPasswordSecond}
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
            theme={ButtonTheme.BASE}
            fontWeight={ButtonFontWeight.MEDIUM}
            onClick={toggleRegistration}
            className={cls.registrationBtn}
          >
            {t("Зарегистрироваться")}
          </Button>
          <Button
            theme={ButtonTheme.CLEAR_INVERTED}
            fontWeight={ButtonFontWeight.SEMIBOLD}
            onClick={toggleLogin}
            className={cls.loginBtn}
          >
            {t("Войти")}
          </Button>
        </div>
      </AuthLayout>
    </DynamicModuleLoader>
  );
});

export default RegistrationPage;
