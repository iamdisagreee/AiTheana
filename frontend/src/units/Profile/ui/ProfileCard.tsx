import React, { useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ProfileCard.module.scss";
import Text, { AlignText, ThemeText } from "shared/ui/Text/Text";
import Input from "shared/ui/Input/Input";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchProfileData } from "../model/service/fetchProfileData/fetchProfileData";
import { useTranslation } from "react-i18next";
import { Profile } from "../model/types/ProfileSchema";
import Loader from "shared/ui/Loader/Loader";
import Avatar from "shared/ui/Avatar/Avatar";
import { Currency } from "units/Currency";
import CurrencySelect from "units/Currency/ui/CurrencySelect/CurrencySelect";
import { Country, CountrySelect } from "units/Country";

interface ProfileCardProps {
  className?: string;
  formData?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeFirstname?: (value: string) => void;
  onChangeLastname?: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeCity?: (value: string) => void;
  onChangeCurrency?: (value: Currency) => void;
  onChangeCountry?: (value: Country) => void;
  onChangeUsername?: (value: string) => void;
  onChangeAvatar?: (value: string) => void;
}
const ProfileCard = (props: ProfileCardProps) => {
  const { t } = useTranslation();
  const {
    className,
    formData,
    isLoading,
    error,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeCurrency,
    onChangeCountry,
    onChangeUsername,
    onChangeAvatar,
  } = props;

  const mods = {
    [cls.readonly]: readonly,
  };

  if (isLoading || !formData) {
    return (
      <div
        className={classNames(cls.ProfileCard, {}, [className, cls.isLoading])}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          title="Ошибка загрузки!"
          text="Тестовая ошибка"
          theme={ThemeText.ERROR}
          align={AlignText.CENTER}
        />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.inputs}>
        {formData?.avatar && (
          <Avatar src={formData?.avatar} className={cls.input} />
        )}
        <Input
          className={cls.input}
          placeholder={t("Ваше имя")}
          value={formData?.first}
          readonly={readonly}
          onChange={onChangeFirstname}
        />
        <Input
          className={cls.input}
          placeholder={t("Ваше фамилия")}
          value={formData?.lastname}
          readonly={readonly}
          onChange={onChangeLastname}
        />
        <Input
          className={cls.input}
          placeholder={t("Ваш возраст")}
          value={formData?.age}
          readonly={readonly}
          onChange={onChangeAge}
        />
        <Input
          className={cls.input}
          placeholder={t("Ваш город")}
          value={formData?.city}
          readonly={readonly}
          onChange={onChangeCity}
        />
        <Input
          className={cls.input}
          placeholder={t("Ваш никнейм")}
          value={formData?.username}
          readonly={readonly}
          onChange={onChangeUsername}
        />
        <Input
          className={cls.input}
          placeholder={t("Ваш аватар")}
          value={formData?.avatar}
          readonly={readonly}
          onChange={onChangeAvatar}
        />
        <CurrencySelect
          className={cls.input}
          placeholder={t("Валюта")}
          value={formData?.currency}
          readonly={readonly}
          onChange={onChangeCurrency}
        />
        <CountrySelect
          className={cls.input}
          placeholder={t("Страна")}
          value={formData?.country}
          readonly={readonly}
          onChange={onChangeCountry}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
