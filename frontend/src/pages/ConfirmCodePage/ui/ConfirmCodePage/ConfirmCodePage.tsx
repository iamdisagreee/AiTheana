import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ConfirmCodePage.module.scss";
import { memo, useCallback } from "react";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { AuthLayout } from "widgets/AuthLayout/ui/AuthLayout/AuthLayout";
import { useTranslation } from "react-i18next";
import {
  confirmCodePageActions,
  confirmCodePageReducer,
} from "../../model/slices/confirmCodePageSlice";
import { useSelector } from "react-redux";
import { getRegistrationPageUsername } from "pages/RegistrationPage";
import Text, {
  AlignText,
  FontWeightText,
  SizeText,
  ThemeText,
} from "shared/ui/Text/Text";
import { CodeInput } from "shared/ui/CodeInput/CodeInput";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { confirmCodeByEmail } from "../../model/services/confirmCodeByEmail";
import {
  getConfirmCodePageEnteredCode,
  getConfirmCodePageError,
  getConfirmCodePageIsLoading,
} from "pages/ConfirmCodePage/model/selectors/confirmCodePageSelectors";
import Button from "shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { getUserAuthData } from "units/User";

interface ConfirmCodePageProps {
  className?: string;
}

const reducers: ReducersList = {
  confirmCodePage: confirmCodePageReducer,
};

const ConfirmCodePage = memo((props: ConfirmCodePageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const email = useSelector(getRegistrationPageUsername);
  const code = useSelector(getConfirmCodePageEnteredCode);
  const isLoading = useSelector(getConfirmCodePageIsLoading);
  const user = useSelector(getUserAuthData);
  const error = useSelector(getConfirmCodePageError);
  const dispatch = useAppDispatch();

  const setCode = useCallback(
    (value: string) => {
      dispatch(confirmCodePageActions.setCode(value));
    },
    [dispatch],
  );

  const confirmCode = useCallback(async () => {
    const resultConfirm = await dispatch(confirmCodeByEmail());
    if (resultConfirm.meta.requestStatus === "fulfilled") {
      navigate(RoutePath.chats);
    }
  }, [dispatch, navigate]);

  const toggleBack = useCallback(
    () => navigate(RoutePath.registration),
    [navigate],
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <AuthLayout>
        <Text
          text={t("Подтверди почту")}
          size={SizeText["4XL"]}
          theme={ThemeText.INVERTED_PRIMARY}
          align={AlignText.CENTER}
          fontWeight={FontWeightText.MEDIUM}
          className={cls.entry}
        />
        <Text
          text={`${t("Мы отправили код на почту")} ${user?.email}`}
          size={SizeText.L}
          theme={ThemeText.SEMI_PRIMARY_HIGH}
          align={AlignText.CENTER}
          fontWeight={FontWeightText.REGULAR}
          className={cls.subtitle}
        />
        <CodeInput
          maxLength={6}
          code={code}
          setCode={setCode}
          onComplete={confirmCode}
          className={classNames(cls.codeInput, {}, [])}
        />
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

        <Button onClick={toggleBack}>
          <Text
            text={t("Вернуться")}
            size={SizeText.L}
            theme={ThemeText.SEMI_PRIMARY_HIGH}
            fontWeight={FontWeightText.MEDIUM}
            className={cls.back}
          />
        </Button>
      </AuthLayout>
    </DynamicModuleLoader>
  );
});

export default ConfirmCodePage;
