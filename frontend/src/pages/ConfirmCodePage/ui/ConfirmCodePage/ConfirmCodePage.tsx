import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ConfirmCodePage.module.scss";
import { memo } from "react";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { AuthLayout } from "widgets/AuthLayout/ui/AuthLayout/AuthLayout";
import { useTranslation } from "react-i18next";
import { confirmCodePageReducer } from "../../model/slices/confirmCodePageSlice";
import { useSelector } from "react-redux";
import { getRegistrationPageUsername } from "pages/RegistrationPage";
import Text, { SizeText, ThemeText } from "shared/ui/Text/Text";
import CodeInput from "shared/ui/CodeInput/CodeInput";

interface ConfirmCodePageProps {
  className?: string;
}

const reducers: ReducersList = {
  confirmCodePage: confirmCodePageReducer,
};

const ConfirmCodePage = memo((props: ConfirmCodePageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const email = useSelector(getRegistrationPageUsername);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <AuthLayout>
        <Text
          text={t("Подтверди почту")}
          size={SizeText["4XL"]}
          theme={ThemeText.INVERTED_PRIMARY}
          className={cls.entry}
        />
        <Text
          text={`${t("Мы отправили код на почту")}:${email}`}
          size={SizeText.L}
          theme={ThemeText.PRIMARY}
          className={cls.subtitle}
        />
        <CodeInput />
        <Text
          text={t("Вернуться")}
          size={SizeText.L}
          theme={ThemeText.PRIMARY}
          className={cls.back}
        />
      </AuthLayout>
    </DynamicModuleLoader>
  );
});

export default ConfirmCodePage;
