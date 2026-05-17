import { BugButton } from "app/providers/ErrorBoundary";
import { Counter } from "units/Counter";
import React from "react";
import { useTranslation } from "react-i18next";
import Input from "shared/ui/Input/Input";
import { Page } from "widgets/Page/Page";

const MainPage = () => {
  const { t } = useTranslation("main");

  return (
    <Page>
      <Input />
      <BugButton />
      {t("Основной текст")}
    </Page>
  );
};

export default MainPage;
