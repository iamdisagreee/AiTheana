import React, { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LanguageSwitcher.module.scss";
import { useTranslation } from "react-i18next";
import Button from "shared/ui/Button/Button";
import { changeLanguage } from "i18next";

interface LanguageSwitcherProps {
  className?: string;
  short?: boolean;
}

const LanguageSwitcher = memo(({ className, short }: LanguageSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const onToggle = () => {
    changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <Button
      onClick={onToggle}
      className={classNames(cls.LanguageSwitcher, {}, [className])}
    >
      {short ? t("Сокращенный язык") : t("Язык")}
    </Button>
  );
});

export default LanguageSwitcher;
